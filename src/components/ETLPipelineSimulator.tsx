/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertOctagon, 
  ArrowRight, 
  ShieldCheck, 
  Filter, 
  FileCheck, 
  Cpu, 
  Layers,
  Sparkles,
  Terminal
} from 'lucide-react';
import { etlPipelineStepsData, dirtyRecordsSample } from '../data/mockWarehouseData';
import { ETLStep, DirtyRecord } from '../types/warehouse';

export const ETLPipelineSimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(3); // All 4 completed by default
  const [steps, setSteps] = useState<ETLStep[]>(etlPipelineStepsData);
  const [filterDirty, setFilterDirty] = useState<'ALL' | 'Rejected' | 'Normalized' | 'Imputed'>('ALL');
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    '[02:00:01 UTC] [INFO] Airflow DAG: retail_sales_daily_etl started.',
    '[02:00:04 UTC] [INFO] Extracted 5,000 delta records from POS, E-Commerce, and Mobile sources.',
    '[02:00:12 UTC] [WARN] Cleansing Gate: 140 records quarantined (neg quantities, invalid date strings).',
    '[02:00:22 UTC] [INFO] Transformed 4,860 records. Applied SCD Type 2 logic to 14 modified customer profiles.',
    '[02:00:35 UTC] [SUCCESS] Loaded 4,860 atomic rows into Fact_Sales. Referential integrity checks passed 100%.'
  ]);

  // Simulate execution step by step
  const handleRunSimulation = () => {
    setIsRunning(true);
    setActiveStepIndex(0);
    setExecutionLogs(['[INIT] Initiating live ETL pipeline simulation...']);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < 4) {
        setActiveStepIndex(current);
        const stageName = steps[current].name;
        setExecutionLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Executing Stage ${current + 1}: ${stageName}...`,
          `[${new Date().toLocaleTimeString()}] Processed ${steps[current].input_count} rows, applying: ${steps[current].rules_applied.join(', ')}`
        ]);
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setActiveStepIndex(3);
        setExecutionLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] [SUCCESS] Batch load completed! Star Schema tables fully synchronized.`
        ]);
      }
    }, 1200);
  };

  const filteredDirtyRecords = dirtyRecordsSample.filter(record => {
    if (filterDirty === 'ALL') return true;
    return record.cleansed_status === filterDirty;
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800">
              Data Pipeline & Quality
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800">
              Audit & Cleansing
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1.5">
            Automated ETL Pipeline & Data Cleansing Engine
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Simulate the multi-stage ingestion pipeline: extraction from operational sources, data quality gate, 
            Slowly Changing Dimension tracking, and atomic Star Schema loading.
          </p>
        </div>

        {/* Execution Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRunSimulation}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md ${
              isRunning
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/25 ring-1 ring-blue-400/40'
            }`}
          >
            {isRunning ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Processing Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Simulate Ingestion Run</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4 Pipeline Stages Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {steps.map((step, idx) => {
          const isCurrentActive = isRunning && activeStepIndex === idx;
          const isDone = activeStepIndex >= idx;

          return (
            <div
              key={step.id}
              className={`p-4 rounded-xl border transition-all relative ${
                isCurrentActive
                  ? 'bg-blue-950/60 border-blue-400 shadow-xl ring-2 ring-blue-500/50'
                  : isDone
                  ? 'bg-slate-900 border-slate-700/80'
                  : 'bg-slate-950 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-slate-400">STAGE 0{step.step_number}</span>
                {isCurrentActive ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-cyan-400 animate-pulse">
                    <RotateCcw className="w-3 h-3 animate-spin" /> In Progress
                  </span>
                ) : isDone ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> Ready
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500">Queued</span>
                )}
              </div>

              <h3 className="text-sm font-bold text-white">{step.name}</h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{step.description}</p>

              {/* Counts */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px]">Input</span>
                  <span className="text-slate-200 font-bold">{step.input_count.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Passed</span>
                  <span className="text-emerald-400 font-bold">{step.output_count.toLocaleString()}</span>
                </div>
              </div>

              {step.rejected_count > 0 && (
                <div className="mt-2 text-[10px] font-mono text-amber-400 flex items-center gap-1 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/40">
                  <AlertOctagon className="w-3 h-3 shrink-0" />
                  <span>{step.rejected_count} quarantined</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Data Quality Gate Demonstration: Real Dirty Data Samples */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">
                Data Cleansing Gate: Raw Dirty Data vs Cleansed Resolution
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Demonstrating automated handling of malformed dates, test accounts, negative quantities, and missing price imputation.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {(['ALL', 'Rejected', 'Normalized', 'Imputed'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterDirty(status)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  filterDirty === status
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table of Dirty Records */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60 font-mono">
                <th className="py-2.5 px-3">Raw ID</th>
                <th className="py-2.5 px-3">Customer / Email</th>
                <th className="py-2.5 px-3">Date String</th>
                <th className="py-2.5 px-3">Qty & Price</th>
                <th className="py-2.5 px-3">Validation Issues Detected</th>
                <th className="py-2.5 px-3">Cleansing Resolution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              {filteredDirtyRecords.map((record) => (
                <tr key={record.raw_id} className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-bold text-cyan-300">{record.raw_id}</td>
                  <td className="py-2.5 px-3">
                    <div className="text-white font-medium">{record.raw_customer_name}</div>
                    <div className="text-[11px] text-slate-400">{record.raw_email}</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">{record.raw_date}</td>
                  <td className="py-2.5 px-3 text-slate-300">
                    Qty: <span className="text-amber-400">{record.raw_quantity}</span> | Price: {record.raw_price}
                  </td>
                  <td className="py-2.5 px-3 font-sans">
                    <ul className="space-y-0.5">
                      {record.issues.map((issue, idx) => (
                        <li key={idx} className="text-[11px] text-amber-300 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-amber-400" />
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2.5 px-3 font-sans">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      record.cleansed_status === 'Rejected'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : record.cleansed_status === 'Normalized'
                        ? 'bg-blue-950 text-blue-300 border border-blue-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {record.cleansed_status === 'Rejected' && <AlertOctagon className="w-3 h-3" />}
                      {record.cleansed_status === 'Normalized' && <CheckCircle2 className="w-3 h-3" />}
                      {record.cleansed_status === 'Imputed' && <Sparkles className="w-3 h-3" />}
                      <span>{record.cleansed_status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Pipeline Execution Console Log */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-inner">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-slate-400">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Airflow / dbt ETL Pipeline Execution Logs</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
            SLO 99.98% Healthy
          </span>
        </div>
        <div className="space-y-1 font-mono text-xs text-slate-300 max-h-36 overflow-y-auto">
          {executionLogs.map((log, idx) => (
            <div key={idx} className="leading-relaxed">
              <span className="text-slate-500">{log.split(' ')[0]}</span>{' '}
              <span className={
                log.includes('[SUCCESS]') ? 'text-emerald-400 font-bold' :
                log.includes('[WARN]') ? 'text-amber-400' :
                log.includes('[ERROR]') ? 'text-rose-400 font-bold' :
                'text-slate-300'
              }>
                {log.substring(log.indexOf(' ') + 1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
