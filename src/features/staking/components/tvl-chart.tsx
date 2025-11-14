/**
 * TVL Chart Component
 * Area chart showing Total Value Locked over time
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
} from 'recharts'
import { useStakingAnalytics } from '../hooks'
import { format } from 'date-fns'

/**
 * Format large numbers with K, M, B suffixes
 */
function formatLargeNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`
  }
  return value.toFixed(2)
}

/**
 * Chart component for TVL over time
 */
export function TVLChart() {
  const { data: analytics, isLoading } = useStakingAnalytics()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Total Value Locked</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[300px] w-full' />
        </CardContent>
      </Card>
    )
  }

  if (!analytics?.tvl_history || analytics.tvl_history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Total Value Locked</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-sm'>No TVL history available</p>
        </CardContent>
      </Card>
    )
  }

  const chartData = analytics.tvl_history.map((point) => ({
    date: format(new Date(point.date), 'MMM dd'),
    tvl: parseFloat(point.total_value_locked),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Value Locked Over Time</CardTitle>
        <CardDescription>Historical TVL across all staking pools</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id='colorTVL' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis tickFormatter={(value) => formatLargeNumber(value)} />
            <Tooltip
              formatter={(value: number) => [formatLargeNumber(value), 'TVL']}
            />
            <Area
              type='monotone'
              dataKey='tvl'
              stroke='#3b82f6'
              fillOpacity={1}
              fill='url(#colorTVL)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
