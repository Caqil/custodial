/**
 * Real-Time Monitoring Page
 * Live feeds, alerts, and system health
 */

import { RealTimeFeed } from '../components/real-time-feed'
import { LiveBalanceChanges } from '../components/live-balance-changes'
import { LiveAlertStream } from '../components/live-alert-stream'
import { SystemHealthIndicators } from '../components/system-health-indicators'
import { useRealTimeAnalytics } from '../hooks'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RefreshCwIcon } from 'lucide-react'

export function RealTimeMonitoringPage() {
  const { data, isLoading, error } = useRealTimeAnalytics()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Real-Time Monitoring</h1>
          <RefreshCwIcon className="h-5 w-5 text-muted-foreground animate-spin" />
        </div>
        <p className="text-muted-foreground mt-1">
          Live transaction feed, balance changes, alerts, and system health (auto-refresh: 5s)
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load real-time data: {error.message}
          </AlertDescription>
        </Alert>
      )}

      {/* System Health */}
      {data?.system_metrics && <SystemHealthIndicators metrics={data.system_metrics} />}

      {/* Live Feeds Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RealTimeFeed transactions={data?.live_transactions || []} />
        <LiveBalanceChanges changes={data?.balance_changes || []} />
      </div>

      {/* Alerts */}
      <LiveAlertStream alerts={data?.alerts || []} />
    </div>
  )
}
