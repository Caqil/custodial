/**
 * Cost Breakdown Chart Component
 * Pie chart showing costs by category
 */

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer } from './chart-container'
import type { CostBreakdown } from '@/core/entities/analytics.entity'

interface CostBreakdownChartProps {
  data: CostBreakdown
  loading?: boolean
  error?: Error | null
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']

export function CostBreakdownChart({ data, loading, error }: CostBreakdownChartProps) {
  const chartData = data
    ? [
        { name: 'Gas Fees', value: data.gas_fees },
        { name: 'Infrastructure', value: data.infrastructure },
        { name: 'Operations', value: data.operations },
        { name: 'Other', value: data.other },
      ]
    : []

  const total = chartData.reduce((sum, item) => sum + item.value, 0)

  return (
    <ChartContainer
      title="Cost Breakdown"
      description="Costs by category"
      loading={loading}
      error={error}
    >
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Total Costs</p>
          <p className="text-3xl font-bold">${total.toLocaleString()}</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  )
}
