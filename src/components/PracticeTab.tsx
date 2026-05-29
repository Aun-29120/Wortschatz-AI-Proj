import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Word, WordProgress } from '../types';
import { Mascot } from './Mascot';
import { Confetti } from './Confetti';
import { Heart, Flame, Sparkles, Check, X, AlertCircle, ArrowRight } from 'lucide-react';
import { isValidDistractor } from '../mcqUtils';

interface PracticeTabProps {
  words: (Word & WordProgress & { p: number })[];
  registerAnswer: (wordId: string, isCorrect: boolean) => void;
}

export function PracticeTab({ words, registerAnswer }: PracticeTabProps) {
  // Gamification Session state
  const [hearts, setHearts] = useState(5);
  const [sessionXP, setSessionXP] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  // Active question State
  const [activeWord, setActiveWord] = useState<(Word & WordProgress & { p: number }) | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [lastCorrectState, setLastCorrectState] = useState<boolean | null>(null);

  // Layout Animation feedback
  const [mascotState, setMascotState] = useState<'idle' | 'correct' | 'wrong' | 'dance'>('idle');
  const [showConfetti, setShowConfetti] = useState(false);
  const [shakeCard, setShakeCard] = useState(false);
  const [floatingXP, setFloatingXP] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Count words which are below 0.7 recall
  const wordsNeedingReview = words.filter((w) => w.p < 0.7);
  const totalReviewCount = wordsNeedingReview.length;

  // Track state of current streak
  const activeStreak = words.find((w) => w.introduced)?.correct ? words[0]?.correct : 0; // fallback arbitrary
  // Let's grab streak directly from first word or let context pass streak to us

  // HLR Question Selection logic
  const selectNextQuestion = () => {
    // Sort words by lowest recall probability p, then by difficulty (Beginner first)
    const candidates = [...words];
    candidates.sort((a, b) => {
      const pA = Math.round(a.p * 100) / 100;
      const pB = Math.round(b.p * 100) / 100;
      if (pA !== pB) {
        return pA - pB; // lowest recall first
      }
      const tierMap: Record<string, number> = { Beginner: 1, Intermediate: 2, Hard: 3 };
      return tierMap[a.difficulty] - tierMap[b.difficulty];
    });

    // Take the best candidate
    const chosen = candidates[0];
    if (!chosen) return;

    setActiveWord(chosen);
    setSelectedOption(null);
    setIsAnswered(false);
    setLastCorrectState(null);
    setShakeCard(false);
    setMascotState('idle');
    setShowToast(false);

    // Generate 4 MCQ options (including correct answer)
    const correctTrans = chosen.translation;
    const incorrectCandidates = words
      .filter((w) => isValidDistractor(chosen, w))
      .map((w) => w.translation);

    // Shuffle and pick 3 unique incorrect answers
    const shuffledIncorrect = incorrectCandidates.sort(() => 0.5 - Math.random());
    const pickedIncorrect = Array.from(new Set(shuffledIncorrect)).slice(0, 3);

    // Combine and shuffle MCQ pool
    const mcqPool = [correctTrans, ...pickedIncorrect].sort(() => 0.5 - Math.random());
    setOptions(mcqPool);
  };

  // Run on initial load and when questionIndex/words syncs
  useEffect(() => {
    if (!activeWord && words.length > 0) {
      selectNextQuestion();
    }
  }, [words, questionIndex]);

  const handleOptionClick = (optionSelected: string) => {
    if (isAnswered || hearts <= 0) return;

    setSelectedOption(optionSelected);
    setIsAnswered(true);

    const isCorrect = optionSelected === activeWord?.translation;
    setLastCorrectState(isCorrect);

    if (isCorrect) {
      setMascotState('correct');
      setShowConfetti(true);
      setFloatingXP(true);
      setSessionXP((prev) => prev + 10);
      registerAnswer(activeWord!.id, true);
    } else {
      setMascotState('wrong');
      setShakeCard(true);
      setHearts((prev) => Math.max(0, prev - 1));
      registerAnswer(activeWord!.id, false);
    }

    // Trigger educational HLR Toast
    setShowToast(true);

    // Auto-advance after 1.2 seconds if correct, or let user click "Next"
    // To make MCQ feels fast, auto-advance only on correct if desired, or let them digest
    setTimeout(() => {
      setFloatingXP(false);
      setShakeCard(false);
      setShowConfetti(false);
    }, 1200);
  };

  const handleNextQuestion = () => {
    setQuestionIndex((prev) => prev + 1);
    selectNextQuestion();
  };

  const handleRefillHeart = () => {
    setHearts(5);
    setQuestionIndex(0);
    setSessionXP(0);
    selectNextQuestion();
  };

  // Convert half-life from hours to human-friendly text
  const formatHalfLife = (hours: number): string => {
    if (hours < 1) {
      const mins = Math.round(hours * 60);
      return `${mins} minute${mins !== 1 ? 's' : ''}`;
    }
    if (hours < 24) {
      const h = hours.toFixed(1);
      return `${h} hours`;
    }
    const days = (hours / 24).toFixed(1);
    return `${days} days`;
  };

  // Find the most recent version of activeWord from the words prop to show updated stats
  const updatedActiveWord = activeWord ? words.find((w) => w.id === activeWord.id) || activeWord : null;

  return (
    <div id="practice-tab-view" className="space-y-6 max-w-xl mx-auto py-2 relative pb-28">
      <Confetti trigger={showConfetti} />

      {/* Spaced repetition queue header indicator */}
      <div id="review-health-widget" className="bg-white rounded-3xl p-5 border-4 border-[#F0F0F0] shadow-sm space-y-3">
        <div className="flex justify-between items-center text-xs font-black text-slate-500 uppercase tracking-wider">
          <span className="flex items-center space-x-1.5">
            <AlertCircle className="w-4 h-4 text-[#DD0000] stroke-[2.5]" />
            <span>Spaced-Repetition Review Queue</span>
          </span>
          <span className="text-[#DD0000] font-black uppercase tracking-wider">{totalReviewCount} words due</span>
        </div>
        
        {/* Memory status gradient bar */}
        <div className="h-4.5 bg-[#F0F0F0] rounded-full overflow-hidden relative border-2 border-[#1A1A1A] shadow-xs">
          <div
            className="h-full bg-gradient-to-r from-[#DD0000] via-[#FFCE00] to-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${Math.max(5, Math.min(100, (1 - totalReviewCount / 200) * 100))}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-[#1A1A1A] select-none uppercase tracking-widest leading-none">
            Queue Health: {Math.round((1 - totalReviewCount / 200) * 100)}% Clear
          </div>
        </div>
      </div>

      {/* Gamification Session indicators bar */}
      <div id="practice-session-bar" className="flex items-center justify-between px-4 bg-white py-3 rounded-2xl border-2 border-[#F0F0F0] shadow-sm">
        {/* Hearts row */}
        <div className="flex items-center space-x-2" id="hearts-indicator">
          {Array.from({ length: 5 }).map((_, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 1 }}
              animate={idx < hearts ? {} : { scale: [1, 1.4, 0.8, 0], opacity: 0 }}
              className="text-[#DD0000]"
            >
              <Heart
                className={`w-5 h-5 ${idx < hearts ? 'fill-current' : 'text-slate-200'}`}
              />
            </motion.div>
          ))}
          {hearts === 0 && <span className="text-xs font-black text-[#DD0000] tracking-wider uppercase ml-1 animate-pulse">Zero hearts!</span>}
        </div>

        {/* Floating XP tracker */}
        <div className="relative flex items-center bg-amber-50 rounded-full px-3 py-1 border-2 border-[#FFCE00] text-[#1A1A1A] font-black text-xs space-x-1 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 fill-current text-[#FFCE00]" />
          <span>XP: +{sessionXP}</span>
          
          <AnimatePresence>
            {floatingXP && (
              <motion.span
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -24, scale: 1.35 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55 }}
                className="absolute right-2 font-black text-lg text-emerald-500 drop-shadow-sm select-none"
              >
                +10 XP
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Core Question & Mascot Arena */}
      {hearts > 0 ? (
        activeWord ? (
          <div className="space-y-6">
            {/* Mascot interaction card */}
            <div className="flex justify-center items-center py-5 bg-[#F7F7F7] rounded-3xl border-4 border-[#F0F0F0] shadow-xs">
              <div className="flex flex-col items-center space-y-3">
                <Mascot state={mascotState} size={110} />
                <div className="bg-white border-2 border-slate-200 rounded-[20px] px-5 py-2 shadow-sm text-center max-w-xs relative">
                  <span className="text-[10px] text-[#DD0000] font-black uppercase tracking-widest">{activeWord.difficulty}</span>
                  <p className="text-xs text-slate-700 font-extrabold mt-0.5">Translate this German word to English:</p>
                </div>
              </div>
            </div>

            {/* Question card */}
            <motion.div
              animate={shakeCard ? { x: [-10, 10, -8, 8, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={`bg-white rounded-3xl p-8 border-4 border-b-8 shadow-sm text-center cursor-default transition-all ${
                isAnswered
                  ? lastCorrectState
                    ? 'border-[#34D399] bg-[#34D399]/10 text-emerald-900'
                    : 'border-[#DD0000] bg-[#DD0000]/10 text-[#DD0000]'
                  : 'border-[#1A1A1A]'
              }`}
            >
              <div className="flex justify-center items-center space-x-2 mb-3.5">
                {activeWord.gender && (
                  <span className={`inline-block text-[10px] font-black uppercase px-2.5 py-1 rounded-xl border-2 ${
                    activeWord.gender === 'der' ? 'bg-[#5B7FA6]/10 text-[#5B7FA6] border-[#5B7FA6]/30' :
                    activeWord.gender === 'die' ? 'bg-[#B05C5C]/10 text-[#B05C5C] border-[#B05C5C]/30' :
                    'bg-[#6B9E78]/10 text-[#6B9E78] border-[#6B9E78]/30'
                  }`}>
                    {activeWord.gender}
                  </span>
                )}
                {activeWord.partOfSpeech === 'verb' && (
                  <span className="inline-block text-[10px] font-black uppercase px-2.5 py-1 rounded-xl border-2 bg-purple-50 text-purple-700 border-purple-400">
                    verb
                  </span>
                )}
              </div>
              <h2 className="font-sans font-black text-4xl text-[#1A1A1A] tracking-tight leading-none">
                {activeWord.word}
              </h2>
              {/* Pronunciation tip shown when answered */}
              {isAnswered && (
                <p className="text-xs text-slate-500 font-mono mt-4 leading-tight font-black uppercase tracking-wide">
                  🔊 {activeWord.pronunciation}
                </p>
              )}
            </motion.div>

            {/* MCQ Option Grid */}
            <div id="mcq-options-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {options.map((option, idx) => {
                const isSelected = selectedOption === option;
                const isCorrectOption = option === activeWord.translation;
                
                let optionStyle = 'border-[#1A1A1A] border-b-6 hover:border-[#FFCE00] bg-white text-[#1A1A1A] shadow-xs';
                
                if (isAnswered) {
                  if (isCorrectOption) {
                    // Flash correct option with feedback
                    optionStyle = 'border-2 border-[#1A1A1A] bg-[#22C55E]/20 text-[#166534] font-black';
                  } else if (isSelected) {
                    // Flash faulty selection
                    optionStyle = 'border-2 border-[#1A1A1A] bg-[#EF4444]/20 text-[#991B1B] font-bold';
                  } else {
                    // Fade surrounding items
                    optionStyle = 'border-slate-100 border-b-2 bg-[#F7F7F7] text-slate-400 pointer-events-none opacity-40';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleOptionClick(option)}
                    className={`py-4 px-5 rounded-2xl font-black text-base transition-all duration-75 text-left flex items-center justify-between cursor-pointer ${optionStyle} ${
                      !isAnswered ? 'active:translate-y-[2px] active:border-b-4 hover:translate-y-[-1px]' : ''
                    }`}
                  >
                    <span>{option}</span>
                    <span className="flex items-center shrink-0">
                      {isAnswered && isCorrectOption && <Check className="w-5 h-5 text-emerald-600 stroke-[3px]" />}
                      {isAnswered && isSelected && !isCorrectOption && <X className="w-5 h-5 text-red-600 stroke-[3px]" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* HLR analytics bottom drawer slide up when answered */}
            <AnimatePresence>
              {showToast && activeWord && (
                <motion.div
                  initial={{ y: 110, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 110, opacity: 0 }}
                  onClick={() => handleNextQuestion()}
                  className={`fixed bottom-16 md:bottom-8 left-0 right-0 p-5 border-t-4 border-b-4 border-[#1A1A1A] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur-md z-40 cursor-pointer ${
                    lastCorrectState
                      ? 'bg-emerald-50/95 text-[#166534]'
                      : 'bg-red-50/95 text-[#991B1B]'
                  }`}
                >
                  <div className="max-w-xl mx-auto flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-xl border-2 border-[#1A1A1A] ${
                          lastCorrectState ? 'bg-[#34D399] text-[#1A1A1A]' : 'bg-[#EF4444] text-white'
                        }`}>
                          {lastCorrectState ? 'Richtig! Correct!' : 'Unrichtig! Wrong'}
                        </span>
                        <span className="text-xs text-slate-500 font-black uppercase tracking-wide">
                          Memory Decay Check
                        </span>
                      </div>
                      
                      <p className="text-sm font-black mt-2">
                        {!lastCorrectState && (
                          <span className="font-extrabold text-[#991B1B] block mb-1">
                            Correct answer: <span className="underline decoration-[#991B1B]">{updatedActiveWord?.translation}</span>
                          </span>
                        )}
                        Recall Probability: <span className="font-extrabold text-[#1A1A1A]">{( (updatedActiveWord?.p || 0) * 100).toFixed(0)}%</span> • 
                        Half-life decay: <span className="font-extrabold text-[#1A1A1A]">{formatHalfLife(updatedActiveWord?.halfLife || 1)}</span>
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold mt-1">
                        {lastCorrectState 
                          ? 'Wunderbar! This extends retention interval.' 
                          : 'Wrong answer shrinks half-life to schedule closer repeats.'}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextQuestion();
                      }}
                      className="p-3 bg-[#FFCE00] hover:bg-[#FFE066] duration-75 active:translate-y-[2px] rounded-2xl border-2 border-[#1A1A1A] shadow-xs text-slate-700 flex items-center justify-center cursor-pointer"
                    >
                      <ArrowRight className="w-5 h-5 text-[#1A1A1A] stroke-[3]" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty / Un-introduced loading state fallback */
          <div className="bg-white border-4 border-[#F0F0F0] rounded-3xl p-10 text-center space-y-4 shadow-sm flex flex-col items-center">
            <Mascot state="idle" size={100} />
            <p className="text-slate-500 font-black text-sm uppercase">Loading vocabulary database...</p>
          </div>
        )
      ) : (
        /* Take a break State (hearts depleted) */
        <div id="hearts-dry-break-card" className="bg-white border-4 border-b-8 border-[#1A1A1A] rounded-3xl p-8 text-center shadow-lg flex flex-col items-center space-y-5">
          <Mascot state="wrong" size={130} />
          
          <div className="space-y-1">
            <h3 className="font-sans font-black text-2xl text-[#1A1A1A]">
              Mach eine Pause! 😢🇩🇪
            </h3>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
              You ran out of hearts! Let's take a tiny breath, review the words inside your list overview, and start a fresh session when ready.
            </p>
          </div>

          <button
            id="btn-refill-hearts"
            onClick={handleRefillHeart}
            className="w-full bg-[#FFCE00] hover:bg-[#FFE066] active:bg-[#D9AF00] text-[#1A1A1A] py-4 px-6 rounded-2xl font-black shadow-[0_4px_0_#1A1A1A] active:shadow-none active:translate-y-[4px] transition-all text-center flex items-center justify-center space-x-1.5 uppercase text-xs tracking-wider cursor-pointer border-2 border-[#1A1A1A]"
          >
            <Heart className="w-4 h-4 fill-current mr-1" />
            <span>Refill Hearts & Retry</span>
          </button>
        </div>
      )}
    </div>
  );
}
