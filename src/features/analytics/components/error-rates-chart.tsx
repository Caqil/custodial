/**
 * Error Rates Chart Component
 * Area chart showing error rates over time
 */

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer } from './chart-container'
import type { ErrorRates } from '@/core/entities/analytics.entity'

interface ErrorRatesChartProps {
  data: ErrorRates
  loading?: boolean
  error?: Error | null
}

export function ErrorRatesChart({ data, loading, error }: ErrorRatesChartProps) {
  const chartData = data?.trend || []

  return (
    <ChartContainer
      title="Error Rates"
      description="Error rate trends by endpoint"
      loading={loading}
      error={error}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Errors</p>
            <p className="text-2xl font-bold text-red-600">{data?.total_errors?.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Error Rate</p>
            <p className="text-2xl font-bold text-red-600">
              {data?.error_rate_percentage?.toFixed(2)}%
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="errorRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#ef4444"
              fillOpacity={1}
              fill="url(#errorRate)"
              name="Errors"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  )
}
