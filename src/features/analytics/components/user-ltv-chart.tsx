/**
 * User LTV Chart Component
 * Bar chart showing lifetime value by segment
 */

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer } from './chart-container'
import type { LTVData } from '@/core/entities/analytics.entity'

interface UserLTVChartProps {
  data: LTVData
  loading?: boolean
  error?: Error | null
}

export function UserLTVChart({ data, loading, error }: UserLTVChartProps) {
  const chartData = data?.by_segment
    ? Object.entries(data.by_segment).map(([segment, value]) => ({
        segment,
        ltv: value,
      }))
    : []

  return (
    <ChartContainer
      title="User Lifetime Value"
      description="LTV by user segment"
      loading={loading}
      error={error}
    >
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Average LTV</p>
          <p className="text-3xl font-bold">${data?.average_ltv?.toLocaleString()}</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="segment" />
            <YAxis />
            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="ltv" fill="#3b82f6" name="Lifetime Value" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  )
}
