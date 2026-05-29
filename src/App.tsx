import { useState } from 'react';
import { useWortschatz } from './hooks/useWortschatz';
import { HomeTab } from './components/HomeTab';
import { PracticeTab } from './components/PracticeTab';
import { WordListTab } from './components/WordListTab';
import { AnalyticsTab } from './components/AnalyticsTab';
import { Mascot } from './components/Mascot';
import { 
  Home, 
  Swords, 
  BookOpen, 
  BarChart3, 
  Volume2, 
  VolumeX, 
  Flame, 
  Trophy, 
  Sparkles,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const {
    state,
    words,
    unlockStatus,
    getLevelBadge,
    setOnboarded,
    toggleMute,
    registerAnswer,
    introduceWordFromLearn,
  } = useWortschatz();

  const [activeTab, setActiveTab] = useState<'home' | 'practice' | 'list' | 'analytics'>('home');

  const badge = getLevelBadge(state.stats.xp);

  // Badge colors and icons
  const getBadgeVisuals = (level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum') => {
    switch (level) {
      case 'Bronze':
        return { text: 'Bronze Badge', bg: 'bg-amber-600/10 text-amber-700 border-amber-600/30' };
      case 'Silver':
        return { text: 'Silver Badge', bg: 'bg-slate-350 bg-slate-100 text-slate-500 border-slate-300' };
      case 'Gold':
        return { text: 'Gold Badge', bg: 'bg-amber-400/10 text-amber-700 border-amber-400' };
      case 'Platinum':
        return { text: 'Platinum Badge', bg: 'bg-indigo-100 text-indigo-700 border-indigo-300 animate-pulse' };
    }
  };

  const badgeStyle = getBadgeVisuals(badge);

  // Sound helper toggle indicator
  const SoundToggle = () => (
    <button
      onClick={toggleMute}
      className="p-2.5 rounded-2xl border-2 border-[#F0F0F0] hover:bg-[#F7F7F7] hover:border-[#E0E0E0] transition active:scale-95 text-slate-500 hover:text-[#1A1A1A] flex items-center justify-center cursor-pointer shadow-sm active:translate-y-[2px]"
      title={state.isMuted ? 'Unmute sounds' : 'Mute sounds'}
    >
      {state.isMuted ? <VolumeX className="w-5 h-5 text-[#DD0000] stroke-[2.5]" /> : <Volume2 className="w-5 h-5 text-emerald-600 stroke-[2.5]" />}
    </button>
  );

  return (
    <div id="wortschatz-app-root" className="min-h-screen bg-[#FFF4D2] text-[#1A1A1A] font-sans flex flex-col md:flex-row antialiased overflow-hidden">
      
      {/* 1. ONBOARDING WELCOME OVERLAY SCREEN (First visit gate) */}
      <AnimatePresence>
        {!state.stats.hasOnboarded && (
          <motion.div
            key="onboarding-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="max-w-md w-full space-y-6 flex flex-col items-center">
              <div className="p-4 bg-[#F7F7F7] rounded-full border-4 border-[#F0F0F0] shadow-sm">
                <Mascot state="dance" size={170} />
              </div>
              
              <div className="space-y-2">
                <h1 className="font-sans font-black text-5xl text-[#1A1A1A] tracking-tight leading-none pt-1">
                  Wortschatz
                </h1>
                <p className="font-black text-[#DD0000] text-lg">
                  Deutsch lernen macht Spaß! 🇩🇪
                </p>
                <p className="text-[#777] text-sm max-w-xs mx-auto leading-relaxed">
                  Teach yourself the 200 most vital German words using <b>Half-Life Spaced Regression (HLR)</b>. Gain XP stats, maintain raw daily streaks, and watch memory curves update in real-time.
                </p>
              </div>

              {/* Decorative mini Flag stripes */}
              <div className="flex h-2 w-32 rounded-full overflow-hidden border border-[#F0F0F0] shadow-xs">
                <div className="bg-[#1A1A1A] w-1/3 h-full" />
                <div className="bg-[#DD0000] w-1/3 h-full" />
                <div className="bg-[#FFCE00] w-1/3 h-full" />
              </div>

              <button
                onClick={setOnboarded}
                className="w-full bg-[#FFCE00] hover:bg-[#FFE066] active:bg-[#D9AF00] text-[#1A1A1A] py-4 px-8 rounded-2xl font-black shadow-[0_4px_0_#D9AF00] active:shadow-none hover:translate-y-[-1px] active:translate-y-[4px] border-2 border-[#1A1A1A] transition-all text-sm uppercase tracking-wider cursor-pointer"
              >
                Start Learning
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CHUNKY SIDEBAR FOR DESKTOP */}
      <nav id="app-sidebar-nav" className="w-64 border-r-4 border-[#F0F0F0] hidden md:flex flex-col p-6 h-screen sticky top-0 justify-between bg-transparent shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFCE00] rounded-xl flex items-center justify-center border-b-4 border-[#D9AF00] border-2 border-[#1A1A1A] shadow-sm leading-none shrink-0">
              <span className="text-2xl font-black text-[#1A1A1A]">W</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black tracking-tight text-[#1A1A1A] leading-none">Wortschatz</h1>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* TAB 1: Home */}
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-4 p-3.5 rounded-2xl border-b-4 text-left transition-all duration-75 active:scale-95 cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#F0F0F0] border-[#E0E0E0] text-[#1A1A1A]'
                  : 'border-transparent hover:bg-[#F7F7F7] text-[#777]'
              }`}
            >
              <span className="text-2xl shrink-0">🏠</span>
              <span className="font-extrabold tracking-wide uppercase text-sm">HOME</span>
            </button>

            {/* TAB 2: Practice */}
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-4 p-3.5 rounded-2xl border-b-4 text-left transition-all duration-75 active:scale-95 cursor-pointer ${
                activeTab === 'practice'
                  ? 'bg-[#F0F0F0] border-[#E0E0E0] text-[#1A1A1A]'
                  : 'border-transparent hover:bg-[#F7F7F7] text-[#777]'
              }`}
            >
              <span className="text-2xl shrink-0">⚔️</span>
              <span className="font-extrabold tracking-wide uppercase text-sm">PRACTICE</span>
            </button>

            {/* TAB 3: Words */}
            <button
              onClick={() => setActiveTab('list')}
              className={`flex items-center gap-4 p-3.5 rounded-2xl border-b-4 text-left transition-all duration-75 active:scale-95 cursor-pointer ${
                activeTab === 'list'
                  ? 'bg-[#F0F0F0] border-[#E0E0E0] text-[#1A1A1A]'
                  : 'border-transparent hover:bg-[#F7F7F7] text-[#777]'
              }`}
            >
              <span className="text-2xl shrink-0">📚</span>
              <span className="font-extrabold tracking-wide uppercase text-sm">WORDS</span>
            </button>

            {/* TAB 4: Stats/Analytics */}
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-4 p-3.5 rounded-2xl border-b-4 text-left transition-all duration-75 active:scale-95 cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-[#F0F0F0] border-[#E0E0E0] text-[#1A1A1A]'
                  : 'border-transparent hover:bg-[#F7F7F7] text-[#777]'
              }`}
            >
              <span className="text-2xl shrink-0">📊</span>
              <span className="font-extrabold tracking-wide uppercase text-sm">STATS</span>
            </button>
          </div>
        </div>

        <div className="bg-[#F7F7F7] rounded-3xl p-4 border-2 border-dashed border-slate-200 flex flex-col items-center text-center shadow-xs">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">Level Status</div>
          <div className="w-14 h-14 bg-gradient-to-tr from-[#FFCE00] to-[#FFE580] rounded-full flex items-center justify-center border-2 border-[#1A1A1A] mb-2 shadow-sm">
            <span className="text-2xl">
              {badge === 'Bronze' ? '🥉' : badge === 'Silver' ? '🥈' : badge === 'Gold' ? '🥇' : '🏆'}
            </span>
          </div>
          <span className="font-black text-[#1A1A1A] uppercase text-[11px] tracking-wider bg-white rounded-md px-2 py-0.5 border border-slate-100 shadow-2xs">
            {badgeStyle.text}
          </span>
        </div>
      </nav>

      {/* 3. MAIN WORKSPACE AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-transparent">
        
        {/* RESPONSIVE TOP HEADER ROW */}
        <header id="app-workspace-header" className="h-20 border-b-4 border-[#F0F0F0] px-4 md:px-8 flex items-center justify-between bg-transparent shrink-0 select-none">
          <div className="flex items-center space-x-6">
            {/* Logo visible on mobile only */}
            <div className="flex items-center space-x-2 md:hidden">
              <div className="w-8 h-8 bg-[#FFCE00] rounded-xl flex items-center justify-center border-b-2 border-[#D9AF00] border border-[#1A1A1A] leading-none shrink-0">
                <span className="text-lg font-black text-[#1A1A1A]">W</span>
              </div>
              <h1 className="font-sans font-black text-lg tracking-tight text-[#1A1A1A]">Wortschatz</h1>
            </div>

            {/* Metrics row */}
            <div className="flex items-center space-x-5 sm:space-x-6 text-[#1A1A1A]">
              {/* Streak */}
              <div className="flex items-center space-x-1.5" title="Daily Practice Streak">
                <span className="text-xl sm:text-2xl">🔥</span>
                <span className="text-[#FFCE00] font-black text-sm sm:text-base">{state.stats.streak}d</span>
              </div>

              {/* Total XP Points */}
              <div className="flex items-center space-x-1.5" title="Earned XP Points">
                <span className="text-xl sm:text-2xl">✨</span>
                <span className="text-[#DD0000] font-black text-sm sm:text-base">{state.stats.xp} XP</span>
              </div>

              {/* Level Indicator (hidden on super narrow) */}
              <div className="hidden xs:flex items-center space-x-1.5 bg-[#F7F7F7] px-2.5 py-1 rounded-full border border-slate-150 text-[10px] font-black uppercase text-[#777]">
                <Award className="w-3.5 h-3.5 mr-0.5 text-[#FFCE00] stroke-[2.5]" />
                <span>Level {badge}</span>
              </div>
            </div>
          </div>

          {/* Right alignment items */}
          <div className="flex items-center space-x-3.5">
            {/* Sound Toggle */}
            <SoundToggle />

            {/* Profile badge */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#FFCE00] rounded-full border border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] text-xs font-black shadow-2xs">
                🇩🇪
              </div>
              <span className="font-extrabold text-[#1A1A1A] text-xs">Guten Tag, Alex!</span>
            </div>
          </div>
        </header>

        {/* SCROLLABLE VIEWPORT CONTENT MAIN */}
        <main id="app-workspace-main" className="flex-1 overflow-y-auto px-4 py-6 md:p-8 w-full max-w-4xl mx-auto pb-24 md:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.15 }}
              className="w-full h-full"
            >
              {activeTab === 'home' && (
                <HomeTab
                  words={words}
                  unlockStatus={unlockStatus}
                  introduceWordFromLearn={introduceWordFromLearn}
                  registerAnswer={registerAnswer}
                />
              )}
              {activeTab === 'practice' && (
                <PracticeTab
                  words={words}
                  registerAnswer={registerAnswer}
                />
              )}
              {activeTab === 'list' && (
                <WordListTab
                  words={words}
                  registerAnswer={registerAnswer}
                />
              )}
              {activeTab === 'analytics' && (
                <AnalyticsTab
                  words={words}
                  snapshots={state.snapshots}
                  thetas={state.thetas}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* 4. CHUNKY BOTTOM NAV BAR FOR MOBILE SCREEN SIZES */}
      <nav id="app-navigation-bar" className="fixed bottom-0 left-0 right-0 bg-[#FFF4D2] border-t-4 border-[#F0F0F0] z-30 py-2.5 shadow-lg md:hidden">
        <div className="max-w-md mx-auto px-4 flex justify-around">
          {/* TAB 1: Home */}
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center p-1 rounded-xl transition duration-75 active:scale-90 text-[10px] font-black w-14 cursor-pointer ${
              activeTab === 'home' 
                ? 'text-[#FFCE00]' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="text-xl leading-none">🏠</span>
            <span className="mt-1 tracking-wide uppercase font-black text-[9px]">Home</span>
          </button>

          {/* TAB 2: Practice */}
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex flex-col items-center justify-center p-1 rounded-xl transition duration-75 active:scale-90 text-[10px] font-black w-14 cursor-pointer ${
              activeTab === 'practice' 
                ? 'text-[#DD0000]' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="text-xl leading-none">⚔️</span>
            <span className="mt-1 tracking-wide uppercase font-black text-[9px]">Practice</span>
          </button>

          {/* TAB 3: Word List */}
          <button
            onClick={() => setActiveTab('list')}
            className={`flex flex-col items-center justify-center p-1 rounded-xl transition duration-75 active:scale-90 text-[10px] font-black w-14 cursor-pointer ${
              activeTab === 'list' 
                ? 'text-[#FFCE00]' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="text-xl leading-none">📚</span>
            <span className="mt-1 tracking-wide uppercase font-black text-[9px]">Words</span>
          </button>

          {/* TAB 4: Analytics */}
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex flex-col items-center justify-center p-1 rounded-xl transition duration-75 active:scale-90 text-[10px] font-black w-14 cursor-pointer ${
              activeTab === 'analytics' 
                ? 'text-[#DD0000]' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="text-xl leading-none">📊</span>
            <span className="mt-1 tracking-wide uppercase font-black text-[9px]">Stats</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
