/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Database, 
  Key, 
  Table, 
  Eye, 
  HelpCircle, 
  History, 
  CheckCircle,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { 
  dimCustomersData, 
  dimProductsData, 
  dimStoresData, 
  dimDatesData, 
  dimPromotionsData, 
  factSalesData 
} from '../data/mockWarehouseData';

interface TableDefinition {
  id: string;
  name: string;
  type: 'Fact Table' | 'Dimension Table';
  color: string;
  grainOrSCD: string;
  description: string;
  columns: {
    name: string;
    type: string;
    keyType: 'PK' | 'FK' | 'NK' | 'Measure' | 'Attribute' | 'SCD2';
    description: string;
  }[];
}

const tableDefinitions: Record<string, TableDefinition> = {
  fact_sales: {
    id: 'fact_sales',
    name: 'fact_sales',
    type: 'Fact Table',
    color: 'border-cyan-500 bg-cyan-950/40 text-cyan-200',
    grainOrSCD: 'Atomic: 1 row per order line item',
    description: 'Central transactional fact table storing numerical additive measures (gross amount, net amount, discount amount, cost amount, and profit) connected to 5 conformed dimensions.',
    columns: [
      { name: 'sales_sk', type: 'BIGSERIAL', keyType: 'PK', description: 'Surrogate Primary Key for the line item fact record' },
      { name: 'date_sk', type: 'INT', keyType: 'FK', description: 'Foreign key referencing dim_date (YYYYMMDD integer format)' },
      { name: 'customer_sk', type: 'BIGINT', keyType: 'FK', description: 'Foreign key referencing current or historical dim_customer surrogate key' },
      { name: 'product_sk', type: 'BIGINT', keyType: 'FK', description: 'Foreign key referencing dim_product surrogate key' },
      { name: 'store_sk', type: 'BIGINT', keyType: 'FK', description: 'Foreign key referencing dim_store surrogate key' },
      { name: 'promotion_sk', type: 'BIGINT', keyType: 'FK', description: 'Foreign key referencing dim_promotion surrogate key' },
      { name: 'order_id', type: 'VARCHAR(60)', keyType: 'NK', description: 'Degenerate dimension - upstream natural invoice identifier' },
      { name: 'channel', type: 'VARCHAR(30)', keyType: 'Attribute', description: 'Transaction channel: In-Store POS, E-Commerce, Mobile App' },
      { name: 'quantity', type: 'INT', keyType: 'Measure', description: 'Fully additive metric: quantity of items purchased' },
      { name: 'unit_price', type: 'NUMERIC(12,2)', keyType: 'Attribute', description: 'Non-additive unit retail selling price' },
      { name: 'gross_amount', type: 'NUMERIC(12,2)', keyType: 'Measure', description: 'Additive: quantity * unit_price' },
      { name: 'discount_amount', type: 'NUMERIC(12,2)', keyType: 'Measure', description: 'Additive: discount applied from promotion' },
      { name: 'net_amount', type: 'NUMERIC(12,2)', keyType: 'Measure', description: 'Additive: gross_amount - discount_amount (Primary Revenue)' },
      { name: 'cost_amount', type: 'NUMERIC(12,2)', keyType: 'Measure', description: 'Additive: quantity * unit_cost' },
      { name: 'profit_amount', type: 'NUMERIC(12,2)', keyType: 'Measure', description: 'Additive: net_amount - cost_amount' },
      { name: 'payment_method', type: 'VARCHAR(50)', keyType: 'Attribute', description: 'Tender type: Credit Card, Debit Card, Wallet, Cash' },
    ]
  },
  dim_customer: {
    id: 'dim_customer',
    name: 'dim_customer',
    type: 'Dimension Table',
    color: 'border-blue-500 bg-blue-950/40 text-blue-200',
    grainOrSCD: 'SCD Type 2: Full Historical Tracking',
    description: 'Conformed customer profile dimension with Slowly Changing Dimension Type 2 versioning to track customer regional moves and loyalty tier promotions over time.',
    columns: [
      { name: 'customer_sk', type: 'BIGSERIAL', keyType: 'PK', description: 'Surrogate Primary Key uniquely identifying this version of the customer' },
      { name: 'customer_id', type: 'VARCHAR(50)', keyType: 'NK', description: 'Natural/Business Key from CRM (e.g. CUST-1001)' },
      { name: 'full_name', type: 'VARCHAR(150)', keyType: 'Attribute', description: 'Customer full legal name' },
      { name: 'email', type: 'VARCHAR(150)', keyType: 'Attribute', description: 'Cleansed RFC-compliant email address' },
      { name: 'gender', type: 'CHAR(1)', keyType: 'Attribute', description: 'M, F, or Other' },
      { name: 'age_group', type: 'VARCHAR(20)', keyType: 'Attribute', description: 'Demographic demographic bracket (e.g. 26-35)' },
      { name: 'city', type: 'VARCHAR(100)', keyType: 'Attribute', description: 'Primary residential city' },
      { name: 'state', type: 'VARCHAR(50)', keyType: 'Attribute', description: 'State / Province code' },
      { name: 'region', type: 'VARCHAR(50)', keyType: 'Attribute', description: 'Geographic territory: North, South, East, West, Central' },
      { name: 'loyalty_tier', type: 'VARCHAR(30)', keyType: 'Attribute', description: 'Bronze, Silver, Gold, Platinum' },
      { name: 'customer_segment', type: 'VARCHAR(50)', keyType: 'Attribute', description: 'RFM Segment: Champions, Loyal, At-Risk, etc.' },
      { name: 'valid_from', type: 'TIMESTAMP', keyType: 'SCD2', description: 'SCD2: Timestamp when this record became active' },
      { name: 'valid_to', type: 'TIMESTAMP', keyType: 'SCD2', description: 'SCD2: Timestamp when this record was superseded (NULL if active)' },
      { name: 'is_current', type: 'BOOLEAN', keyType: 'SCD2', description: 'SCD2: TRUE if current active record, FALSE if historical' },
    ]
  },
  dim_product: {
    id: 'dim_product',
    name: 'dim_product',
    type: 'Dimension Table',
    color: 'border-emerald-500 bg-emerald-950/40 text-emerald-200',
    grainOrSCD: 'SCD Type 1: Overwrite or Master Catalog',
    description: 'Catalog dimension holding SKU identifiers, category hierarchies, brand names, unit cost, and retail price.',
    columns: [
      { name: 'product_sk', type: 'BIGSERIAL', keyType: 'PK', description: 'Surrogate Primary Key for product SKU' },
      { name: 'product_id', type: 'VARCHAR(50)', keyType: 'NK', description: 'Master catalog SKU code (e.g. PROD-E01)' },
      { name: 'product_name', type: 'VARCHAR(200)', keyType: 'Attribute', description: 'Commercial product display name' },
      { name: 'category', type: 'VARCHAR(100)', keyType: 'Attribute', description: 'Primary department (Electronics, Apparel, Home & Kitchen)' },
      { name: 'sub_category', type: 'VARCHAR(100)', keyType: 'Attribute', description: 'Granular sub-category (Audio Gear, Cookware)' },
      { name: 'brand', type: 'VARCHAR(100)', keyType: 'Attribute', description: 'Manufacturing brand or private label' },
      { name: 'unit_cost', type: 'NUMERIC(12,2)', keyType: 'Attribute', description: 'Cost of goods sold (COGS) per unit' },
      { name: 'unit_price', type: 'NUMERIC(12,2)', keyType: 'Attribute', description: 'Standard retail list price per unit' },
      { name: 'margin_rate', type: 'NUMERIC(5,4)', keyType: 'Measure', description: 'Generated profit margin: (unit_price - unit_cost)/unit_price' },
    ]
  },
  dim_store: {
    id: 'dim_store',
    name: 'dim_store',
    type: 'Dimension Table',
    color: 'border-purple-500 bg-purple-950/40 text-purple-200',
    grainOrSCD: 'Conformed Store Location Hierarchy',
    description: 'Stores details for brick-and-mortar retail outlets, flagship supercenters, and centralized e-commerce distribution fulfillment centers.',
    columns: [
      { name: 'store_sk', type: 'BIGSERIAL', keyType: 'PK', description: 'Surrogate Primary Key for retail location' },
      { name: 'store_id', type: 'VARCHAR(50)', keyType: 'NK', description: 'Natural Store ID (e.g. STR-W01)' },
      { name: 'store_name', type: 'VARCHAR(150)', keyType: 'Attribute', description: 'Retail store branch name' },
      { name: 'store_type', type: 'VARCHAR(50)', keyType: 'Attribute', description: 'Flagship, Superstore, Express Outlet, Online Hub' },
      { name: 'region', type: 'VARCHAR(50)', keyType: 'Attribute', description: 'Sales sales territory' },
      { name: 'city', type: 'VARCHAR(100)', keyType: 'Attribute', description: 'Municipality' },
      { name: 'state', type: 'VARCHAR(50)', keyType: 'Attribute', description: 'State code' },
      { name: 'sqft', type: 'INT', keyType: 'Attribute', description: 'Floor area square footage' },
      { name: 'manager_name', type: 'VARCHAR(100)', keyType: 'Attribute', description: 'Store general manager' },
    ]
  },
  dim_date: {
    id: 'dim_date',
    name: 'dim_date',
    type: 'Dimension Table',
    color: 'border-amber-500 bg-amber-950/40 text-amber-200',
    grainOrSCD: 'Role-Playing Calendar Dimension',
    description: 'Pre-computed date dimension enabling fast temporal filtering (day name, weekend flags, fiscal quarters) without expensive runtime date calculations.',
    columns: [
      { name: 'date_sk', type: 'INT', keyType: 'PK', description: 'Smart Integer Date Key in YYYYMMDD format (e.g. 20240315)' },
      { name: 'full_date', type: 'DATE', keyType: 'Attribute', description: 'Standard ISO calendar date' },
      { name: 'day_of_week', type: 'INT', keyType: 'Attribute', description: '1 (Monday) through 7 (Sunday)' },
      { name: 'day_name', type: 'VARCHAR(20)', keyType: 'Attribute', description: 'Monday, Tuesday, etc.' },
      { name: 'month_num', type: 'INT', keyType: 'Attribute', description: 'Calendar month number 1-12' },
      { name: 'month_name', type: 'VARCHAR(20)', keyType: 'Attribute', description: 'January through December' },
      { name: 'quarter', type: 'CHAR(2)', keyType: 'Attribute', description: 'Q1, Q2, Q3, Q4' },
      { name: 'year', type: 'INT', keyType: 'Attribute', description: 'Calendar year' },
      { name: 'is_weekend', type: 'BOOLEAN', keyType: 'Attribute', description: 'TRUE for Saturday/Sunday, FALSE for weekdays' },
      { name: 'fiscal_period', type: 'VARCHAR(20)', keyType: 'Attribute', description: 'Company fiscal accounting cycle (e.g. FP-01)' },
    ]
  },
  dim_promotion: {
    id: 'dim_promotion',
    name: 'dim_promotion',
    type: 'Dimension Table',
    color: 'border-rose-500 bg-rose-950/40 text-rose-200',
    grainOrSCD: 'Causal Dimension',
    description: 'Captures discount campaigns, coupons, loyalty promotions, and bundle deals active at checkout time.',
    columns: [
      { name: 'promotion_sk', type: 'BIGSERIAL', keyType: 'PK', description: 'Surrogate Primary Key for promotion' },
      { name: 'promotion_id', type: 'VARCHAR(50)', keyType: 'NK', description: 'Campaign code (e.g. PRM-BF)' },
      { name: 'promotion_name', type: 'VARCHAR(150)', keyType: 'Attribute', description: 'Descriptive marketing name' },
      { name: 'promo_type', type: 'VARCHAR(50)', keyType: 'Attribute', description: 'Seasonal Discount, BOGO, Loyalty Deal, No Promo' },
      { name: 'discount_pct', type: 'NUMERIC(5,4)', keyType: 'Attribute', description: 'Decimal discount rate (e.g. 0.20 for 20%)' },
    ]
  }
};

export const StarSchemaVisualizer: React.FC = () => {
  const [activeTableId, setActiveTableId] = useState<string>('fact_sales');
  const [viewMode, setViewMode] = useState<'schema' | 'sample_data'>('schema');

  const activeTable = tableDefinitions[activeTableId];

  // Helper to get mock data for preview
  const getSampleData = () => {
    switch (activeTableId) {
      case 'fact_sales': return factSalesData.slice(0, 6);
      case 'dim_customer': return dimCustomersData.slice(0, 6);
      case 'dim_product': return dimProductsData.slice(0, 6);
      case 'dim_store': return dimStoresData;
      case 'dim_date': return dimDatesData.slice(0, 6);
      case 'dim_promotion': return dimPromotionsData;
      default: return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-cyan-950 text-cyan-400 border border-cyan-800">
              Ralph Kimball Methodology
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-indigo-950 text-indigo-400 border border-indigo-800">
              Star Schema Design
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1.5">
            Dimensional Schema & Entity-Relationship Modeling
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Click on any table card to inspect columns, surrogate keys, Slowly Changing Dimension Type 2 logic, and live warehouse records.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 shrink-0">
          <button
            onClick={() => setViewMode('schema')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'schema'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Schema & Keys
          </button>
          <button
            onClick={() => setViewMode('sample_data')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'sample_data'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Live Data Sample
          </button>
        </div>
      </div>

      {/* Star Schema Interactive Topology Diagram */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="text-center mb-6">
          <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
            Interactive Star Schema Topology (1 : N Relationships)
          </h3>
        </div>

        {/* Top Dimensions Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-6">
          {/* Dim_Customer */}
          <button
            onClick={() => setActiveTableId('dim_customer')}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeTableId === 'dim_customer'
                ? 'bg-blue-950/60 border-blue-400 ring-2 ring-blue-500/40 shadow-lg'
                : 'bg-slate-900 border-slate-800 hover:border-blue-700/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-300">dim_customer</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-900/60 text-blue-300 border border-blue-700">
                SCD Type 2
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">PK: customer_sk • NK: customer_id</p>
            <div className="mt-2 text-[10px] text-slate-300 flex items-center justify-between">
              <span>Demographics, Tier & Segment</span>
              <span className="font-mono text-cyan-400">1 : N</span>
            </div>
          </button>

          {/* Dim_Product */}
          <button
            onClick={() => setActiveTableId('dim_product')}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeTableId === 'dim_product'
                ? 'bg-emerald-950/60 border-emerald-400 ring-2 ring-emerald-500/40 shadow-lg'
                : 'bg-slate-900 border-slate-800 hover:border-emerald-700/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300">dim_product</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-900/60 text-emerald-300 border border-emerald-700">
                12 Attributes
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">PK: product_sk • NK: product_id</p>
            <div className="mt-2 text-[10px] text-slate-300 flex items-center justify-between">
              <span>Category, Brand, Unit Cost & Price</span>
              <span className="font-mono text-cyan-400">1 : N</span>
            </div>
          </button>

          {/* Dim_Store */}
          <button
            onClick={() => setActiveTableId('dim_store')}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeTableId === 'dim_store'
                ? 'bg-purple-950/60 border-purple-400 ring-2 ring-purple-500/40 shadow-lg'
                : 'bg-slate-900 border-slate-800 hover:border-purple-700/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-300">dim_store</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-purple-900/60 text-purple-300 border border-purple-700">
                Omnichannel
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">PK: store_sk • NK: store_id</p>
            <div className="mt-2 text-[10px] text-slate-300 flex items-center justify-between">
              <span>Store Type, Region, City & SqFt</span>
              <span className="font-mono text-cyan-400">1 : N</span>
            </div>
          </button>
        </div>

        {/* Central Fact Table */}
        <div className="max-w-xl mx-auto my-3">
          <button
            onClick={() => setActiveTableId('fact_sales')}
            className={`w-full p-5 rounded-2xl border text-center transition-all ${
              activeTableId === 'fact_sales'
                ? 'bg-gradient-to-b from-cyan-950/80 to-slate-900 border-cyan-400 ring-4 ring-cyan-500/30 shadow-2xl'
                : 'bg-gradient-to-b from-slate-900 to-slate-950 border-cyan-800/60 hover:border-cyan-500'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base sm:text-lg font-extrabold text-cyan-200">
                fact_sales (Central Fact Table)
              </h3>
            </div>
            <p className="text-xs text-slate-300 mt-1 font-mono">
              Grain: 1 Row per Order Line Item • Fully Additive Measures
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 text-[11px]">
              <span className="px-2 py-0.5 rounded bg-cyan-900/40 text-cyan-300 border border-cyan-700/50">quantity</span>
              <span className="px-2 py-0.5 rounded bg-cyan-900/40 text-cyan-300 border border-cyan-700/50">gross_amount</span>
              <span className="px-2 py-0.5 rounded bg-cyan-900/40 text-cyan-300 border border-cyan-700/50">discount_amount</span>
              <span className="px-2 py-0.5 rounded bg-cyan-900/40 text-cyan-300 border border-cyan-700/50">net_amount</span>
              <span className="px-2 py-0.5 rounded bg-cyan-900/40 text-cyan-300 border border-cyan-700/50">profit_amount</span>
            </div>
          </button>
        </div>

        {/* Bottom Dimensions Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-6">
          {/* Dim_Date */}
          <button
            onClick={() => setActiveTableId('dim_date')}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeTableId === 'dim_date'
                ? 'bg-amber-950/60 border-amber-400 ring-2 ring-amber-500/40 shadow-lg'
                : 'bg-slate-900 border-slate-800 hover:border-amber-700/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300">dim_date</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-900/60 text-amber-300 border border-amber-700">
                Role-Playing Calendar
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">PK: date_sk (YYYYMMDD integer)</p>
            <div className="mt-2 text-[10px] text-slate-300 flex items-center justify-between">
              <span>Day, Month, Quarter, Year, Weekend</span>
              <span className="font-mono text-cyan-400">1 : N</span>
            </div>
          </button>

          {/* Dim_Promotion */}
          <button
            onClick={() => setActiveTableId('dim_promotion')}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeTableId === 'dim_promotion'
                ? 'bg-rose-950/60 border-rose-400 ring-2 ring-rose-500/40 shadow-lg'
                : 'bg-slate-900 border-slate-800 hover:border-rose-700/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-300">dim_promotion</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-rose-900/60 text-rose-300 border border-rose-700">
                Causal Dimension
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">PK: promotion_sk • NK: promotion_id</p>
            <div className="mt-2 text-[10px] text-slate-300 flex items-center justify-between">
              <span>Seasonal Sales, BOGO & Loyalty Specials</span>
              <span className="font-mono text-cyan-400">1 : N</span>
            </div>
          </button>
        </div>
      </div>

      {/* Selected Table Inspector */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white font-mono">{activeTable.name}</span>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {activeTable.type}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
                {activeTable.grainOrSCD}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{activeTable.description}</p>
          </div>
        </div>

        {viewMode === 'schema' ? (
          /* Schema Column Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                  <th className="py-2.5 px-3 font-semibold">Column Name</th>
                  <th className="py-2.5 px-3 font-semibold">Data Type</th>
                  <th className="py-2.5 px-3 font-semibold">Key / Category</th>
                  <th className="py-2.5 px-3 font-semibold">Architectural Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {activeTable.columns.map((col, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2 px-3 font-bold text-white flex items-center gap-1.5">
                      {col.keyType === 'PK' && <Key className="w-3 h-3 text-amber-400" />}
                      {col.keyType === 'FK' && <ArrowRight className="w-3 h-3 text-cyan-400" />}
                      {col.keyType === 'SCD2' && <History className="w-3 h-3 text-purple-400" />}
                      <span>{col.name}</span>
                    </td>
                    <td className="py-2 px-3 text-indigo-300">{col.type}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        col.keyType === 'PK' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                        col.keyType === 'FK' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' :
                        col.keyType === 'NK' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                        col.keyType === 'Measure' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        col.keyType === 'SCD2' ? 'bg-purple-950 text-purple-400 border border-purple-800' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {col.keyType}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-300 font-sans text-xs">{col.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Live Data Sample Table */
          <div className="overflow-x-auto">
            <div className="text-xs text-slate-400 mb-2 font-mono">Showing first 6 sample records populated in warehouse:</div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60 font-mono">
                  {Object.keys(getSampleData()[0] || {}).map((header, idx) => (
                    <th key={idx} className="py-2 px-2.5 font-semibold whitespace-nowrap">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                {getSampleData().map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    {Object.values(row).map((val, cIdx) => (
                      <td key={cIdx} className="py-2 px-2.5 whitespace-nowrap text-slate-200">
                        {typeof val === 'boolean' ? (
                          <span className={val ? 'text-emerald-400 font-bold' : 'text-slate-500 font-bold'}>
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
        )}
      </div>

      {/* Kimball Architectural Principles Callout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Database className="w-4 h-4" /> Why Star Schema?
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Star Schema delivers faster OLAP slice-and-dice performance by avoiding normalized sub-dimension joins. 
            All queries require only single-level joins between <code className="text-cyan-300 font-mono">fact_sales</code> and conformed dimensions, making it ideal for Power BI tabular models.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-2">
            <History className="w-4 h-4" /> SCD Type 2 Rationale
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            When customer Hiroshi Tanaka moved from Detroit (North) to Portland (West), SCD2 created a new surrogate record. 
            Historical sales remain linked to <code className="text-purple-300 font-mono">customer_sk = 11</code> (North), ensuring historical tax and regional reports are never corrupted.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Key className="w-4 h-4" /> Surrogate Key Principle
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Surrogate Keys (integer sequences) insulate the Data Warehouse from upstream source system database changes or key reuse. 
            Integer foreign key joins execute up to 8x faster than variable-length string UUID joins.
          </p>
        </div>
      </div>
    </div>
  );
};
