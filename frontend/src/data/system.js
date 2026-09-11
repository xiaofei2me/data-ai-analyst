export const evalData = {
  accuracy: 94.2,
  precision: 92.8,
  recall: 91.5,
  f1: 92.1,
  latency: 145,
  throughput: 1250
}

export const monitorData = {
  uptime: 99.9,
  errors: 3,
  latency: 145,
  requests: 125000
}

export const knowledge = [
  { title: 'Sales Analysis Guide', desc: 'How to analyze sales data effectively', type: 'doc' },
  { title: 'Revenue Metrics Definition', desc: 'Standard definitions for revenue metrics', type: 'doc' },
  { title: 'SQL Best Practices', desc: 'Best practices for writing SQL queries', type: 'guide' },
  { title: 'Data Quality Rules', desc: 'Rules for ensuring data quality', type: 'rule' }
]

export const dataSources = [
  { name: 'Sales Database', type: 'PostgreSQL', status: 'active', tables: 12 },
  { name: 'CRM System', type: 'MySQL', status: 'active', tables: 8 },
  { name: 'ERP System', type: 'SQL Server', status: 'active', tables: 15 },
  { name: 'Analytics Lake', type: 'S3/Parquet', status: 'active', tables: 25 }
]

export const tables = [
  { name: 'fact_sales', source: 'Sales Database', rows: '2.5M', cols: 12, status: 'active' },
  { name: 'dim_region', source: 'Sales Database', rows: '500', cols: 5, status: 'active' },
  { name: 'dim_brand', source: 'Sales Database', rows: '100', cols: 4, status: 'active' },
  { name: 'dim_channel', source: 'Sales Database', rows: '50', cols: 3, status: 'active' },
  { name: 'dim_product', source: 'Sales Database', rows: '1000', cols: 8, status: 'active' },
  { name: 'dim_customer', source: 'CRM System', rows: '50000', cols: 15, status: 'active' },
  { name: 'fact_invoices', source: 'ERP System', rows: '1.8M', cols: 10, status: 'active' }
]
