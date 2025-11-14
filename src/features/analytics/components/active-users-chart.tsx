/**
 * Active Users Chart Component
 * Line chart showing DAU/WAU/MAU trends
 */

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer } from './chart-container'
import type { ActiveUsersData } from '@/core/entities/analytics.entity'

interface ActiveUsersChartProps {
  data: ActiveUsersData
  loading?: boolean
  error?: Error | null
}

export function ActiveUsersChart({ data, loading, error }: ActiveUsersChartProps) {
  // Combine all trends into one chart
  const chartData =
    data?.dau_trend?.map((point, index) => ({
      date: point.date,
      dau: point.value,
      wau: data.wau_trend[index]?.value || 0,
      mau: data.mau_trend[index]?.value || 0,
    })) || []

  return (
    <ChartContainer
      title="Active Users"
      description="Daily, Weekly, and Monthly Active Users"
      loading={loading}
      error={error}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">DAU</p>
            <p className="text-2xl font-bold text-blue-600">{data?.dau?.toLocaleString()}</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">WAU</p>
            <p className="text-2xl font-bold text-green-600">{data?.wau?.toLocaleString()}</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">MAU</p>
            <p className="text-2xl font-bold text-purple-600">{data?.mau?.toLocaleString()}</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value: number) => value.toLocaleString()} />
            <Legend />
            <Line type="monotone" dataKey="dau" stroke="#3b82f6" strokeWidth={2} name="DAU" />
            <Line type="monotone" dataKey="wau" stroke="#10b981" strokeWidth={2} name="WAU" />
            <Line type="monotone" dataKey="mau" stroke="#8b5cf6" strokeWidth={2} name="MAU" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  )
}
