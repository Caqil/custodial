/**
 * Pool Comparison Chart Component
 * Radar chart comparing different pool metrics
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useStakingAnalytics } from '../hooks'

/**
 * Chart component for comparing pool performance
 */
export function PoolComparisonChart() {
  const { data: analytics, isLoading } = useStakingAnalytics()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pool Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[350px] w-full' />
        </CardContent>
      </Card>
    )
  }

  if (!analytics?.pool_performance || analytics.pool_performance.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pool Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-sm'>No pool performance data available</p>
        </CardContent>
      </Card>
    )
  }

  // Take top 5 pools by TVL
  const topPools = [...analytics.pool_performance]
    .sort((a, b) => parseFloat(b.total_staked) - parseFloat(a.total_staked))
    .slice(0, 5)

  // Normalize data for radar chart (0-100 scale)
  const maxAPY = Math.max(...topPools.map((p) => parseFloat(p.apy)))
  const maxTVL = Math.max(...topPools.map((p) => parseFloat(p.total_staked)))
  const maxStakers = Math.max(...topPools.map((p) => p.total_stakers))

  const chartData = [
    {
      metric: 'APY',
      ...topPools.reduce((acc, pool, idx) => ({
        ...acc,
        [`Pool ${idx + 1}`]: (parseFloat(pool.apy) / maxAPY) * 100,
      }), {}),
    },
    {
      metric: 'TVL',
      ...topPools.reduce((acc, pool, idx) => ({
        ...acc,
        [`Pool ${idx + 1}`]: (parseFloat(pool.total_staked) / maxTVL) * 100,
      }), {}),
    },
    {
      metric: 'Stakers',
      ...topPools.reduce((acc, pool, idx) => ({
        ...acc,
        [`Pool ${idx + 1}`]: (pool.total_stakers / maxStakers) * 100,
      }), {}),
    },
  ]

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pool Performance Comparison</CardTitle>
        <CardDescription>Comparing top pools by APY, TVL, and stakers (normalized)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={350}>
          <RadarChart data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey='metric' />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            {topPools.map((pool, idx) => (
              <Radar
                key={pool.pool_id}
                name={pool.pool_name}
                dataKey={`Pool ${idx + 1}`}
                stroke={colors[idx]}
                fill={colors[idx]}
                fillOpacity={0.3}
              />
            ))}
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
