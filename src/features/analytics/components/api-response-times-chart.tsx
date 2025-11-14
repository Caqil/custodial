/**
 * API Response Times Chart Component
 * Line chart showing API response time trends
 */

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer } from './chart-container'
import type { APIResponseTimes } from '@/core/entities/analytics.entity'

interface APIResponseTimesChartProps {
  data: APIResponseTimes
  loading?: boolean
  error?: Error | null
}

export function APIResponseTimesChart({ data, loading, error }: APIResponseTimesChartProps) {
  const chartData = data?.trend || []

  return (
    <ChartContainer
      title="API Response Times"
      description="Response time trends over time"
      loading={loading}
      error={error}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Average</p>
            <p className="text-lg font-bold">{data?.average_ms}ms</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">P50</p>
            <p className="text-lg font-bold">{data?.p50_ms}ms</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">P95</p>
            <p className="text-lg font-bold">{data?.p95_ms}ms</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">P99</p>
            <p className="text-lg font-bold">{data?.p99_ms}ms</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'ms', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value: number) => `${value}ms`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Response Time"
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  )
}
