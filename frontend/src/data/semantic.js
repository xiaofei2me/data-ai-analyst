export const metrics = [
  { name: 'Revenue Growth', type: 'Calculated', expr: '(current - previous) / previous * 100', owner: 'Admin', status: 'active' },
  { name: 'Gross Margin', type: 'Calculated', expr: '(revenue - cost) / revenue * 100', owner: 'Admin', status: 'active' },
  { name: 'Customer Retention', type: 'Calculated', expr: 'returning_customers / total_customers * 100', owner: 'Admin', status: 'active' },
  { name: 'Avg Order Value', type: 'Calculated', expr: 'total_revenue / total_orders', owner: 'Admin', status: 'active' },
  { name: 'Conversion Rate', type: 'Calculated', expr: 'conversions / visitors * 100', owner: 'Admin', status: 'active' }
]

export const dimensions = [
  { name: 'Date', type: 'Time', source: 'fact_sales', owner: 'Admin', status: 'active' },
  { name: 'Region', type: 'Categorical', source: 'dim_region', owner: 'Admin', status: 'active' },
  { name: 'Brand', type: 'Categorical', source: 'dim_brand', owner: 'Admin', status: 'active' },
  { name: 'Channel', type: 'Categorical', source: 'dim_channel', owner: 'Admin', status: 'active' },
  { name: 'Product', type: 'Categorical', source: 'dim_product', owner: 'Admin', status: 'active' }
]

export const entities = [
  { name: 'Customer', type: 'Business', source: 'dim_customer', owner: 'Admin', status: 'active' },
  { name: 'Product', type: 'Business', source: 'dim_product', owner: 'Admin', status: 'active' },
  { name: 'Order', type: 'Transaction', source: 'fact_sales', owner: 'Admin', status: 'active' },
  { name: 'Invoice', type: 'Transaction', source: 'fact_invoices', owner: 'Admin', status: 'active' }
]
