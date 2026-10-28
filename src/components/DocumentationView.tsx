/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Download, 
  Printer, 
  CheckCircle2, 
  FileText, 
  ChevronRight, 
  Layers, 
  Database, 
  Cpu, 
  BarChart3, 
  TrendingUp, 
  Award,
  AlertTriangle,
  GitBranch,
  Code
} from 'lucide-react';
import { documentationSections, DocSection } from '../data/documentationData';

interface DocumentationViewProps {
  onExportMarkdown: () => void;
}

export const DocumentationView: React.FC<DocumentationViewProps> = ({ onExportMarkdown }) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>(documentationSections[0].id);
  const [searchFilter, setSearchFilter] = useState<string>('');

  const filteredSections = documentationSections.filter(sec => 
    sec.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    sec.content.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeSection = documentationSections.find(sec => sec.id === selectedSectionId) || documentationSections[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800">
              Academic & Industry Master Documentation
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800">
              12 Structured Chapters
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1.5">
            Retail Sales Data Warehouse & Customer Mining Project Thesis
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Complete technical specification and presentation manuscript designed for university viva voce defense and senior data engineering presentations.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700"
          >
            <Printer className="w-3.5 h-3.5 text-slate-300" />
            <span>Print / PDF</span>
          </button>
          <button
            onClick={onExportMarkdown}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Full .MD Thesis</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar Navigator + Chapter Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Col: Chapter Navigator */}
        <div className="lg:col-span-1 space-y-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search chapters & topics..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 space-y-1 shadow-md max-h-[700px] overflow-y-auto">
            {filteredSections.map((sec) => {
              const isSelected = sec.id === activeSection.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSectionId(sec.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 ${
                      isSelected ? 'bg-white/20 text-white font-bold' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {sec.number}
                    </span>
                    <span className="truncate">{sec.title}</span>
                  </div>
                  {isSelected && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 3 Cols: Active Chapter Document Body */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Chapter Header */}
          <div className="border-b border-slate-800 pb-5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              <span>Chapter {activeSection.number} of 12</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
              {activeSection.title}
            </h1>
            <p className="text-sm text-indigo-300 mt-1 font-medium">
              {activeSection.subtitle}
            </p>
          </div>

          {/* Key Points Banner */}
          <div className="bg-slate-950 border border-indigo-950/60 rounded-xl p-5 shadow-inner">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-3">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              Core Takeaways & Defense Highlights:
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {activeSection.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section Body Prose */}
          <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4 font-sans">
            {activeSection.content.split('\n\n').map((paragraph, idx) => {
              // Check if paragraph is a numbered or bullet list
              if (paragraph.startsWith('1.') || paragraph.startsWith('-')) {
                return (
                  <div key={idx} className="bg-slate-950/40 p-4 rounded-lg border border-slate-800/80 my-2 space-y-1.5 text-xs font-mono text-slate-300 whitespace-pre-line">
                    {paragraph}
                  </div>
                );
              }
              return (
                <p key={idx} className="leading-relaxed text-slate-300 text-sm">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Subsections if available */}
          {activeSection.subsections && activeSection.subsections.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              {activeSection.subsections.map((sub, idx) => (
                <div key={idx} className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    {sub.heading}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {sub.details}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Chapter Navigation Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            {activeSection.number > 1 ? (
              <button
                onClick={() => setSelectedSectionId(documentationSections[activeSection.number - 2].id)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                &larr; Chapter {activeSection.number - 1}
              </button>
            ) : <div />}

            {activeSection.number < 12 ? (
              <button
                onClick={() => setSelectedSectionId(documentationSections[activeSection.number].id)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors"
              >
                Chapter {activeSection.number + 1} &rarr;
              </button>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  );
};
