/**
 * Security Alerts Chart Component
 * Stacked area chart showing alerts over time by severity
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { AlertSeverity } from '@/core/entities/security.entity'
import { TrendingUp } from 'lucide-react'

// Mock data generator - in real app this would come from API
const generateMockData = () => {
  const days = 14
  const data = []
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      critical: Math.floor(Math.random() * 5),
      high: Math.floor(Math.random() * 10),
      medium: Math.floor(Math.random() * 20),
      low: Math.floor(Math.random() * 30),
    })
  }

  return data
}

interface SecurityAlertsChartProps {
  data?: Array<{
    date: string
    critical: number
    high: number
    medium: number
    low: number
  }>
  isLoading?: boolean
}

/**
 * Chart component for security alerts over time
 */
export function SecurityAlertsChart({ data, isLoading = false }: SecurityAlertsChartProps) {
  const chartData = data || generateMockData()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-48' />
        </CardHeader>
        <CardContent>
          <Skeleton className='h-80 w-full' />
        </CardContent>
      </Card>
    )
  }

  const total = chartData.reduce(
    (sum, item) => sum + item.critical + item.high + item.medium + item.low,
    0
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <TrendingUp className='h-5 w-5' />
          Security Alerts Trend
        </CardTitle>
        <CardDescription>
          Alert distribution by severity over the last 14 days ({total} total alerts)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={350}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='date'
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
              }}
            />
            <Legend />
            <Area
              type='monotone'
              dataKey='critical'
              stackId='1'
              stroke='#dc2626'
              fill='#dc2626'
              name='Critical'
            />
            <Area
              type='monotone'
              dataKey='high'
              stackId='1'
              stroke='#f97316'
              fill='#f97316'
              name='High'
            />
            <Area
              type='monotone'
              dataKey='medium'
              stackId='1'
              stroke='#eab308'
              fill='#eab308'
              name='Medium'
            />
            <Area
              type='monotone'
              dataKey='low'
              stackId='1'
              stroke='#3b82f6'
              fill='#3b82f6'
              name='Low'
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
