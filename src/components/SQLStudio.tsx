/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Code, 
  Play, 
  Copy, 
  Check, 
  Download, 
  Database, 
  Sparkles, 
  Terminal, 
  Clock, 
  CheckCircle2,
  Table
} from 'lucide-react';
import { sqlQueryCatalog } from '../data/mockWarehouseData';
import { SQLQueryItem } from '../types/warehouse';

export const SQLStudio: React.FC = () => {
  const [selectedQuery, setSelectedQuery] = useState<SQLQueryItem>(sqlQueryCatalog[0]);
  const [activeTab, setActiveTab] = useState<'editor' | 'results' | 'explain'>('editor');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [hasExecuted, setHasExecuted] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopySql = () => {
    navigator.clipboard.writeText(selectedQuery.sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setHasExecuted(true);
      setActiveTab('results');
    }, 400);
  };

  const handleDownloadAllSql = () => {
    const fullScript = sqlQueryCatalog.map(q => `-- ==========================================\n-- ${q.title}\n-- ${q.description}\n-- ==========================================\n${q.sql}\n\n`).join('\n');
    const blob = new Blob([fullScript], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'retail_sales_data_warehouse_complete_scripts.sql';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-indigo-950 text-indigo-400 border border-indigo-800">
              OLAP SQL Studio
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-cyan-950 text-cyan-400 border border-cyan-800">
              Window Functions & SCD2
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1.5">
            Data Warehouse SQL Engineering & Analytical Workbench
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Production PostgreSQL / Cloud SQL scripts for Star Schema DDL, Slowly Changing Dimension Type 2, 
            RFM quantile calculations, DENSE_RANK() windowing, and multidimensional OLAP cubes.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadAllSql}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Download All .SQL Scripts</span>
          </button>
          <button
            onClick={handleExecute}
            disabled={isExecuting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/25 ring-1 ring-blue-400/40"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{isExecuting ? 'Executing...' : 'Run Query'}</span>
          </button>
        </div>
      </div>

      {/* Query Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {sqlQueryCatalog.map((query) => (
          <button
            key={query.id}
            onClick={() => {
              setSelectedQuery(query);
              setHasExecuted(true);
            }}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              selectedQuery.id === query.id
                ? 'bg-blue-600 text-white font-semibold shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="text-[10px] text-cyan-300 uppercase block font-mono">{query.category}</div>
            <div className="truncate">{query.title}</div>
          </button>
        ))}
      </div>

      {/* Main SQL Console */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        {/* Console Toolbar */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white font-mono">{selectedQuery.title}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono">
              ANSI SQL / PostgreSQL
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  activeTab === 'editor' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                SQL Script
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  activeTab === 'results' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Query Output Table
              </button>
              <button
                onClick={() => setActiveTab('explain')}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  activeTab === 'explain' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Execution Plan (EXPLAIN)
              </button>
            </div>

            <button
              onClick={handleCopySql}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 border border-slate-800 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: SQL Editor */}
        {activeTab === 'editor' && (
          <div className="p-4 bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed max-h-[500px]">
            <pre className="text-emerald-300">{selectedQuery.sql}</pre>
          </div>
        )}

        {/* Tab 2: Execution Results */}
        {activeTab === 'results' && (
          <div className="p-4 bg-slate-950">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Query returned {selectedQuery.sampleResult?.length || 0} rows in 14.2 ms
              </span>
              <span>Memory Buffer: 2.1 MB</span>
            </div>

            {selectedQuery.sampleResult && selectedQuery.sampleResult.length > 0 ? (
              <div className="overflow-x-auto border border-slate-800 rounded-lg">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900 text-slate-300 font-mono">
                      {Object.keys(selectedQuery.sampleResult[0]).map((header, idx) => (
                        <th key={idx} className="py-2.5 px-3 whitespace-nowrap font-semibold">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono text-xs">
                    {selectedQuery.sampleResult.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-900/40">
                        {Object.values(row).map((val, cIdx) => (
                          <td key={cIdx} className="py-2.5 px-3 text-slate-200 whitespace-nowrap">
                            {String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-500 font-mono">
                Run query to view relational result set.
              </div>
            )}
          </div>
        )}

        {/* Tab 3: EXPLAIN Plan */}
        {activeTab === 'explain' && (
          <div className="p-5 bg-slate-950 font-mono text-xs text-slate-300 space-y-3">
            <div className="text-cyan-400 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> PostgreSQL Query Optimizer Execution Plan:
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-[11px] leading-relaxed">
              <div>-&gt; <strong>HashAggregate</strong> (cost=142.10..158.40 rows=12 width=48)</div>
              <div className="pl-4 text-emerald-400">-&gt; <strong>Hash Join</strong> (customer_sk = dim_customer.customer_sk)</div>
              <div className="pl-8 text-indigo-300">-&gt; <strong>Bitmap Heap Scan</strong> on fact_sales (Index: idx_fact_date)</div>
              <div className="pl-12 text-slate-400">Recheck Cond: (date_sk &gt;= 20240101)</div>
              <div className="pl-8 text-indigo-300">-&gt; <strong>Index Scan</strong> on dim_customer (customer_id, is_current=TRUE)</div>
            </div>
            <div className="text-slate-400 text-xs">
              <strong>Architectural Note:</strong> Star join execution leverages B-tree surrogate key indexes, achieving an <code className="text-cyan-300">O(1)</code> lookup cost per dimension without nested loop bottlenecks.
            </div>
          </div>
        )}

        {/* Footer Explanation */}
        <div className="bg-slate-950/80 px-4 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>{selectedQuery.explanation}</span>
          <span className="font-mono text-slate-500">Query ID: {selectedQuery.id}</span>
        </div>
      </div>
    </div>
  );
};
