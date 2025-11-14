/**
 * APY Trends Chart Component
 * Multi-line chart showing APY trends for each pool
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useStakingPools } from '../hooks'

/**
 * Chart component for APY trends
 */
export function APYTrendsChart() {
  const { data, isLoading } = useStakingPools({ limit: 100 })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>APY Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[300px] w-full' />
        </CardContent>
      </Card>
    )
  }

  if (!data || data.pools.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>APY Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-sm'>No pool data available</p>
        </CardContent>
      </Card>
    )
  }

  // For demo purposes, showing current APY for each pool
  // In production, this would show historical APY data
  const chartData = data.pools
    .sort((a, b) => parseFloat(b.apy) - parseFloat(a.apy))
    .slice(0, 10)
    .map((pool) => ({
      name: pool.name.substring(0, 20),
      apy: parseFloat(pool.apy),
      currency: pool.currency,
    }))

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6']

  return (
    <Card>
      <CardHeader>
        <CardTitle>APY by Pool</CardTitle>
        <CardDescription>Current APY rates across all active pools</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='name'
              angle={-45}
              textAnchor='end'
              height={100}
              fontSize={11}
            />
            <YAxis
              label={{ value: 'APY (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(2)}%`, 'APY']}
            />
            <Legend />
            <Line
              type='monotone'
              dataKey='apy'
              stroke='#3b82f6'
              strokeWidth={2}
              name='APY'
              dot={{ fill: '#3b82f6', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
