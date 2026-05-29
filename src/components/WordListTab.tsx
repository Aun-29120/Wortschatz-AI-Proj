import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Word, WordProgress } from '../types';
import { ChevronDown, ChevronUp, Clock, BarChart3, HelpCircle, CheckCircle2, Play, Sparkles } from 'lucide-react';

interface WordListTabProps {
  words: (Word & WordProgress & { p: number })[];
  registerAnswer: (wordId: string, isCorrect: boolean) => void;
}

import { isValidDistractor } from '../mcqUtils';

export function WordListTab({ words, registerAnswer }: WordListTabProps) {
  const [expandedTiers, setExpandedTiers] = useState<Record<string, boolean>>({
    Beginner: true,
    Intermediate: false,
    Hard: false,
  });

  const [selectedWord, setSelectedWord] = useState<(Word & WordProgress & { p: number }) | null>(null);
  
  // Single Word Micro Practice state inside modal
  const [microPracticeState, setMicroPracticeState] = useState<{
    isActive: boolean;
    options: string[];
    isAnswered: boolean;
    selected: string | null;
    isCorrect: boolean | null;
  }>({
    isActive: false,
    options: [],
    isAnswered: false,
    selected: null,
    isCorrect: null,
  });

  const toggleTier = (tier: string) => {
    setExpandedTiers((prev) => ({
      ...prev,
      [tier]: !prev[tier],
    }));
  };

  // Convert hours to human scale text
  const formatHalfLifeHuman = (hours: number): string => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} mins`;
    }
    if (hours < 24) {
      return `${hours.toFixed(1)} hours`;
    }
    const days = (hours / 24).toFixed(1);
    return `${days} days`;
  };

  // Build metrics for headers
  const getTierMetrics = (tierName: 'Beginner' | 'Intermediate' | 'Hard') => {
    const tierWords = words.filter((w) => w.difficulty === tierName);
    const totalCount = tierWords.length;
    const introducedWords = tierWords.filter((w) => w.introduced);
    
    // Average recall calculation (0 for non-introduced)
    const sumRecall = tierWords.reduce((acc, w) => acc + (w.introduced ? w.p : 0), 0);
    const avgRecall = totalCount > 0 ? (sumRecall / totalCount) * 100 : 0;

    // Mastery count (introduced and halfLife > 48)
    const masteredCount = tierWords.filter((w) => w.introduced && w.halfLife > 48).length;
    const masteryPercentage = totalCount > 0 ? (masteredCount / totalCount) * 100 : 0;

    return {
      totalCount,
      introducedCount: introducedWords.length,
      avgRecall: Math.round(avgRecall),
      masteredCount,
      masteryPercentage: Math.round(masteryPercentage),
    };
  };

  // Open modal and initialize HLR single-question practice on demand
  const openWordDetails = (word: Word & WordProgress & { p: number }) => {
    setSelectedWord(word);
    setMicroPracticeState({
      isActive: false,
      options: [],
      isAnswered: false,
      selected: null,
      isCorrect: null,
    });
  };

  const startMicroPractice = (word: Word & WordProgress & { p: number }) => {
    const correctAns = word.translation;
    const pool = words
      .filter((w) => isValidDistractor(word, w))
      .map((w) => w.translation);
    const shuffledPool = pool.sort(() => 0.5 - Math.random());
    const wrongPicked = Array.from(new Set(shuffledPool)).slice(0, 3);
    const finalOptions = [correctAns, ...wrongPicked].sort(() => 0.5 - Math.random());

    setMicroPracticeState({
      isActive: true,
      options: finalOptions,
      isAnswered: false,
      selected: null,
      isCorrect: null,
    });
  };

  const submitMicroAnswer = (option: string) => {
    if (!selectedWord || microPracticeState.isAnswered) return;
    const isCorrect = option === selectedWord.translation;

    setMicroPracticeState((prev) => ({
      ...prev,
      isAnswered: true,
      selected: option,
      isCorrect,
    }));

    registerAnswer(selectedWord.id, isCorrect);
    
    // Update local modal data slightly to sync immediately
    setSelectedWord((prev) => {
      if (!prev) return null;
      // approximate next step
      const updatedCorrect = isCorrect ? prev.correct + 1 : prev.correct;
      const updatedWrong = !isCorrect ? prev.wrong + 1 : prev.wrong;
      return {
        ...prev,
        correct: updatedCorrect,
        wrong: updatedWrong,
        lastSeen: Date.now(),
        introduced: true,
      };
    });
  };

  // Render tiny SVG pie icon showing category mastery
  const MiniPieIcon = ({ percent }: { percent: number }) => {
    const radius = 8;
    const circ = 2 * Math.PI * radius;
    const strokeDashoffset = circ - (percent / 100) * circ;
    return (
      <svg className="w-5 h-5 transform -rotate-90 text-slate-200" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r={radius} stroke="currentColor" strokeWidth="2.5" fill="none" />
        <circle
          cx="10"
          cy="10"
          r={radius}
          stroke="#00C853" // Green for mastered proportion
          strokeWidth="2.5"
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
    );
  };

  // Helper to choose recall color bounds
  const getRecallColor = (p: number, introduced: boolean) => {
    if (!introduced) return { bar: 'bg-slate-200', text: 'text-slate-400', label: 'Unseen' };
    if (p < 0.3) return { bar: 'bg-red-500', text: 'text-red-600', label: 'Critical' };
    if (p < 0.7) return { bar: 'bg-amber-400', text: 'text-amber-600', label: 'Decaying' };
    return { bar: 'bg-emerald-500', text: 'text-emerald-500', label: 'Strong' };
  };

  // Draw the coordinates profile for custom SVG memory breakdown
  const buildSVGDecayCurvePoints = (halfLife: number) => {
    // Generate exponential decay points for graph: Y = 100 * 2^(-X / h)
    // Map X (hours from 0 to 120 hrs) to coordinates (30 to 280 px)
    // Map Y (recall from 100% to 0%) to coordinates (20 to 120 px)
    const points: { px: number; py: number; hours: number; pVal: number }[] = [];
    const maxHourOffset = Math.max(72, halfLife * 3); // plot scale bound
    
    for (let hOff = 0; hOff <= maxHourOffset; hOff += maxHourOffset / 30) {
      const pVal = Math.pow(2, -hOff / halfLife);
      const px = 40 + (hOff / maxHourOffset) * 230;
      const py = 120 - pVal * 90;
      points.push({ px, py, hours: hOff, pVal });
    }
    return { points, maxHourOffset };
  };

  return (
    <div id="wordlist-tab-view" className="space-y-4 max-w-xl mx-auto py-2">
      <div id="wordlist-header" className="bg-white rounded-3xl p-5 border-4 border-[#F0F0F0] shadow-sm">
        <h2 className="font-sans font-black text-xl text-[#1A1A1A] flex items-center space-x-2">
          <span>Wortschatz Vokabular 📚</span>
        </h2>
        <p className="text-xs text-[#777] mt-2 leading-relaxed font-semibold">
          Review all 200 words organized by complexity. Tap any card below to launch the Inspector and check its exponential recall decay curve.
        </p>
      </div>

      {['Beginner', 'Intermediate', 'Hard'].map((tier) => {
        const metrics = getTierMetrics(tier as 'Beginner' | 'Intermediate' | 'Hard');
        const isOpen = expandedTiers[tier];
        const tierWords = words.filter((w) => w.difficulty === tier);

        return (
          <div key={tier} className="bg-white border-4 border-[#F0F0F0] rounded-3xl overflow-hidden shadow-xs">
            {/* Accordion Trigger Header */}
            <button
              onClick={() => toggleTier(tier)}
              className="w-full flex items-center justify-between p-4 bg-[#F7F7F7] hover:bg-[#F0F0F0] focus:outline-none cursor-pointer"
            >
              <div className="flex items-center space-x-3.5 text-left">
                <MiniPieIcon percent={metrics.masteryPercentage} />
                <div>
                  <h3 className="font-black text-[#1A1A1A] text-base flex items-center space-x-2">
                    <span>
                      {tier === 'Beginner' ? '🟢 Beginner' : tier === 'Intermediate' ? '🟡 Intermediate' : '🔴 Hard'}
                    </span>
                    <span className="text-xs text-slate-400 font-extrabold">({metrics.totalCount} words)</span>
                  </h3>
                  
                  {/* Category Recall Metrics row */}
                  <div className="flex items-center space-x-3 text-[10px] text-slate-500 mt-1 uppercase tracking-wide font-black">
                    <span>Introduced: <b className="text-[#1A1A1A]">{metrics.introducedCount}</b></span>
                    <span>•</span>
                    <span>Recall: <b className="text-[#1A1A1A]">{metrics.avgRecall}%</b></span>
                    <span>•</span>
                    <span>Mastered: <b className="text-[#34D399]">{metrics.masteredCount}</b></span>
                  </div>
                </div>
              </div>

              {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400 stroke-[3]" /> : <ChevronDown className="w-5 h-5 text-slate-400 stroke-[3]" />}
            </button>

            {/* Accordion Content Grid */}
            {isOpen && (
              <div className="p-4 border-t-2 border-[#F0F0F0] bg-white">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  {tierWords.map((wordObj) => {
                    const colorScheme = getRecallColor(wordObj.p, wordObj.introduced);
                    
                    // Pulse border if introduced and probability < 0.3
                    const needsCriticalReview = wordObj.introduced && wordObj.p < 0.3;

                    return (
                      <div
                        key={wordObj.id}
                        onClick={() => openWordDetails(wordObj)}
                        className={`relative cursor-pointer p-4 rounded-2xl border-2 flex flex-col justify-between h-32 transition-all hover:translate-y-[-2px] hover:shadow-sm ${
                          needsCriticalReview
                            ? 'border-[#DD0000] bg-red-50/10 animate-pulse'
                            : 'border-slate-200 bg-white hover:border-[#FFCE00]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            {wordObj.gender && (
                              <span className="text-[9px] uppercase font-black text-slate-400 leading-none">
                                {wordObj.gender}
                              </span>
                            )}
                            {wordObj.partOfSpeech === 'verb' && (
                              <span className="text-[9px] uppercase font-black text-purple-400 leading-none">
                                verb
                              </span>
                            )}
                            {needsCriticalReview && (
                              <span className="h-2.5 w-2.5 bg-[#DD0000] rounded-full shrink-0" />
                            )}
                          </div>

                          <p className="font-sans font-black text-base text-[#1A1A1A] mt-1.5 leading-tight tracking-tight">
                            {wordObj.word}
                          </p>
                          <p className="text-slate-500 text-xs mt-0.5 font-bold tracking-tight line-clamp-1 capitalize">
                            {wordObj.translation}
                          </p>
                        </div>

                        {/* Bottom recall indicator banner */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-[9px] font-black uppercase text-slate-400 leading-none tracking-wide">
                            <span>{colorScheme.label}</span>
                            <span>{wordObj.introduced ? `${Math.round(wordObj.p * 100)}%` : '—'}</span>
                          </div>
                          <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                            <div
                              className={`h-full ${colorScheme.bar}`}
                              style={{ width: `${wordObj.introduced ? wordObj.p * 100 : 0}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* --- SLIDE-UP DETAIL MODAL --- */}
      <AnimatePresence>
        {selectedWord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWord(null)}
            className="fixed inset-0 bg-[#1A1A1A]/40 z-50 flex items-end justify-center backdrop-blur-xs p-4"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl max-w-lg w-full p-6 shadow-2xl border-4 border-b-0 border-[#1A1A1A] relative max-h-[90vh] overflow-y-auto space-y-5"
            >
              {/* Close toggle */}
              <button
                onClick={() => setSelectedWord(null)}
                className="absolute right-4 top-4 hover:bg-[#F0F0F0] cursor-pointer text-[#1A1A1A] font-black p-2 bg-[#F7F7F7] rounded-xl border-2 border-[#1A1A1A] leading-none"
              >
                ✕
              </button>

              {/* Title Section */}
              <div className="text-center space-y-1">
                <div className="flex justify-center items-center space-x-2">
                  <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded-xl bg-[#F7F7F7] text-[#1A1A1A] border-2 border-[#1A1A1A]">
                    {selectedWord.difficulty}
                  </span>
                  {selectedWord.gender && (
                    <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-xl border-2 ${
                      selectedWord.gender === 'der' ? 'bg-[#5B7FA6]/10 text-[#5B7FA6] border-[#5B7FA6]/30' :
                      selectedWord.gender === 'die' ? 'bg-[#B05C5C]/10 text-[#B05C5C] border-[#B05C5C]/30' :
                      'bg-[#6B9E78]/10 text-[#6B9E78] border-[#6B9E78]/30'
                    }`}>
                      {selectedWord.gender}
                    </span>
                  )}
                  {selectedWord.partOfSpeech === 'verb' && (
                    <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded-xl border-2 border-[#1A1A1A] bg-purple-100 text-purple-800">
                      verb
                    </span>
                  )}
                </div>
                <h1 className="font-sans font-black text-3xl text-[#1A1A1A] tracking-tight">
                  {selectedWord.word}
                </h1>
                <p className="text-slate-500 font-extrabold capitalize text-base">
                  {selectedWord.translation}
                </p>
              </div>

              {/* Memory Decay Curve Plot */}
              <div className="bg-[#F7F7F7] border-2 border-[#F0F0F0] p-4 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#DD0000]" />
                    <span>Memory Decay Curve (HLR Model)</span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-bold italic">p = 2^(-Δt/h)</span>
                </div>

                {/* Draw SVG curve */}
                {(() => {
                  const { points, maxHourOffset } = buildSVGDecayCurvePoints(selectedWord.halfLife);
                  // Construct line path string
                  const pathD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'}${p.px},${p.py}`).join(' ');

                  // Interpolate coordinate node at "now"
                  const nowDeltaMs = selectedWord.lastSeen ? Date.now() - selectedWord.lastSeen : 0;
                  const nowDeltaHours = selectedWord.lastSeen ? nowDeltaMs / (1000 * 60 * 60) : 0;
                  const nowFraction = Math.min(1, nowDeltaHours / maxHourOffset);
                  
                  // Coordinate of "now"
                  const nowPx = 40 + nowFraction * 230;
                  const nowPy = 120 - selectedWord.p * 90;

                  return (
                    <div className="relative">
                      <svg className="w-full h-36 overflow-visible" viewBox="0 0 300 140">
                        {/* Shaded Grid Zones in back (Green - Amber - Red bounds) */}
                        <rect x="35" y="20" width="250" height="27" fill="#DCFCE7" fillOpacity="0.8" />
                        <rect x="35" y="47" width="250" height="27" fill="#FEF9C3" fillOpacity="0.8" />
                        <rect x="35" y="74" width="250" height="46" fill="#FEE2E2" fillOpacity="0.8" />

                        {/* Outer axes */}
                        <line x1="39" y1="20" x2="39" y2="120" stroke="#CBD5E1" strokeWidth="1.5" />
                        <line x1="39" y1="120" x2="285" y2="120" stroke="#CBD5E1" strokeWidth="1.5" />

                        {/* Y axis Grid bounds label */}
                        <text x="12" y="24" className="text-[9px] fill-[#166534] font-black" textAnchor="start">100%</text>
                        <text x="12" y="51" className="text-[9px] fill-amber-700 font-black" textAnchor="start">70%</text>
                        <text x="12" y="78" className="text-[9px] fill-[#991B1B] font-black" textAnchor="start">40%</text>
                        <text x="12" y="122" className="text-[9px] fill-slate-400 stroke-[0.1]" textAnchor="start">0%</text>

                        {/* Actual decay curve path drawn */}
                        <path d={pathD} fill="none" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
                        
                        {/* Project dotted projection if delta isn't maxed out */}
                        {selectedWord.introduced && (
                          <line x1={nowPx} y1={nowPy} x2="270" y2="115" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4,3" />
                        )}

                        {/* Glowing node at "Now" */}
                        {selectedWord.introduced ? (
                          <g>
                            <circle cx={nowPx} cy={nowPy} r="6" fill="#FFCE00" stroke="#1A1A1A" strokeWidth="2" />
                            <circle cx={nowPx} cy={nowPy} r="11" stroke="#FFCE00" strokeWidth="2" fill="none" className="animate-ping" style={{ transformOrigin: `${nowPx}px ${nowPy}px` }} />
                            <text x={nowPx} y={nowPy - 10} className="text-[9px] fill-[#1A1A1A] font-black" textAnchor="middle">NOW</text>
                          </g>
                        ) : (
                          <text x="160" y="70" className="text-[10px] fill-slate-400 font-black" textAnchor="middle">Not yet introduced</text>
                        )}

                        {/* X Axis Time ticks */}
                        <text x="40" y="132" className="text-[8px] fill-slate-400 font-semibold" textAnchor="start">Last Seen</text>
                        <text x="160" y="132" className="text-[8px] fill-slate-400 font-semibold" textAnchor="middle">Time Elapsed (Δt)</text>
                        <text x="270" y="132" className="text-[8px] fill-slate-400 font-semibold" textAnchor="end">{formatHalfLifeHuman(maxHourOffset)}</text>
                      </svg>
                      
                      {/* Decaying zone legends */}
                      <div className="flex items-center justify-between text-[9px] font-black uppercase mt-2 px-3">
                        <span className="text-[#166534]">🟢 Strong Zone (&gt;70%)</span>
                        <span className="text-[#B45309]">🟡 Decaying (40%-70%)</span>
                        <span className="text-[#991B1B]">🔴 Critical (&lt;40%)</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Example Context & Pronunciation voice details */}
              <div className="space-y-3">
                <div className="bg-[#F7F7F7] border-2 border-[#F0F0F0] p-4 rounded-2xl">
                  <span className="text-[10px] font-black text-[#DD0000] uppercase tracking-widest leading-none">Example Context</span>
                  <p className="font-extrabold text-[#1A1A1A] text-sm mt-1">{selectedWord.example}</p>
                  <p className="text-xs text-slate-500 italic mt-1 font-semibold">{selectedWord.exampleTranslation}</p>
                </div>

                <div className="bg-[#F7F7F7] border-2 border-[#F0F0F0] p-4 rounded-2xl font-mono text-xs text-[#1A1A1A] font-bold">
                  <span className="text-[10px] font-black text-[#FFCE00] uppercase tracking-widest block font-sans mb-1">Pronunciation Vocals</span>
                  🎤 {selectedWord.pronunciation}
                </div>
              </div>

              {/* Memory stats table container */}
              <div className="bg-white border-2 border-[#F0F0F0] rounded-2xl p-4 grid grid-cols-4 gap-2 text-center">
                <div>
                  <div className="text-[8px] uppercase font-black text-slate-400 leading-none">Practiced</div>
                  <div className="text-sm font-black text-[#1A1A1A] mt-1">{selectedWord.correct + selectedWord.wrong}</div>
                </div>
                <div>
                  <div className="text-[8px] uppercase font-black text-slate-400 leading-none">Correct</div>
                  <div className="text-sm font-black text-emerald-600 mt-1">{selectedWord.correct}</div>
                </div>
                <div>
                  <div className="text-[8px] uppercase font-black text-slate-400 leading-none">Wrong</div>
                  <div className="text-sm font-black text-[#DD0000] mt-1">{selectedWord.wrong}</div>
                </div>
                <div>
                  <div className="text-[8px] uppercase font-black text-slate-400 leading-none">First Seen</div>
                  <div className="text-[9px] font-black text-slate-700 leading-tight mt-1 uppercase">
                    {new Date(selectedWord.firstSeen).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Half life Pill callout */}
              <div className="flex items-center justify-between py-3 px-4 rounded-2xl border-2 bg-[#F7F7F7] border-[#F0F0F0]">
                <span className="text-xs font-black text-slate-600 flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-[#FFCE00]" />
                  <span>HLR Memory half-life:</span>
                </span>
                <span className={`text-xs font-black px-3 py-1 rounded-xl border border-[#1A1A1A] ${
                  selectedWord.halfLife >= 48 
                    ? 'bg-[#34D399] text-[#1A1A1A] animate-pulse'
                    : selectedWord.halfLife <= 4
                    ? 'bg-[#EF4444] text-white'
                    : 'bg-[#FFCE00] text-[#1A1A1A]'
                }`}>
                  {formatHalfLifeHuman(selectedWord.halfLife)}
                </span>
              </div>

              {/* --- INTEGRATED SINGLE WORD REVIEW PRACTICE PANEL --- */}
              <div className="border border-dashed border-slate-300 bg-amber-50/15 p-4 rounded-2xl space-y-3">
                {!microPracticeState.isActive ? (
                  <button
                    onClick={() => startMicroPractice(selectedWord)}
                    className="w-full bg-[#FFCE00] hover:bg-[#FFE066] active:bg-[#D9AF00] text-[#1A1A1A] border-4 border-[#1A1A1A] py-3.5 rounded-2xl font-black shadow-[0_4px_0_#1A1A1A] active:shadow-none active:translate-y-[4px] transition-all text-xs flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider"
                  >
                    <Play className="w-4 h-4 fill-current text-[#1A1A1A]" />
                    <span>Practice This Word Now</span>
                  </button>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs text-amber-850 font-black text-center uppercase tracking-widest font-sans leading-none">
                      Quick MCQ Review
                    </p>
                    <p className="text-sm text-slate-700 font-bold text-center">
                      What translates to <span className="font-black text-[#1A1A1A] border-b-2 border-amber-400 font-sans">"{selectedWord.word}"</span>?
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {microPracticeState.options.map((opt, id) => {
                        const isSelected = microPracticeState.selected === opt;
                        const isTrue = opt === selectedWord.translation;

                        let style = 'bg-white border-2 border-slate-200 text-slate-700';
                        if (microPracticeState.isAnswered) {
                          if (isTrue) {
                            style = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-800 font-black';
                          } else if (isSelected) {
                            style = 'bg-red-50 border-2 border-[#DD0000] text-[#DD0000] font-black';
                          } else {
                            style = 'bg-slate-50 text-slate-300 opacity-45';
                          }
                        }

                        return (
                          <button
                            key={id}
                            disabled={microPracticeState.isAnswered}
                            onClick={() => submitMicroAnswer(opt)}
                            className={`p-3 text-xs rounded-xl font-bold text-center cursor-pointer border-b-4 hover:border-amber-400 ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {microPracticeState.isAnswered && (
                      <div className="text-center pt-2 animate-fade-in">
                        <p className={`text-xs font-black uppercase tracking-wide ${microPracticeState.isCorrect ? 'text-emerald-600' : 'text-[#DD0000]'}`}>
                          {microPracticeState.isCorrect ? '✓ Super! Correct response.' : `✗ Incorrect. Answer is: "${selectedWord.translation}"`}
                        </p>
                        <button
                          onClick={() => {
                            setMicroPracticeState({
                              isActive: false,
                              options: [],
                              isAnswered: false,
                              selected: null,
                              isCorrect: null,
                            });
                          }}
                          className="text-[10px] font-black tracking-wider uppercase text-slate-400 underline mt-2 block mx-auto hover:text-slate-600 cursor-pointer"
                        >
                          Reset Review
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
