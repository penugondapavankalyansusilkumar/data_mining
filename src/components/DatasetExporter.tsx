/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Download, 
  FileSpreadsheet, 
  Database, 
  FileText, 
  Check, 
  Copy, 
  Eye, 
  Sparkles,
  Table
} from 'lucide-react';
import { 
  factSalesData, 
  dimCustomersData, 
  dimProductsData, 
  dimStoresData, 
  dimDatesData, 
  dimPromotionsData, 
  customerRFMData, 
  associationRulesData,
  sqlQueryCatalog 
} from '../data/mockWarehouseData';
import { documentationSections } from '../data/documentationData';

export const DatasetExporter: React.FC = () => {
  const [activePreview, setActivePreview] = useState<'fact_sales' | 'dim_customer' | 'dim_product' | 'dim_store' | 'rfm'>('fact_sales');
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  // Helper to convert array of objects to CSV string
  const arrayToCsv = (data: Record<string, any>[]): string => {
    if (!data.length) return '';
    const headers = Object.keys(data[0]);
    const rows = data.map(obj => 
      headers.map(header => {
        let val = obj[header];
        if (val === null || val === undefined) return '';
        if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return String(val);
      }).join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  };

  const handleDownloadCsv = (name: string, data: Record<string, any>[]) => {
    const csvContent = arrayToCsv(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showNotice(`Downloaded ${name}.csv`);
  };

  const handleDownloadSql = () => {
    const fullScript = sqlQueryCatalog.map(q => 
      `-- ========================================================\n-- ${q.title}\n-- ${q.description}\n-- ========================================================\n${q.sql}\n\n`
    ).join('\n');
    const blob = new Blob([fullScript], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `retail_sales_data_warehouse_complete_scripts.sql`;
    link.click();
    URL.revokeObjectURL(url);
    showNotice('Downloaded full SQL warehouse schema & queries script.');
  };

  const handleDownloadMarkdownThesis = () => {
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
    showNotice('Downloaded 12-Chapter Academic Project Report in Markdown.');
  };

  const showNotice = (msg: string) => {
    setDownloadSuccessMessage(msg);
    setTimeout(() => setDownloadSuccessMessage(null), 3000);
  };

  const getPreviewData = () => {
    switch (activePreview) {
      case 'fact_sales': return factSalesData;
      case 'dim_customer': return dimCustomersData;
      case 'dim_product': return dimProductsData;
      case 'dim_store': return dimStoresData;
      case 'rfm': return customerRFMData;
      default: return factSalesData;
    }
  };

  const currentPreviewData = getPreviewData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-purple-950 text-purple-400 border border-purple-800">
              Artifacts & Data Exporter
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800">
              CSV • SQL • Markdown
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1.5">
            Production Datasets, SQL Dumps & Documentation Downloads
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Export the conformed dimensional tables, fact sales transactions, customer RFM clusters, SQL DDL scripts, and complete documentation.
          </p>
        </div>

        {downloadSuccessMessage && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold animate-fade-in">
            <Check className="w-3.5 h-3.5" />
            <span>{downloadSuccessMessage}</span>
          </div>
        )}
      </div>

      {/* Download Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Fact Sales */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-cyan-500/50 transition-colors">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-cyan-400 uppercase font-mono">
              <span>Fact Table</span>
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mt-2">Fact_Sales.csv</h3>
            <p className="text-xs text-slate-400 mt-1">{factSalesData.length} atomic line items with additive gross, net, profit, and discount measures.</p>
          </div>
          <button
            onClick={() => handleDownloadCsv('Fact_Sales', factSalesData)}
            className="mt-4 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV</span>
          </button>
        </div>

        {/* Dim Customer (SCD2) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-blue-500/50 transition-colors">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-blue-400 uppercase font-mono">
              <span>Dimension (SCD2)</span>
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mt-2">Dim_Customer.csv</h3>
            <p className="text-xs text-slate-400 mt-1">{dimCustomersData.length} customer records including historical temporal versions.</p>
          </div>
          <button
            onClick={() => handleDownloadCsv('Dim_Customer', dimCustomersData)}
            className="mt-4 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV</span>
          </button>
        </div>

        {/* Full SQL DDL & Queries Script */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-indigo-500/50 transition-colors">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-indigo-400 uppercase font-mono">
              <span>SQL Warehouse Dump</span>
              <Database className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mt-2">warehouse_schema.sql</h3>
            <p className="text-xs text-slate-400 mt-1">Full DDL, SCD2 stored procedures, RFM NTILE queries, and OLAP cubes.</p>
          </div>
          <button
            onClick={handleDownloadSql}
            className="mt-4 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .SQL Script</span>
          </button>
        </div>

        {/* 12-Chapter Academic Report */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase font-mono">
              <span>Full Project Report</span>
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mt-2">Project_Thesis.md</h3>
            <p className="text-xs text-slate-400 mt-1">Complete 12-chapter academic presentation thesis with architectural diagrams.</p>
          </div>
          <button
            onClick={handleDownloadMarkdownThesis}
            className="mt-4 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .MD Thesis</span>
          </button>
        </div>
      </div>

      {/* Interactive In-Browser Data Grid Preview */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Live Tabular Dataset Explorer</h3>
            <span className="text-xs text-slate-400 font-mono">({currentPreviewData.length} records)</span>
          </div>

          {/* Table Switcher */}
          <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {(['fact_sales', 'dim_customer', 'dim_product', 'dim_store', 'rfm'] as const).map((tbl) => (
              <button
                key={tbl}
                onClick={() => setActivePreview(tbl)}
                className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  activePreview === tbl
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tbl}
              </button>
            ))}
          </div>
        </div>

        {/* Tabular Preview */}
        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 bg-slate-950">
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                {Object.keys(currentPreviewData[0] || {}).map((header, idx) => (
                  <th key={idx} className="py-2.5 px-3 whitespace-nowrap font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              {currentPreviewData.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-800/30">
                  {Object.values(row).map((val, cIdx) => (
                    <td key={cIdx} className="py-2 px-3 whitespace-nowrap text-slate-200">
                      {typeof val === 'boolean' ? (
                        <span className={val ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                          {val ? 'TRUE' : 'FALSE'}
                        </span>
                      ) : val === null ? (
                        <span className="text-slate-500 italic">NULL</span>
                      ) : (
                        String(val)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
