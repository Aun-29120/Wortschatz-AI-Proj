import { useState } from 'react';
import { motion } from 'motion/react';
import { Word, WordProgress } from '../types';
import { Mascot } from './Mascot';
import { Confetti } from './Confetti';
import { Check, Flame, Trophy } from 'lucide-react';

interface HomeTabProps {
  words: (Word & WordProgress & { p: number })[];
  unlockStatus: {
    masteredBeginnerCount: number;
    masteredIntermediateCount: number;
    intermediateUnlocked: boolean;
    hardUnlocked: boolean;
  };
  introduceWordFromLearn: (wordId: string, gotIt: boolean) => void;
  registerAnswer: (wordId: string, isCorrect: boolean) => void;
}

export function HomeTab({ words, unlockStatus, introduceWordFromLearn, registerAnswer }: HomeTabProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mascotState, setMascotState] = useState<'idle' | 'correct' | 'wrong' | 'dance'>('idle');
  const [showConfetti, setShowConfetti] = useState(false);

  // Calculate words practiced today
  const todayStr = new Date().toISOString().split('T')[0];
  const todayPracticedCount = words.filter((w) => {
    if (!w.lastSeen) return false;
    const lDateStr = new Date(w.lastSeen).toISOString().split('T')[0];
    return lDateStr === todayStr;
  }).length;

  const todayGoal = 10;
  const goalPercent = Math.min(100, Math.round((todayPracticedCount / todayGoal) * 100));

  const allowedCategories = ['Beginner', 'Intermediate', 'Hard'];

  const introducedWords = words.filter(w => w.introduced);
  const avgRecall = introducedWords.length > 0 
    ? introducedWords.reduce((sum, w) => sum + w.p, 0) / introducedWords.length 
    : 1.0;
  
  // Strict check: if below 0.6, pace to 0.7 
  // (we assume if it's below 0.7 we should consolidate, because we don't have persistent hysteresis state in this file)
  const isConsolidating = avgRecall < 0.7 && introducedWords.length > 5;

  // Decaying words
  const decayingWords = words.filter((w) => w.introduced && w.p < 0.5 && allowedCategories.includes(w.difficulty));
  decayingWords.sort((a, b) => a.p - b.p);

  // Next word to introduce: un-introduced words in unlocked tiers
  const unintroducedWords = words.filter(
    (w) => !w.introduced && allowedCategories.includes(w.difficulty)
  );

  // Sort by frequency
  unintroducedWords.sort((a, b) => a.frequency - b.frequency);

  let activeWord = null;
  let isReviewMode = false;

  if (decayingWords.length > 0) {
    activeWord = decayingWords[0];
    isReviewMode = true;
  } else if (!isConsolidating && unintroducedWords.length > 0) {
    activeWord = unintroducedWords[0];
    isReviewMode = false;
  }

  const handleGotIt = () => {
    if (!activeWord) return;
    setIsFlipped(false);
    
    // Animate mascot and confetti
    setMascotState('correct');
    setShowConfetti(true);
    
    // Increment stats in LocalStorage
    if (isReviewMode) {
      registerAnswer(activeWord.id, true);
    } else {
      introduceWordFromLearn(activeWord.id, true);
    }

    setTimeout(() => {
      setMascotState('idle');
      setShowConfetti(false);
    }, 1200);
  };

  // Gender visual styles
  const getGenderStyles = (gender: 'der' | 'die' | 'das' | '') => {
    switch (gender) {
      case 'der':
        return { text: 'der', bg: 'bg-[#5B7FA6]/10 text-[#5B7FA6] border-[#5B7FA6]/30' };
      case 'die':
        return { text: 'die', bg: 'bg-[#B05C5C]/10 text-[#B05C5C] border-[#B05C5C]/30' };
      case 'das':
        return { text: 'das', bg: 'bg-[#6B9E78]/10 text-[#6B9E78] border-[#6B9E78]/30' };
      default:
        return null;
    }
  };

  const genderBadge = activeWord ? getGenderStyles(activeWord.gender) : null;

  // Let's count totals
  const totalCompletedCount = words.filter((w) => w.introduced).length;

  return (
    <div id="home-tab-view" className="space-y-6 max-w-xl mx-auto py-2">
      <Confetti trigger={showConfetti} />

      {/* Mascot welcome card */}
      <div id="welcome-mascot-card" className="bg-white rounded-3xl p-5 border-4 border-[#F0F0F0] shadow-sm flex items-center space-x-4">
        <Mascot state={!activeWord ? 'static' : mascotState} size={88} />
        <div>
          <h2 className="font-sans font-black text-xl text-[#1A1A1A] tracking-tight">
            Willkommen bei Wortschatz! 🇩🇪
          </h2>
          <p className="text-slate-500 text-sm mt-1 leading-relaxed">
            {isConsolidating 
              ? "Consolidating your memory before introducing new words."
              : isReviewMode
                ? "Let's review some words you're forgetting before moving on."
                : activeWord 
                  ? `Let's practice the essential 200 German words! Currently learning ${activeWord.difficulty} tier.`
                  : "Excellent! You've introduced all currently unlocked German words! Transition to the Practice tab to cement them."
            }
          </p>
        </div>
      </div>

      {/* Today's Goal Tracker Widget */}
      <div id="daily-goal-banner" className="bg-[#2A2A2A] rounded-3xl p-5 border-4 border-[#2A2A2A] shadow-sm flex flex-col space-y-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 bg-white/10 text-[#FFCE00] border-2 border-white/10 rounded-2xl">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-black text-white text-base leading-none">Daily Goal</h3>
            <p className="text-sm text-slate-400 mt-1">
              {todayPracticedCount} / {todayGoal} words practiced today
            </p>
          </div>
        </div>
        
        {/* Horizontal Progress Bar */}
        <div className="relative w-full h-[28px] bg-[rgba(255,255,255,0.15)] rounded-full overflow-hidden text-xs font-black">
          <div className="absolute inset-0 flex items-center justify-center text-white z-0">
            {goalPercent}%
          </div>
          <div
            className="absolute inset-0 z-10 transition-all duration-500 ease-out"
            style={{ clipPath: `inset(0 ${100 - goalPercent}% 0 0)` }}
          >
            <div className="w-full h-[28px] bg-[#E6B800] flex items-center justify-center text-[#2A2A2A]">
              {goalPercent}%
            </div>
          </div>
        </div>
      </div>

      {/* German Article Guide Legend */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 border-4 border-[#F0F0F0] shadow-sm flex flex-col space-y-3">
        <h3 className="font-black text-[#1A1A1A] text-sm uppercase tracking-wide">German Article Guide</h3>
        <div className="flex items-center flex-wrap gap-y-2">
          <div className="flex items-center space-x-2 mr-4">
            <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-xl border-2 bg-[#5B7FA6]/10 text-[#5B7FA6] border-[#5B7FA6]/30">der</span>
            <span className="text-xs font-bold text-slate-500">Masculine nouns</span>
          </div>
          <div className="flex items-center space-x-2 mr-4">
            <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-xl border-2 bg-[#B05C5C]/10 text-[#B05C5C] border-[#B05C5C]/30">die</span>
            <span className="text-xs font-bold text-slate-500">Feminine & all plurals</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-xl border-2 bg-[#6B9E78]/10 text-[#6B9E78] border-[#6B9E78]/30">das</span>
            <span className="text-xs font-bold text-slate-500">Neuter nouns</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 font-bold leading-relaxed pt-1">
          Tip: Learning the article with the word is essential — gender must be memorized, not guessed!
        </p>
      </div>

      {/* Progression Bar showing words introduced */}
      <div id="words-intro-progbar-container" className="space-y-2">
        <div className="flex justify-between text-xs text-slate-500 font-black uppercase tracking-wide">
          <span>Introduced Vocabulary</span>
          <span className="text-[#1A1A1A]">{totalCompletedCount} / 200 words</span>
        </div>
        <div className="h-4 bg-[#F0F0F0] rounded-full overflow-hidden border-2 border-[#1A1A1A] shadow-xs">
          <div
            className="h-full bg-[#FFCE00] transition-all duration-500 ease-out"
            style={{ width: `${(totalCompletedCount / 200) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard Area */}
      <div id="flashcard-section" className="flex flex-col items-center">
        {activeWord ? (
          <div className="w-full">
            <div className="text-center text-xs text-slate-400 font-extrabold mb-3 uppercase tracking-wider">
              Tap the card below to flip and reveal translation!
            </div>

            {/* Custom 3D CSS Card Container */}
            <div
              id="flipper-container"
              className="relative w-full h-80 cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div
                className="w-full h-full relative duration-500 transition-all"
                style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              >
                {/* --- CARD FRONT --- */}
                <div
                  className="absolute inset-0 w-full h-full bg-white border-4 border-[#1A1A1A] border-b-8 border-[#FFCE00] rounded-3xl shadow-md p-6 flex flex-col justify-between"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="flex justify-between">
                    <span className="text-[10px] uppercase font-black tracking-widest bg-amber-50 text-[#FFCE00] border-2 border-[#FFCE00] px-2.5 py-1 rounded-xl">
                      {activeWord.difficulty}
                    </span>
                    <div className="flex space-x-2">
                      {genderBadge && (
                        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-xl border-2 ${genderBadge.bg}`}>
                          {genderBadge.text}
                        </span>
                      )}
                      {activeWord.partOfSpeech === 'verb' && (
                        <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded-xl border-2 border-purple-300 bg-purple-100 text-purple-800">
                          verb
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center my-auto">
                    <p className="font-sans font-black text-4xl text-[#1A1A1A] text-center tracking-tight leading-none mb-2">
                      {activeWord.word}
                    </p>
                    <span className="text-slate-400 text-xs font-mono mt-2 flex items-center font-bold">
                      🔊 click to flip
                    </span>

                  </div>

                  <div className="text-center text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
                    Wortschatz Learning Card
                  </div>
                </div>

                {/* --- CARD BACK --- */}
                <div
                  className="absolute inset-0 w-full h-full bg-white border-4 border-[#1A1A1A] border-b-8 border-[#DD0000] rounded-3xl shadow-md p-6 flex flex-col justify-between"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="flex justify-between">
                    <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full border ${isReviewMode ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'}`}>
                      {isReviewMode ? 'Review — You are forgetting this!' : 'Answer'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">
                      Translation / Tip
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center text-center my-auto space-y-3">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">English</span>
                      <p className="font-sans font-black text-2xl text-slate-800 tracking-tight leading-none">
                        {activeWord.translation}
                      </p>
                    </div>

                    <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-left">
                      <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Example Sentence</span>
                      <p className="text-slate-800 font-bold text-sm mt-0.5 bubble">
                        {activeWord.example}
                      </p>
                      <p className="text-slate-500 text-xs italic mt-0.5">
                        {activeWord.exampleTranslation}
                      </p>
                    </div>

                    <div className="text-left w-full">
                      <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Pronunciation</span>
                      <p className="text-slate-600 text-xs mt-0.5 leading-relaxed font-mono">
                        {activeWord.pronunciation}
                      </p>
                    </div>
                  </div>

                  <div className="text-center text-xs text-emerald-500 font-extrabold">
                    Flipped to back
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div id="flashcard-actions" className="flex w-full mt-6">
              <button
                id="btn-flashcard-gotit"
                onClick={handleGotIt}
                className="w-full py-4 px-5 bg-[#FFCE00] hover:bg-[#FFE066] active:bg-[#D9AF00] text-[#1A1A1A] border-4 border-[#1A1A1A] rounded-2xl font-black shadow-[0_4px_0_#1A1A1A] active:shadow-none active:translate-y-[4px] uppercase tracking-wider text-xs cursor-pointer transition-all duration-75 text-center flex items-center justify-center space-x-1.5 font-bold"
              >
                <span>Got it!</span>
                <Check className="w-5 h-5 stroke-[3px]" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white border-4 border-b-8 border-[#F0F0F0] rounded-3xl p-8 flex flex-col items-center text-center space-y-4 shadow-sm w-full">
            <Mascot state="static" size={140} />
            <h3 className="font-sans font-black text-2xl text-[#1A1A1A]">
              {isConsolidating ? 'Time to Practice! 🧠' : 'Wunderbar! 🇩🇪🎉'}
            </h3>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
              {isConsolidating
                ? 'Your average recall has dropped below optimal levels. Go to the Practice Tab to consolidate your memory before learning new words!'
                : 'All 200 words have been fully introduced! Go to the Practice Tab to review your knowledge base and keep your recall high!'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
