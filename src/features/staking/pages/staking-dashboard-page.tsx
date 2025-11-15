/**
 * Staking Dashboard Page
 * Overview of staking metrics, pools, and analytics
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { StakingPoolList } from '../components/staking-pool-list'
import { TVLChart } from '../components/tvl-chart'
import { PoolComparisonChart } from '../components/pool-comparison-chart'
import { APYTrendsChart } from '../components/apy-trends-chart'
import { RewardsDistributionChart } from '../components/rewards-distribution-chart'
import { PoolCreateDialog } from '../components/pool-create-dialog'
import { RewardDistributeDialog } from '../components/reward-distribute-dialog'
import { useStakingAnalytics } from '../hooks'
import { TrendingUp, Users, Coins, Award } from 'lucide-react'

/**
 * Format large numbers with K, M, B suffixes
 */
function formatLargeNumber(value: string, decimals = 2): string {
  const num = parseFloat(value)
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(decimals)}B`
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(decimals)}M`
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(decimals)}K`
  }
  return num.toFixed(decimals)
}

/**
 * Staking Dashboard Page Component
 */
export function StakingDashboardPage() {
  const { data: analytics, isLoading, error } = useStakingAnalytics()

  if (error) {
    return (
      <div className='container mx-auto py-8'>
        <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
          <h3 className='font-semibold text-red-900'>Error loading staking dashboard</h3>
          <p className='text-sm text-red-700'>
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto space-y-8 py-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Staking Dashboard</h1>
          <p className='text-muted-foreground'>
            Manage staking pools, positions, and rewards distribution
          </p>
        </div>
        <div className='flex gap-2'>
          <PoolCreateDialog />
          <RewardDistributeDialog />
        </div>
      </div>

      {/* Stats */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className='h-[120px]' />
            ))}
          </>
        ) : analytics ? (
          <>
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm font-medium flex items-center gap-2'>
                  <Coins className='h-4 w-4 text-blue-600' />
                  Total Value Locked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-2xl font-bold'>
                  {formatLargeNumber(analytics.total_value_locked)}
                </p>
                <p className='text-sm text-muted-foreground mt-1'>
                  Across {analytics.by_currency.length} currencies
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm font-medium flex items-center gap-2'>
                  <Users className='h-4 w-4 text-purple-600' />
                  Active Positions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-2xl font-bold'>
                  {analytics.total_positions.toLocaleString()}
                </p>
                <p className='text-sm text-muted-foreground mt-1'>
                  Staking positions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm font-medium flex items-center gap-2'>
                  <Award className='h-4 w-4 text-green-600' />
                  Total Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-2xl font-bold text-green-600'>
                  {formatLargeNumber(analytics.total_rewards_distributed)}
                </p>
                <p className='text-sm text-muted-foreground mt-1'>
                  Distributed to stakers
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm font-medium flex items-center gap-2'>
                  <TrendingUp className='h-4 w-4 text-orange-600' />
                  Average APY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-2xl font-bold text-orange-600'>
                  {analytics.by_currency.length > 0
                    ? (
                        analytics.by_currency.reduce(
                          (sum, c) => sum + parseFloat(c.average_apy),
                          0
                        ) / analytics.by_currency.length
                      ).toFixed(2)
                    : '0.00'}
                  %
                </p>
                <p className='text-sm text-muted-foreground mt-1'>
                  Across all pools
                </p>
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>

      {/* Charts */}
      <div className='grid gap-4 lg:grid-cols-2'>
        <TVLChart />
        <PoolComparisonChart />
      </div>

      <div className='grid gap-4 lg:grid-cols-2'>
        <RewardsDistributionChart />
        <APYTrendsChart />
      </div>

      {/* Active Pools */}
      <div>
        <h2 className='text-2xl font-bold mb-4'>Active Staking Pools</h2>
        <StakingPoolList />
      </div>
    </div>
  )
}
