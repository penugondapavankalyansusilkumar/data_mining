/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  Award, 
  CheckCircle, 
  Eye, 
  EyeOff, 
  BookOpen, 
  Terminal,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { vivaDefenseQuestions, VivaQuestion } from '../data/documentationData';

export const VivaDefenseView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [revealedQuestionIndices, setRevealedQuestionIndices] = useState<Record<number, boolean>>({});
  const [practiceMode, setPracticeMode] = useState<boolean>(false);

  const categories = ['ALL', 'Dimensional Modeling', 'ETL & Architecture', 'Data Mining & Algorithms', 'SQL & Performance'];

  const filteredQuestions = vivaDefenseQuestions.filter(q => {
    if (selectedCategory === 'ALL') return true;
    return q.category === selectedCategory;
  });

  const toggleReveal = (index: number) => {
    setRevealedQuestionIndices(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleRevealAll = () => {
    const all: Record<number, boolean> = {};
    vivaDefenseQuestions.forEach((_, idx) => { all[idx] = true; });
    setRevealedQuestionIndices(all);
    setPracticeMode(false);
  };

  const handleHideAll = () => {
    setRevealedQuestionIndices({});
    setPracticeMode(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-amber-950 text-amber-400 border border-amber-800">
              Viva Voce & Technical Interview
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800">
              Oral Defense Masterclass
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1.5">
            Academic Viva Voce & Senior Data Architect Oral Defense Cheat Sheet
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Carefully curated technical defense questions asked by university external examiners and FAANG data engineering interviewers.
          </p>
        </div>

        {/* Practice Mode Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              if (practiceMode) handleRevealAll();
              else handleHideAll();
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              practiceMode
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            {practiceMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{practiceMode ? 'Practice Mode: ON (Hidden)' : 'Practice Rehearsal Mode'}</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const isRevealed = !practiceMode || !!revealedQuestionIndices[idx];

          return (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg transition-all hover:border-slate-700"
            >
              <div
                onClick={() => toggleReveal(idx)}
                className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none bg-slate-900/90"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-950 text-blue-400 border border-blue-800/80 text-xs font-bold font-mono flex items-center justify-center shrink-0">
                      Q{idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                      {q.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white pt-1">
                    {q.question}
                  </h3>
                </div>

                <div className="text-slate-400 hover:text-white p-1 rounded bg-slate-950 border border-slate-800 shrink-0">
                  {isRevealed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {isRevealed && (
                <div className="p-5 bg-slate-950/80 border-t border-slate-800/80 space-y-4">
                  {/* Detailed Defense Answer */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" /> Defensible Technical Answer:
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      {q.answer}
                    </p>
                  </div>

                  {/* Pro Tip Box for Distinction */}
                  <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-slate-950 p-3.5 rounded-xl border border-amber-800/40 space-y-1">
                    <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Pro Tip for Full Marks / Distinction:
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {q.proTip}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
