/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  RotateCcw, 
  Play, 
  ShieldCheck, 
  Code, 
  Terminal, 
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import { testCasesData } from '../data/mockWarehouseData';
import { TestCase } from '../types/warehouse';

export const TestCaseRunner: React.FC = () => {
  const [testCases, setTestCases] = useState<TestCase[]>(testCasesData);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [allPassed, setAllPassed] = useState<boolean>(true);

  const handleRunAllTests = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setAllPassed(true);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800">
              CI/CD Pipeline Tests
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800">
              Automated Data Quality
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1.5">
            Warehouse Regression & Referential Integrity Test Suite
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Validates data quality, referential foreign key constraints, SCD Type 2 temporal uniqueness, and grain atomicity.
          </p>
        </div>

        <button
          onClick={handleRunAllTests}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/20 transition-all shrink-0"
        >
          {isRunning ? (
            <>
              <RotateCcw className="w-4 h-4 animate-spin" />
              <span>Validating Assertions...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Execute All Test Cases</span>
            </>
          )}
        </button>
      </div>

      {/* Test Cases Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60 font-mono">
                <th className="py-2.5 px-3">Test ID</th>
                <th className="py-2.5 px-3">Suite Category</th>
                <th className="py-2.5 px-3">Test Description</th>
                <th className="py-2.5 px-3">SQL Validation Query</th>
                <th className="py-2.5 px-3">Expected Outcome</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              {testCases.map((tc) => (
                <tr key={tc.id} className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-bold text-cyan-300">{tc.id}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                      {tc.suite}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-sans font-semibold text-white">
                    {tc.test_name}
                  </td>
                  <td className="py-2.5 px-3 text-slate-300 max-w-xs truncate" title={tc.sql_validation}>
                    <code className="text-emerald-300 text-[11px] bg-slate-950 px-2 py-0.5 rounded">
                      {tc.sql_validation}
                    </code>
                  </td>
                  <td className="py-2.5 px-3 font-sans text-slate-400">
                    {tc.expected_outcome}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" /> PASS
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
