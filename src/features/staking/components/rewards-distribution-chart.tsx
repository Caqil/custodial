/**
 * Rewards Distribution Chart Component
 * Treemap showing rewards distribution by pool
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Treemap,
  ResponsiveContainer,
} from 'recharts'
import { useStakingAnalytics } from '../hooks'

/**
 * Format large numbers with K, M suffixes
 */
function formatNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`
  }
  return value.toFixed(2)
}

/**
 * Custom content for treemap
 */
const CustomizedContent = (props: any) => {
  const { x, y, width, height, name, value } = props

  if (width < 80 || height < 40) {
    return null
  }

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: props.fill,
          stroke: '#fff',
          strokeWidth: 2,
        }}
      />
      <text
        x={x + width / 2}
        y={y + height / 2 - 10}
        textAnchor='middle'
        fill='#fff'
        fontSize={14}
        fontWeight='bold'
      >
        {name}
      </text>
      <text
        x={x + width / 2}
        y={y + height / 2 + 10}
        textAnchor='middle'
        fill='#fff'
        fontSize={12}
      >
        {formatNumber(value)}
      </text>
    </g>
  )
}

/**
 * Chart component for rewards distribution
 */
export function RewardsDistributionChart() {
  const { data: analytics, isLoading } = useStakingAnalytics()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rewards Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[300px] w-full' />
        </CardContent>
      </Card>
    )
  }

  if (!analytics?.rewards_breakdown || analytics.rewards_breakdown.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rewards Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-sm'>No rewards distribution data available</p>
        </CardContent>
      </Card>
    )
  }

  const chartData = analytics.rewards_breakdown.map((item) => ({
    name: item.pool_name,
    value: parseFloat(item.total_rewards),
    claimed: parseFloat(item.claimed_rewards),
    unclaimed: parseFloat(item.unclaimed_rewards),
  }))

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6']

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rewards Distribution by Pool</CardTitle>
        <CardDescription>Total rewards distributed across all pools</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <Treemap
            data={chartData}
            dataKey='value'
            stroke='#fff'
            fill='#3b82f6'
            content={<CustomizedContent />}
          >
            {chartData.map((entry, index) => (
              <rect key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Treemap>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
