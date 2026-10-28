/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Database, 
  Layers, 
  BookOpen, 
  HelpCircle, 
  Download, 
  CheckCircle2, 
  Cpu
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'workbench' | 'documentation' | 'viva' | 'datasets';
  setActiveTab: (tab: 'workbench' | 'documentation' | 'viva' | 'datasets') => void;
  onExportReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onExportReport,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Project Title */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 p-0.5 shadow-md shadow-blue-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Database className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-100 text-base sm:text-lg tracking-tight">
                  Retail Sales Data Warehouse
                </h1>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                  <Cpu className="w-3 h-3" /> Customer Mining Suite
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Kimball Star Schema • Automated ETL • RFM Analytics • Power BI BI Studio
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('workbench')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'workbench'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4 text-cyan-300" />
              <span>Interactive Workbench</span>
            </button>

            <button
              onClick={() => setActiveTab('documentation')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'documentation'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>12-Section Report</span>
            </button>

            <button
              onClick={() => setActiveTab('viva')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'viva'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Viva Defense Q&A</span>
              <span className="sm:hidden">Viva</span>
            </button>

            <button
              onClick={() => setActiveTab('datasets')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'datasets'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Download className="w-4 h-4 text-purple-300" />
              <span className="hidden sm:inline">Datasets & SQL</span>
              <span className="sm:hidden">Data</span>
            </button>

            {/* Quick Export Doc Button */}
            <div className="h-6 w-px bg-slate-800 mx-1 hidden lg:block" />
            <button
              onClick={onExportReport}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 transition-all"
              title="Download Full Project Academic Report in Markdown"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
