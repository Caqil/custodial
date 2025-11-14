/**
 * Profit & Loss Chart Component
 * Line chart showing P&L over time
 */

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer } from './chart-container'
import type { ProfitLossData } from '@/core/entities/analytics.entity'

interface ProfitLossChartProps {
  data: ProfitLossData
  loading?: boolean
  error?: Error | null
}

export function ProfitLossChart({ data, loading, error }: ProfitLossChartProps) {
  const chartData = data?.trend || []

  return (
    <ChartContainer
      title="Profit & Loss"
      description="Revenue, costs, and profit over time"
      loading={loading}
      error={error}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Revenue</p>
            <p className="text-2xl font-bold text-green-600">
              ${data?.revenue?.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Costs</p>
            <p className="text-2xl font-bold text-red-600">
              ${data?.costs?.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Profit</p>
            <p className="text-2xl font-bold text-blue-600">
              ${data?.profit?.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Margin</p>
            <p className="text-2xl font-bold">
              {data?.margin_percentage?.toFixed(2)}%
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Profit"
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  )
}
