/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DocSection {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  iconName: string;
  content: string;
  keyPoints: string[];
  subsections?: {
    heading: string;
    details: string;
  }[];
}

export const documentationSections: DocSection[] = [
  {
    id: 'overview',
    number: 1,
    title: 'Project Overview',
    subtitle: 'Executive Summary & Modern Data Engineering Foundation',
    iconName: 'BookOpen',
    content: `The modern retail enterprise operates across a distributed omnichannel landscape comprising physical Point-of-Sale (POS) terminals, e-commerce storefronts, mobile shopping applications, and loyalty CRM platforms. While raw transactional volume continues to expand exponentially, legacy transactional relational databases (OLTP) suffer from query latency, siloed data storage, redundant records, and an inability to perform low-latency analytical aggregations.

The "Retail Sales Data Warehouse and Customer Mining" project establishes a resilient, production-grade enterprise Data Warehouse (EDW) and Data Mining suite. By engineering an end-to-end Extract, Transform, Load (ETL) pipeline and implementing Ralph Kimball's dimensional modeling technique (Star Schema), this system unifies heterogeneous transaction streams into a conformed, single-source-of-truth analytical repository.

Furthermore, by coupling dimensional business intelligence with advanced Customer Data Mining—specifically Recency, Frequency, Monetary (RFM) segmentation, K-Means clustering, and Market Basket Analysis (Apriori algorithm)—the platform unlocks granular customer behavior analytics, detects early customer churn risks, and provides executive decision-makers with automated, high-impact retail recommendations.`,
    keyPoints: [
      'Unifies POS, E-Commerce, and Mobile App transactions into a centralized analytical repository.',
      'Employs Ralph Kimball dimensional modeling principles using a Star Schema design with surrogate keys and SCD Type 2 tracking.',
      'Executes rigorous automated ETL data quality validation, handling missing records, dirty strings, and referential integrity.',
      'Applies unsupervised customer segmentation via RFM behavioral scoring and Apriori association rule mining for cross-sell bundles.',
      'Delivers an executive-grade Business Intelligence suite with DAX-driven KPIs (AOV, Retention Rate, YoY Growth, Gross Margin).'
    ],
    subsections: [
      {
        heading: 'Strategic Significance for Retail Organizations',
        details: 'Retailers face tight margins (often 3% to 8% net) and intense competition. Standard operational databases fail when aggregating millions of historic records across quarters. An analytical warehouse separates read-intensive workloads from operational OLTP databases, allowing instant OLAP slice-and-dice queries without disrupting in-store customer checkouts.'
      },
      {
        heading: 'Academic & Industry Defense Relevance',
        details: 'Demonstrates end-to-end mastery of core computer science and data engineering paradigms: Data Warehousing lifecycle, dimensional design, Surrogate vs Natural keys, Slowly Changing Dimensions, ETL fault tolerance, SQL window analytical functions, and unsupervised algorithmic data mining.'
      }
    ]
  },
  {
    id: 'problem-statement',
    number: 2,
    title: 'Problem Statement',
    subtitle: 'Operational Silos, Latency, and Absence of Customer Intelligence',
    iconName: 'AlertTriangle',
    content: `Traditional retail environments suffer from five critical technical and operational bottlenecks:

1. Data Fragmentation & Silos: Sales data is trapped across disparate databases (e.g., PostgreSQL in retail stores, MongoDB in mobile applications, and Shopify APIs for web storefronts). There is no conformed view of a customer who purchases across both online and offline channels.
2. OLTP Inefficiency for Analytics: Running multi-table JOINs and multi-year historical aggregations directly on production operational databases causes table locking, system slowdowns, and checkout checkout failures during peak holiday periods.
3. Lack of Historical State Tracking (SCD Defect): When a customer updates their residential address or moves regions, standard operational databases overwrite the old state. Consequently, historical sales revenue gets incorrectly credited to the customer's new region, corrupting regional accounting and tax audits.
4. Data Quality Degradation: Real-world operational input contains malformed strings, negative quantities, missing promotional codes, and orphaned customer keys. Without a cleansing gate, dirty data leads to flawed corporate forecasts.
5. Inability to Predict Customer Churn & Cross-Sell Opportunities: Retailers struggle to identify which previously loyal customers are sliding into inactivity (churn) until it is too late, and fail to leverage association affinity rules to optimize promotional product bundling.`,
    keyPoints: [
      'Disparate operational silos result in inconsistent customer records across online and physical channels.',
      'Heavy analytic workloads lock transactional database tables, threatening checkout uptime.',
      'Destructive database updates destroy temporal history needed for regional sales attribution.',
      'Dirty input data (null prices, malformed emails, negative quantities) corrupts financial reporting.',
      'Absence of automated algorithmic customer segmentation causes untargeted, wasteful marketing spend.'
    ]
  },
  {
    id: 'proposed-solution',
    number: 3,
    title: 'Proposed Solution',
    subtitle: 'Enterprise Dimensional Architecture with Integrated Customer Mining',
    iconName: 'CheckCircle',
    content: `To resolve the stated challenges, this project engineers a multi-stage Data Warehouse and Business Intelligence solution comprising three integrated pillars:

Pillar 1: Robust Data Pipeline & Staging Architecture
Heterogeneous data streams are extracted into a raw staging environment where automated cleansing rules sanitize malformed entries, filter out test sandbox transactions, impute missing prices against master catalogs, and enforce referential integrity before committing to the warehouse.

Pillar 2: Dimensional Star Schema & SCD Type 2 Modeling
A centralized Star Schema centered on Fact_Sales, interconnected with conformed dimension tables (Dim_Customer, Dim_Product, Dim_Store, Dim_Date, Dim_Promotion). Slowly Changing Dimension Type 2 (SCD2) is implemented on Dim_Customer using surrogate keys, valid_from, valid_to, and is_current flags to guarantee 100% temporal accuracy for historical reporting.

Pillar 3: Algorithmic Customer Mining & BI Analytics
An integrated analytics engine runs:
- RFM Segmentation (Recency, Frequency, Monetary) to categorize customer cohorts (Champions, Loyalists, At-Risk, Hibernating).
- Churn Risk Probability Scoring to trigger automated win-back retention workflows.
- Apriori Association Rule Mining to uncover product affinities (Support, Confidence, Lift) for algorithmic bundle generation.
- Interactive Power BI Dashboards featuring DAX measures for executive decision-making.`,
    keyPoints: [
      'Decouples operational OLTP systems from reporting via an automated ETL pipeline.',
      'Applies Ralph Kimball Star Schema modeling optimized for sub-second OLAP slice, dice, and drill-down.',
      'Preserves historical attribute accuracy via Slowly Changing Dimension Type 2 (SCD2).',
      'Transforms raw transactional logs into actionable customer segments and affinity bundles.',
      'Equips business leaders with real-time DAX KPIs and interactive Power BI visual dashboards.'
    ]
  },
  {
    id: 'system-architecture',
    number: 4,
    title: 'System Architecture Diagram',
    subtitle: 'End-to-End Enterprise Data Flow & Technology Stack',
    iconName: 'Layers',
    content: `The architecture follows an enterprise multi-tier Lakehouse/Warehouse pattern:

1. Ingestion Layer (Sources):
   - Physical In-Store POS (PostgreSQL / Relational CDC)
   - E-Commerce Web Store (REST API / Shopify Webhooks)
   - Mobile Shopper Application (JSON Event Stream)
   - CRM & Customer Loyalty Portal (CSV / Batch Export)

2. ETL & Orchestration Layer (Staging & Cleansing):
   - Apache Airflow / dbt orchestrator schedules scheduled micro-batch pipelines.
   - Data Cleansing Gate: Validates schemas, normalizes formats, detects duplicates, imputes missing catalog prices.
   - Staging Tables (Bronze) -> Cleansed & Conformed (Silver) -> Dimensional Tables (Gold).

3. Storage Layer (Enterprise Data Warehouse):
   - Relational OLAP engine (PostgreSQL / Snowflake / BigQuery / Cloud SQL).
   - Star Schema design featuring Fact_Sales and 5 Conformed Dimensions.
   - Surrogate keys (BIGINT) and B-tree foreign key indexing for high-speed multi-table joins.

4. Customer Mining & Machine Learning Layer:
   - RFM Segmentation Engine (Quantile / NTILE percentile scoring).
   - K-Means Clustering for multi-variable behavioral grouping.
   - Apriori Association Rule Engine computing Support, Confidence, and Lift.

5. Business Intelligence & Consumption Layer:
   - Power BI / Looker analytical dashboards.
   - Direct DAX Measures computing AOV, Retention Rate, YoY Growth, and Margin.
   - REST API / Export endpoints for downstream CRM marketing automation.`,
    keyPoints: [
      'Multi-tier architecture separating raw ingestion, staging, dimensional warehouse, and consumption layers.',
      'Utilizes Change Data Capture (CDC) and batch pipelines to pull delta records without locking operational tables.',
      'Converts raw operational keys into warehouse-specific surrogate keys for performance and decoupling.',
      'Hosts analytical ML models directly on top of the conformed Gold dimensional schema.',
      'Feeds interactive executive dashboards and automated CRM campaign triggers.'
    ]
  },
  {
    id: 'database-design',
    number: 5,
    title: 'Database Design & Dimensional Modeling',
    subtitle: 'Star Schema Architecture, Granularity, and SCD Strategy',
    iconName: 'Database',
    content: `Dimensional modeling follows Ralph Kimball's four-step design process:

Step 1: Select the Business Process
The business process modeled is Retail Merchandise Sales (orders, checkouts, and promotional redemptions across retail channels).

Step 2: Declare the Grain
The grain is: Exactly one line item per customer sales transaction.
Declaring the lowest atomic grain ensures the warehouse can answer any future analytical question at any level of aggregation (e.g. hourly sales, basket level, customer tier, product sub-category, or region).

Step 3: Identify the Dimensions
1. Dim_Customer: Stores customer demographic attributes, loyalty tier, and SCD Type 2 tracking attributes (valid_from, valid_to, is_current).
2. Dim_Product: Contains SKU details, product title, category, subcategory, brand, unit cost, and standard retail price.
3. Dim_Store: Physical and digital sales points (store name, type, region, address, square footage, manager name).
4. Dim_Date: Role-playing calendar dimension with day_of_week, day_name, month_name, quarter, year, fiscal_period, and is_weekend flags.
5. Dim_Promotion: Captures promotional campaigns (BOGO, seasonal discounts, loyalty specials).

Step 4: Identify the Facts (Measures)
Fact_Sales contains atomic additive and semi-additive numeric metrics:
- Quantity (Additive)
- Unit Price (Non-additive)
- Gross Amount (Additive = Quantity * Unit Price)
- Discount Amount (Additive = Gross Amount * Discount Pct)
- Net Amount (Additive = Gross Amount - Discount Amount)
- Cost Amount (Additive = Quantity * Unit Cost)
- Profit Amount (Additive = Net Amount - Cost Amount)

Why Star Schema over Snowflake Schema?
1. Simplicity: Denormalized dimension tables eliminate recursive sub-dimension joins, resulting in intuitive queries for business analysts.
2. Query Speed: Modern columnar and relational analytical engines optimize Star Joins with bitmap indexes and single-level table scans.
3. BI Tool Synergy: Power BI, Tableau, and Looker are architected natively for Star Schema relationships (1-to-many single-direction filters).`,
    keyPoints: [
      'Atomic grain at the individual transaction line item level guarantees maximum analytical flexibility.',
      'Surrogate Keys (SK) decouple the warehouse from upstream source system operational ID changes.',
      'SCD Type 2 preserves historical sales attribution across customer address changes.',
      'Star Schema selected over Snowflake schema for superior query performance and seamless BI engine optimization.',
      'Fully additive measures (gross, net, cost, profit) enable effortless slicing across all dimension hierarchies.'
    ]
  },
  {
    id: 'etl-process',
    number: 6,
    title: 'ETL Process & Data Pipeline',
    subtitle: 'Extraction, Cleansing Gates, Conforming Dimensions, and Merging',
    iconName: 'GitBranch',
    content: `The ETL pipeline constitutes the backbone of data reliability. It operates in four deterministic stages:

Stage 1: Extract (E)
Connectors extract delta transactions since the last checkpoint (High Watermark timestamp or Change Data Capture log). Data is dumped as immutable raw JSON/Parquet snapshots into the Staging Lake/Table.

Stage 2: Data Cleansing & Validation (C)
Raw records pass through a strict data quality gate:
- Null Value Handling: Mandatory fields (e.g., date, product_id) cannot be NULL. Non-critical missing values are imputed from master catalog lookups.
- Range & Boundary Checks: Quantities must be positive integers (quantity > 0). Unit price must be strictly greater than zero.
- String Standardization: Trimming whitespaces, normalizing casing (UPPER/LOWER/Title Case), stripping special characters, and validating email formats using regex.
- Deduplication: Detecting and quarantining duplicate order line items based on composite natural keys (order_id + line_number).

Stage 3: Transform & Conform Dimensions (T)
- Natural Key Resolution: Source natural keys are looked up against existing dimension surrogate keys.
- SCD Type 2 Check: If a customer attribute has mutated, the ETL runner issues an UPDATE to mark the active row's valid_to timestamp and is_current to FALSE, followed by an INSERT of the new active record with a new surrogate key.
- Metric Derivation: Computes gross_amount, discount_amount, net_amount, cost_amount, and profit_amount.

Stage 4: Load into Star Schema (L)
- Bulk inserts fact records into Fact_Sales inside an atomic transaction block.
- Executes automated post-load reconciliation tests (e.g., Row count verification, sum of gross sales vs source system totals).
- Updates pipeline metadata log with start time, duration, rows ingested, rows rejected, and status.`,
    keyPoints: [
      'Delta extraction utilizing High Watermark timestamps and CDC prevents redundant full-table re-ingestion.',
      'Automated data quality quarantine stops corrupt data from polluting analytical gold tables.',
      'Surrogate key resolution decouples analytics from transactional system ID collisions.',
      'Atomic transactions ensure zero data corruption during partial pipeline crashes.',
      'Comprehensive metadata logging tracks lineage, throughput, and error rates for auditing.'
    ]
  },
  {
    id: 'data-mining',
    number: 7,
    title: 'Data Mining Techniques',
    subtitle: 'RFM Segmentation, K-Means Clustering, and Apriori Association Rules',
    iconName: 'Cpu',
    content: `Data mining transforms static historical facts into predictive customer intelligence:

1. RFM (Recency, Frequency, Monetary) Segmentation:
- Recency (R): Number of elapsed days since the customer's last order. Lower recency implies higher brand engagement.
- Frequency (F): Total number of distinct purchases made. Higher frequency indicates loyalty.
- Monetary (M): Total cumulative net currency spent by the customer.
Algorithm: Customers are ranked into 5 equal quantiles (NTILE(5)) across R, F, and M. A composite RFM score (e.g., '555', '444', '111') is assigned, mapping to distinct business segments:
- Champions (555, 554, 545): Highest value, most recent, frequent shoppers. Target with VIP perks and early access.
- Loyal Customers (443, 444, 344): Consistent shoppers. Upsell complementary items and high-tier loyalty accelerators.
- Potential Loyalists (422, 322): Recent shoppers with low frequency. Nurture with onboarding promotions.
- At Risk (244, 144, 112): High past spenders who have not purchased recently. Trigger aggressive win-back incentives.
- Hibernating / Lost (111): Inactive for over 300 days with low historic spend. Exclude from high-cost marketing.

2. Churn Risk Probability Scoring:
Calculated using a normalized sigmoid decay function:
Churn_Risk = 1 / (1 + exp(-k * (Recency_Days - Threshold)))
Customers crossing a 70% churn risk threshold trigger an automated high-priority retention ticket in the marketing CRM.

3. Market Basket Analysis (Apriori Algorithm):
Analyzes co-occurrence of product line items across the same order_id:
- Support(A -> B) = P(A ∩ B) = (Transactions containing both A and B) / Total Transactions
- Confidence(A -> B) = P(B|A) = Support(A ∩ B) / Support(A)
- Lift(A -> B) = Confidence(A -> B) / Support(B) = P(A ∩ B) / (P(A) * P(B))
Interpretation:
- Lift > 1.0 indicates a strong positive affinity (products purchased together significantly more often than random chance).
- Example: Espresso Machine -> Burr Grinder achieves Lift = 2.93x, Confidence = 82%. Action: Create bundled discount pack and checkout cross-sell slider.`,
    keyPoints: [
      'Quantile-based RFM analysis creates actionable behavioral segments without arbitrary cutoffs.',
      'Early churn risk detection enables proactive customer retention before complete customer loss.',
      'Apriori association rule mining quantifies cross-selling synergies via Support, Confidence, and Lift.',
      'Identifies high-margin affinity bundles to elevate overall Average Order Value (AOV).',
      'Directly links customer segments with automated marketing campaign playbooks.'
    ]
  },
  {
    id: 'sql-implementation',
    number: 8,
    title: 'SQL Implementation & OLAP Queries',
    subtitle: 'DDL, CTEs, Window Functions, and Dimensional Transformations',
    iconName: 'Code',
    content: `SQL serves as the core transformation and analytical language in the warehouse. The project features production-ready scripts:

1. Data Definition Language (DDL):
Creates Fact_Sales and 5 Dimension tables with primary keys, foreign keys, check constraints, default timestamps, and surrogate key sequences.

2. Slowly Changing Dimension Type 2 (SCD2) Pipeline:
Utilizes atomic conditional SQL to close historical records (valid_to = CURRENT_DATE, is_current = FALSE) and insert new active records.

3. Advanced Window Functions & Analytical SQL:
- NTILE(5) OVER (ORDER BY recency_days DESC) to compute quantile RFM scores in pure SQL.
- DENSE_RANK() OVER (PARTITION BY category ORDER BY SUM(net_amount) DESC) to determine top-performing items per department.
- LAG(net_sales, 1) OVER (PARTITION BY store_id ORDER BY month_num) to calculate Month-over-Month (MoM) revenue growth.
- ROLLUP (region, category) to generate multidimensional sub-totals and grand totals in a single execution pass.`,
    keyPoints: [
      'Production-grade DDL scripts optimized for PostgreSQL, Cloud SQL, Snowflake, or BigQuery.',
      'Surrogate key lookups and foreign key constraints enforce referential integrity.',
      'Pure SQL implementation of complex RFM scoring eliminating external processing overhead.',
      'Leverages modern window functions (NTILE, DENSE_RANK, LAG, ROLLUP) for sub-second analytical reporting.',
      'Query execution plans demonstrate optimal index scans and star-join performance.'
    ]
  },
  {
    id: 'power-bi',
    number: 9,
    title: 'Power BI Dashboard Design & DAX Measures',
    subtitle: 'Visualization Layout, Report Architecture, and Analytical DAX Models',
    iconName: 'BarChart3',
    content: `The Business Intelligence suite is modeled around a 4-tier interactive Power BI canvas designed for executive leadership and category managers:

1. Visual Layout & Wireframe Architecture:
- Header & Slicers Bar: Dynamic date range picker, Region filter (North, South, East, West, Central), Category filter, Channel selector (POS, Web, Mobile).
- Executive KPI Ribbon: 5 core high-contrast cards displaying Total Net Sales, YoY Revenue Growth %, Customer Retention Rate %, Average Order Value (AOV), and Net Profit Margin %.
- Analytical Visuals Grid:
  * Sales & Profit Monthly Trend (Area chart with dual-axis margin line).
  * Regional Sales Performance (Horizontal bar chart benchmarked against target quotas).
  * Category & Brand Revenue Share (Donut chart with drill-through to sub-categories).
  * Top 10 Selling Products by Margin (Ranked matrix with conditional formatting heatmaps).
  * RFM Customer Segments Treemap (Visualizing revenue contribution per behavioral cluster).

2. DAX Formula Architecture:
All metrics are implemented using decoupled, reusable DAX explicit measures:
- Total Net Sales = SUM(Fact_Sales[net_amount])
- YoY Growth % = DIVIDE([Total Net Sales] - [Sales Last Year], [Sales Last Year], 0)
- Customer Retention Rate % = Computes customer intersection across rolling 90-day time periods.
- Average Order Value = DIVIDE([Total Net Sales], DISTINCTCOUNT(Fact_Sales[order_id]), 0)
- Customer Lifetime Value = Cumulative CALCULATE over ALL(Dim_Date).`,
    keyPoints: [
      'Designed following Nielsen Norman group dashboard ergonomics: high-priority KPIs at top left.',
      'Employs star schema relationship modeling with single-direction 1-to-many cross-filtering.',
      'Standardizes on explicit DAX measures rather than implicit aggregates for auditability.',
      'Incorporates time-intelligence functions (SAMEPERIODLASTYEAR, DATESINPERIOD).',
      'Provides drill-through pathways from high-level corporate revenue down to individual receipt line items.'
    ]
  },
  {
    id: 'business-insights',
    number: 10,
    title: 'Business Insights & Executive Recommendations',
    subtitle: 'Data-Driven Findings Derived from Warehouse Analytics',
    iconName: 'TrendingUp',
    content: `Executing analytical queries and data mining algorithms across the retail sales data warehouse reveals four core commercial findings:

1. 80/20 Customer Pareto Distribution:
The top 25% of customers (Champions and Loyalists) account for 71.4% of total cumulative net revenue and 74.8% of net profit.
Recommendation: Reallocate 40% of acquisition marketing budget into a dedicated VIP Loyalty Concierge program to safeguard high-LTV cohorts from churn.

2. Omnichannel Shoppers Outperform Single-Channel Shoppers:
Customers who purchase through both physical stores and the mobile app boast a 68% higher Average Order Value ($328 vs $195) and an 84.2% retention rate compared to single-channel shoppers (52.1%).
Recommendation: Introduce in-store mobile app scan-and-go discounts to incentivize physical shoppers to install and link the mobile application.

3. High-Affinity Cross-Sell Synergies:
Market Basket Analysis revealed strong Lift (> 2.0x) between high-ticket appliance items and essential peripherals (e.g. Espresso Machines & Conical Burr Grinders, Headphones & Wireless Fast Chargers).
Recommendation: Create pre-packaged bundled SKUs with a 12% bundle discount. In physical stores, place peripherals in endcap displays adjacent to primary hardware aisles.

4. Seasonal Churn Vulnerability in Q3:
Customers acquired during heavy discount seasonal promotions (e.g. Black Friday) show a 62% churn probability if a second purchase is not completed within 90 days.
Recommendation: Deploy automated 45-day post-purchase drip campaigns featuring personalized recommendations based on the customer initial basket category.`,
    keyPoints: [
      'Top 25% of customers drive over 71% of total enterprise net profit.',
      'Omnichannel customers demonstrate 68% higher AOV and significantly superior retention rates.',
      'Identified actionable product bundles with Lift exceeding 2.0x for immediate margin uplift.',
      'Identified critical 90-day post-acquisition churn window requiring targeted drip re-engagement.',
      'Provides quantitative business justifications for all tactical marketing and merchandising investments.'
    ]
  },
  {
    id: 'future-enhancements',
    number: 11,
    title: 'Future Enhancements & Scalability Roadmap',
    subtitle: 'Streaming Ingestion, Cloud Migration, and Medallion Lakehouse',
    iconName: 'Rocket',
    content: `While the current implementation achieves complete operational and analytical goals, enterprise scale demands continuous architectural evolution:

1. Real-Time Streaming Ingestion (Kafka & Flink):
Transition from micro-batch ETL to event-driven streaming ingestion using Apache Kafka and Apache Flink for real-time inventory monitoring and fraud detection during flash sales.

2. Medallion Lakehouse Architecture (Delta Lake / Apache Iceberg):
Adopt the modern Medallion pattern:
- Bronze Layer: Immutable raw data landing.
- Silver Layer: Cleansed, deduplicated, enriched tables.
- Gold Layer: Aggregated dimensional star schema tables and feature stores for machine learning.

3. Cloud Migration to Serverless DW (Snowflake / BigQuery / Cloud SQL):
Leverage automatic storage-compute decoupling, allowing near-instant query elasticity during Black Friday spikes while scaling compute down to zero during off-peak night hours.

4. Deep Learning Recommendation Systems:
Advance from heuristic Apriori association rules to neural Collaborative Filtering (NCF) and Transformer-based sequential basket prediction models to personalize web and mobile storefronts in real time.`,
    keyPoints: [
      'Architectural path from micro-batch ETL to sub-second streaming via Kafka and Flink.',
      'Adoption of Delta Lake/Iceberg Medallion pattern for ACID transactional guarantees.',
      'Cloud warehouse migration leveraging decoupled storage and serverless auto-scaling compute.',
      'Evolution from statistical association rules to deep learning real-time recommendation engines.',
      'Automated CI/CD data pipeline testing using Great Expectations and dbt test suites.'
    ]
  },
  {
    id: 'conclusion',
    number: 12,
    title: 'Conclusion & Academic Viva Defense',
    subtitle: 'Project Synthesis and Viva Voce Oral Defense Preparation',
    iconName: 'Award',
    content: `The "Retail Sales Data Warehouse and Customer Mining" project successfully demonstrates the entire data engineering and business intelligence lifecycle—from raw transactional ingestion and rigorous ETL data quality gates, to dimensional Star Schema modeling and customer mining algorithms.

By implementing Ralph Kimball's dimensional modeling principles, the system decouples high-volume analytical workloads from operational OLTP databases, achieves sub-second OLAP aggregations, and preserves historical truth through Slowly Changing Dimension Type 2 (SCD2).

The integration of RFM customer segmentation and Apriori Market Basket Analysis proves that modern data warehouses are not merely passive reporting stores, but active engines that generate actionable commercial intelligence, optimize marketing spend, and maximize customer lifetime value.

This project delivers a complete, professional, production-tested blueprint suitable for senior-level academic presentations, university final-year viva voce defense, and enterprise data engineering technical interviews.`,
    keyPoints: [
      'Successfully delivered complete end-to-end Data Warehouse, ETL, and Data Mining pipeline.',
      'Proved efficacy of Star Schema and SCD Type 2 for resilient historical retail reporting.',
      'Delivered actionable customer mining insights (RFM segmentation, Churn Risk, Apriori bundles).',
      'Engineered high-performance SQL scripts, DAX formulas, and Power BI visual dashboards.',
      'Comprehensive defense preparation ensures total readiness for academic viva voce and industry review.'
    ]
  }
];

export interface VivaQuestion {
  question: string;
  category: 'Dimensional Modeling' | 'ETL & Architecture' | 'Data Mining & Algorithms' | 'SQL & Performance';
  answer: string;
  proTip: string;
}

export const vivaDefenseQuestions: VivaQuestion[] = [
  {
    question: 'Why did you choose a Star Schema over a Snowflake Schema for this retail warehouse?',
    category: 'Dimensional Modeling',
    answer: 'A Star Schema keeps dimension tables completely denormalized, surrounding the central Fact_Sales table. This minimizes the number of joins required to satisfy analytical queries (single-level joins vs complex multi-level joins in Snowflake). Furthermore, modern BI engines like Power BI and columnar warehouse engines (BigQuery, Snowflake) optimize star joins using bitmap indexing and hash joins. Star schemas are also far more intuitive for non-technical business users and BI analysts to understand and query.',
    proTip: 'Mention that while Snowflake saves slight disk storage by normalizing dimensions (e.g., separating Category from Product), storage is cheap today while human query complexity and compute join latency are the real bottlenecks.'
  },
  {
    question: 'How does Slowly Changing Dimension (SCD) Type 2 work in your Dim_Customer table?',
    category: 'Dimensional Modeling',
    answer: 'When a customer attribute changes (such as moving from North to West, or upgrading loyalty tiers), instead of overwriting the row (SCD Type 1), we preserve history. We set the existing record valid_to = CURRENT_DATE and is_current = FALSE, and insert a new record with a new surrogate key (customer_sk), valid_from = CURRENT_DATE, valid_to = NULL, and is_current = TRUE. Consequently, historical sales retain the old customer_sk and report correct historical regional revenue, while new transactions link to the new surrogate key.',
    proTip: 'Highlight that surrogate keys are essential for SCD2; if the warehouse joined on natural keys alone, history would be lost or join cardinality would duplicate.'
  },
  {
    question: 'What is the difference between Fact table grain and Dimension hierarchy?',
    category: 'Dimensional Modeling',
    answer: 'Grain defines the fundamental unit of measurement represented by a single row in the fact table. In our Fact_Sales table, the grain is: "One row per line item in a completed retail sales order." Dimension hierarchy, on the other hand, represents the structural roll-up path within a dimension (e.g. Product -> Sub-category -> Category -> Department, or Day -> Month -> Quarter -> Year). Declaring the finest atomic grain ensures we can aggregate up any dimension hierarchy without losing granularity.',
    proTip: 'Remember Kimball rule: "Always model at the lowest atomic grain possible."'
  },
  {
    question: 'How did your ETL pipeline handle dirty, missing, or malformed records?',
    category: 'ETL & Architecture',
    answer: 'We implemented a multi-gate validation pipeline. Records with invalid dates (e.g., Feb 31st) or negative quantities/prices are redirected into an error quarantine table for human audit rather than crashing the pipeline. Non-critical missing values (such as a missing unit price on a known SKU) are imputed by querying the Dim_Product master catalog. Text strings are normalized (trimmed, title-cased, regex email check), and deduplication is enforced using composite natural keys before generating surrogate keys.',
    proTip: 'Emphasize the distinction between fatal rejections (quarantined) vs non-fatal imputations/normalizations.'
  },
  {
    question: 'In Market Basket Analysis, why is Lift preferred over Confidence alone?',
    category: 'Data Mining & Algorithms',
    answer: 'Confidence measures the conditional probability P(B|A) = Support(A ∩ B) / Support(A). However, if item B is already universally popular (high base support, e.g. milk or shopping bags), Confidence will naturally appear very high even if item A has zero true causal affinity with item B. Lift divides Confidence by the base Support of item B: Lift = P(A ∩ B) / (P(A) * P(B)). A Lift greater than 1.0 proves that customers buy B with A significantly more often than random chance, filtering out false positives.',
    proTip: 'State the exact formula: Lift = Confidence(A->B) / Support(B). An answer mentioning this will impress any academic examiner.'
  },
  {
    question: 'How did you determine the quintiles for RFM scoring without arbitrary cutoffs?',
    category: 'Data Mining & Algorithms',
    answer: 'Instead of manually hardcoding subjective dollar or day thresholds, we used the statistical NTILE(5) window ranking function in SQL. This divides the active customer population into 5 equal 20% quintiles across Recency, Frequency, and Monetary dimensions. This guarantees an even distribution and adapts dynamically as overall business transaction volume grows.',
    proTip: 'Explain that for Recency, ordering is reversed (ORDER BY recency_days DESC) so that customers with the lowest elapsed days receive the top score of 5.'
  },
  {
    question: 'What are Surrogate Keys and why should you never use Natural Keys as Fact Table Foreign Keys?',
    category: 'SQL & Performance',
    answer: 'A Natural Key is an identifier assigned by source operational applications (e.g., UUIDs or strings like CUST-1001). A Surrogate Key is an integer or bigint sequence generated internally by the Data Warehouse. Natural keys can change, contain alphanumeric characters that slow down B-tree joins, or have collisions across different source systems. Surrogate keys ensure high join performance, decouple the warehouse from upstream source changes, and are strictly required to support SCD Type 2 multiple versioning.',
    proTip: 'Integer joins are 4x to 8x faster in relational database storage engines than strings or UUIDs.'
  },
  {
    question: 'What is the role of the Dim_Date table instead of using SQL DATEPART() on timestamp columns?',
    category: 'SQL & Performance',
    answer: 'A dedicated role-playing Dim_Date table pre-computes and indexes calendar attributes (day of week, fiscal quarter, holiday flags, weekend indicators, week numbers) once. Using SQL functions like DATEPART() or EXTRACT() in the WHERE or GROUP BY clause disables B-tree index usage (non-sargable query), forcing expensive full-table scans across millions of fact rows. Joining on an integer date_sk (e.g. 20240315) enables instant index lookups and consistent fiscal calendar logic across all corporate reports.',
    proTip: 'Mention "Sargability" (Search Argument Able) — examiners love this term.'
  }
];
