/**
 * User Segmentation Chart Component
 * Pie chart showing user distribution across segments
 */

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer } from './chart-container'
import type { UserSegment } from '@/core/entities/analytics.entity'

interface UserSegmentationChartProps {
  data: UserSegment[]
  loading?: boolean
  error?: Error | null
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export function UserSegmentationChart({ data, loading, error }: UserSegmentationChartProps) {
  const total = data?.reduce((sum, segment) => sum + segment.count, 0) || 0

  return (
    <ChartContainer
      title="User Segmentation"
      description="User distribution by segment"
      loading={loading}
      error={error}
    >
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-3xl font-bold">{total.toLocaleString()}</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ segment, percentage }) => `${segment} ${percentage.toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="count"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => value.toLocaleString()} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  )
}
