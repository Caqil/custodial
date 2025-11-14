/**
 * Performance Analytics Page
 * API, database, uptime, and error rate metrics
 */

import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { APIResponseTimesChart } from '../components/api-response-times-chart'
import { ErrorRatesChart } from '../components/error-rates-chart'
import { UptimeMetrics } from '../components/uptime-metrics'
import { DatabasePerformanceChart } from '../components/database-performance-chart'
import { DateRangePicker } from '../components/date-range-picker'
import { usePerformanceAnalytics } from '../hooks'
import { format } from 'date-fns'

export function PerformanceAnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const { data, isLoading, error } = usePerformanceAnalytics({
    start_date: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
    end_date: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Performance Analytics</h1>
          <p className="text-muted-foreground mt-1">
            API response times, error rates, uptime, and database performance
          </p>
        </div>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data?.uptime_metrics && <UptimeMetrics data={data.uptime_metrics} />}
        {data?.database_performance && (
          <DatabasePerformanceChart data={data.database_performance} />
        )}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <APIResponseTimesChart
          data={data?.api_response_times!}
          loading={isLoading}
          error={error}
        />
        <ErrorRatesChart data={data?.error_rates!} loading={isLoading} error={error} />
      </div>
    </div>
  )
}
