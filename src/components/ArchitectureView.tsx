/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Server, 
  ArrowRight, 
  Database, 
  Cpu, 
  BarChart3, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  Info,
  CheckCircle2,
  GitBranch,
  Layers
} from 'lucide-react';

interface ArchNode {
  id: string;
  tier: string;
  title: string;
  type: string;
  tech: string;
  latency: string;
  description: string;
  metrics: { label: string; value: string }[];
  details: string[];
}

const architectureNodes: ArchNode[] = [
  {
    id: 'src-pos',
    tier: 'Tier 1: Data Sources',
    title: 'In-Store POS Terminals',
    type: 'Transactional OLTP',
    tech: 'PostgreSQL / Debezium CDC',
    latency: 'Sub-minute Delta Streams',
    description: 'Physical brick-and-mortar register checkouts logging cash and card transactions, barcode scans, and localized register IDs.',
    metrics: [
      { label: 'Throughput', value: '~450 tx/min peak' },
      { label: 'Ingestion Mode', value: 'CDC Binlog Streaming' },
      { label: 'Format', value: 'Avro / Parquet' }
    ],
    details: [
      'Extracts transaction receipts including item UPCs, quantities, store IDs, and cashier timestamps.',
      'Uses Change Data Capture (CDC) to eliminate lock contention on production register checkout databases.',
      'Resilient local buffering enables offline queueing during store network disconnects.'
    ]
  },
  {
    id: 'src-ecom',
    tier: 'Tier 1: Data Sources',
    title: 'E-Commerce Web Store',
    type: 'Web Storefront',
    tech: 'Shopify / REST Webhooks',
    latency: 'Event-driven (Near Real-time)',
    description: 'High-volume digital storefront processing web shopping carts, digital wallet checkouts, and shipping address payloads.',
    metrics: [
      { label: 'Daily Orders', value: '~2,800 orders/day' },
      { label: 'Protocol', value: 'HTTPS JSON Webhooks' },
      { label: 'Payload', value: 'JSON Schema v2' }
    ],
    details: [
      'Dispatches asynchronous order.created and payment.settled webhook events to the ingestion gateway.',
      'Carries web tracking identifiers (UTM codes, session IDs) for multi-channel digital attribution.',
      'Applies idempotency token deduplication at the API gateway layer.'
    ]
  },
  {
    id: 'src-mobile',
    tier: 'Tier 1: Data Sources',
    title: 'Mobile Shopping App',
    type: 'App Client Event Log',
    tech: 'Firebase / Kafka Streams',
    latency: 'Streaming JSON Batches',
    description: 'Native iOS & Android mobile shopping application logging in-app browsing, mobile wallet payments, and personalized deal redemptions.',
    metrics: [
      { label: 'Active Users', value: '18,500 MAU' },
      { label: 'Event Latency', value: '< 2 seconds' },
      { label: 'Authentication', value: 'OAuth 2.0 / JWT' }
    ],
    details: [
      'Captures in-app product clicks, add-to-wishlist interactions, and 1-click mobile checkout receipts.',
      'Streams micro-batches every 60 seconds into ingestion message queues.',
      'Tracks mobile push notification coupon redemption codes.'
    ]
  },
  {
    id: 'etl-cleanse',
    tier: 'Tier 2: ETL & Staging Gate',
    title: 'Automated Cleansing & Quarantine Gate',
    type: 'Data Quality Engine',
    tech: 'Apache Airflow + Python / Great Expectations',
    latency: 'Hourly Micro-Batch (T+5 min)',
    description: 'Enforces schema validation, date normalization, negative quantity filters, price imputation, and quarantine of corrupt records.',
    metrics: [
      { label: 'Pass Rate', value: '97.2%' },
      { label: 'Quarantine SLA', value: '< 15 min review' },
      { label: 'Dedupe Strategy', value: 'Hash Natural Keys' }
    ],
    details: [
      'Validates all dates into ISO 8601 and converts to integer Date SK (YYYYMMDD).',
      'Filters fatal corruptions (quantity <= 0, invalid email syntax) into dead-letter tables.',
      'Imputes missing prices against Dim_Product master catalog based on SKU code.'
    ]
  },
  {
    id: 'scd-engine',
    tier: 'Tier 3: Transformation & Conforming',
    title: 'SCD Type 2 & Surrogate Key Engine',
    type: 'Dimensional Transformer',
    tech: 'dbt (Data Build Tool) / SQL MERGE',
    latency: 'Batch Scheduled (Daily 02:00 UTC)',
    description: 'Tracks temporal evolution of customer addresses and loyalty tiers without losing historical accuracy.',
    metrics: [
      { label: 'SCD Strategy', value: 'Kimball Type 2' },
      { label: 'Surrogate Keys', value: 'BIGINT Sequence' },
      { label: 'Temporal State', value: 'valid_from / valid_to' }
    ],
    details: [
      'Detects customer profile modifications by comparing MD5 row hashes.',
      'Closes historical version by setting valid_to = CURRENT_DATE and is_current = FALSE.',
      'Inserts new surrogate row with is_current = TRUE, preserving historical sales attribution.'
    ]
  },
  {
    id: 'dw-gold',
    tier: 'Tier 4: Enterprise Data Warehouse',
    title: 'Dimensional Star Schema (Gold Layer)',
    type: 'Enterprise Warehouse',
    tech: 'PostgreSQL / Snowflake / Cloud SQL OLAP',
    latency: 'Sub-second Read Queries',
    description: 'Centralized Fact_Sales surrounded by conformed dimensions (Customer, Product, Store, Date, Promotion) optimized for OLAP analytics.',
    metrics: [
      { label: 'Fact Grain', value: '1 Row per Order Line' },
      { label: 'Table Count', value: '1 Fact, 5 Dimensions' },
      { label: 'Join Cost', value: 'O(1) B-tree Index Scan' }
    ],
    details: [
      'Fact_Sales stores additive measures: gross, discount, net, cost, and net profit.',
      'Role-playing Dim_Date table enables holiday, weekend, and fiscal quarter rollups without non-sargable functions.',
      'Surrogate foreign keys guarantee referential integrity and fast bitmap star-join query plans.'
    ]
  },
  {
    id: 'mining-rfm',
    tier: 'Tier 5: Customer Mining Engine',
    title: 'RFM & Algorithmic Segmentation',
    type: 'Machine Learning / Unsupervised',
    tech: 'SQL NTILE(5) + K-Means Python',
    latency: 'Weekly Clustering Refresh',
    description: 'Calculates Recency, Frequency, and Monetary quintiles to cluster shoppers into Champions, Loyalists, At Risk, and Hibernating cohorts.',
    metrics: [
      { label: 'Quantiles', value: '5-Point Scale (1-5)' },
      { label: 'Cohorts', value: '6 Actionable Segments' },
      { label: 'Churn Horizon', value: '90-Day Decay Curve' }
    ],
    details: [
      'Computes statistical quantiles dynamically without manual threshold bias.',
      'Identifies top 25% high-value customer cluster driving 71% of total enterprise profit.',
      'Assigns quantitative churn risk probability based on elapsed recency days.'
    ]
  },
  {
    id: 'mining-apriori',
    tier: 'Tier 5: Customer Mining Engine',
    title: 'Market Basket Association (Apriori)',
    type: 'Affinity Data Mining',
    tech: 'Apriori Algorithm / Association Rules',
    latency: 'Bi-Weekly Matrix Calculation',
    description: 'Uncovers frequent itemsets and co-purchase patterns across transaction order baskets to power automated cross-sell bundles.',
    metrics: [
      { label: 'Min Support', value: '15%' },
      { label: 'Min Confidence', value: '55%' },
      { label: 'Top Lift', value: '2.93x' }
    ],
    details: [
      'Filters spurious correlations using Lift metric: Lift = P(A ∩ B) / (P(A) * P(B)).',
      'Identified prime bundle: Espresso Machine -> Conical Burr Grinder (Lift 2.93x, Confidence 82%).',
      'Feeds automated cross-sell product recommendation drawers on digital checkout pages.'
    ]
  },
  {
    id: 'bi-powerbi',
    tier: 'Tier 6: BI & Executive Dashboards',
    title: 'Power BI & DAX Reporting Studio',
    type: 'Business Intelligence',
    tech: 'Power BI / Tabular DAX / DirectQuery',
    latency: 'Real-time Interactive Visuals',
    description: 'Interactive executive KPI cards, monthly revenue trajectories, regional sales rankings, and customer segment treemaps.',
    metrics: [
      { label: 'DAX Measures', value: '18 Explicit Formulas' },
      { label: 'Cross-filtering', value: 'Single-direction 1:N' },
      { label: 'Refresh Rate', value: 'Scheduled + On-demand' }
    ],
    details: [
      'Computes complex time-intelligence metrics: YoY Sales Growth % and Rolling 90-Day Retention Rate %.',
      'Empowers retail merchandisers and executive leadership with drill-through capability from nationwide sales down to line items.',
      'Provides exportable executive reports and automated alert triggers when churn risk spikes.'
    ]
  }
];

export const ArchitectureView: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ArchNode>(architectureNodes[5]); // Default to Star Schema

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-900/40 text-blue-300 border border-blue-700/50 mb-3">
            <Layers className="w-3.5 h-3.5" /> Multi-Tier Enterprise Architecture
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            End-to-End Retail Data Warehouse & Mining Topology
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            From omnichannel transaction ingestion (POS, Web, Mobile) through automated quality cleansing gates, 
            Kimball Star Schema storage with SCD Type 2 tracking, to algorithmic customer mining (RFM & Apriori) 
            and executive Power BI dashboards.
          </p>
        </div>
      </div>

      {/* Main Interactive Diagram & Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Visual Pipeline Stages */}
        <div className="lg:col-span-2 space-y-4">
          {/* Step 1: Sources */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5" /> 1. Operational Source Systems (OLTP)
              </span>
              <span className="text-[11px] text-slate-400">Heterogeneous Ingestion</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {architectureNodes.slice(0, 3).map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`text-left p-3 rounded-lg border transition-all ${
                    selectedNode.id === node.id
                      ? 'bg-amber-950/40 border-amber-500 text-amber-100 shadow-md ring-1 ring-amber-500/40'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="text-xs font-bold text-white truncate">{node.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{node.tech}</div>
                  <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-amber-300 font-mono bg-amber-950/50 px-1.5 py-0.5 rounded">
                    <Clock className="w-2.5 h-2.5" /> {node.latency}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Flow Connector Arrow */}
          <div className="flex justify-center items-center py-1">
            <div className="h-6 w-0.5 bg-gradient-to-b from-amber-500/60 via-blue-500/60 to-cyan-500/60" />
          </div>

          {/* Step 2: ETL & Conforming */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5" /> 2. ETL Ingestion, Quality Gate & SCD2 Engine
              </span>
              <span className="text-[11px] text-slate-400">Bronze to Silver Layer</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {architectureNodes.slice(3, 5).map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`text-left p-3 rounded-lg border transition-all ${
                    selectedNode.id === node.id
                      ? 'bg-blue-950/40 border-blue-500 text-blue-100 shadow-md ring-1 ring-blue-500/40'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="text-xs font-bold text-white truncate">{node.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{node.tech}</div>
                  <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-blue-300 font-mono bg-blue-950/50 px-1.5 py-0.5 rounded">
                    <ShieldCheck className="w-2.5 h-2.5" /> {node.latency}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Flow Connector Arrow */}
          <div className="flex justify-center items-center py-1">
            <div className="h-6 w-0.5 bg-gradient-to-b from-blue-500/60 via-cyan-500/60 to-emerald-500/60" />
          </div>

          {/* Step 3: Enterprise Data Warehouse (Gold Layer) */}
          <div className="bg-slate-900/90 border border-cyan-900/50 rounded-xl p-4 shadow-lg ring-1 ring-cyan-500/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" /> 3. Dimensional Data Warehouse (Gold Star Schema)
              </span>
              <span className="text-[11px] text-cyan-400 font-semibold">Single Source of Truth</span>
            </div>
            {(() => {
              const node = architectureNodes[5];
              return (
                <button
                  onClick={() => setSelectedNode(node)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedNode.id === node.id
                      ? 'bg-cyan-950/50 border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400/50'
                      : 'bg-slate-950/70 border-slate-800 hover:border-cyan-800/60 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-cyan-300">{node.title}</div>
                      <div className="text-xs text-slate-400 mt-1">Fact_Sales grain: 1 row per order item • 5 Conformed Dimensions</div>
                    </div>
                    <div className="text-right">
                      <span className="px-2.5 py-1 rounded bg-cyan-900/40 text-cyan-300 text-xs font-mono font-bold border border-cyan-700/40">
                        Star Schema (Kimball)
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">Dim_Customer (SCD2)</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">Dim_Product</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">Dim_Store</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">Dim_Date (Calendar)</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">Dim_Promotion</span>
                  </div>
                </button>
              );
            })()}
          </div>

          {/* Flow Connector Arrow */}
          <div className="flex justify-center items-center py-1">
            <div className="h-6 w-0.5 bg-gradient-to-b from-cyan-500/60 via-purple-500/60 to-emerald-500/60" />
          </div>

          {/* Step 4 & 5: Mining & BI Analytics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mining */}
            <div className="bg-slate-900/90 border border-purple-900/40 rounded-xl p-4 shadow-md">
              <div className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5 mb-3">
                <Cpu className="w-3.5 h-3.5" /> 4. Customer Mining & ML
              </div>
              <div className="space-y-2">
                {architectureNodes.slice(6, 8).map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                      selectedNode.id === node.id
                        ? 'bg-purple-950/40 border-purple-500 text-white ring-1 ring-purple-500/40'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{node.title}</div>
                    <div className="text-[11px] text-purple-300 mt-0.5">{node.tech}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Power BI */}
            <div className="bg-slate-900/90 border border-emerald-900/40 rounded-xl p-4 shadow-md">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-3">
                <BarChart3 className="w-3.5 h-3.5" /> 5. Power BI & Executive Studio
              </div>
              {(() => {
                const node = architectureNodes[8];
                return (
                  <button
                    onClick={() => setSelectedNode(node)}
                    className={`w-full text-left p-3 rounded-lg border transition-all h-[calc(100%-2rem)] flex flex-col justify-between ${
                      selectedNode.id === node.id
                        ? 'bg-emerald-950/40 border-emerald-500 text-white ring-1 ring-emerald-500/40'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{node.title}</div>
                      <div className="text-[11px] text-emerald-300 mt-0.5">{node.tech}</div>
                      <p className="text-[11px] text-slate-400 mt-2">
                        DAX metrics, retention curves, AOV, and top-selling product hierarchies.
                      </p>
                    </div>
                    <div className="mt-2 text-[10px] text-emerald-400 font-mono">
                      18 Explicit DAX Measures
                    </div>
                  </button>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Right Col: Deep Dive Node Inspector */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sticky top-20 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                Component Inspector
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-400 border border-blue-800/60">
                {selectedNode.tier}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{selectedNode.title}</h3>
              <p className="text-xs text-cyan-400 font-medium mt-0.5">{selectedNode.type}</p>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] uppercase text-slate-400 font-semibold">Technology</div>
                <div className="text-xs font-bold text-slate-200 mt-0.5">{selectedNode.tech}</div>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] uppercase text-slate-400 font-semibold">SLA / Latency</div>
                <div className="text-xs font-bold text-amber-300 mt-0.5">{selectedNode.latency}</div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-400" /> Architectural Specifications:
              </div>
              <div className="space-y-2">
                {selectedNode.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/60 p-2 rounded border border-slate-800/50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Metrics */}
            <div className="pt-2 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-400 mb-2">Operational Telemetry:</div>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {selectedNode.metrics.map((m, idx) => (
                  <div key={idx} className="bg-slate-950/80 p-2 rounded border border-slate-800">
                    <div className="text-[10px] text-slate-400 truncate">{m.label}</div>
                    <div className="text-xs font-mono font-bold text-white mt-0.5 truncate">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
