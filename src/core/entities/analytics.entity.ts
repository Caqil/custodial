/**
 * Analytics Entity - Domain models for analytics and dashboard metrics
 * Based on backend API documentation
 */

/**
 * Dashboard analytics overview
 */
export interface DashboardAnalytics {
  total_users: number
  total_wallets: number
  assets_under_custody: Record<string, string>
  transactions_today: number
  total_volume: string
  staking_tvl: string
  active_proposals: number
  success_rate: number
  active_wallets: number
  pending_approvals: number
  timestamp: string
}

/**
 * Assets under custody by currency
 */
export interface AUCByCurrency {
  currency: string
  total: string
  available: string
  locked: string
  wallet_count: number
}

/**
 * Assets under custody response
 */
export interface AUCResponse {
  currencies: AUCByCurrency[]
  timestamp: string
}

/**
 * Total value locked by currency
 */
export interface TVLByCurrency {
  currency: string
  total_staked: string
  staker_count: number
  pool_count: number
}

/**
 * Total value locked response
 */
export interface TVLResponse {
  currencies: TVLByCurrency[]
  total_tvl: string
  timestamp: string
}

/**
 * User growth data point
 */
export interface UserGrowthDataPoint {
  date: string
  count: number
}

/**
 * User growth response
 */
export interface UserGrowthResponse {
  data_points: UserGrowthDataPoint[]
  total_users: number
  period: string
}

/**
 * System health status
 */
export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy'
  cpu_usage: number
  memory_usage: number
  database_status: string
  database_healthy: boolean
  audit_healthy: boolean
  api_response_time: number
  active_connections?: number
  timestamp: string
}

/**
 * Transaction volume query parameters
 */
export interface TransactionVolumeParams {
  start_date?: string
  end_date?: string
  group_by?: 'day' | 'week' | 'month' | 'year'
}

/**
 * User growth query parameters
 */
export interface UserGrowthParams {
  period?: 'day' | 'week' | 'month'
}

/**
 * Real-time analytics data
 */
export interface RealTimeAnalytics {
  live_transactions: LiveTransaction[]
  balance_changes: BalanceChange[]
  alerts: LiveAlert[]
  system_metrics: SystemMetrics
  timestamp: string
}

export interface LiveTransaction {
  id: string
  type: string
  amount: string
  currency: string
  status: string
  created_at: string
}

export interface BalanceChange {
  wallet_id: string
  wallet_name: string
  currency: string
  old_balance: string
  new_balance: string
  change: string
  timestamp: string
}

export interface LiveAlert {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  type: string
  message: string
  timestamp: string
}

export interface SystemMetrics {
  cpu_usage: number
  memory_usage: number
  db_connections: number
  active_requests: number
}

/**
 * Financial analytics data
 */
export interface FinancialAnalytics {
  profit_loss: ProfitLossData
  fee_revenue: FeeRevenueData
  cost_breakdown: CostBreakdown
  roi_metrics: ROIMetrics
  profitability_by_service: ServiceProfitability[]
  period: string
}

export interface ProfitLossData {
  revenue: number
  costs: number
  profit: number
  margin_percentage: number
  trend: TrendData[]
}

export interface FeeRevenueData {
  total: number
  by_type: Record<string, number>
  trend: TrendData[]
}

export interface CostBreakdown {
  gas_fees: number
  infrastructure: number
  operations: number
  other: number
}

export interface ROIMetrics {
  roi_percentage: number
  payback_period_days: number
  total_investment: number
  total_returns: number
}

export interface ServiceProfitability {
  service: string
  revenue: number
  costs: number
  profit: number
  margin: number
}

export interface TrendData {
  date: string
  value: number
}

export interface FinancialAnalyticsParams {
  start_date?: string
  end_date?: string
  period?: 'monthly' | 'quarterly' | 'yearly'
}

/**
 * User behavior analytics
 */
export interface UserBehaviorAnalytics {
  acquisition_funnel: AcquisitionFunnel
  retention_cohorts: RetentionCohort[]
  ltv_data: LTVData
  active_users: ActiveUsersData
  user_segments: UserSegment[]
}

export interface AcquisitionFunnel {
  signup: number
  verified: number
  first_deposit: number
  active: number
  retained: number
}

export interface RetentionCohort {
  cohort: string
  week_0: number
  week_1: number
  week_2: number
  week_3: number
  week_4: number
}

export interface LTVData {
  average_ltv: number
  by_segment: Record<string, number>
  trend: TrendData[]
}

export interface ActiveUsersData {
  dau: number
  wau: number
  mau: number
  dau_trend: TrendData[]
  wau_trend: TrendData[]
  mau_trend: TrendData[]
}

export interface UserSegment {
  segment: string
  count: number
  percentage: number
}

export interface UserBehaviorParams {
  start_date?: string
  end_date?: string
}

/**
 * Performance analytics
 */
export interface PerformanceAnalytics {
  api_response_times: APIResponseTimes
  error_rates: ErrorRates
  uptime_metrics: UptimeMetrics
  database_performance: DatabasePerformance
}

export interface APIResponseTimes {
  average_ms: number
  p50_ms: number
  p95_ms: number
  p99_ms: number
  by_endpoint: EndpointPerformance[]
  trend: TrendData[]
}

export interface EndpointPerformance {
  endpoint: string
  average_ms: number
  requests: number
}

export interface ErrorRates {
  total_errors: number
  error_rate_percentage: number
  by_type: Record<string, number>
  by_endpoint: Record<string, number>
  trend: TrendData[]
}

export interface UptimeMetrics {
  uptime_percentage: number
  downtime_minutes: number
  incidents: number
  mtbf_hours: number
  mttr_minutes: number
}

export interface DatabasePerformance {
  average_query_time_ms: number
  slow_queries: number
  connection_pool_usage: number
  deadlocks: number
}

export interface PerformanceParams {
  start_date?: string
  end_date?: string
}

/**
 * Risk analytics
 */
export interface RiskAnalytics {
  risk_score_distribution: RiskDistribution[]
  anomalies: AnomalyData[]
  fraud_metrics: FraudMetrics
  compliance_violations: ComplianceViolation[]
  risk_heatmap: RiskHeatmap
}

export interface RiskDistribution {
  score_range: string
  count: number
  percentage: number
}

export interface AnomalyData {
  id: string
  type: string
  score: number
  timestamp: string
  description: string
}

export interface FraudMetrics {
  total_flags: number
  confirmed_fraud: number
  false_positives: number
  detection_rate: number
  amount_at_risk: string
}

export interface ComplianceViolation {
  id: string
  type: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  description: string
  status: string
  timestamp: string
}

export interface RiskHeatmap {
  categories: string[]
  time_periods: string[]
  data: number[][]
}

export interface RiskAnalyticsParams {
  start_date?: string
  end_date?: string
  risk_threshold?: number
}

/**
 * Custom analytics query
 */
export interface CustomAnalytics {
  query: string
  result: any
  columns: string[]
  rows: any[]
  execution_time_ms: number
}

export interface CustomAnalyticsParams {
  metric: string
  dimensions?: string[]
  filters?: Record<string, any>
  start_date?: string
  end_date?: string
  aggregation?: 'sum' | 'avg' | 'count' | 'min' | 'max'
}
