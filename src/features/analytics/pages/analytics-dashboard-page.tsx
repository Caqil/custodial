/**
 * Analytics Dashboard Page
 * Main overview with key metrics from all modules
 */

import { MetricCard } from '../components/metric-card'
import { ProfitLossChart } from '../components/profit-loss-chart'
import { ActiveUsersChart } from '../components/active-users-chart'
import { APIResponseTimesChart } from '../components/api-response-times-chart'
import { RiskScoreDistribution } from '../components/risk-score-distribution'
import { SystemHealthIndicators } from '../components/system-health-indicators'
import {
  useDashboardAnalytics,
  useFinancialAnalytics,
  useUserBehaviorAnalytics,
  usePerformanceAnalytics,
  useRiskAnalytics,
  useSystemHealth,
  useRealTimeAnalytics,
} from '../hooks'
import {
  DollarSign,
  Users,
  TrendingUp,
  Activity,
  AlertTriangle,
  Database,
} from 'lucide-react'

function formatLargeNumber(value: number, decimals = 2): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(decimals)}B`
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(decimals)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(decimals)}K`
  return value.toFixed(decimals)
}

export function AnalyticsDashboardPage() {
  const { data: dashboard, isLoading: loadingDashboard } = useDashboardAnalytics()
  const { data: financial, isLoading: loadingFinancial } = useFinancialAnalytics()
  const { data: userBehavior, isLoading: loadingUsers } = useUserBehaviorAnalytics()
  const { data: performance, isLoading: loadingPerf } = usePerformanceAnalytics()
  const { data: risk, isLoading: loadingRisk } = useRiskAnalytics()
  const { data: health } = useSystemHealth()
  const { data: realTime } = useRealTimeAnalytics()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive analytics and insights across all platform metrics
        </p>
      </div>

      {/* System Health */}
      {health && realTime && (
        <SystemHealthIndicators metrics={realTime.system_metrics} />
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Total Revenue"
          value={`$${formatLargeNumber(financial?.profit_loss?.revenue || 0)}`}
          subtitle="This period"
          icon={<DollarSign className="h-4 w-4" />}
          trend={{
            value: 12.5,
            isPositive: true,
          }}
          loading={loadingFinancial}
        />
        <MetricCard
          title="Profit Margin"
          value={`${financial?.profit_loss?.margin_percentage?.toFixed(2) || 0}%`}
          subtitle="Operating margin"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{
            value: 3.2,
            isPositive: true,
          }}
          loading={loadingFinancial}
        />
        <MetricCard
          title="Active Users"
          value={userBehavior?.active_users?.mau?.toLocaleString() || '0'}
          subtitle="Monthly Active Users"
          icon={<Users className="h-4 w-4" />}
          trend={{
            value: 8.7,
            isPositive: true,
          }}
          loading={loadingUsers}
        />
        <MetricCard
          title="API Response Time"
          value={`${performance?.api_response_times?.average_ms || 0}ms`}
          subtitle="Average response time"
          icon={<Activity className="h-4 w-4" />}
          trend={{
            value: 5.3,
            isPositive: false,
          }}
          loading={loadingPerf}
        />
        <MetricCard
          title="Uptime"
          value={`${performance?.uptime_metrics?.uptime_percentage?.toFixed(2) || 0}%`}
          subtitle="This month"
          icon={<Database className="h-4 w-4" />}
          loading={loadingPerf}
        />
        <MetricCard
          title="Fraud Flags"
          value={risk?.fraud_metrics?.total_flags?.toLocaleString() || '0'}
          subtitle="Requiring review"
          icon={<AlertTriangle className="h-4 w-4" />}
          loading={loadingRisk}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfitLossChart
          data={financial?.profit_loss!}
          loading={loadingFinancial}
        />
        <ActiveUsersChart
          data={userBehavior?.active_users!}
          loading={loadingUsers}
        />
        <APIResponseTimesChart
          data={performance?.api_response_times!}
          loading={loadingPerf}
        />
        <RiskScoreDistribution
          data={risk?.risk_score_distribution || []}
          loading={loadingRisk}
        />
      </div>
    </div>
  )
}
