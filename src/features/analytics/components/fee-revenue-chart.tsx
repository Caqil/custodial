/**
 * Fee Revenue Chart Component
 * Area chart showing fee revenue over time
 */

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer } from './chart-container'
import type { FeeRevenueData } from '@/core/entities/analytics.entity'

interface FeeRevenueChartProps {
  data: FeeRevenueData
  loading?: boolean
  error?: Error | null
}

export function FeeRevenueChart({ data, loading, error }: FeeRevenueChartProps) {
  const chartData = data?.trend || []

  return (
    <ChartContainer
      title="Fee Revenue"
      description="Revenue generated from fees"
      loading={loading}
      error={error}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Fee Revenue</p>
            <p className="text-2xl font-bold">${data?.total?.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Revenue Breakdown</p>
            <div className="flex flex-wrap gap-2">
              {data?.by_type &&
                Object.entries(data.by_type).map(([type, amount]) => (
                  <div key={type} className="text-xs">
                    <span className="text-muted-foreground">{type}:</span>{' '}
                    <span className="font-medium">${amount.toLocaleString()}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="feeRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            <Legend />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#feeRevenue)"
              name="Fee Revenue"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  )
}
