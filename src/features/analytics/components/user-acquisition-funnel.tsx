/**
 * User Acquisition Funnel Component
 * Funnel chart showing user acquisition stages
 */

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { ChartContainer } from './chart-container'
import type { AcquisitionFunnel } from '@/core/entities/analytics.entity'

interface UserAcquisitionFunnelProps {
  data: AcquisitionFunnel
  loading?: boolean
  error?: Error | null
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export function UserAcquisitionFunnel({ data, loading, error }: UserAcquisitionFunnelProps) {
  const chartData = data
    ? [
        { stage: 'Signup', count: data.signup, percentage: 100 },
        {
          stage: 'Verified',
          count: data.verified,
          percentage: (data.verified / data.signup) * 100,
        },
        {
          stage: 'First Deposit',
          count: data.first_deposit,
          percentage: (data.first_deposit / data.signup) * 100,
        },
        {
          stage: 'Active',
          count: data.active,
          percentage: (data.active / data.signup) * 100,
        },
        {
          stage: 'Retained',
          count: data.retained,
          percentage: (data.retained / data.signup) * 100,
        },
      ]
    : []

  return (
    <ChartContainer
      title="User Acquisition Funnel"
      description="User journey from signup to retention"
      loading={loading}
      error={error}
    >
      <div className="space-y-4">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="stage" type="category" width={100} />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === 'count') return value.toLocaleString()
                return `${value.toFixed(1)}%`
              }}
            />
            <Bar dataKey="count" radius={[0, 8, 8, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-5 gap-2 text-center">
          {chartData.map((stage, index) => (
            <div key={stage.stage} className="space-y-1">
              <div
                className="h-2 rounded-full"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                  width: `${stage.percentage}%`,
                  margin: '0 auto',
                }}
              />
              <p className="text-xs text-muted-foreground">{stage.stage}</p>
              <p className="text-sm font-medium">{stage.percentage.toFixed(1)}%</p>
            </div>
          ))}
        </div>
      </div>
    </ChartContainer>
  )
}
