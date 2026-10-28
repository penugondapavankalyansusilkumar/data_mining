/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingBag, 
  Percent, 
  Filter, 
  Code2, 
  Copy, 
  Check, 
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { 
  factSalesData, 
  dimProductsData, 
  dimStoresData, 
  dimDatesData, 
  dimCustomersData, 
  daxMeasuresCatalog 
} from '../data/mockWarehouseData';
import { DAXFormulaItem } from '../types/warehouse';

export const PowerBIDashboard: React.FC = () => {
  // Slicers / Filters
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedQuarter, setSelectedQuarter] = useState<string>('ALL');
  const [selectedChannel, setSelectedChannel] = useState<string>('ALL');
  const [activeDaxModal, setActiveDaxModal] = useState<DAXFormulaItem | null>(null);
  const [copiedDaxId, setCopiedDaxId] = useState<string | null>(null);

  // Map stores and products to facts for filtering
  const enrichedFacts = useMemo(() => {
    const storeMap = new Map(dimStoresData.map(s => [s.store_sk, s]));
    const productMap = new Map(dimProductsData.map(p => [p.product_sk, p]));
    const dateMap = new Map(dimDatesData.map(d => [d.date_sk, d]));

    return factSalesData.map(fact => ({
      ...fact,
      store: storeMap.get(fact.store_sk),
      product: productMap.get(fact.product_sk),
      date: dateMap.get(fact.date_sk),
    }));
  }, []);

  // Filtered dataset
  const filteredFacts = useMemo(() => {
    return enrichedFacts.filter(item => {
      const matchRegion = selectedRegion === 'ALL' || item.store?.region === selectedRegion;
      const matchQuarter = selectedQuarter === 'ALL' || item.date?.quarter === selectedQuarter;
      const matchChannel = selectedChannel === 'ALL' || item.channel === selectedChannel;
      return matchRegion && matchQuarter && matchChannel;
    });
  }, [enrichedFacts, selectedRegion, selectedQuarter, selectedChannel]);

  // Aggregate KPIs
  const totalNetSales = useMemo(() => {
    return filteredFacts.reduce((sum, item) => sum + item.net_amount, 0);
  }, [filteredFacts]);

  const totalProfit = useMemo(() => {
    return filteredFacts.reduce((sum, item) => sum + item.profit_amount, 0);
  }, [filteredFacts]);

  const profitMarginPct = useMemo(() => {
    return totalNetSales > 0 ? (totalProfit / totalNetSales) * 100 : 0;
  }, [totalNetSales, totalProfit]);

  const distinctOrdersCount = useMemo(() => {
    return new Set(filteredFacts.map(item => item.order_id)).size;
  }, [filteredFacts]);

  const averageOrderValue = useMemo(() => {
    return distinctOrdersCount > 0 ? totalNetSales / distinctOrdersCount : 0;
  }, [totalNetSales, distinctOrdersCount]);

  // Monthly breakdown for Trend visual
  const monthlyData = useMemo(() => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const acc: Record<string, { revenue: number; profit: number }> = {};
    months.forEach(m => { acc[m] = { revenue: 0, profit: 0 }; });

    filteredFacts.forEach(item => {
      const month = item.date?.month_name;
      if (month && acc[month]) {
        acc[month].revenue += item.net_amount;
        acc[month].profit += item.profit_amount;
      }
    });

    const maxMonthRev = Math.max(...Object.values(acc).map(v => v.revenue), 100);

    return months.map(m => ({
      month: m.substring(0, 3),
      fullMonth: m,
      revenue: acc[m].revenue,
      profit: acc[m].profit,
      heightPct: Math.round((acc[m].revenue / maxMonthRev) * 100)
    }));
  }, [filteredFacts]);

  // Regional breakdown
  const regionalPerformance = useMemo(() => {
    const regions = ['West', 'East', 'Central', 'South'];
    const targets: Record<string, number> = { West: 4000, East: 2500, Central: 1800, South: 1500 };

    return regions.map(reg => {
      const regSales = filteredFacts
        .filter(item => item.store?.region === reg)
        .reduce((sum, item) => sum + item.net_amount, 0);
      const target = targets[reg] || 2000;
      const attainmentPct = Math.min(Math.round((regSales / target) * 100), 140);

      return {
        region: reg,
        sales: regSales,
        target,
        attainmentPct
      };
    });
  }, [filteredFacts]);

  // Top 5 Products
  const topProducts = useMemo(() => {
    const map: Record<string, { name: string; category: string; units: number; revenue: number; profit: number }> = {};
    filteredFacts.forEach(item => {
      const name = item.product?.product_name || 'Unknown Product';
      const cat = item.product?.category || 'General';
      if (!map[name]) {
        map[name] = { name, category: cat, units: 0, revenue: 0, profit: 0 };
      }
      map[name].units += item.quantity;
      map[name].revenue += item.net_amount;
      map[name].profit += item.profit_amount;
    });

    return Object.values(map)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [filteredFacts]);

  const handleCopyDax = (dax: string, id: string) => {
    navigator.clipboard.writeText(dax);
    setCopiedDaxId(id);
    setTimeout(() => setCopiedDaxId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Power BI Canvas Header & Slicer Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold font-mono">
              BI
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Executive Sales Performance Dashboard
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  DirectQuery Active
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Interactive Power BI Tabular Model with Star Schema Relationships and Explicit DAX Measures
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveDaxModal(daxMeasuresCatalog[0])}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800 hover:bg-indigo-900 transition-colors shrink-0"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Inspect DAX Measures Repository</span>
          </button>
        </div>

        {/* Dynamic Slicers / Filters Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Region Slicer */}
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-slate-400 font-medium">Region:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none flex-1 cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">All Regions (National)</option>
              <option value="West" className="bg-slate-900">West (Pacific Flagship)</option>
              <option value="East" className="bg-slate-900">East (Manhattan Grand)</option>
              <option value="Central" className="bg-slate-900">Central (Midwest Mega)</option>
              <option value="South" className="bg-slate-900">South (Southwest Express)</option>
            </select>
          </div>

          {/* Quarter Slicer */}
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
            <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-slate-400 font-medium">Time Period:</span>
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none flex-1 cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">Full Fiscal Year 2024</option>
              <option value="Q1" className="bg-slate-900">Q1 (Jan - Mar)</option>
              <option value="Q2" className="bg-slate-900">Q2 (Apr - Jun)</option>
              <option value="Q3" className="bg-slate-900">Q3 (Jul - Sep)</option>
              <option value="Q4" className="bg-slate-900">Q4 (Oct - Dec / Holidays)</option>
            </select>
          </div>

          {/* Channel Slicer */}
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
            <Layers className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="text-slate-400 font-medium">Channel:</span>
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none flex-1 cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">All Omnichannel Points</option>
              <option value="In-Store POS" className="bg-slate-900">In-Store Brick & Mortar POS</option>
              <option value="E-Commerce" className="bg-slate-900">Web E-Commerce Store</option>
              <option value="Mobile App" className="bg-slate-900">Mobile Native App</option>
            </select>
          </div>
        </div>
      </div>

      {/* 5 Executive KPI Cards Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* KPI 1: Total Sales */}
        <div 
          onClick={() => setActiveDaxModal(daxMeasuresCatalog[0])}
          className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-4 rounded-xl shadow-md cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Net Sales</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-xl font-extrabold text-white font-mono">
            ${totalNetSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
            <span>DAX: SUM(Fact_Sales)</span>
            <Code2 className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* KPI 2: YoY Growth */}
        <div 
          onClick={() => setActiveDaxModal(daxMeasuresCatalog[1])}
          className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-4 rounded-xl shadow-md cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">YoY Growth %</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-xl font-extrabold text-emerald-400 font-mono">
            +18.4%
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
            <span>vs Prior Year SPLY</span>
            <Code2 className="w-3 h-3 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* KPI 3: Customer Retention Rate */}
        <div 
          onClick={() => setActiveDaxModal(daxMeasuresCatalog[2])}
          className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 p-4 rounded-xl shadow-md cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Retention Rate</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2 text-xl font-extrabold text-indigo-300 font-mono">
            84.2%
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
            <span>Rolling 90-Day Cohort</span>
            <Code2 className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* KPI 4: Average Order Value */}
        <div 
          onClick={() => setActiveDaxModal(daxMeasuresCatalog[3])}
          className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-4 rounded-xl shadow-md cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Avg Order Value</span>
            <ShoppingBag className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-xl font-extrabold text-amber-300 font-mono">
            ${averageOrderValue.toFixed(2)}
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
            <span>{distinctOrdersCount} distinct checkouts</span>
            <Code2 className="w-3 h-3 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* KPI 5: Net Profit Margin */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Net Profit Margin</span>
            <Percent className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 text-xl font-extrabold text-purple-300 font-mono">
            {profitMarginPct.toFixed(1)}%
          </div>
          <div className="mt-1 text-[10px] text-slate-400">
            ${totalProfit.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} realized profit
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Sales & Profit Trajectory (Bar / Trend Visual) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Monthly Sales & Net Profit Trajectory (2024)</h3>
                <p className="text-xs text-slate-400">Aggregated across active filter dimensions</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-cyan-400 font-mono">
                  <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500" /> Net Sales ($)
                </span>
                <span className="flex items-center gap-1.5 text-indigo-400 font-mono">
                  <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500" /> Profit ($)
                </span>
              </div>
            </div>

            {/* Simulated Chart Bars */}
            <div className="h-48 flex items-end justify-between gap-1 sm:gap-2 pt-6 border-b border-slate-800">
              {monthlyData.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 border border-slate-700 px-2 py-1 rounded text-[10px] font-mono pointer-events-none z-20 whitespace-nowrap">
                    {item.fullMonth}: ${item.revenue.toFixed(0)} (Profit: ${item.profit.toFixed(0)})
                  </div>

                  <div className="w-full max-w-[28px] flex flex-col items-center justify-end h-full">
                    {/* Revenue Bar */}
                    <div
                      className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-sm transition-all duration-500 group-hover:brightness-125"
                      style={{ height: `${Math.max(item.heightPct, 4)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Month Labels */}
            <div className="flex justify-between text-[10px] text-slate-400 pt-2 font-mono">
              {monthlyData.map((item, idx) => (
                <div key={idx} className="flex-1 text-center truncate">
                  {item.month}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Peak Month: <strong>November (Black Friday Sales)</strong></span>
            <span className="font-mono text-cyan-400">Total YTD: ${totalNetSales.toFixed(2)}</span>
          </div>
        </div>

        {/* Regional Performance vs Target Quotas */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Regional Sales Quota Target</h3>
            <span className="text-[10px] font-mono text-slate-400">FY24 Goal</span>
          </div>

          <div className="space-y-3 pt-1">
            {regionalPerformance.map((rp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-200">{rp.region} Territory</span>
                  <span className="font-mono text-slate-300">
                    ${rp.sales.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} / ${rp.target.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      rp.attainmentPct >= 100 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
                      rp.attainmentPct >= 70 ? 'bg-gradient-to-r from-blue-500 to-cyan-400' :
                      'bg-gradient-to-r from-amber-500 to-orange-400'
                    }`}
                    style={{ width: `${Math.min(rp.attainmentPct, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Quota Attainment</span>
                  <span className={rp.attainmentPct >= 100 ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                    {rp.attainmentPct}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
            <strong className="text-cyan-300">Territory Insight:</strong> The West region achieved 130% of baseline target, propelled by flagship superstore foot traffic and online fulfillment efficiency.
          </div>
        </div>
      </div>

      {/* Top 5 Products Table & Category Ranking */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white">Top 5 Best-Selling Products by Realized Revenue</h3>
          <span className="text-xs text-slate-400">Ranked by Net Sales</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60 font-mono">
                <th className="py-2.5 px-3">Rank</th>
                <th className="py-2.5 px-3">Product Title</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3 text-right">Units Sold</th>
                <th className="py-2.5 px-3 text-right">Net Revenue</th>
                <th className="py-2.5 px-3 text-right">Profit Generated</th>
                <th className="py-2.5 px-3 text-right">Margin %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              {topProducts.map((p, idx) => {
                const margin = p.revenue > 0 ? (p.profit / p.revenue) * 100 : 0;
                return (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-bold text-cyan-400">#{idx + 1}</td>
                    <td className="py-2.5 px-3 font-sans font-semibold text-white">{p.name}</td>
                    <td className="py-2.5 px-3 text-slate-400">{p.category}</td>
                    <td className="py-2.5 px-3 text-right text-slate-200">{p.units}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-cyan-300">${p.revenue.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">${p.profit.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-200">
                        {margin.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* DAX Measures Modal / Drawer */}
      {activeDaxModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white font-mono">{activeDaxModal.name}</h3>
              </div>
              <button
                onClick={() => setActiveDaxModal(null)}
                className="text-slate-400 hover:text-white text-sm px-2 py-1 rounded bg-slate-800"
              >
                Close (ESC)
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeDaxModal.explanation}
            </p>

            {/* DAX Code Box */}
            <div className="relative">
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-emerald-300 font-mono overflow-x-auto leading-relaxed">
                {activeDaxModal.dax}
              </pre>
              <button
                onClick={() => handleCopyDax(activeDaxModal.dax, activeDaxModal.id)}
                className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200 border border-slate-700 transition-colors"
              >
                {copiedDaxId === activeDaxModal.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy DAX</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs">
              <span className="text-slate-400">Calculated Model Value: <strong className="text-white font-mono">{activeDaxModal.resultValue}</strong></span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-800">
                {activeDaxModal.category}
              </span>
            </div>

            {/* Other DAX Measures Switcher */}
            <div className="pt-3 border-t border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-2">
                Explore Other Production DAX Measures:
              </span>
              <div className="flex flex-wrap gap-2">
                {daxMeasuresCatalog.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveDaxModal(m)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      activeDaxModal.id === m.id
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
