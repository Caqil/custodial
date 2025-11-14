/**
 * Risk Score Distribution Component
 * Histogram showing risk score distribution
 */

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { ChartContainer } from './chart-container'
import type { RiskDistribution } from '@/core/entities/analytics.entity'

interface RiskScoreDistributionProps {
  data: RiskDistribution[]
  loading?: boolean
  error?: Error | null
}

export function RiskScoreDistribution({ data, loading, error }: RiskScoreDistributionProps) {
  const getColorByRange = (range: string) => {
    if (range.includes('80-100')) return '#ef4444' // red
    if (range.includes('60-79')) return '#f59e0b' // orange
    if (range.includes('40-59')) return '#eab308' // yellow
    if (range.includes('20-39')) return '#84cc16' // lime
    return '#10b981' // green
  }

  return (
    <ChartContainer
      title="Risk Score Distribution"
      description="Distribution of users across risk score ranges"
      loading={loading}
      error={error}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="score_range" />
          <YAxis />
          <Tooltip
            formatter={(value: number, name: string, props: any) => [
              value.toLocaleString(),
              `${props.payload.percentage.toFixed(1)}%`,
            ]}
          />
          <Legend />
          <Bar dataKey="count" name="Users" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColorByRange(entry.score_range)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
