/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Cpu, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  ShoppingBag, 
  ArrowRight, 
  Search, 
  Filter, 
  Sliders, 
  Sparkles,
  HelpCircle,
  Award,
  ShieldAlert,
  Compass
} from 'lucide-react';
import { customerRFMData, associationRulesData } from '../data/mockWarehouseData';
import { CustomerRFM, AssociationRule } from '../types/warehouse';

export const CustomerMiningStudio: React.FC = () => {
  const [activeMiningTab, setActiveMiningTab] = useState<'rfm' | 'apriori' | 'churn'>('rfm');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSegmentFilter, setSelectedSegmentFilter] = useState<string>('ALL');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRFM | null>(customerRFMData[0]);

  // Dynamic RFM Weights Sliders
  const [weightRecency, setWeightRecency] = useState<number>(33);
  const [weightFrequency, setWeightFrequency] = useState<number>(33);
  const [weightMonetary, setWeightMonetary] = useState<number>(34);

  // Filtered customer list
  const filteredCustomers = useMemo(() => {
    return customerRFMData.filter(cust => {
      const matchesSearch = cust.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            cust.customer_id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSegment = selectedSegmentFilter === 'ALL' || cust.segment_label === selectedSegmentFilter;
      return matchesSearch && matchesSegment;
    });
  }, [searchQuery, selectedSegmentFilter]);

  // Segment Counts and Revenue
  const segmentStats = useMemo(() => {
    const stats: Record<string, { count: number; totalRevenue: number }> = {
      Champions: { count: 0, totalRevenue: 0 },
      'Loyal Customers': { count: 0, totalRevenue: 0 },
      'Potential Loyalists': { count: 0, totalRevenue: 0 },
      'At Risk': { count: 0, totalRevenue: 0 },
      Hibernating: { count: 0, totalRevenue: 0 },
      Lost: { count: 0, totalRevenue: 0 },
    };

    customerRFMData.forEach(cust => {
      if (stats[cust.segment_label]) {
        stats[cust.segment_label].count += 1;
        stats[cust.segment_label].totalRevenue += cust.monetary_total;
      }
    });

    return stats;
  }, []);

  const totalEnterpriseRevenue = useMemo(() => {
    return customerRFMData.reduce((acc, curr) => acc + curr.monetary_total, 0);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-purple-950 text-purple-400 border border-purple-800">
              Customer Analytics & Data Mining
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-indigo-950 text-indigo-400 border border-indigo-800">
              RFM & Association Rules
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1.5">
            Algorithmic Customer Segmentation & Basket Mining Studio
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Quantile-based RFM scoring, churn risk detection curves, and Apriori association rule mining for cross-sell recommendations.
          </p>
        </div>

        {/* Mining View Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveMiningTab('rfm')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeMiningTab === 'rfm'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>RFM Segmentation</span>
          </button>
          <button
            onClick={() => setActiveMiningTab('apriori')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeMiningTab === 'apriori'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Market Basket (Apriori)</span>
          </button>
          <button
            onClick={() => setActiveMiningTab('churn')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeMiningTab === 'churn'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Churn Risk & Retention</span>
          </button>
        </div>
      </div>

      {activeMiningTab === 'rfm' && (
        <div className="space-y-6">
          {/* Segment Summary Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.entries(segmentStats).map(([segmentName, data]) => {
              const revShare = ((data.totalRevenue / totalEnterpriseRevenue) * 100).toFixed(1);
              const isSelected = selectedSegmentFilter === segmentName;

              return (
                <button
                  key={segmentName}
                  onClick={() => setSelectedSegmentFilter(isSelected ? 'ALL' : segmentName)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-purple-950/60 border-purple-400 ring-2 ring-purple-500/50 shadow-md'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">{segmentName}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                      {data.count}
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-extrabold text-cyan-300 font-mono">
                    ${data.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {revShare}% of revenue
                  </div>
                </button>
              );
            })}
          </div>

          {/* 2D Cluster Visual Map & Customer Table Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Customer Table & Filters */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search customer name or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="text-xs text-slate-400">
                    Showing <span className="font-bold text-white">{filteredCustomers.length}</span> customer profiles
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60 font-mono">
                        <th className="py-2.5 px-3">Customer</th>
                        <th className="py-2.5 px-3">Recency (R)</th>
                        <th className="py-2.5 px-3">Freq (F)</th>
                        <th className="py-2.5 px-3">Monetary (M)</th>
                        <th className="py-2.5 px-3">RFM Score</th>
                        <th className="py-2.5 px-3">Segment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                      {filteredCustomers.map((cust) => (
                        <tr
                          key={cust.customer_id}
                          onClick={() => setSelectedCustomer(cust)}
                          className={`cursor-pointer transition-colors ${
                            selectedCustomer?.customer_id === cust.customer_id
                              ? 'bg-purple-950/40 text-white'
                              : 'hover:bg-slate-800/30 text-slate-200'
                          }`}
                        >
                          <td className="py-2.5 px-3">
                            <div className="font-bold text-white font-sans">{cust.full_name}</div>
                            <div className="text-[10px] text-slate-400">{cust.customer_id} • {cust.region}</div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="font-bold text-slate-100">{cust.recency_days}d</span>
                            <span className="text-[10px] text-slate-400 ml-1">(R{cust.r_score})</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="font-bold text-slate-100">{cust.frequency_orders}</span>
                            <span className="text-[10px] text-slate-400 ml-1">(F{cust.f_score})</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="font-bold text-cyan-300">${cust.monetary_total.toFixed(2)}</span>
                            <span className="text-[10px] text-slate-400 ml-1">(M{cust.m_score})</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-indigo-300 border border-slate-700">
                              {cust.rfm_score}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-sans">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              cust.segment_label === 'Champions' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                              cust.segment_label === 'Loyal Customers' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                              cust.segment_label === 'Potential Loyalists' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
                              cust.segment_label === 'At Risk' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                              'bg-rose-950 text-rose-300 border border-rose-800'
                            }`}>
                              {cust.segment_label}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* RFM Methodology Explanation */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-indigo-400" />
                  Statistical NTILE(5) Quantile Quintile Scoring:
                </div>
                <p className="leading-relaxed text-slate-400">
                  Customers are partitioned into 5 statistical quintiles for Recency, Frequency, and Monetary spend using the SQL window function <code className="text-cyan-300 font-mono">NTILE(5) OVER (...)</code>. 
                  Unlike subjective arbitrary rules, statistical quintiles adapt automatically to seasonal shifts in transaction volume.
                </p>
              </div>
            </div>

            {/* Right Col: Selected Customer Drill-Down & Retention Card */}
            <div className="lg:col-span-1">
              {selectedCustomer ? (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sticky top-20 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                      Customer Profile & Action
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-800">
                      Tier: {selectedCustomer.loyalty_tier}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedCustomer.full_name}</h3>
                    <p className="text-xs text-slate-400 font-mono">{selectedCustomer.customer_id} • Region: {selectedCustomer.region}</p>
                    <div className="mt-2 inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                      Segment: {selectedCustomer.segment_label} (RFM {selectedCustomer.rfm_score})
                    </div>
                  </div>

                  {/* Quantitative Metrics */}
                  <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-500 uppercase block">Total Lifetime Spend</span>
                      <span className="text-sm font-bold text-cyan-300">${selectedCustomer.monetary_total.toFixed(2)}</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-500 uppercase block">Avg Basket Value</span>
                      <span className="text-sm font-bold text-white">${selectedCustomer.avg_basket_value.toFixed(2)}</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-500 uppercase block">Recency (Elapsed)</span>
                      <span className="text-sm font-bold text-amber-300">{selectedCustomer.recency_days} days</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-500 uppercase block">Total Orders</span>
                      <span className="text-sm font-bold text-white">{selectedCustomer.frequency_orders} checkouts</span>
                    </div>
                  </div>

                  {/* Churn Risk Bar */}
                  <div className="pt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Churn Risk Score
                      </span>
                      <span className={`font-mono font-bold ${
                        selectedCustomer.churn_probability > 0.6 ? 'text-rose-400' :
                        selectedCustomer.churn_probability > 0.2 ? 'text-amber-400' :
                        'text-emerald-400'
                      }`}>
                        {(selectedCustomer.churn_probability * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          selectedCustomer.churn_probability > 0.6 ? 'bg-rose-500' :
                          selectedCustomer.churn_probability > 0.2 ? 'bg-amber-500' :
                          'bg-emerald-500'
                        }`}
                        style={{ width: `${selectedCustomer.churn_probability * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Playbook */}
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Algorithmic Retention Action:
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedCustomer.suggested_action}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-500 bg-slate-900 border border-slate-800 rounded-xl">
                  Select a customer to inspect profile and retention actions.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeMiningTab === 'apriori' && (
        <div className="space-y-6">
          {/* Apriori Explanation Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">
                Market Basket Analysis (Apriori Association Mining)
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
              Market basket analysis calculates co-occurrence probabilities of retail items purchased within the same checkout basket. 
              The mathematical foundations rely on <span className="text-cyan-300 font-semibold">Support</span> (frequency of co-occurrence), <span className="text-indigo-300 font-semibold">Confidence</span> (conditional probability P(B|A)), and <span className="text-emerald-300 font-semibold">Lift</span> (ratio of observed joint probability to expected random chance).
            </p>

            {/* Mathematical Formulas Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Support P(A ∩ B)</span>
                <span className="text-cyan-300 font-bold">Count(A & B) / Total Orders</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Confidence P(B | A)</span>
                <span className="text-indigo-300 font-bold">Support(A ∩ B) / Support(A)</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Lift Factor</span>
                <span className="text-emerald-300 font-bold">Confidence(A-&gt;B) / Support(B)</span>
              </div>
            </div>
          </div>

          {/* Association Rules Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4">
              Discovered Association Rules (Ranked by Lift Factor)
            </h4>
            <div className="space-y-4">
              {associationRulesData.map((rule, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 hover:border-indigo-700/60 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Item Pair */}
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1.5 rounded-lg bg-blue-950 text-blue-200 border border-blue-800 text-xs font-semibold">
                        {rule.antecedent.join(', ')}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
                      <span className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-200 border border-emerald-800 text-xs font-semibold">
                        {rule.consequent.join(', ')}
                      </span>
                    </div>

                    {/* Metrics Badges */}
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <div className="text-center">
                        <span className="text-[10px] text-slate-500 block uppercase">Support</span>
                        <span className="font-bold text-slate-200">{(rule.support * 100).toFixed(0)}%</span>
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] text-slate-500 block uppercase">Confidence</span>
                        <span className="font-bold text-indigo-300">{(rule.confidence * 100).toFixed(0)}%</span>
                      </div>
                      <div className="text-center bg-emerald-950/60 px-3 py-1 rounded border border-emerald-800">
                        <span className="text-[10px] text-emerald-400 block uppercase">Lift</span>
                        <span className="font-extrabold text-emerald-300">{rule.lift.toFixed(2)}x</span>
                      </div>
                    </div>
                  </div>

                  {/* Commercial Action */}
                  <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-start gap-2 text-xs text-slate-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                    <span><strong className="text-white">Merchandising Execution:</strong> {rule.business_action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeMiningTab === 'churn' && (
        <div className="space-y-6">
          {/* Churn Risk Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-xs font-semibold text-rose-400 flex items-center gap-1.5 uppercase">
                <AlertTriangle className="w-4 h-4" /> High Risk (Churn &gt; 70%)
              </div>
              <div className="text-2xl font-extrabold text-white mt-2 font-mono">
                {customerRFMData.filter(c => c.churn_probability >= 0.7).length} Customers
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Average elapsed inactivity of 320+ days. Requires urgent win-back voucher.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 uppercase">
                <AlertTriangle className="w-4 h-4" /> Medium Risk (20% - 69%)
              </div>
              <div className="text-2xl font-extrabold text-white mt-2 font-mono">
                {customerRFMData.filter(c => c.churn_probability >= 0.2 && c.churn_probability < 0.7).length} Customers
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Single or double purchase customers slipping into inactivity.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 uppercase">
                <Award className="w-4 h-4" /> Safe Active Tier (Churn &lt; 20%)
              </div>
              <div className="text-2xl font-extrabold text-white mt-2 font-mono">
                {customerRFMData.filter(c => c.churn_probability < 0.2).length} Customers
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Regular repeat shoppers. Generating 71% of total enterprise margin.
              </p>
            </div>
          </div>

          {/* Retention Automation Playbook Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-white mb-3">
              Automated Retention Triggers & Marketing Workflows
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60 font-mono">
                    <th className="py-2.5 px-3">Segment Cohort</th>
                    <th className="py-2.5 px-3">Inactivity Trigger</th>
                    <th className="py-2.5 px-3">Channel Used</th>
                    <th className="py-2.5 px-3">Automated Promotional Incentive</th>
                    <th className="py-2.5 px-3">Target Conversion Goal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans text-xs">
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-bold text-amber-300">At Risk (High Historic Value)</td>
                    <td className="py-2.5 px-3 font-mono text-slate-300">&gt; 180 days no order</td>
                    <td className="py-2.5 px-3 text-slate-300">Personalized Direct Email + SMS</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-semibold">$25 Gift Card on $75+ cart</td>
                    <td className="py-2.5 px-3 font-mono text-slate-300">Reactivate within 14 days</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-bold text-cyan-300">Potential Loyalists</td>
                    <td className="py-2.5 px-3 font-mono text-slate-300">30 days after 1st order</td>
                    <td className="py-2.5 px-3 text-slate-300">Mobile Push Notification</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-semibold">Double Loyalty Points on 2nd checkout</td>
                    <td className="py-2.5 px-3 font-mono text-slate-300">Habit formation (Order #2)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-bold text-purple-300">Champions</td>
                    <td className="py-2.5 px-3 font-mono text-slate-300">Every 45 days</td>
                    <td className="py-2.5 px-3 text-slate-300">VIP Concierge / Dedicated In-App</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-semibold">Exclusive VIP preview & free gift</td>
                    <td className="py-2.5 px-3 font-mono text-slate-300">100% Brand Advocacy</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-bold text-slate-400">Lost Customers</td>
                    <td className="py-2.5 px-3 font-mono text-slate-300">&gt; 330 days no order</td>
                    <td className="py-2.5 px-3 text-slate-300">Low-cost Monthly Newsletter</td>
                    <td className="py-2.5 px-3 text-slate-300">Free shipping coupon code</td>
                    <td className="py-2.5 px-3 font-mono text-slate-300">Zero ad spend waste</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
