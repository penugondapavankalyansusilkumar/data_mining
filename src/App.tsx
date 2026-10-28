/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Database, 
  Layers, 
  GitBranch, 
  Cpu, 
  BarChart3, 
  Code, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle, 
  Download,
  Table,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ArchitectureView } from './components/ArchitectureView';
import { StarSchemaVisualizer } from './components/StarSchemaVisualizer';
import { ETLPipelineSimulator } from './components/ETLPipelineSimulator';
import { CustomerMiningStudio } from './components/CustomerMiningStudio';
import { PowerBIDashboard } from './components/PowerBIDashboard';
import { SQLStudio } from './components/SQLStudio';
import { TestCaseRunner } from './components/TestCaseRunner';
import { DocumentationView } from './components/DocumentationView';
import { VivaDefenseView } from './components/VivaDefenseView';
import { DatasetExporter } from './components/DatasetExporter';
import { documentationSections } from './data/documentationData';

type MainTab = 'workbench' | 'documentation' | 'viva' | 'datasets';
type WorkbenchSubTab = 'architecture' | 'schema' | 'etl' | 'mining' | 'powerbi' | 'sql' | 'testcases';

export default function App() {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>('workbench');
  const [activeWorkbenchSubTab, setActiveWorkbenchSubTab] = useState<WorkbenchSubTab>('architecture');

  const handleExportFullReport = () => {
    const md = documentationSections.map(sec => 
      `# Chapter ${sec.number}: ${sec.title}\n*${sec.subtitle}*\n\n## Core Highlights\n${sec.keyPoints.map(p => `- ${p}`).join('\n')}\n\n## Content\n${sec.content}\n\n---\n`
    ).join('\n');

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Retail_Sales_Data_Warehouse_and_Customer_Mining_Thesis.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeMainTab}
        setActiveTab={setActiveMainTab}
        onExportReport={handleExportFullReport}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Sub-navigation bar when inside Interactive Workbench */}
        {activeMainTab === 'workbench' && (
          <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-xl flex items-center justify-start gap-1 overflow-x-auto shadow-md">
            <button
              onClick={() => setActiveWorkbenchSubTab('architecture')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeWorkbenchSubTab === 'architecture'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>1. System Architecture</span>
            </button>

            <button
              onClick={() => setActiveWorkbenchSubTab('schema')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeWorkbenchSubTab === 'schema'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>2. Star Schema & SCD2</span>
            </button>

            <button
              onClick={() => setActiveWorkbenchSubTab('etl')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeWorkbenchSubTab === 'etl'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5 text-blue-400" />
              <span>3. ETL & Cleansing Gate</span>
            </button>

            <button
              onClick={() => setActiveWorkbenchSubTab('mining')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeWorkbenchSubTab === 'mining'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>4. Customer Mining & RFM</span>
            </button>

            <button
              onClick={() => setActiveWorkbenchSubTab('powerbi')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeWorkbenchSubTab === 'powerbi'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              <span>5. Power BI Analytics</span>
            </button>

            <button
              onClick={() => setActiveWorkbenchSubTab('sql')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeWorkbenchSubTab === 'sql'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-indigo-400" />
              <span>6. SQL Warehouse Studio</span>
            </button>

            <button
              onClick={() => setActiveWorkbenchSubTab('testcases')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeWorkbenchSubTab === 'testcases'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>7. Test Suite</span>
            </button>
          </div>
        )}

        {/* Tab 1: Interactive Workbench Views */}
        {activeMainTab === 'workbench' && (
          <div>
            {activeWorkbenchSubTab === 'architecture' && <ArchitectureView />}
            {activeWorkbenchSubTab === 'schema' && <StarSchemaVisualizer />}
            {activeWorkbenchSubTab === 'etl' && <ETLPipelineSimulator />}
            {activeWorkbenchSubTab === 'mining' && <CustomerMiningStudio />}
            {activeWorkbenchSubTab === 'powerbi' && <PowerBIDashboard />}
            {activeWorkbenchSubTab === 'sql' && <SQLStudio />}
            {activeWorkbenchSubTab === 'testcases' && <TestCaseRunner />}
          </div>
        )}

        {/* Tab 2: 12-Section Academic Thesis & Project Report */}
        {activeMainTab === 'documentation' && (
          <DocumentationView onExportMarkdown={handleExportFullReport} />
        )}

        {/* Tab 3: Viva Defense & Interview Masterclass */}
        {activeMainTab === 'viva' && <VivaDefenseView />}

        {/* Tab 4: Datasets & Artifact Exporter */}
        {activeMainTab === 'datasets' && <DatasetExporter />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">Retail Sales Data Warehouse & Customer Mining Platform</span>
            <span>•</span>
            <span>Ralph Kimball Star Schema</span>
            <span>•</span>
            <span>RFM & Apriori</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
            <span>SCD Type 2 Active</span>
            <span>•</span>
            <span className="text-emerald-400">Pass Rate: 100%</span>
            <span>•</span>
            <span>ISO 8601 Conformed</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
