import { useState, useEffect, useCallback } from 'react';
import { Word, WordProgress, UserStats, DailySnapshot, LocalStorageState, LevelBadge, ThetaWeights, PracticeAttempt } from '../types';
import { WORDS } from '../data';

const STORAGE_KEY = 'wortschatz_v1';

// Theta weights for Half-Life Regression (HLR)
// x = [correctCount, wrongCount, lagTimeInHours]
// h = 2^(θ · x)
export const DEFAULT_THETAS: ThetaWeights = {
  thetaCorrect: 0.55,
  thetaWrong: 0.85,
  thetaLag: 0.01,
  bias: 4.585
};

export function calculateHalfLife(correct: number, wrong: number, lagHours: number, thetas: ThetaWeights = DEFAULT_THETAS): number {
  const dotProduct = thetas.bias + (thetas.thetaCorrect * correct) - (thetas.thetaWrong * wrong) + (thetas.thetaLag * lagHours);
  // Cap half-life between 0.5 hours and 336 hours to avoid extreme exponential explosion or decay
  return Math.min(336, Math.max(0.5, Math.pow(2, dotProduct)));
}

export function calculateRecallProbability(lastSeen: number | null, halfLife: number): number {
  if (typeof lastSeen !== 'number' || lastSeen <= 0) return 0.0;
  const deltaHours = (Date.now() - lastSeen) / 3600000;
  return Math.pow(2, -deltaHours / halfLife);
}

export function runGradientDescent(thetas: ThetaWeights, history: PracticeAttempt[]): ThetaWeights {
  const LEARNING_RATE = 0.001;
  const newThetas = { ...thetas };

  history.forEach((attempt) => {
    if (attempt.lagHours > 8760 || isNaN(attempt.lagHours)) return;
    const lagHours = attempt.lagHours;
    const hl = calculateHalfLife(attempt.correct, attempt.wrong, attempt.lagHours, newThetas);
    const p_predicted = Math.pow(2, -attempt.lagHours / hl);
    const error = attempt.outcome - p_predicted;
    
    newThetas.bias += LEARNING_RATE * error * 1.0;
    newThetas.thetaCorrect += LEARNING_RATE * error * attempt.correct;
    newThetas.thetaWrong -= LEARNING_RATE * error * attempt.wrong;
    newThetas.thetaLag += LEARNING_RATE * error * attempt.lagHours;
  });

  // Clamp thetas to reasonable bounds to prevent runaway drift
  newThetas.bias = Math.max(3.0, Math.min(8.0, newThetas.bias));
  newThetas.thetaCorrect = Math.max(0.3, Math.min(2.0, newThetas.thetaCorrect));
  newThetas.thetaWrong = Math.max(0.3, Math.min(1.5, newThetas.thetaWrong));
  newThetas.thetaLag = Math.max(0.001, Math.min(1.0, newThetas.thetaLag));

  return newThetas;
}

// Generate an Audio-API sound
export function playWortschatzSound(type: 'correct' | 'wrong' | 'fanfare', isMuted: boolean) {
  if (isMuted) return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'correct') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      // Pleasant double bell-like pitch ramp
      osc.frequency.setValueAtTime(512, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(640, ctx.currentTime + 0.08); // E5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'wrong') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(75, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'fanfare') {
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
        gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.45);
      });
    }
  } catch (err) {
    console.warn('Audio Web API blocked or unsupported:', err);
  }
}

function getTodayString(): string {
  // Returns local YYYY-MM-DD
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function useWortschatz() {
  const [state, setState] = useState<LocalStorageState>(() => {
    // Initializer
    if (typeof window === 'undefined') {
      return { progress: {}, stats: { xp: 0, streak: 0, lastPracticeDate: null, hasOnboarded: false }, snapshots: [], isMuted: false, thetas: DEFAULT_THETAS, history: [] };
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as LocalStorageState;
        
        let thetaResetHappened = false;

        const savedThetas = localStorage.getItem('wortschatz_theta');
        if (savedThetas) {
          try {
            const parsedThetas = JSON.parse(savedThetas);
            if (parsedThetas.thetaCorrect < 0.3 || parsedThetas.thetaWrong > 1.5 || parsedThetas.bias < 3.0 || parsedThetas.thetaLag > 0.1) {
              parsed.thetas = DEFAULT_THETAS;
              localStorage.setItem('wortschatz_theta', JSON.stringify(DEFAULT_THETAS));
              thetaResetHappened = true;
            } else {
              parsed.thetas = parsedThetas;
            }
          } catch (e) {
            parsed.thetas = DEFAULT_THETAS;
            localStorage.setItem('wortschatz_theta', JSON.stringify(DEFAULT_THETAS));
            thetaResetHappened = true;
          }
        } else if (!parsed.thetas || parsed.thetas.thetaLag > 0.1 || parsed.thetas.thetaWrong > 1.0) {
          parsed.thetas = DEFAULT_THETAS;
          localStorage.setItem('wortschatz_theta', JSON.stringify(DEFAULT_THETAS));
          thetaResetHappened = true;
        }

        const savedHistory = localStorage.getItem('wortschatz_history');
        if (savedHistory) {
          try {
            parsed.history = JSON.parse(savedHistory);
          } catch(e) {
            parsed.history = [];
          }
        } else if (!parsed.history) {
          parsed.history = [];
        }

        // If thetaLag was corrupted, purge the corrupted history as well
        if (thetaResetHappened && parsed.history && parsed.history.length > 0) {
          parsed.history = [];
          localStorage.removeItem('wortschatz_history');
        }

        // Verify all 200 words exist in the loaded progress and sanitize lastSeen
        let migrationNeeded = false;
        const currentProgress = { ...parsed.progress };
        
        WORDS.forEach((w) => {
          if (!currentProgress[w.id]) {
            currentProgress[w.id] = {
              correct: 0,
              wrong: 0,
              lastSeen: null,
              halfLife: 24,
              firstSeen: Date.now(),
              introduced: false
            };
            migrationNeeded = true;
          } else {
            // Sanitize corrupt lastSeen (0, null string, negative, etc.)
            const prog = currentProgress[w.id];
            if (prog.lastSeen !== null && (typeof prog.lastSeen !== 'number' || prog.lastSeen <= 0)) {
              prog.lastSeen = null;
              migrationNeeded = true;
            }
            
            // Recalculate halfLife to purge the old 2000-hour calculation bug
            //if (prog.halfLife > 96) {
            //prog.halfLife = 24;
            //prog.lastSeen = null;
            //migrationNeeded = true;
            //}
          }
        });

        if (parsed.history && parsed.history.length > 0) {
          const validHistory = parsed.history.filter(h => h.lagHours <= 8760);
          if (validHistory.length !== parsed.history.length) {
            parsed.history = validHistory;
            migrationNeeded = true;
            localStorage.setItem('wortschatz_history', JSON.stringify(validHistory));
          }
        }

        if (migrationNeeded) {
          parsed.progress = currentProgress;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        }

        return parsed;
      } catch (e) {
        console.error('Error loading Wortschatz v1 state, resetting', e);
      }
    }

    // Default configuration: seed all 200 words
    const initialProgress: Record<string, WordProgress> = {};
    WORDS.forEach((w) => {
      initialProgress[w.id] = {
        correct: 0,
        wrong: 0,
        lastSeen: null,
        halfLife: 24,
        firstSeen: Date.now(),
        introduced: false,
      };
    });

    const todayStr = getTodayString();
    
    // Seed some initial progress so the line chart in Analytics looks great immediately on first load
    const devSnapshots: DailySnapshot[] = [
      { date: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString().split('T')[0], avgRecall: 0.05 },
      { date: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString().split('T')[0], avgRecall: 0.12 },
      { date: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString().split('T')[0], avgRecall: 0.18 },
      { date: todayStr, avgRecall: 0.22 }
    ];

    const defaultState: LocalStorageState = {
      progress: initialProgress,
      stats: {
        xp: 0,
        streak: 0,
        lastPracticeDate: null,
        hasOnboarded: false
      },
      snapshots: devSnapshots,
      isMuted: false,
      thetas: DEFAULT_THETAS,
      history: []
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
    return defaultState;
  });

  // Keep localStorage in sync on every state change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (state.thetas) {
      localStorage.setItem('wortschatz_theta', JSON.stringify(state.thetas));
    }
    if (state.history) {
      localStorage.setItem('wortschatz_history', JSON.stringify(state.history));
    }
  }, [state]);

  // Utility to grab full data combined with progress
  const getExtendedWords = useCallback(() => {
    return WORDS.map((wordObj) => {
      const prog = state.progress[wordObj.id] || {
        correct: 0,
        wrong: 0,
        lastSeen: null,
        halfLife: 24,
        firstSeen: Date.now(),
        introduced: false
      };
      const p = calculateRecallProbability(prog.lastSeen, prog.halfLife);
      return {
        ...wordObj,
        ...prog,
        p,
      };
    });
  }, [state.progress]);

  // Unlock indicators based on mastered count of current difficulty classes
  // Beginner -> always unlocked
  // Intermediate -> unlocked after 20 Beginner words have halfLife > 48
  // Hard -> unlocked after 20 Intermediate words have halfLife > 48
  const getUnlockStatus = useCallback(() => {
    const ext = getExtendedWords();
    const masteredBeginnerCount = ext.filter(
      (w) => w.difficulty === 'Beginner' && w.introduced && w.halfLife > 48
    ).length;

    const masteredIntermediateCount = ext.filter(
      (w) => w.difficulty === 'Intermediate' && w.introduced && w.halfLife > 48
    ).length;

    return {
      masteredBeginnerCount,
      masteredIntermediateCount,
      intermediateUnlocked: true,
      hardUnlocked: true,
    };
  }, [getExtendedWords]);

  // Badge calculator
  // Bronze (0–500 XP), Silver (500–1500 XP), Gold (1500–3000 XP), Platinum (3000+ XP)
  const getLevelBadge = useCallback((xp: number): LevelBadge => {
    if (xp < 500) return 'Bronze';
    if (xp < 1500) return 'Silver';
    if (xp < 3000) return 'Gold';
    return 'Platinum';
  }, []);

  // Update daily snapshots inside the hook
  const triggerDailySnapshot = useCallback((progressMap: Record<string, WordProgress>) => {
    const todayStr = getTodayString();
    
    // Calc avg recall across ALL 200 words
    let totalRecall = 0;
    Object.keys(progressMap).forEach((id) => {
      const prog = progressMap[id];
      const p = calculateRecallProbability(prog.lastSeen, prog.halfLife);
      totalRecall += p;
    });
    const avgRecall = totalRecall / WORDS.length;

    setState((prev) => {
      const currentSnapshots = [...prev.snapshots];
      const existingIdx = currentSnapshots.findIndex((s) => s.date === todayStr);

      if (existingIdx !== -1) {
        currentSnapshots[existingIdx] = { date: todayStr, avgRecall };
      } else {
        currentSnapshots.push({ date: todayStr, avgRecall });
      }

      return {
        ...prev,
        snapshots: currentSnapshots,
      };
    });
  }, []);

  // Set onboarded state
  const setOnboarded = useCallback(() => {
    setState((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        hasOnboarded: true
      }
    }));
  }, []);

  // Mute toggle
  const toggleMute = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isMuted: !prev.isMuted
    }));
  }, []);

  // Standard practice/review correct and wrong updates
  const registerAnswer = useCallback((wordId: string, isCorrect: boolean) => {
    const todayStr = getTodayString();
    const yesterdayStr = getYesterdayString();

    setState((prev) => {
      const currentProgress = { ...prev.progress };
      const currentWordProg = currentProgress[wordId] || {
        correct: 0,
        wrong: 0,
        lastSeen: null,
        halfLife: 24,
        firstSeen: Date.now(),
        introduced: false,
      };

      const now = Date.now();
      
      // Calculate delta hours since last seen for this word to feed into regression argument
      const lagHours = (typeof currentWordProg.lastSeen === 'number' && currentWordProg.lastSeen > 0) ? (Date.now() - currentWordProg.lastSeen) / 3600000 : 0;
      const effectiveLagHours = (currentWordProg.correct + currentWordProg.wrong < 3) ? 0 : lagHours;

      // Increment counters
      const nextCorrect = isCorrect ? currentWordProg.correct + 1 : currentWordProg.correct;
      const nextWrong = !isCorrect ? currentWordProg.wrong + 1 : currentWordProg.wrong;

      // Track history attempt
      const newAttempt: PracticeAttempt = {
        wordId,
        correct: currentWordProg.correct,
        wrong: currentWordProg.wrong,
        lagHours: effectiveLagHours, 
        outcome: isCorrect ? 1.0 : 0.0,
        timestamp: now,
      };

      const currentHistory = [...(prev.history || [])];
      currentHistory.push(newAttempt);
      if (currentHistory.length > 100) {
        currentHistory.shift(); // Keep max 100 attempts
      }

      let currentThetas = prev.thetas || DEFAULT_THETAS;
      
      // Update thetas every 20 attempts
      if (currentHistory.length > 0 && currentHistory.length % 20 === 0) {
        currentThetas = runGradientDescent(currentThetas, currentHistory);
      }

      // Compute next half-life via HLR
      const nextHalfLife = calculateHalfLife(nextCorrect, nextWrong, effectiveLagHours, currentThetas);

      currentProgress[wordId] = {
        ...currentWordProg,
        correct: nextCorrect,
        wrong: nextWrong,
        lastSeen: now,
        halfLife: nextHalfLife,
        introduced: true, // Answered means it's fully introduced
      };

      // Play soft sound cues
      playWortschatzSound(isCorrect ? 'correct' : 'wrong', prev.isMuted);

      // Streak updater logic
      let currentStreak = prev.stats.streak;
      if (prev.stats.lastPracticeDate === null) {
        currentStreak = 1;
      } else if (prev.stats.lastPracticeDate === yesterdayStr) {
        currentStreak = prev.stats.streak + 1;
      } else if (prev.stats.lastPracticeDate !== todayStr) {
        // Interrupted streak
        currentStreak = 1;
      }

      const statsUpdate = {
        ...prev.stats,
        xp: prev.stats.xp + (isCorrect ? 10 : 0), // +10 XP on correct answer
        streak: currentStreak,
        lastPracticeDate: todayStr,
      };

      setTimeout(() => {
        triggerDailySnapshot(currentProgress);
      }, 50);

      return {
        ...prev,
        progress: currentProgress,
        stats: statsUpdate,
        history: currentHistory,
        thetas: currentThetas,
      };
    });
  }, [triggerDailySnapshot]);

  // Learn tab - introduce word which maps directly to "Got it! ✓" or "Not yet"
  const introduceWordFromLearn = useCallback((wordId: string, gotIt: boolean) => {
    const todayStr = getTodayString();
    const yesterdayStr = getYesterdayString();

    setState((prev) => {
      const currentProgress = { ...prev.progress };
      const currentWordProg = currentProgress[wordId] || {
        correct: 0,
        wrong: 0,
        lastSeen: null,
        halfLife: 24,
        firstSeen: Date.now(),
        introduced: false,
      };

      const now = Date.now();

      // If "Got It!" ✓: correct counter starts at 1, half life extends
      // If "Not yet": wrong counter starts at 1, half life decays
      const nextCorrect = gotIt ? currentWordProg.correct + 1 : currentWordProg.correct;
      const nextWrong = !gotIt ? currentWordProg.wrong + 1 : currentWordProg.wrong;
      
      const currentHistory = [...(prev.history || [])];
      
      const lagHours = (typeof currentWordProg.lastSeen === 'number' && currentWordProg.lastSeen > 0) ? (Date.now() - currentWordProg.lastSeen) / 3600000 : 0;
      const effectiveLagHours = (currentWordProg.correct + currentWordProg.wrong < 3) ? 0 : lagHours;

      const newAttempt: PracticeAttempt = {
        wordId,
        correct: currentWordProg.correct,
        wrong: currentWordProg.wrong,
        lagHours: effectiveLagHours,
        outcome: gotIt ? 1.0 : 0.0,
        timestamp: now,
      };

      currentHistory.push(newAttempt);
      if (currentHistory.length > 100) currentHistory.shift();

      let currentThetas = prev.thetas || DEFAULT_THETAS;
      if (currentHistory.length > 0 && currentHistory.length % 20 === 0) {
        currentThetas = runGradientDescent(currentThetas, currentHistory);
      }
      
      const nextHalfLife = calculateHalfLife(nextCorrect, nextWrong, effectiveLagHours, currentThetas)

      // Is it a brand new introduction?
      const isBrandNew = !currentWordProg.introduced && gotIt;
      const introXPAward = isBrandNew ? 5 : 0; // +5 XP for introducing the word

      currentProgress[wordId] = {
        ...currentWordProg,
        correct: nextCorrect,
        wrong: nextWrong,
        lastSeen: now,
        halfLife: nextHalfLife,
        introduced: true,
      };

      // Cheer Audio if gotIt
      playWortschatzSound(gotIt ? 'correct' : 'wrong', prev.isMuted);

      // Streaks
      let currentStreak = prev.stats.streak;
      if (prev.stats.lastPracticeDate === null) {
        currentStreak = 1;
      } else if (prev.stats.lastPracticeDate === yesterdayStr) {
        currentStreak = prev.stats.streak + 1;
      } else if (prev.stats.lastPracticeDate !== todayStr) {
        currentStreak = 1; // broken and restarted
      }

      // Extra 10 XP on top if correct during flashcards
      const xpIncrease = introXPAward + (gotIt ? 10 : 0);

      const statsUpdate = {
        ...prev.stats,
        xp: prev.stats.xp + xpIncrease,
        streak: currentStreak,
        lastPracticeDate: todayStr,
      };

      setTimeout(() => {
        triggerDailySnapshot(currentProgress);
      }, 50);

      const newState = {
        ...prev,
        progress: currentProgress,
        stats: statsUpdate,
        history: currentHistory,
        thetas: currentThetas,
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      
      return newState;
    });
  }, [triggerDailySnapshot]);

  // Audio completion cue
  const playSessionCompleteSound = useCallback(() => {
    playWortschatzSound('fanfare', state.isMuted);
  }, [state.isMuted]);

  // Reward additional custom arbitrary XP
  const awardSessionXP = useCallback((amount: number) => {
    setState((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        xp: prev.stats.xp + amount,
      }
    }));
  }, []);

  return {
    state,
    words: getExtendedWords(),
    unlockStatus: getUnlockStatus(),
    getLevelBadge,
    setOnboarded,
    toggleMute,
    registerAnswer,
    introduceWordFromLearn,
    playSessionCompleteSound,
    awardSessionXP,
  };
}
