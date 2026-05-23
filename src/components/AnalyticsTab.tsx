import { useState, useMemo } from 'react';
import { Word, WordProgress, ThetaWeights } from '../types';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Search, ArrowUpDown, Tag, Percent, BookOpen, Clock, Heart, Award } from 'lucide-react';

interface AnalyticsTabProps {
  words: (Word & WordProgress & { p: number })[];
  snapshots: { date: string; avgRecall: number }[];
  thetas?: ThetaWeights;
}

type SortField = 'word' | 'translation' | 'difficulty' | 'p' | 'halfLife' | 'practiced' | 'correct' | 'wrong' | 'lastSeen';
type SortOrder = 'asc' | 'desc';

export function AnalyticsTab({ words, snapshots, thetas }: AnalyticsTabProps) {
  // Filters & Toggles
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Hard'>('All');
  const [recallFilter, setRecallFilter] = useState<'All' | 'Needs Review' | 'OK' | 'Mastered'>('All');
  
  // Table Sorting State
  const [sortField, setSortField] = useState<SortField>('p');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc'); // lowest recall first in default sort

  // --- STATS COMPUTATION ---
  const statsByGroup = useMemo(() => {
    const groups: Record<string, { total: number; introduced: number; mastered: number; sumRecall: number; sumHalfLife: number; red: number; amber: number; green: number }> = {
      Beginner: { total: 0, introduced: 0, mastered: 0, sumRecall: 0, sumHalfLife: 0, red: 0, amber: 0, green: 0 },
      Intermediate: { total: 0, introduced: 0, mastered: 0, sumRecall: 0, sumHalfLife: 0, red: 0, amber: 0, green: 0 },
      Hard: { total: 0, introduced: 0, mastered: 0, sumRecall: 0, sumHalfLife: 0, red: 0, amber: 0, green: 0 },
    };

    words.forEach((w) => {
      const g = groups[w.difficulty];
      if (!g) return;

      g.total += 1;
      if (w.introduced) {
        g.introduced += 1;
        g.sumRecall += w.p;
        g.sumHalfLife += w.halfLife;

        if (w.halfLife > 48) {
          g.mastered += 1;
        }

        // Zones
        if (w.p < 0.3) {
          g.red += 1;
        } else if (w.p < 0.7) {
          g.amber += 1;
        } else {
          g.green += 1;
        }
      } else {
        // Unseen words fallback
        g.red += 1;
      }
    });

    return Object.keys(groups).map((key) => {
      const g = groups[key];
      const avgRecall = g.introduced > 0 ? (g.sumRecall / g.introduced) * 100 : 0;
      const avgHalfLife = g.introduced > 0 ? (g.sumHalfLife / g.introduced) : 0;
      return {
        category: key,
        total: g.total,
        introduced: g.introduced,
        mastered: g.mastered,
        avgRecall: Math.round(avgRecall),
        avgHalfLife: Math.round(avgHalfLife * 10) / 10,
        pieZones: [
          { name: 'Critical (<40%)', value: g.red, color: '#EF4444' },
          { name: 'Decaying (40%-70%)', value: g.amber, color: '#F59E0B' },
          { name: 'Strong (>70%)', value: g.green, color: '#10B981' },
        ],
      };
    });
  }, [words]);

  // Overall counts
  const totalIntroduced = words.filter((w) => w.introduced).length;
  const totalMastered = words.filter((w) => w.introduced && w.halfLife > 48).length;

  // Pie proportion calculations for total words (Red / Amber / Green)
  const totalPieData = useMemo(() => {
    let red = 0, amber = 0, green = 0;
    words.forEach((w) => {
      if (!w.introduced) {
        red += 1;
      } else if (w.p < 0.3) {
        red += 1;
      } else if (w.p < 0.7) {
        amber += 1;
      } else {
        green += 1;
      }
    });

    return [
      { name: 'Critical (<40%)', value: red, color: '#EF4444' },
      { name: 'Decaying (40%-70%)', value: amber, color: '#F59E0B' },
      { name: 'Strong (>70%)', value: green, color: '#10B981' },
    ];
  }, [words]);

  // Recall Zone distribution histogram buckets
  const recallHistogramData = useMemo(() => {
    const buckets = Array.from({ length: 10 }).map((_, idx) => ({
      range: `${idx * 10}-${(idx + 1) * 10}%`,
      count: 0,
    }));

    words.forEach((w) => {
      const pPercent = (w.introduced ? w.p : 0) * 100;
      let bucketIdx = Math.floor(pPercent / 10);
      if (bucketIdx >= 10) bucketIdx = 9;
      if (bucketIdx < 0) bucketIdx = 0;
      buckets[bucketIdx].count += 1;
    });

    return buckets;
  }, [words]);

  // Half life distribution
  const halfLifeDistributionData = useMemo(() => {
    let lessThan2 = 0;
    let twoTo12 = 0;
    let twelveTo48 = 0;
    let over48 = 0;

    words.forEach((w) => {
      if (!w.introduced) {
        lessThan2 += 1;
      } else if (w.halfLife < 2) {
        lessThan2 += 1;
      } else if (w.halfLife < 12) {
        twoTo12 += 1;
      } else if (w.halfLife < 48) {
        twelveTo48 += 1;
      } else {
        over48 += 1;
      }
    });

    return [
      { name: '<2 hours', count: lessThan2 },
      { name: '2-12 hours', count: twoTo12 },
      { name: '12-48 hours', count: twelveTo48 },
      { name: '>48 hours', count: over48 },
    ];
  }, [words]);

  // Sorting & Filtering table elements
  const filteredWordsList = useMemo(() => {
    let list = words.map((w) => ({
      ...w,
      practiced: w.correct + w.wrong,
    }));

    // Filter by search text
    if (searchTerm) {
      list = list.filter(
        (w) =>
          w.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
          w.translation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (difficultyFilter !== 'All') {
      list = list.filter((w) => w.difficulty === difficultyFilter);
    }

    // Filter by recall speed zone
    if (recallFilter !== 'All') {
      if (recallFilter === 'Needs Review') {
        list = list.filter((w) => w.p < 0.7);
      } else if (recallFilter === 'OK') {
        list = list.filter((w) => w.p >= 0.7 && w.p < 0.9);
      } else if (recallFilter === 'Mastered') {
        list = list.filter((w) => w.introduced && w.halfLife > 48);
      }
    }

    // Sort list
    list.sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      // Handle nulls
      if (valA === null || valA === undefined) valA = 0;
      if (valB === null || valB === undefined) valB = 0;

      if (typeof valA === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

    return list;
  }, [words, searchTerm, difficultyFilter, recallFilter, sortField, sortOrder]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div id="analytics-tab-view" className="space-y-8 max-w-4xl mx-auto py-2">
      <div id="analytics-banner" className="bg-white rounded-3xl p-5 border-4 border-[#F0F0F0] shadow-sm">
        <h2 className="font-sans font-black text-2xl text-[#1A1A1A] flex items-center space-x-2">
          <span>Wortschatz Lern-Analytics 📊</span>
        </h2>
        <p className="text-xs text-[#777] mt-2 font-semibold leading-relaxed">
          Deep telemetry of memory retention metrics fitted using Half-Life Spaced Regression algorithms.
        </p>
      </div>

      {thetas && (
        <div className="bg-white rounded-3xl p-5 border-4 border-[#1A1A1A] shadow-sm flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-2">
            <h3 className="font-sans font-black text-lg text-[#1A1A1A] uppercase tracking-wide">Your Learning Profile</h3>
            <p className="text-xs text-slate-500 font-medium">Your personalized Half-Life Regression parameters adapting to your memory.</p>
          </div>
          <div className="flex-[2] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-[#E2E8F0]">
              <div className="text-[10px] uppercase font-black text-slate-400 mb-1">θ_correct ({thetas.thetaCorrect.toFixed(3)})</div>
              <p className="text-xs font-semibold text-[#1A1A1A]">
                {thetas.thetaCorrect > 0.55 ? "You build strong memories from correct answers." : "Regular correct answers build memory steadily."}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-[#E2E8F0]">
              <div className="text-[10px] uppercase font-black text-slate-400 mb-1">θ_wrong ({thetas.thetaWrong.toFixed(3)})</div>
              <p className="text-xs font-semibold text-[#1A1A1A]">
                {thetas.thetaWrong < 0.85 ? "Wrong answers affect you less than average." : "You benefit from correcting mistakes quickly."}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-[#E2E8F0] sm:col-span-2">
              <div className="text-[10px] uppercase font-black text-slate-400 mb-1">θ_lag ({thetas.thetaLag.toFixed(3)})</div>
              <p className="text-xs font-semibold text-[#1A1A1A]">
                Spacing Effect — recalling a word correctly after a longer time gap produces significantly stronger long-term retention. This is one of the most robust findings in memory research.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Known Limitations */}
      <div className="bg-white rounded-3xl p-5 border-4 border-[#F0F0F0] shadow-sm">
        <h3 className="font-sans font-black text-lg text-[#1A1A1A] uppercase tracking-wide mb-2">Known Limitations</h3>
        <p className="text-xs font-medium text-slate-600 leading-relaxed">
          Current Implementation Note: Theta weights begin as research-based defaults (Settles & Meeder, 2016) and adapt to your personal performance via gradient descent after every 20 attempts. A full offline training implementation would require a large multi-user dataset to pre-train weights, as described in the original Duolingo paper.
        </p>
      </div>

      {/* References & Methodology */}
      <div className="bg-white rounded-3xl p-5 border-4 border-[#F0F0F0] shadow-sm">
        <h3 className="font-sans font-black text-lg text-[#1A1A1A] uppercase tracking-wide mb-3">References & Methodology</h3>
        <ul className="space-y-3">
          <li className="text-xs text-slate-600 font-medium leading-relaxed">
            • Settles, B. & Meeder, B. (2016). A Trainable Spaced Repetition Model for Language Learning. <span className="italic">Proceedings of ACL 2016.</span>
          </li>
          <li className="text-xs text-slate-600 font-medium leading-relaxed">
            • Ebbinghaus, H. (1885). <span className="italic">Über das Gedächtnis.</span> Leipzig: Duncker & Humblot.
          </li>
          <li className="text-xs text-slate-600 font-medium leading-relaxed">
            • Cepeda, N.J. et al. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. <span className="italic">Psychological Bulletin, 132(3), 354–380.</span>
          </li>
        </ul>
      </div>

      {/* --- SECTION 1: OVERALL OVERVIEW BENTO ROW --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Core completion banner */}
        <div className="bg-white p-5 rounded-3xl border-4 border-[#1A1A1A] flex flex-col justify-between shadow-xs">
          <div>
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#DD0000]" />
              <span>Total Vocabulary Seen</span>
            </div>
            <p className="text-4xl font-black text-[#1A1A1A] tracking-tight mt-1">
              {totalIntroduced} <span className="text-sm font-black text-[#A1A1A1]">/ 200</span>
            </p>
          </div>
          <div className="space-y-1.5 mt-4">
            <div className="h-2.5 bg-[#F0F0F0] border-2 border-[#1A1A1A] rounded-full overflow-hidden">
              <div className="h-full bg-[#FFCE00]" style={{ width: `${(totalIntroduced / 200) * 100}%` }} />
            </div>
            <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-wider block">
              {Math.round((totalIntroduced / 200) * 100)}% of dictionary introduced
            </span>
          </div>
        </div>

        {/* Mastered word metrics */}
        <div className="bg-white p-5 rounded-3xl border-4 border-[#1A1A1A] flex flex-col justify-between shadow-xs">
          <div>
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center space-x-1.5">
              <Award className="w-3.5 h-3.5 text-[#FFCE00]" />
              <span>Vocab Mastered (HLR &gt; 48h)</span>
            </div>
            <p className="text-4xl font-black text-[#22C55E] tracking-tight mt-1">
              {totalMastered} <span className="text-sm font-black text-[#A1A1A1]">/ 200</span>
            </p>
          </div>
          <p className="text-xs text-[#555] font-semibold leading-relaxed mt-4">
            Mastery requires keeping a word with memory half-life above <b className="text-[#1A1A1A]">48 hours</b>.
          </p>
        </div>

        {/* Average system recall probability */}
        <div className="bg-white p-5 rounded-3xl border-4 border-[#1A1A1A] flex flex-col justify-between shadow-xs">
          <div>
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center space-x-1.5">
              <Percent className="w-3.5 h-3.5 text-[#DD0000]" />
              <span>Overall Recall Expectation</span>
            </div>
            {(() => {
              const totalRecallFloat = words.reduce((acc, w) => acc + (w.introduced ? w.p : 0), 0);
              const totalAvgRecallStr = totalIntroduced > 0 ? (totalRecallFloat / totalIntroduced) * 100 : 0;
              return (
                <p className="text-4xl font-black text-[#FFCE00] tracking-tight mt-1">
                  {Math.round(totalAvgRecallStr)}%
                </p>
              );
            })()}
          </div>
          <p className="text-xs text-[#555] font-semibold leading-relaxed mt-4">
            Systemic likelihood of successfully recalling any introduced word right now.
          </p>
        </div>
      </div>

      {/* --- SECTION 2: CHARTS GRID COVERS ALL VISUALS --- */}
      <h3 className="font-black text-lg text-[#1A1A1A] border-b-4 border-[#1A1A1A] pb-1.5 mt-4 uppercase tracking-wider">
        Algorithmic Visual Telemetry
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Chart A: Learning curve snapshots */}
        <div className="p-5 bg-white rounded-3xl border-4 border-[#F0F0F0] shadow-xs space-y-3.5">
          <div>
            <h4 className="font-black text-[#1A1A1A] text-sm">Learning Curve over Time</h4>
            <p className="text-xs text-slate-400 font-semibold">History of cumulative average recall metrics</p>
          </div>

          <div className="h-48 w-full text-xs font-bold">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={snapshots}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" stroke="#94A3B8" />
                <YAxis domain={[0, 1]} tickFormatter={(val) => `${Math.round(val * 100)}%`} stroke="#94A3B8" />
                <Tooltip formatter={(value: any) => [`${Math.round(value * 100)}%`, 'Average Recall']} />
                <Line type="monotone" dataKey="avgRecall" stroke="#FFCE00" strokeWidth={4} dot={{ r: 5, stroke: '#1A1A1A', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart B: Group average comparison */}
        <div className="p-5 bg-white rounded-3xl border-4 border-[#F0F0F0] shadow-xs space-y-3.5">
          <div>
            <h4 className="font-black text-[#1A1A1A] text-sm">Recall Probability by Difficulty</h4>
            <p className="text-xs text-slate-400 font-semibold">Category comparison of average retention</p>
          </div>

          <div className="h-48 w-full text-xs font-bold">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsByGroup}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="category" stroke="#94A3B8" />
                <YAxis domain={[0, 100]} tickFormatter={(val) => `${val}%`} stroke="#94A3B8" />
                <Tooltip formatter={(v) => [`${v}%`, 'Recall %']} />
                <Bar dataKey="avgRecall" fill="#DD0000" radius={[6, 6, 0, 0]}>
                  {statsByGroup.map((entry, index) => {
                    const colors = ['#22C55E', '#FFCE00', '#DD0000'];
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} stroke="#1A1A1A" strokeWidth={2} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart C: Recall distribution histogram */}
        <div className="p-5 bg-white rounded-3xl border-4 border-[#F0F0F0] shadow-xs space-y-3.5">
          <div>
            <h4 className="font-black text-[#1A1A1A] text-sm">Overall Recall Bucket Distribution</h4>
            <p className="text-xs text-slate-400 font-semibold">Number of words falling within each recall 10% bracket</p>
          </div>

          <div className="h-48 w-full text-xs font-bold">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recallHistogramData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="range" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip formatter={(v) => [v, 'Word Count']} />
                <Bar dataKey="count" fill="#475569" stroke="#1A1A1A" strokeWidth={2} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart D: Half life tier distribution */}
        <div className="p-5 bg-white rounded-3xl border-4 border-[#F0F0F0] shadow-xs space-y-3.5">
          <div>
            <h4 className="font-black text-[#1A1A1A] text-sm">Spaced Retention Half-Life Groups</h4>
            <p className="text-xs text-slate-400 font-semibold">How many words fall within different decay frequencies</p>
          </div>

          <div className="h-48 w-full text-xs font-bold">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={halfLifeDistributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip formatter={(v) => [v, 'Word Count']} />
                <Bar dataKey="count" fill="#E2E8F0" stroke="#1A1A1A" strokeWidth={2} radius={[4, 4, 0, 0]}>
                  {halfLifeDistributionData.map((entry, index) => {
                    const colors = ['#DD0000', '#FFCE00', '#64748B', '#22C55E'];
                    return <Cell key={`cell-${index}`} fill={colors[index]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- SECTION 3: BY GROUP CARDS WITH PIE PROPORTIONS --- */}
      <h3 className="font-black text-lg text-[#1A1A1A] border-b-4 border-[#1A1A1A] pb-1.5 mt-4 uppercase tracking-wider">
        Cohort Status Profiles
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsByGroup.map((grp) => (
          <div key={grp.category} className="bg-white border-4 border-[#F0F0F0] rounded-3xl p-4 flex flex-col justify-between shadow-xs space-y-4">
            <div>
              <h4 className="font-black text-[#1A1A1A] text-sm">
                {grp.category} (Total: {grp.total})
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 mt-2 font-black uppercase tracking-wide">
                <div>Introduced: <b className="text-[#1A1A1A]">{grp.introduced}</b></div>
                <div>Mastered: <b className="text-[#22C55E]">{grp.mastered}</b></div>
                <div>Avg Recall: <b className="text-[#1A1A1A]">{grp.avgRecall}%</b></div>
                <div>Avg Decay: <b className="text-[#1A1A1A]">{grp.avgHalfLife}h</b></div>
              </div>
            </div>

            {/* Custom Pie proportions mini */}
            <div className="h-28 w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={grp.pieZones}
                    cx="50%"
                    cy="50%"
                    innerRadius={24}
                    outerRadius={38}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {grp.pieZones.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#1A1A1A" strokeWidth={1} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [v, 'Words']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[8px] font-black uppercase text-slate-400 select-none">
                <span>Zones</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- SECTION 4: SEARCHABLE & SORTABLE TELEMETRY LEDGER --- */}
      <h3 className="font-black text-lg text-[#1A1A1A] border-b-4 border-[#1A1A1A] pb-1.5 mt-4 uppercase tracking-wider">
        Detailed Vocabulary Ledger
      </h3>

      <div id="telemetry-table-card" className="bg-white border-4 border-[#1A1A1A] rounded-3xl overflow-hidden shadow-xs">
        
        {/* Table Filters header */}
        <div className="p-4 bg-[#F7F7F7] border-b-4 border-[#1A1A1A] flex flex-col md:flex-row gap-3 justify-between items-center">
          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search 200 German words..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border-2 border-[#1A1A1A] font-extrabold text-xs focus:outline-none focus:border-[#FFCE00] transition"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {/* Category Filter dropdown */}
            <div className="flex items-center space-x-1.5 bg-white border-2 border-[#1A1A1A] px-3 py-1.5 rounded-xl text-xs font-black text-[#1A1A1A]">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <span>Tier:</span>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value as any)}
                className="focus:outline-none bg-transparent cursor-pointer font-bold"
              >
                <option value="All">All Tiers</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Retention filter dropdown */}
            <div className="flex items-center space-x-1.5 bg-white border-2 border-[#1A1A1A] px-3 py-1.5 rounded-xl text-xs font-black text-[#1A1A1A]">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Decay:</span>
              <select
                value={recallFilter}
                onChange={(e) => setRecallFilter(e.target.value as any)}
                className="focus:outline-none bg-transparent cursor-pointer font-bold"
              >
                <option value="All">All Ranges</option>
                <option value="Needs Review">Needs Review (&lt;70%)</option>
                <option value="OK">OK (70% - 90%)</option>
                <option value="Mastered">Mastered (&gt;48h HLR)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Responsive Table grid container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 min-w-[700px]">
            <thead className="bg-[#F7F7F7] text-[#1A1A1A] font-black uppercase border-b-2 border-[#1A1A1A] text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4 cursor-pointer select-none" onClick={() => toggleSort('word')}>
                  <span className="flex items-center space-x-1">
                    <span>Word (German)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </span>
                </th>
                <th className="py-3 px-4 cursor-pointer select-none" onClick={() => toggleSort('translation')}>
                  <span className="flex items-center space-x-1">
                    <span>Translation</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </span>
                </th>
                <th className="py-3 px-4 cursor-pointer select-none" onClick={() => toggleSort('difficulty')}>
                  <span className="flex items-center space-x-1">
                    <span>Category</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </span>
                </th>
                <th className="py-3 px-4 cursor-pointer select-none text-right" onClick={() => toggleSort('p')}>
                  <span className="flex items-center justify-end space-x-1">
                    <span>Recall %</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </span>
                </th>
                <th className="py-3 px-4 cursor-pointer select-none text-right" onClick={() => toggleSort('halfLife')}>
                  <span className="flex items-center justify-end space-x-1">
                    <span>Half-life</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </span>
                </th>
                <th className="py-3 px-4 cursor-pointer select-none text-right" onClick={() => toggleSort('practiced')}>
                  <span className="flex items-center justify-end space-x-1">
                    <span>Practices</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </span>
                </th>
                <th className="py-3 px-4 cursor-pointer select-none text-right" onClick={() => toggleSort('correct')}>
                  <span className="flex items-center justify-end space-x-1">
                    <span>Correct</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </span>
                </th>
                <th className="py-3 px-4 cursor-pointer select-none text-right" onClick={() => toggleSort('wrong')}>
                  <span className="flex items-center justify-end space-x-1">
                    <span>Wrong</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </span>
                </th>
                <th className="py-3 px-4 cursor-pointer select-none text-right" onClick={() => toggleSort('lastSeen')}>
                  <span className="flex items-center justify-end space-x-1">
                    <span>Last seen</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredWordsList.length > 0 ? (
                filteredWordsList.map((row) => {
                  const pVal = Math.round((row.introduced ? row.p : 0) * 100);
                  
                  // Recall styling
                  let recallBadgeClass = 'text-slate-400 bg-slate-50 border-slate-100';
                  if (row.introduced) {
                    if (row.p < 0.3) recallBadgeClass = 'text-[#DE2828] bg-red-50/50 border-[#DD0000]';
                    else if (row.p < 0.7) recallBadgeClass = 'text-amber-800 bg-amber-50 border-[#FFCE00]';
                    else recallBadgeClass = 'text-[#166534] bg-emerald-50 border-emerald-400';
                  }

                  // Last seen styling
                  const lastSeenStr = row.lastSeen
                    ? new Date(row.lastSeen).toLocaleDateString()
                    : 'Never';

                  return (
                    <tr key={row.id} className="hover:bg-[#F7F7F7] font-bold text-[#1A1A1A] transition">
                      {/* Word */}
                      <td className="py-2.5 px-4 block-text">
                        <span className="font-extrabold text-[#1A1A1A] font-sans">{row.word}</span>
                        {row.gender && (
                          <span className={`ml-1.5 text-[8px] uppercase font-black px-1 pb-0.5 rounded border ${
                            row.gender === 'der' ? 'bg-[#5B7FA6]/10 text-[#5B7FA6] border-[#5B7FA6]/30' :
                            row.gender === 'die' ? 'bg-[#B05C5C]/10 text-[#B05C5C] border-[#B05C5C]/30' :
                            'bg-[#6B9E78]/10 text-[#6B9E78] border-[#6B9E78]/30'
                          }`}>
                            {row.gender}
                          </span>
                        )}
                      </td>

                      {/* Translation */}
                      <td className="py-2.5 px-4 capitalize text-slate-600">{row.translation}</td>

                      {/* Difficulty Category */}
                      <td className="py-2.5 px-4">
                        <span className={`text-[9px] uppercase font-black px-1.5 py-0.5 rounded-full border-2 ${
                          row.difficulty === 'Beginner' ? 'bg-[#22C55E]/15 text-[#166534] border-[#22C55E]' :
                          row.difficulty === 'Intermediate' ? 'bg-[#FFCE00]/15 text-amber-800 border-[#FFCE00]' :
                          'bg-[#DD0000]/15 text-[#991B1B] border-[#DD0000]'
                        }`}>
                          {row.difficulty}
                        </span>
                      </td>

                      {/* Recall rate */}
                      <td className="py-2.5 px-4 text-right">
                        <span className={`inline-block text-[10px] uppercase font-black px-2 py-0.5 rounded-xl border-2 ${recallBadgeClass}`}>
                          {row.introduced ? `${pVal}%` : 'Unseen'}
                        </span>
                      </td>

                      {/* Half life */}
                      <td className="py-2.5 px-4 text-right text-slate-500 font-mono font-bold">
                        {row.introduced 
                          ? row.halfLife < 24 ? `${Math.round(row.halfLife)}h` : `${Math.round(row.halfLife / 24)}d` 
                          : '—'
                        }
                      </td>

                      {/* Times practiced */}
                      <td className="py-2.5 px-4 text-right font-mono text-[#1A1A1A] font-bold">{row.practiced}</td>

                      {/* Correct */}
                      <td className="py-2.5 px-4 text-right font-mono text-[#22C55E] font-black">{row.correct}</td>

                      {/* Wrong */}
                      <td className="py-2.5 px-4 text-right font-mono text-[#DD0000] font-black">{row.wrong}</td>

                      {/* Last Seen Date */}
                      <td className="py-2.5 px-4 text-right text-slate-500 font-mono">{lastSeenStr}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400 font-black uppercase">
                    No vocabulary records match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- SECTION 5: CITATIONS ROW --- */}
      <div id="citations-panel" className="bg-[#F7F7F7] border-4 border-[#F0F0F0] p-5 rounded-3xl shadow-xs space-y-3">
        <h4 className="font-sans font-black text-sm text-[#1A1A1A] uppercase tracking-wider">Aesthetic & Usability Citations</h4>
        <p className="text-xs text-slate-600 leading-relaxed font-semibold">
          The UX architecture and visual representations inside this learning workspace follow rigorous usability standards:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
          <div className="p-4 bg-white border-2 border-[#F0F0F0] rounded-2xl space-y-1.5 shadow-sm">
            <h5 className="font-black text-[#1A1A1A]">Visual Grouping Hierarchy</h5>
            <p className="text-slate-500 leading-normal">
              Color coding, bordered grids, and consistent column groupings adopt <b>Gestalt Principles of Visual Perception</b>. Distinctive visual units utilize similarity and proximity cues to simplify tracking of items (Wertheimer, 1923).
            </p>
          </div>
          <div className="p-4 bg-white border-2 border-[#F0F0F0] rounded-2xl space-y-1.5 shadow-sm">
            <h5 className="font-black text-[#1A1A1A]">Data Visualization Heuristics</h5>
            <p className="text-slate-500 leading-normal">
              Our retention curves, category progress bars, and histogram distributions adhere to <b>Nielsen's 10 Usability Heuristics</b>, emphasizing visibility of system status, matching our curves to real-world spaced decay, and delivering aesthetic, minimalist, clean details (Nielsen, 1994).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
