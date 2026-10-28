/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DimCustomer {
  customer_sk: number;
  customer_id: string; // Business Key (e.g. CUST-1001)
  full_name: string;
  email: string;
  gender: 'M' | 'F' | 'Other';
  age_group: string;
  city: string;
  state: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central';
  loyalty_tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  customer_segment: string;
  valid_from: string;
  valid_to: string | null;
  is_current: boolean; // SCD Type 2 flag
}

export interface DimProduct {
  product_sk: number;
  product_id: string; // Business Key
  product_name: string;
  category: 'Electronics' | 'Apparel' | 'Home & Kitchen' | 'Footwear' | 'Beauty';
  sub_category: string;
  brand: string;
  unit_cost: number;
  unit_price: number;
  margin_rate: number;
}

export interface DimStore {
  store_sk: number;
  store_id: string; // Business Key
  store_name: string;
  store_type: 'Superstore' | 'Express Outlet' | 'Flagship' | 'Online Fulfillment';
  region: 'North' | 'South' | 'East' | 'West' | 'Central';
  city: string;
  state: string;
  sqft: number;
  manager_name: string;
}

export interface DimDate {
  date_sk: number; // e.g. 20240315
  full_date: string;
  day_of_week: number;
  day_name: string;
  month_num: number;
  month_name: string;
  quarter: string;
  year: number;
  is_weekend: boolean;
  fiscal_period: string;
}

export interface DimPromotion {
  promotion_sk: number;
  promotion_id: string;
  promotion_name: string;
  promo_type: 'Seasonal Discount' | 'BOGO' | 'Loyalty Member Deal' | 'No Promo';
  discount_pct: number;
}

export interface FactSales {
  sales_sk: number;
  date_sk: number;
  customer_sk: number;
  product_sk: number;
  store_sk: number;
  promotion_sk: number;
  order_id: string;
  channel: 'In-Store POS' | 'E-Commerce' | 'Mobile App';
  quantity: number;
  unit_price: number;
  gross_amount: number;
  discount_amount: number;
  net_amount: number;
  cost_amount: number;
  profit_amount: number;
  payment_method: 'Credit Card' | 'Debit Card' | 'Digital Wallet' | 'Cash';
}

export interface CustomerRFM {
  customer_id: string;
  full_name: string;
  region: string;
  loyalty_tier: string;
  recency_days: number;
  frequency_orders: number;
  monetary_total: number;
  r_score: number;
  f_score: number;
  m_score: number;
  rfm_score: string;
  segment_label: 'Champions' | 'Loyal Customers' | 'Potential Loyalists' | 'At Risk' | 'Hibernating' | 'Lost';
  churn_probability: number; // 0 to 1
  avg_basket_value: number;
  suggested_action: string;
}

export interface AssociationRule {
  antecedent: string[];
  consequent: string[];
  support: number; // e.g. 0.35 (35%)
  confidence: number; // e.g. 0.72 (72%)
  lift: number; // e.g. 2.1x
  business_action: string;
}

export interface ETLStep {
  id: string;
  step_number: number;
  name: string;
  stage: 'Extract' | 'Cleanse' | 'Transform' | 'Load';
  description: string;
  input_count: number;
  output_count: number;
  rejected_count: number;
  rules_applied: string[];
  status: 'completed' | 'running' | 'idle';
}

export interface DirtyRecord {
  raw_id: string;
  raw_order_id: string;
  raw_customer_name: string;
  raw_email: string;
  raw_date: string;
  raw_quantity: string;
  raw_price: string;
  raw_region: string;
  issues: string[];
  cleansed_status: 'Rejected' | 'Normalized' | 'Imputed';
}

export interface SQLQueryItem {
  id: string;
  title: string;
  category: 'DDL - Star Schema' | 'ETL & SCD Type 2' | 'Analytical OLAP' | 'Customer Mining & RFM' | 'Window Functions';
  description: string;
  sql: string;
  explanation: string;
  sampleResult?: Record<string, string | number>[];
}

export interface DAXFormulaItem {
  id: string;
  name: string;
  category: 'Financial KPIs' | 'Time Intelligence' | 'Customer Retention' | 'Basket Analysis';
  dax: string;
  explanation: string;
  resultValue: string;
}

export interface TestCase {
  id: string;
  suite: 'Referential Integrity' | 'Data Quality' | 'SCD Type 2' | 'Aggregations & Granularity';
  test_name: string;
  sql_validation: string;
  expected_outcome: string;
  status: 'PASS' | 'WARN';
}
