/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DimCustomer,
  DimProduct,
  DimStore,
  DimDate,
  DimPromotion,
  FactSales,
  CustomerRFM,
  AssociationRule,
  ETLStep,
  DirtyRecord,
  SQLQueryItem,
  DAXFormulaItem,
  TestCase,
} from '../types/warehouse';

export const dimCustomersData: DimCustomer[] = [
  { customer_sk: 1, customer_id: 'CUST-1001', full_name: 'Elena Rostova', email: 'elena.rostova@nexus.com', gender: 'F', age_group: '26-35', city: 'Seattle', state: 'WA', region: 'West', loyalty_tier: 'Platinum', customer_segment: 'Champions', valid_from: '2023-01-01', valid_to: null, is_current: true },
  { customer_sk: 2, customer_id: 'CUST-1002', full_name: 'Marcus Vance', email: 'm.vance@orioncorp.net', gender: 'M', age_group: '36-45', city: 'Chicago', state: 'IL', region: 'Central', loyalty_tier: 'Gold', customer_segment: 'Loyal Customers', valid_from: '2023-01-01', valid_to: null, is_current: true },
  { customer_sk: 3, customer_id: 'CUST-1003', full_name: 'Sophia Chen', email: 'schen@innovate.org', gender: 'F', age_group: '18-25', city: 'San Jose', state: 'CA', region: 'West', loyalty_tier: 'Silver', customer_segment: 'Potential Loyalists', valid_from: '2023-01-01', valid_to: null, is_current: true },
  { customer_sk: 4, customer_id: 'CUST-1004', full_name: 'David Okafor', email: 'd.okafor@stride.io', gender: 'M', age_group: '46-55', city: 'Atlanta', state: 'GA', region: 'South', loyalty_tier: 'Bronze', customer_segment: 'At Risk', valid_from: '2023-01-01', valid_to: null, is_current: true },
  { customer_sk: 5, customer_id: 'CUST-1005', full_name: 'Amara Patel', email: 'amara.p@vortex.co', gender: 'F', age_group: '26-35', city: 'New York', state: 'NY', region: 'East', loyalty_tier: 'Platinum', customer_segment: 'Champions', valid_from: '2023-01-01', valid_to: null, is_current: true },
  { customer_sk: 6, customer_id: 'CUST-1006', full_name: 'Lucas Dubois', email: 'lucas.d@horizon.fr', gender: 'M', age_group: '36-45', city: 'Boston', state: 'MA', region: 'East', loyalty_tier: 'Silver', customer_segment: 'Hibernating', valid_from: '2023-01-01', valid_to: null, is_current: true },
  { customer_sk: 7, customer_id: 'CUST-1007', full_name: 'Zoe Morales', email: 'zoe.m@solaris.net', gender: 'F', age_group: '18-25', city: 'Dallas', state: 'TX', region: 'South', loyalty_tier: 'Bronze', customer_segment: 'Lost', valid_from: '2023-01-01', valid_to: null, is_current: true },
  { customer_sk: 8, customer_id: 'CUST-1008', full_name: 'Liam Gallagher', email: 'liam.g@celtic.uk', gender: 'M', age_group: '26-35', city: 'Denver', state: 'CO', region: 'West', loyalty_tier: 'Gold', customer_segment: 'Loyal Customers', valid_from: '2023-01-01', valid_to: null, is_current: true },
  { customer_sk: 9, customer_id: 'CUST-1009', full_name: 'Priya Sharma', email: 'priya.s@apextech.in', gender: 'F', age_group: '26-35', city: 'Austin', state: 'TX', region: 'South', loyalty_tier: 'Platinum', customer_segment: 'Champions', valid_from: '2023-01-01', valid_to: null, is_current: true },
  { customer_sk: 10, customer_id: 'CUST-1010', full_name: 'Nathaniel Drake', email: 'n.drake@heritage.com', gender: 'M', age_group: '46-55', city: 'Minneapolis', state: 'MN', region: 'Central', loyalty_tier: 'Bronze', customer_segment: 'At Risk', valid_from: '2023-01-01', valid_to: null, is_current: true },
  // SCD Type 2 example: Customer CUST-1011 moved from North (Old Record) to West (New Current Record)
  { customer_sk: 11, customer_id: 'CUST-1011', full_name: 'Hiroshi Tanaka', email: 'h.tanaka@tokyo-labs.jp', gender: 'M', age_group: '36-45', city: 'Detroit', state: 'MI', region: 'North', loyalty_tier: 'Silver', customer_segment: 'Loyal Customers', valid_from: '2023-01-01', valid_to: '2024-03-31', is_current: false },
  { customer_sk: 12, customer_id: 'CUST-1011', full_name: 'Hiroshi Tanaka', email: 'h.tanaka@tokyo-labs.jp', gender: 'M', age_group: '36-45', city: 'Portland', state: 'OR', region: 'West', loyalty_tier: 'Gold', customer_segment: 'Loyal Customers', valid_from: '2024-04-01', valid_to: null, is_current: true },
  { customer_sk: 13, customer_id: 'CUST-1012', full_name: 'Chloe Tremblay', email: 'chloe.t@quebec.ca', gender: 'F', age_group: '18-25', city: 'Philadelphia', state: 'PA', region: 'East', loyalty_tier: 'Bronze', customer_segment: 'Potential Loyalists', valid_from: '2023-05-15', valid_to: null, is_current: true },
];

export const dimProductsData: DimProduct[] = [
  { product_sk: 101, product_id: 'PROD-E01', product_name: 'Titan Pro Noise-Cancelling Headphones', category: 'Electronics', sub_category: 'Audio Gear', brand: 'AuraSound', unit_cost: 110.00, unit_price: 249.99, margin_rate: 0.56 },
  { product_sk: 102, product_id: 'PROD-E02', product_name: 'UltraVision 4K OLED Smart TV 55"', category: 'Electronics', sub_category: 'Television', brand: 'LumixView', unit_cost: 450.00, unit_price: 899.99, margin_rate: 0.50 },
  { product_sk: 103, product_id: 'PROD-E03', product_name: 'Quantum Ergonomic Mechanical Keyboard', category: 'Electronics', sub_category: 'Peripherals', brand: 'KeyForge', unit_cost: 55.00, unit_price: 139.99, margin_rate: 0.61 },
  { product_sk: 104, product_id: 'PROD-A01', product_name: 'Merino Wool Weatherproof Parka', category: 'Apparel', sub_category: 'Outerwear', brand: 'NordicShield', unit_cost: 85.00, unit_price: 219.00, margin_rate: 0.61 },
  { product_sk: 105, product_id: 'PROD-A02', product_name: 'TechFlex Breathable Athletic Joggers', category: 'Apparel', sub_category: 'Activewear', brand: 'PulseFit', unit_cost: 22.00, unit_price: 64.99, margin_rate: 0.66 },
  { product_sk: 106, product_id: 'PROD-H01', product_name: 'BaristaMaster Precision Espresso Machine', category: 'Home & Kitchen', sub_category: 'Appliances', brand: 'CremaCraft', unit_cost: 180.00, unit_price: 399.00, margin_rate: 0.55 },
  { product_sk: 107, product_id: 'PROD-H02', product_name: 'Cast Iron Enameled Dutch Oven 6-Qt', category: 'Home & Kitchen', sub_category: 'Cookware', brand: 'ForgeStone', unit_cost: 42.00, unit_price: 119.50, margin_rate: 0.65 },
  { product_sk: 108, product_id: 'PROD-F01', product_name: 'AeroStride Carbon Fiber Trail Runners', category: 'Footwear', sub_category: 'Running Shoes', brand: 'TerraGrip', unit_cost: 58.00, unit_price: 159.00, margin_rate: 0.64 },
  { product_sk: 109, product_id: 'PROD-F02', product_name: 'Artisan Full-Grain Leather Chelsea Boots', category: 'Footwear', sub_category: 'Casual Footwear', brand: 'CobblerSt', unit_cost: 72.00, unit_price: 189.00, margin_rate: 0.62 },
  { product_sk: 110, product_id: 'PROD-B01', product_name: 'HydraGlow Peptide Restorative Serum', category: 'Beauty', sub_category: 'Skincare', brand: 'LuxeDerm', unit_cost: 14.50, unit_price: 48.00, margin_rate: 0.70 },
  { product_sk: 111, product_id: 'PROD-E04', product_name: 'Magnetic Wireless Fast Charger Station', category: 'Electronics', sub_category: 'Accessories', brand: 'AuraSound', unit_cost: 16.00, unit_price: 49.99, margin_rate: 0.68 },
  { product_sk: 112, product_id: 'PROD-H03', product_name: 'Conical Burr Electric Coffee Grinder', category: 'Home & Kitchen', sub_category: 'Appliances', brand: 'CremaCraft', unit_cost: 40.00, unit_price: 99.00, margin_rate: 0.60 },
];

export const dimStoresData: DimStore[] = [
  { store_sk: 201, store_id: 'STR-W01', store_name: 'Pacific Flagship Metropolis', store_type: 'Flagship', region: 'West', city: 'Seattle', state: 'WA', sqft: 45000, manager_name: 'Rachel Sterling' },
  { store_sk: 202, store_id: 'STR-E01', store_name: 'Manhattan Grand Center', store_type: 'Flagship', region: 'East', city: 'New York', state: 'NY', sqft: 52000, manager_name: 'Gregory Scott' },
  { store_sk: 203, store_id: 'STR-C01', store_name: 'Midwest Mega Supercenter', store_type: 'Superstore', region: 'Central', city: 'Chicago', state: 'IL', sqft: 75000, manager_name: 'David Kowalski' },
  { store_sk: 204, store_id: 'STR-S01', store_name: 'Southwest Express Outlet', store_type: 'Express Outlet', region: 'South', city: 'Dallas', state: 'TX', sqft: 18500, manager_name: 'Maria Hernandez' },
  { store_sk: 205, store_id: 'STR-ONL', store_name: 'Omnichannel Cloud Fulfillment Hub', store_type: 'Online Fulfillment', region: 'West', city: 'Reno', state: 'NV', sqft: 120000, manager_name: 'Alexandria Wu' },
];

export const dimPromotionsData: DimPromotion[] = [
  { promotion_sk: 301, promotion_id: 'PRM-00', promotion_name: 'Standard Price (No Promotion)', promo_type: 'No Promo', discount_pct: 0.00 },
  { promotion_sk: 302, promotion_id: 'PRM-BF', promotion_name: 'Black Friday Cyber Weekend Sale', promo_type: 'Seasonal Discount', discount_pct: 0.20 },
  { promotion_sk: 303, promotion_id: 'PRM-LOY', promotion_name: 'VIP Loyalty Member Rewards', promo_type: 'Loyalty Member Deal', discount_pct: 0.15 },
  { promotion_sk: 304, promotion_id: 'PRM-BOG', promotion_name: 'Buy One Get One 50% Off Bundle', promo_type: 'BOGO', discount_pct: 0.25 },
];

export const dimDatesData: DimDate[] = [
  { date_sk: 20240115, full_date: '2024-01-15', day_of_week: 1, day_name: 'Monday', month_num: 1, month_name: 'January', quarter: 'Q1', year: 2024, is_weekend: false, fiscal_period: 'FP-01' },
  { date_sk: 20240214, full_date: '2024-02-14', day_of_week: 3, day_name: 'Wednesday', month_num: 2, month_name: 'February', quarter: 'Q1', year: 2024, is_weekend: false, fiscal_period: 'FP-02' },
  { date_sk: 20240320, full_date: '2024-03-20', day_of_week: 3, day_name: 'Wednesday', month_num: 3, month_name: 'March', quarter: 'Q1', year: 2024, is_weekend: false, fiscal_period: 'FP-03' },
  { date_sk: 20240412, full_date: '2024-04-12', day_of_week: 5, day_name: 'Friday', month_num: 4, month_name: 'April', quarter: 'Q2', year: 2024, is_weekend: false, fiscal_period: 'FP-04' },
  { date_sk: 20240505, full_date: '2024-05-05', day_of_week: 7, day_name: 'Sunday', month_num: 5, month_name: 'May', quarter: 'Q2', year: 2024, is_weekend: true, fiscal_period: 'FP-05' },
  { date_sk: 20240618, full_date: '2024-06-18', day_of_week: 2, day_name: 'Tuesday', month_num: 6, month_name: 'June', quarter: 'Q2', year: 2024, is_weekend: false, fiscal_period: 'FP-06' },
  { date_sk: 20240722, full_date: '2024-07-22', day_of_week: 1, day_name: 'Monday', month_num: 7, month_name: 'July', quarter: 'Q3', year: 2024, is_weekend: false, fiscal_period: 'FP-07' },
  { date_sk: 20240815, full_date: '2024-08-15', day_of_week: 4, day_name: 'Thursday', month_num: 8, month_name: 'August', quarter: 'Q3', year: 2024, is_weekend: false, fiscal_period: 'FP-08' },
  { date_sk: 20240928, full_date: '2024-09-28', day_of_week: 6, day_name: 'Saturday', month_num: 9, month_name: 'September', quarter: 'Q3', year: 2024, is_weekend: true, fiscal_period: 'FP-09' },
  { date_sk: 20241010, full_date: '2024-10-10', day_of_week: 4, day_name: 'Thursday', month_num: 10, month_name: 'October', quarter: 'Q4', year: 2024, is_weekend: false, fiscal_period: 'FP-10' },
  { date_sk: 20241129, full_date: '2024-11-29', day_of_week: 5, day_name: 'Friday', month_num: 11, month_name: 'November', quarter: 'Q4', year: 2024, is_weekend: false, fiscal_period: 'FP-11' },
  { date_sk: 20241215, full_date: '2024-12-15', day_of_week: 7, day_name: 'Sunday', month_num: 12, month_name: 'December', quarter: 'Q4', year: 2024, is_weekend: true, fiscal_period: 'FP-12' },
];

export const factSalesData: FactSales[] = [
  // Elena Rostova (Champion, High Monetary)
  { sales_sk: 10001, date_sk: 20240115, customer_sk: 1, product_sk: 101, store_sk: 201, promotion_sk: 301, order_id: 'ORD-2401', channel: 'In-Store POS', quantity: 2, unit_price: 249.99, gross_amount: 499.98, discount_amount: 0.00, net_amount: 499.98, cost_amount: 220.00, profit_amount: 279.98, payment_method: 'Credit Card' },
  { sales_sk: 10002, date_sk: 20240320, customer_sk: 1, product_sk: 106, store_sk: 205, promotion_sk: 303, order_id: 'ORD-2442', channel: 'E-Commerce', quantity: 1, unit_price: 399.00, gross_amount: 399.00, discount_amount: 59.85, net_amount: 339.15, cost_amount: 180.00, profit_amount: 159.15, payment_method: 'Digital Wallet' },
  { sales_sk: 10003, date_sk: 20240618, customer_sk: 1, product_sk: 112, store_sk: 205, promotion_sk: 301, order_id: 'ORD-2510', channel: 'E-Commerce', quantity: 1, unit_price: 99.00, gross_amount: 99.00, discount_amount: 0.00, net_amount: 99.00, cost_amount: 40.00, profit_amount: 59.00, payment_method: 'Digital Wallet' },
  { sales_sk: 10004, date_sk: 20241010, customer_sk: 1, product_sk: 102, store_sk: 201, promotion_sk: 303, order_id: 'ORD-2630', channel: 'In-Store POS', quantity: 1, unit_price: 899.99, gross_amount: 899.99, discount_amount: 135.00, net_amount: 764.99, cost_amount: 450.00, profit_amount: 314.99, payment_method: 'Credit Card' },
  { sales_sk: 10005, date_sk: 20241215, customer_sk: 1, product_sk: 111, store_sk: 205, promotion_sk: 301, order_id: 'ORD-2780', channel: 'Mobile App', quantity: 2, unit_price: 49.99, gross_amount: 99.98, discount_amount: 0.00, net_amount: 99.98, cost_amount: 32.00, profit_amount: 67.98, payment_method: 'Digital Wallet' },

  // Marcus Vance (Loyal Customer)
  { sales_sk: 10006, date_sk: 20240214, customer_sk: 2, product_sk: 104, store_sk: 203, promotion_sk: 301, order_id: 'ORD-2419', channel: 'In-Store POS', quantity: 1, unit_price: 219.00, gross_amount: 219.00, discount_amount: 0.00, net_amount: 219.00, cost_amount: 85.00, profit_amount: 134.00, payment_method: 'Credit Card' },
  { sales_sk: 10007, date_sk: 20240505, customer_sk: 2, product_sk: 108, store_sk: 203, promotion_sk: 303, order_id: 'ORD-2485', channel: 'In-Store POS', quantity: 2, unit_price: 159.00, gross_amount: 318.00, discount_amount: 47.70, net_amount: 270.30, cost_amount: 116.00, profit_amount: 154.30, payment_method: 'Debit Card' },
  { sales_sk: 10008, date_sk: 20240815, customer_sk: 2, product_sk: 105, store_sk: 205, promotion_sk: 304, order_id: 'ORD-2575', channel: 'E-Commerce', quantity: 3, unit_price: 64.99, gross_amount: 194.97, discount_amount: 48.74, net_amount: 146.23, cost_amount: 66.00, profit_amount: 80.23, payment_method: 'Credit Card' },
  { sales_sk: 10009, date_sk: 20241129, customer_sk: 2, product_sk: 103, store_sk: 205, promotion_sk: 302, order_id: 'ORD-2715', channel: 'E-Commerce', quantity: 1, unit_price: 139.99, gross_amount: 139.99, discount_amount: 28.00, net_amount: 111.99, cost_amount: 55.00, profit_amount: 56.99, payment_method: 'Credit Card' },

  // Sophia Chen (Potential Loyalist)
  { sales_sk: 10010, date_sk: 20240928, customer_sk: 3, product_sk: 110, store_sk: 205, promotion_sk: 301, order_id: 'ORD-2605', channel: 'Mobile App', quantity: 3, unit_price: 48.00, gross_amount: 144.00, discount_amount: 0.00, net_amount: 144.00, cost_amount: 43.50, profit_amount: 100.50, payment_method: 'Digital Wallet' },
  { sales_sk: 10011, date_sk: 20241129, customer_sk: 3, product_sk: 105, store_sk: 205, promotion_sk: 302, order_id: 'ORD-2720', channel: 'Mobile App', quantity: 2, unit_price: 64.99, gross_amount: 129.98, discount_amount: 26.00, net_amount: 103.98, cost_amount: 44.00, profit_amount: 59.98, payment_method: 'Digital Wallet' },

  // David Okafor (At Risk)
  { sales_sk: 10012, date_sk: 20240115, customer_sk: 4, product_sk: 107, store_sk: 204, promotion_sk: 301, order_id: 'ORD-2402', channel: 'In-Store POS', quantity: 1, unit_price: 119.50, gross_amount: 119.50, discount_amount: 0.00, net_amount: 119.50, cost_amount: 42.00, profit_amount: 77.50, payment_method: 'Cash' },

  // Amara Patel (Champion)
  { sales_sk: 10013, date_sk: 20240115, customer_sk: 5, product_sk: 102, store_sk: 202, promotion_sk: 303, order_id: 'ORD-2408', channel: 'In-Store POS', quantity: 1, unit_price: 899.99, gross_amount: 899.99, discount_amount: 135.00, net_amount: 764.99, cost_amount: 450.00, profit_amount: 314.99, payment_method: 'Credit Card' },
  { sales_sk: 10014, date_sk: 20240412, customer_sk: 5, product_sk: 101, store_sk: 202, promotion_sk: 301, order_id: 'ORD-2460', channel: 'In-Store POS', quantity: 1, unit_price: 249.99, gross_amount: 249.99, discount_amount: 0.00, net_amount: 249.99, cost_amount: 110.00, profit_amount: 139.99, payment_method: 'Credit Card' },
  { sales_sk: 10015, date_sk: 20240722, customer_sk: 5, product_sk: 109, store_sk: 205, promotion_sk: 301, order_id: 'ORD-2550', channel: 'E-Commerce', quantity: 1, unit_price: 189.00, gross_amount: 189.00, discount_amount: 0.00, net_amount: 189.00, cost_amount: 72.00, profit_amount: 117.00, payment_method: 'Credit Card' },
  { sales_sk: 10016, date_sk: 20241010, customer_sk: 5, product_sk: 106, store_sk: 202, promotion_sk: 303, order_id: 'ORD-2635', channel: 'In-Store POS', quantity: 1, unit_price: 399.00, gross_amount: 399.00, discount_amount: 59.85, net_amount: 339.15, cost_amount: 180.00, profit_amount: 159.15, payment_method: 'Credit Card' },
  { sales_sk: 10017, date_sk: 20241215, customer_sk: 5, product_sk: 110, store_sk: 205, promotion_sk: 301, order_id: 'ORD-2785', channel: 'Mobile App', quantity: 4, unit_price: 48.00, gross_amount: 192.00, discount_amount: 0.00, net_amount: 192.00, cost_amount: 58.00, profit_amount: 134.00, payment_method: 'Digital Wallet' },

  // Lucas Dubois (Hibernating)
  { sales_sk: 10018, date_sk: 20240320, customer_sk: 6, product_sk: 103, store_sk: 202, promotion_sk: 301, order_id: 'ORD-2445', channel: 'In-Store POS', quantity: 1, unit_price: 139.99, gross_amount: 139.99, discount_amount: 0.00, net_amount: 139.99, cost_amount: 55.00, profit_amount: 84.99, payment_method: 'Debit Card' },

  // Zoe Morales (Lost)
  { sales_sk: 10019, date_sk: 20240115, customer_sk: 7, product_sk: 105, store_sk: 204, promotion_sk: 301, order_id: 'ORD-2405', channel: 'In-Store POS', quantity: 1, unit_price: 64.99, gross_amount: 64.99, discount_amount: 0.00, net_amount: 64.99, cost_amount: 22.00, profit_amount: 42.99, payment_method: 'Cash' },

  // Liam Gallagher (Loyal)
  { sales_sk: 10020, date_sk: 20240412, customer_sk: 8, product_sk: 108, store_sk: 201, promotion_sk: 301, order_id: 'ORD-2465', channel: 'In-Store POS', quantity: 1, unit_price: 159.00, gross_amount: 159.00, discount_amount: 0.00, net_amount: 159.00, cost_amount: 58.00, profit_amount: 101.00, payment_method: 'Credit Card' },
  { sales_sk: 10021, date_sk: 20240722, customer_sk: 8, product_sk: 104, store_sk: 205, promotion_sk: 301, order_id: 'ORD-2555', channel: 'E-Commerce', quantity: 1, unit_price: 219.00, gross_amount: 219.00, discount_amount: 0.00, net_amount: 219.00, cost_amount: 85.00, profit_amount: 134.00, payment_method: 'Credit Card' },
  { sales_sk: 10022, date_sk: 20241129, customer_sk: 8, product_sk: 101, store_sk: 201, promotion_sk: 302, order_id: 'ORD-2725', channel: 'In-Store POS', quantity: 1, unit_price: 249.99, gross_amount: 249.99, discount_amount: 50.00, net_amount: 199.99, cost_amount: 110.00, profit_amount: 89.99, payment_method: 'Credit Card' },

  // Priya Sharma (Champion)
  { sales_sk: 10023, date_sk: 20240214, customer_sk: 9, product_sk: 106, store_sk: 204, promotion_sk: 303, order_id: 'ORD-2425', channel: 'In-Store POS', quantity: 1, unit_price: 399.00, gross_amount: 399.00, discount_amount: 59.85, net_amount: 339.15, cost_amount: 180.00, profit_amount: 159.15, payment_method: 'Credit Card' },
  { sales_sk: 10024, date_sk: 20240505, customer_sk: 9, product_sk: 112, store_sk: 204, promotion_sk: 301, order_id: 'ORD-2490', channel: 'In-Store POS', quantity: 1, unit_price: 99.00, gross_amount: 99.00, discount_amount: 0.00, net_amount: 99.00, cost_amount: 40.00, profit_amount: 59.00, payment_method: 'Credit Card' },
  { sales_sk: 10025, date_sk: 20240928, customer_sk: 9, product_sk: 102, store_sk: 205, promotion_sk: 301, order_id: 'ORD-2610', channel: 'E-Commerce', quantity: 1, unit_price: 899.99, gross_amount: 899.99, discount_amount: 0.00, net_amount: 899.99, cost_amount: 450.00, profit_amount: 449.99, payment_method: 'Credit Card' },
  { sales_sk: 10026, date_sk: 20241215, customer_sk: 9, product_sk: 111, store_sk: 205, promotion_sk: 303, order_id: 'ORD-2790', channel: 'Mobile App', quantity: 3, unit_price: 49.99, gross_amount: 149.97, discount_amount: 22.50, net_amount: 127.47, cost_amount: 48.00, profit_amount: 79.47, payment_method: 'Digital Wallet' },

  // Nathaniel Drake (At Risk)
  { sales_sk: 10027, date_sk: 20240214, customer_sk: 10, product_sk: 107, store_sk: 203, promotion_sk: 301, order_id: 'ORD-2428', channel: 'In-Store POS', quantity: 2, unit_price: 119.50, gross_amount: 239.00, discount_amount: 0.00, net_amount: 239.00, cost_amount: 84.00, profit_amount: 155.00, payment_method: 'Debit Card' },

  // Hiroshi Tanaka (SCD Type 2: purchased once in North, twice in West)
  { sales_sk: 10028, date_sk: 20240214, customer_sk: 11, product_sk: 103, store_sk: 203, promotion_sk: 301, order_id: 'ORD-2430', channel: 'In-Store POS', quantity: 1, unit_price: 139.99, gross_amount: 139.99, discount_amount: 0.00, net_amount: 139.99, cost_amount: 55.00, profit_amount: 84.99, payment_method: 'Credit Card' },
  { sales_sk: 10029, date_sk: 20240618, customer_sk: 12, product_sk: 101, store_sk: 201, promotion_sk: 303, order_id: 'ORD-2515', channel: 'In-Store POS', quantity: 1, unit_price: 249.99, gross_amount: 249.99, discount_amount: 37.50, net_amount: 212.49, cost_amount: 110.00, profit_amount: 102.49, payment_method: 'Credit Card' },
  { sales_sk: 10030, date_sk: 20241129, customer_sk: 12, product_sk: 108, store_sk: 205, promotion_sk: 302, order_id: 'ORD-2730', channel: 'E-Commerce', quantity: 1, unit_price: 159.00, gross_amount: 159.00, discount_amount: 31.80, net_amount: 127.20, cost_amount: 58.00, profit_amount: 69.20, payment_method: 'Credit Card' },

  // Chloe Tremblay (Potential Loyalist)
  { sales_sk: 10031, date_sk: 20240815, customer_sk: 13, product_sk: 110, store_sk: 202, promotion_sk: 301, order_id: 'ORD-2580', channel: 'In-Store POS', quantity: 2, unit_price: 48.00, gross_amount: 96.00, discount_amount: 0.00, net_amount: 96.00, cost_amount: 29.00, profit_amount: 67.00, payment_method: 'Digital Wallet' },
  { sales_sk: 10032, date_sk: 20241129, customer_sk: 13, product_sk: 105, store_sk: 205, promotion_sk: 302, order_id: 'ORD-2735', channel: 'Mobile App', quantity: 2, unit_price: 64.99, gross_amount: 129.98, discount_amount: 26.00, net_amount: 103.98, cost_amount: 44.00, profit_amount: 59.98, payment_method: 'Digital Wallet' },
];

export const customerRFMData: CustomerRFM[] = [
  {
    customer_id: 'CUST-1001',
    full_name: 'Elena Rostova',
    region: 'West',
    loyalty_tier: 'Platinum',
    recency_days: 12,
    frequency_orders: 5,
    monetary_total: 2043.10,
    r_score: 5,
    f_score: 5,
    m_score: 5,
    rfm_score: '555',
    segment_label: 'Champions',
    churn_probability: 0.04,
    avg_basket_value: 408.62,
    suggested_action: 'VIP Concierge access, early new product releases, brand ambassador invitation.'
  },
  {
    customer_id: 'CUST-1005',
    full_name: 'Amara Patel',
    region: 'East',
    loyalty_tier: 'Platinum',
    recency_days: 12,
    frequency_orders: 5,
    monetary_total: 1735.13,
    r_score: 5,
    f_score: 5,
    m_score: 5,
    rfm_score: '555',
    segment_label: 'Champions',
    churn_probability: 0.05,
    avg_basket_value: 347.03,
    suggested_action: 'Exclusive high-tier cashback rewards, invite to private preview events.'
  },
  {
    customer_id: 'CUST-1009',
    full_name: 'Priya Sharma',
    region: 'South',
    loyalty_tier: 'Platinum',
    recency_days: 12,
    frequency_orders: 4,
    monetary_total: 1465.61,
    r_score: 5,
    f_score: 4,
    m_score: 5,
    rfm_score: '545',
    segment_label: 'Champions',
    churn_probability: 0.07,
    avg_basket_value: 366.40,
    suggested_action: 'Personalized anniversary gift, cross-sell premium home accessories.'
  },
  {
    customer_id: 'CUST-1002',
    full_name: 'Marcus Vance',
    region: 'Central',
    loyalty_tier: 'Gold',
    recency_days: 28,
    frequency_orders: 4,
    monetary_total: 747.52,
    r_score: 4,
    f_score: 4,
    m_score: 4,
    rfm_score: '444',
    segment_label: 'Loyal Customers',
    churn_probability: 0.12,
    avg_basket_value: 186.88,
    suggested_action: 'Upsell premium warranties and offer tier-upgrade accelerator points.'
  },
  {
    customer_id: 'CUST-1008',
    full_name: 'Liam Gallagher',
    region: 'West',
    loyalty_tier: 'Gold',
    recency_days: 28,
    frequency_orders: 3,
    monetary_total: 577.99,
    r_score: 4,
    f_score: 3,
    m_score: 3,
    rfm_score: '433',
    segment_label: 'Loyal Customers',
    churn_probability: 0.15,
    avg_basket_value: 192.66,
    suggested_action: 'Promote bundle discounts on outdoor and sports apparel.'
  },
  {
    customer_id: 'CUST-1011',
    full_name: 'Hiroshi Tanaka',
    region: 'West',
    loyalty_tier: 'Gold',
    recency_days: 28,
    frequency_orders: 3,
    monetary_total: 479.68,
    r_score: 4,
    f_score: 3,
    m_score: 3,
    rfm_score: '433',
    segment_label: 'Loyal Customers',
    churn_probability: 0.14,
    avg_basket_value: 159.89,
    suggested_action: 'Localized West Coast store opening perks and free express delivery.'
  },
  {
    customer_id: 'CUST-1003',
    full_name: 'Sophia Chen',
    region: 'West',
    loyalty_tier: 'Silver',
    recency_days: 28,
    frequency_orders: 2,
    monetary_total: 247.98,
    r_score: 4,
    f_score: 2,
    m_score: 2,
    rfm_score: '422',
    segment_label: 'Potential Loyalists',
    churn_probability: 0.22,
    avg_basket_value: 123.99,
    suggested_action: 'Time-sensitive double loyalty points on 3rd purchase to establish habit.'
  },
  {
    customer_id: 'CUST-1012',
    full_name: 'Chloe Tremblay',
    region: 'East',
    loyalty_tier: 'Bronze',
    recency_days: 28,
    frequency_orders: 2,
    monetary_total: 199.98,
    r_score: 4,
    f_score: 2,
    m_score: 2,
    rfm_score: '422',
    segment_label: 'Potential Loyalists',
    churn_probability: 0.25,
    avg_basket_value: 99.99,
    suggested_action: 'Welcome series drip email with personalized top-rated beauty recommendations.'
  },
  {
    customer_id: 'CUST-1004',
    full_name: 'David Okafor',
    region: 'South',
    loyalty_tier: 'Bronze',
    recency_days: 345,
    frequency_orders: 1,
    monetary_total: 119.50,
    r_score: 1,
    f_score: 1,
    m_score: 1,
    rfm_score: '111',
    segment_label: 'At Risk',
    churn_probability: 0.78,
    avg_basket_value: 119.50,
    suggested_action: 'Send "We Miss You" win-back campaign with $25 gift card on $75+ purchase.'
  },
  {
    customer_id: 'CUST-1010',
    full_name: 'Nathaniel Drake',
    region: 'Central',
    loyalty_tier: 'Bronze',
    recency_days: 315,
    frequency_orders: 1,
    monetary_total: 239.00,
    r_score: 1,
    f_score: 1,
    m_score: 2,
    rfm_score: '112',
    segment_label: 'At Risk',
    churn_probability: 0.72,
    avg_basket_value: 239.00,
    suggested_action: 'Cookware line cross-sell with exclusive culinary video masterclass offer.'
  },
  {
    customer_id: 'CUST-1006',
    full_name: 'Lucas Dubois',
    region: 'East',
    loyalty_tier: 'Silver',
    recency_days: 280,
    frequency_orders: 1,
    monetary_total: 139.99,
    r_score: 1,
    f_score: 1,
    m_score: 1,
    rfm_score: '111',
    segment_label: 'Hibernating',
    churn_probability: 0.82,
    avg_basket_value: 139.99,
    suggested_action: 'Re-engagement survey to identify friction points plus free shipping coupon.'
  },
  {
    customer_id: 'CUST-1007',
    full_name: 'Zoe Morales',
    region: 'South',
    loyalty_tier: 'Bronze',
    recency_days: 345,
    frequency_orders: 1,
    monetary_total: 64.99,
    r_score: 1,
    f_score: 1,
    m_score: 1,
    rfm_score: '111',
    segment_label: 'Lost',
    churn_probability: 0.94,
    avg_basket_value: 64.99,
    suggested_action: 'Do not allocate expensive paid spend; keep in passive low-cost newsletter.'
  },
];

export const associationRulesData: AssociationRule[] = [
  {
    antecedent: ['Precision Espresso Machine'],
    consequent: ['Conical Burr Coffee Grinder'],
    support: 0.28,
    confidence: 0.82,
    lift: 2.93,
    business_action: 'Auto-bundle as "Master Home Barista Kit" with 15% combined bundle discount.'
  },
  {
    antecedent: ['Noise-Cancelling Headphones'],
    consequent: ['Wireless Fast Charger Station'],
    support: 0.34,
    confidence: 0.76,
    lift: 2.24,
    business_action: 'Present in checkout slide-in drawer: "Customers who bought headphones also added this charger".'
  },
  {
    antecedent: ['4K OLED Smart TV 55"'],
    consequent: ['Ergonomic Mechanical Keyboard'],
    support: 0.19,
    confidence: 0.63,
    lift: 1.88,
    business_action: 'Market as "Living Room Gaming & Media Command Center" package.'
  },
  {
    antecedent: ['Carbon Fiber Trail Runners'],
    consequent: ['Breathable Athletic Joggers'],
    support: 0.24,
    confidence: 0.71,
    lift: 2.15,
    business_action: 'Display joggers directly on manikins beside running shoe showcase shelves in physical stores.'
  },
  {
    antecedent: ['HydraGlow Peptide Restorative Serum'],
    consequent: ['Merino Wool Weatherproof Parka'],
    support: 0.15,
    confidence: 0.58,
    lift: 1.62,
    business_action: 'Seasonal Autumn/Winter skincare & cold weather protective lifestyle campaign.'
  },
];

export const etlPipelineStepsData: ETLStep[] = [
  {
    id: 'etl-01',
    step_number: 1,
    name: 'Multi-Source Raw Extraction',
    stage: 'Extract',
    description: 'Ingesting delta records from PostgreSQL POS stores, Shopify E-Commerce API, and Firebase Mobile App logs into S3/GCS Data Lake landing zone.',
    input_count: 5000,
    output_count: 5000,
    rejected_count: 0,
    rules_applied: ['CDC (Change Data Capture) via Debezium', 'REST API Pagination', 'Parquet Snappy Compression'],
    status: 'completed',
  },
  {
    id: 'etl-02',
    step_number: 2,
    name: 'Data Cleansing & Validation Gate',
    stage: 'Cleanse',
    description: 'Validating email regex, handling NULLs, stripping trailing whitespace, filtering negative quantities or zero unit price test orders.',
    input_count: 5000,
    output_count: 4860,
    rejected_count: 140,
    rules_applied: ['Quantity > 0 check', 'Valid ISO Date format parse', 'Deduplication by order_id + line_id', 'Email domain validation'],
    status: 'completed',
  },
  {
    id: 'etl-03',
    step_number: 3,
    name: 'Conforming Dimensions & SCD Type 2',
    stage: 'Transform',
    description: 'Lookup natural business keys against Dim tables. If customer address or tier changed, expire existing record (valid_to = now, is_current = FALSE) and insert new version.',
    input_count: 4860,
    output_count: 4860,
    rejected_count: 0,
    rules_applied: ['SCD Type 2 History Tracker', 'Surrogate Key generation via Hash/Sequence', 'Currency exchange conversion to USD'],
    status: 'completed',
  },
  {
    id: 'etl-04',
    step_number: 4,
    name: 'Star Schema Fact Table Load',
    stage: 'Load',
    description: 'Bulk atomic merge load into Fact_Sales table. Compute gross_amount, discount_amount, net_amount, cost_amount, and profit_amount metrics.',
    input_count: 4860,
    output_count: 4860,
    rejected_count: 0,
    rules_applied: ['Referential Integrity Foreign Key checks', 'Partition Pruning by Year_Month', 'Aggregate Rollup Pre-computations'],
    status: 'completed',
  },
];

export const dirtyRecordsSample: DirtyRecord[] = [
  { raw_id: 'RAW-801', raw_order_id: 'ORD-9901', raw_customer_name: '  john smith  ', raw_email: 'jsmith@@gmail..com', raw_date: '02/31/2024', raw_quantity: '-2', raw_price: '$249.99', raw_region: 'WE', issues: ['Invalid date (Feb 31)', 'Negative quantity (-2)', 'Malformed email', 'Unnormalized region string'], cleansed_status: 'Rejected' },
  { raw_id: 'RAW-802', raw_order_id: 'ORD-9902', raw_customer_name: 'ELENA ROSTOVA', raw_email: 'elena.rostova@nexus.com', raw_date: '2024-01-15T10:30:00Z', raw_quantity: '2', raw_price: '249.99', raw_region: 'West', issues: ['All uppercase name trimmed and title-cased', 'Timestamp truncated to Date SK 20240115'], cleansed_status: 'Normalized' },
  { raw_id: 'RAW-803', raw_order_id: 'ORD-9903', raw_customer_name: 'Sarah Connor', raw_email: 'sconnor@cyberdyne.org', raw_date: '2024-04-12', raw_quantity: '1', raw_price: 'NULL', raw_region: 'East', issues: ['Missing price: Imputed from Dim_Product master catalog ($139.99)'], cleansed_status: 'Imputed' },
  { raw_id: 'RAW-804', raw_order_id: 'ORD-9904', raw_customer_name: 'TEST_USER_DEV', raw_email: 'test@internal.local', raw_date: '2024-05-01', raw_quantity: '999', raw_price: '0.00', raw_region: 'DEV', issues: ['Test sandbox transaction detected (Price=0, dev email)'], cleansed_status: 'Rejected' },
];

export const sqlQueryCatalog: SQLQueryItem[] = [
  {
    id: 'sql-01',
    title: 'Star Schema DDL - Dimension & Fact Tables',
    category: 'DDL - Star Schema',
    description: 'Production PostgreSQL / Cloud SQL DDL with surrogate keys, primary keys, foreign key constraints, default timestamps, and SCD2 columns.',
    sql: `-- ========================================================
-- RETAIL SALES DATA WAREHOUSE - STAR SCHEMA DDL
-- ========================================================

-- 1. Dim_Customer (Supports Slowly Changing Dimension Type 2)
CREATE TABLE dim_customer (
    customer_sk       BIGSERIAL PRIMARY KEY,
    customer_id       VARCHAR(50) NOT NULL, -- Natural/Business Key
    full_name         VARCHAR(150) NOT NULL,
    email             VARCHAR(150) NOT NULL,
    gender            CHAR(1),
    age_group         VARCHAR(20),
    city              VARCHAR(100),
    state             VARCHAR(50),
    region            VARCHAR(50) NOT NULL,
    loyalty_tier      VARCHAR(30) DEFAULT 'Bronze',
    customer_segment  VARCHAR(50),
    valid_from        TIMESTAMP NOT NULL,
    valid_to          TIMESTAMP,           -- NULL if current record
    is_current        BOOLEAN NOT NULL DEFAULT TRUE,
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_dim_customer_nk ON dim_customer(customer_id, is_current);

-- 2. Dim_Product
CREATE TABLE dim_product (
    product_sk        BIGSERIAL PRIMARY KEY,
    product_id        VARCHAR(50) NOT NULL UNIQUE,
    product_name      VARCHAR(200) NOT NULL,
    category          VARCHAR(100) NOT NULL,
    sub_category      VARCHAR(100) NOT NULL,
    brand             VARCHAR(100) NOT NULL,
    unit_cost         NUMERIC(12, 2) NOT NULL,
    unit_price        NUMERIC(12, 2) NOT NULL,
    margin_rate       NUMERIC(5, 4) GENERATED ALWAYS AS ((unit_price - unit_cost) / NULLIF(unit_price, 0)) STORED
);

-- 3. Dim_Store
CREATE TABLE dim_store (
    store_sk          BIGSERIAL PRIMARY KEY,
    store_id          VARCHAR(50) NOT NULL UNIQUE,
    store_name        VARCHAR(150) NOT NULL,
    store_type        VARCHAR(50) NOT NULL,
    region            VARCHAR(50) NOT NULL,
    city              VARCHAR(100) NOT NULL,
    state             VARCHAR(50) NOT NULL,
    sqft              INT,
    manager_name      VARCHAR(100)
);

-- 4. Dim_Date (Role-Playing Calendar Dimension)
CREATE TABLE dim_date (
    date_sk           INT PRIMARY KEY, -- e.g., 20240315
    full_date         DATE NOT NULL UNIQUE,
    day_of_week       INT NOT NULL,
    day_name          VARCHAR(20) NOT NULL,
    month_num         INT NOT NULL,
    month_name        VARCHAR(20) NOT NULL,
    quarter           CHAR(2) NOT NULL,
    year              INT NOT NULL,
    is_weekend        BOOLEAN NOT NULL,
    fiscal_period     VARCHAR(20)
);

-- 5. Dim_Promotion
CREATE TABLE dim_promotion (
    promotion_sk      BIGSERIAL PRIMARY KEY,
    promotion_id      VARCHAR(50) NOT NULL UNIQUE,
    promotion_name    VARCHAR(150) NOT NULL,
    promo_type        VARCHAR(50) NOT NULL,
    discount_pct      NUMERIC(5, 4) NOT NULL DEFAULT 0.0000
);

-- 6. Fact_Sales (Grain: One row per line item in a completed retail sales transaction)
CREATE TABLE fact_sales (
    sales_sk          BIGSERIAL PRIMARY KEY,
    date_sk           INT NOT NULL REFERENCES dim_date(date_sk),
    customer_sk       BIGINT NOT NULL REFERENCES dim_customer(customer_sk),
    product_sk        BIGINT NOT NULL REFERENCES dim_product(product_sk),
    store_sk          BIGINT NOT NULL REFERENCES dim_store(store_sk),
    promotion_sk      BIGINT NOT NULL REFERENCES dim_promotion(promotion_sk),
    order_id          VARCHAR(60) NOT NULL,
    channel           VARCHAR(30) NOT NULL, -- POS, E-Comm, Mobile
    quantity          INT NOT NULL CHECK (quantity > 0),
    unit_price        NUMERIC(12, 2) NOT NULL,
    gross_amount      NUMERIC(12, 2) NOT NULL,
    discount_amount   NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    net_amount        NUMERIC(12, 2) NOT NULL,
    cost_amount       NUMERIC(12, 2) NOT NULL,
    profit_amount     NUMERIC(12, 2) NOT NULL,
    payment_method    VARCHAR(50) NOT NULL,
    dw_load_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Star Schema Foreign Key Indexes for high-speed OLAP join performance
CREATE INDEX idx_fact_date ON fact_sales(date_sk);
CREATE INDEX idx_fact_cust ON fact_sales(customer_sk);
CREATE INDEX idx_fact_prod ON fact_sales(product_sk);
CREATE INDEX idx_fact_store ON fact_sales(store_sk);`,
    explanation: 'Defines the full relational star schema with surrogate primary keys, natural keys, SCD2 tracking columns, check constraints, and indexing optimized for read-heavy OLAP queries.',
    sampleResult: [
      { status: 'SUCCESS', tables_created: '6 (1 Fact, 5 Dimensions)', indexes_created: '6', foreign_keys: '5' }
    ]
  },
  {
    id: 'sql-02',
    title: 'SCD Type 2 Historical Dimension Pipeline Query',
    category: 'ETL & SCD Type 2',
    description: 'Implements Kimball Slowly Changing Dimension Type 2 logic using MERGE / Conditional UPDATE to expire old records and insert new version.',
    sql: `-- Slowly Changing Dimension Type 2: Expiring modified records and inserting new active version
-- Step 1: Expire old active record when attributes change (e.g. region or loyalty tier)
UPDATE dim_customer
SET valid_to = CURRENT_DATE,
    is_current = FALSE
WHERE customer_id = 'CUST-1011'
  AND is_current = TRUE
  AND (region <> 'West' OR loyalty_tier <> 'Gold');

-- Step 2: Insert new surrogate record with active timestamp
INSERT INTO dim_customer (
    customer_id, full_name, email, gender, age_group,
    city, state, region, loyalty_tier, customer_segment,
    valid_from, valid_to, is_current
)
VALUES (
    'CUST-1011', 'Hiroshi Tanaka', 'h.tanaka@tokyo-labs.jp', 'M', '36-45',
    'Portland', 'OR', 'West', 'Gold', 'Loyal Customers',
    CURRENT_DATE, NULL, TRUE
);`,
    explanation: 'Preserves historical sales attribution to the customer previous location (North) while attributing future transactions to the new location (West) without rewriting historical facts.',
    sampleResult: [
      { customer_id: 'CUST-1011', old_sk: 11, new_sk: 12, previous_region: 'North', active_region: 'West', is_current: 'TRUE' }
    ]
  },
  {
    id: 'sql-03',
    title: 'Customer RFM Calculation Engine in SQL',
    category: 'Customer Mining & RFM',
    description: 'Calculates Recency, Frequency, and Monetary scores and segments customers using NTILE(5) percentile window ranking.',
    sql: `WITH customer_base_rfm AS (
    SELECT 
        c.customer_id,
        c.full_name,
        c.region,
        c.loyalty_tier,
        CURRENT_DATE - MAX(d.full_date) AS recency_days,
        COUNT(DISTINCT f.order_id)       AS frequency_orders,
        SUM(f.net_amount)                AS monetary_total,
        ROUND(AVG(f.net_amount), 2)      AS avg_basket_value
    FROM fact_sales f
    JOIN dim_customer c ON f.customer_sk = c.customer_sk
    JOIN dim_date d     ON f.date_sk = d.date_sk
    WHERE c.is_current = TRUE
    GROUP BY c.customer_id, c.full_name, c.region, c.loyalty_tier
),
rfm_ranked AS (
    SELECT 
        *,
        NTILE(5) OVER (ORDER BY recency_days DESC) AS r_score, -- Lower recency days = higher score
        NTILE(5) OVER (ORDER BY frequency_orders ASC) AS f_score,
        NTILE(5) OVER (ORDER BY monetary_total ASC)   AS m_score
    FROM customer_base_rfm
)
SELECT 
    customer_id,
    full_name,
    recency_days,
    frequency_orders,
    monetary_total,
    CONCAT(r_score, f_score, m_score) AS rfm_composite,
    CASE 
        WHEN r_score >= 4 AND f_score >= 4 AND m_score >= 4 THEN 'Champions'
        WHEN r_score >= 3 AND f_score >= 3 THEN 'Loyal Customers'
        WHEN r_score >= 3 AND f_score < 3 THEN 'Potential Loyalists'
        WHEN r_score <= 2 AND f_score >= 3 THEN 'At Risk Customers'
        WHEN r_score <= 2 AND f_score < 3 AND m_score <= 2 THEN 'Hibernating / Churned'
        ELSE 'Standard Prospects'
    END AS customer_segment
FROM rfm_ranked
ORDER BY monetary_total DESC;`,
    explanation: 'Uses CTEs and NTILE(5) window ranking to assign 1-5 scores for Recency, Frequency, and Monetary parameters, clustering customers into actionable business segments.',
    sampleResult: [
      { customer_id: 'CUST-1001', full_name: 'Elena Rostova', recency_days: 12, frequency_orders: 5, monetary_total: 2043.10, rfm_composite: '555', customer_segment: 'Champions' },
      { customer_id: 'CUST-1005', full_name: 'Amara Patel', recency_days: 12, frequency_orders: 5, monetary_total: 1735.13, rfm_composite: '555', customer_segment: 'Champions' },
      { customer_id: 'CUST-1009', full_name: 'Priya Sharma', recency_days: 12, frequency_orders: 4, monetary_total: 1465.61, rfm_composite: '545', customer_segment: 'Champions' },
      { customer_id: 'CUST-1002', full_name: 'Marcus Vance', recency_days: 28, frequency_orders: 4, monetary_total: 747.52, rfm_composite: '444', customer_segment: 'Loyal Customers' },
      { customer_id: 'CUST-1004', full_name: 'David Okafor', recency_days: 345, frequency_orders: 1, monetary_total: 119.50, rfm_composite: '111', customer_segment: 'At Risk Customers' }
    ]
  },
  {
    id: 'sql-04',
    title: 'Top N Products per Category via DENSE_RANK()',
    category: 'Window Functions',
    description: 'Calculates the top revenue-generating products within each retail department using window partitioning.',
    sql: `WITH product_category_sales AS (
    SELECT 
        p.category,
        p.product_name,
        SUM(f.quantity)        AS total_units_sold,
        SUM(f.net_amount)      AS total_revenue,
        SUM(f.profit_amount)   AS total_profit,
        DENSE_RANK() OVER (
            PARTITION BY p.category 
            ORDER BY SUM(f.net_amount) DESC
        ) AS sales_rank
    FROM fact_sales f
    JOIN dim_product p ON f.product_sk = p.product_sk
    GROUP BY p.category, p.product_name
)
SELECT 
    category,
    sales_rank,
    product_name,
    total_units_sold,
    total_revenue,
    total_profit
FROM product_category_sales
WHERE sales_rank <= 3
ORDER BY category, sales_rank;`,
    explanation: 'Uses DENSE_RANK() partitioned by product category to dynamically filter the top 3 highest-earning items per category without manual subqueries.',
    sampleResult: [
      { category: 'Electronics', sales_rank: 1, product_name: 'UltraVision 4K OLED Smart TV 55"', total_units_sold: 3, total_revenue: 2429.97, total_profit: 1079.97 },
      { category: 'Electronics', sales_rank: 2, product_name: 'Titan Pro Noise-Cancelling Headphones', total_units_sold: 5, total_revenue: 1162.45, total_profit: 611.45 },
      { category: 'Home & Kitchen', sales_rank: 1, product_name: 'BaristaMaster Precision Espresso Machine', total_units_sold: 3, total_revenue: 1017.45, total_profit: 477.45 },
      { category: 'Footwear', sales_rank: 1, product_name: 'AeroStride Carbon Fiber Trail Runners', total_units_sold: 4, total_revenue: 556.50, total_profit: 324.50 }
    ]
  },
  {
    id: 'sql-05',
    title: 'OLAP CUBE & ROLLUP Multidimensional Aggregation',
    category: 'Analytical OLAP',
    description: 'Generates hierarchical subtotals across Region, Store Type, and Product Category in a single optimized pass.',
    sql: `SELECT 
    COALESCE(s.region, '--- ALL REGIONS ---')      AS region,
    COALESCE(p.category, '--- ALL CATEGORIES ---') AS category,
    SUM(f.quantity)                                AS total_units,
    ROUND(SUM(f.net_amount), 2)                    AS net_revenue,
    ROUND(SUM(f.profit_amount), 2)                 AS net_profit,
    ROUND((SUM(f.profit_amount) / NULLIF(SUM(f.net_amount), 0)) * 100, 2) AS profit_margin_pct
FROM fact_sales f
JOIN dim_store s   ON f.store_sk = s.store_sk
JOIN dim_product p ON f.product_sk = p.product_sk
GROUP BY ROLLUP (s.region, p.category)
ORDER BY s.region NULLS LAST, net_revenue DESC;`,
    explanation: 'ROLLUP creates super-aggregate rows (category totals, regional totals, and grand total) vital for fast Power BI pivot tables and executive summaries.',
    sampleResult: [
      { region: 'West', category: 'Electronics', total_units: 7, net_revenue: 3747.08, net_profit: 1721.41, profit_margin_pct: 45.94 },
      { region: 'West', category: 'Home & Kitchen', total_units: 2, net_revenue: 438.15, net_profit: 218.15, profit_margin_pct: 49.79 },
      { region: 'West', category: '--- ALL CATEGORIES ---', total_units: 14, net_revenue: 5202.91, net_profit: 2470.24, profit_margin_pct: 47.48 },
      { region: '--- ALL REGIONS ---', category: '--- ALL CATEGORIES ---', total_units: 32, net_revenue: 8198.88, net_profit: 3768.49, profit_margin_pct: 45.96 }
    ]
  }
];

export const daxMeasuresCatalog: DAXFormulaItem[] = [
  {
    id: 'dax-01',
    name: 'Total Net Sales Revenue',
    category: 'Financial KPIs',
    dax: `Total Net Sales = 
SUM ( Fact_Sales[net_amount] )`,
    explanation: 'Fundamental measure summing net realized revenue after deductions, discounts, and promotional allowances.',
    resultValue: '$8,198.88'
  },
  {
    id: 'dax-02',
    name: 'Year-Over-Year Sales Growth %',
    category: 'Time Intelligence',
    dax: `YoY Revenue Growth % = 
VAR CurrentSales = [Total Net Sales]
VAR PreviousYearSales = 
    CALCULATE (
        [Total Net Sales],
        SAMEPERIODLASTYEAR ( Dim_Date[full_date] )
    )
RETURN
    DIVIDE ( CurrentSales - PreviousYearSales, PreviousYearSales, 0 )`,
    explanation: 'Compares current year revenue performance against the corresponding historical calendar period.',
    resultValue: '+18.4%'
  },
  {
    id: 'dax-03',
    name: 'Customer Retention Rate %',
    category: 'Customer Retention',
    dax: `Customer Retention Rate % = 
VAR ActivePriorPeriod = 
    CALCULATETABLE (
        VALUES ( Fact_Sales[customer_sk] ),
        DATESINPERIOD ( Dim_Date[full_date], MAX(Dim_Date[full_date]) - 90, -90, DAY )
    )
VAR ActiveCurrentPeriod = 
    CALCULATETABLE (
        VALUES ( Fact_Sales[customer_sk] ),
        DATESINPERIOD ( Dim_Date[full_date], MAX(Dim_Date[full_date]), -90, DAY )
    )
VAR RetainedCount = 
    COUNTROWS ( INTERSECT ( ActivePriorPeriod, ActiveCurrentPeriod ) )
VAR PriorTotalCount = 
    COUNTROWS ( ActivePriorPeriod )
RETURN
    DIVIDE ( RetainedCount, PriorTotalCount, 0 )`,
    explanation: 'Computes the fraction of repeat active shoppers who made repeat purchases in consecutive 90-day rolling windows.',
    resultValue: '84.2%'
  },
  {
    id: 'dax-04',
    name: 'Average Order Value (AOV)',
    category: 'Financial KPIs',
    dax: `Average Order Value = 
DIVIDE ( 
    [Total Net Sales], 
    DISTINCTCOUNT ( Fact_Sales[order_id] ), 
    0 
)`,
    explanation: 'Measures the monetary amount spent per distinct checkout transaction across all channels.',
    resultValue: '$256.21'
  },
  {
    id: 'dax-05',
    name: 'Customer Lifetime Value (LTV)',
    category: 'Customer Retention',
    dax: `Rolling Customer LTV = 
CALCULATE (
    [Total Net Sales],
    FILTER (
        ALL ( Dim_Date ),
        Dim_Date[full_date] <= MAX ( Dim_Date[full_date] )
    )
)`,
    explanation: 'Cumulative historical spending generated by each customer profile since their registration date.',
    resultValue: '$630.68 avg'
  }
];

export const testCasesData: TestCase[] = [
  { id: 'TC-01', suite: 'Referential Integrity', test_name: 'Orphaned Sales Fact Detection', sql_validation: 'SELECT COUNT(*) FROM fact_sales f LEFT JOIN dim_customer c ON f.customer_sk = c.customer_sk WHERE c.customer_sk IS NULL;', expected_outcome: 'Count must be 0 (No orphan foreign keys)', status: 'PASS' },
  { id: 'TC-02', suite: 'Data Quality', test_name: 'Negative or Zero Quantity Check', sql_validation: 'SELECT COUNT(*) FROM fact_sales WHERE quantity <= 0;', expected_outcome: 'Count must be 0', status: 'PASS' },
  { id: 'TC-03', suite: 'Data Quality', test_name: 'Profit Integrity Reconciliation', sql_validation: 'SELECT COUNT(*) FROM fact_sales WHERE ABS((net_amount - cost_amount) - profit_amount) > 0.01;', expected_outcome: 'Net Amount minus Cost must reconcile to Profit Amount', status: 'PASS' },
  { id: 'TC-04', suite: 'SCD Type 2', test_name: 'Single Active Record per Business Key', sql_validation: 'SELECT customer_id, COUNT(*) FROM dim_customer WHERE is_current = TRUE GROUP BY customer_id HAVING COUNT(*) > 1;', expected_outcome: 'No customer NK has multiple active records', status: 'PASS' },
  { id: 'TC-05', suite: 'Aggregations & Granularity', test_name: 'Grain Uniqueness Verification', sql_validation: 'SELECT order_id, product_sk, COUNT(*) FROM fact_sales GROUP BY order_id, product_sk HAVING COUNT(*) > 1;', expected_outcome: 'Exactly one row per order line item', status: 'PASS' }
];
