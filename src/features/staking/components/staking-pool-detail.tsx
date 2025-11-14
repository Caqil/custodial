/**
 * Staking Pool Detail Component
 * Displays detailed pool information
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { StakingPool } from '@/core/entities/staking.entity'
import { PoolStatusBadge } from './pool-status-badge'
import { TrendingUp, Users, Lock, Coins, Calendar, DollarSign } from 'lucide-react'
import { format } from 'date-fns'

interface StakingPoolDetailProps {
  pool: StakingPool
}

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
 * Detailed view component for staking pool
 */
export function StakingPoolDetail({ pool }: StakingPoolDetailProps) {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className='flex items-start justify-between'>
            <div>
              <CardTitle>{pool.name}</CardTitle>
              <CardDescription className='mt-2'>
                {pool.description || `Stake ${pool.currency} to earn rewards`}
              </CardDescription>
            </div>
            <PoolStatusBadge status={pool.status} />
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <TrendingUp className='h-4 w-4 text-green-600' />
              APY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold text-green-600'>
              {parseFloat(pool.apy).toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <Coins className='h-4 w-4 text-blue-600' />
              Total Value Locked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {formatLargeNumber(pool.total_staked)}
            </p>
            <p className='text-sm text-muted-foreground'>{pool.currency}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <Users className='h-4 w-4 text-purple-600' />
              Total Stakers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>{pool.total_stakers.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <Lock className='h-4 w-4 text-orange-600' />
              Lock Period
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {pool.lock_period_days || 0}
            </p>
            <p className='text-sm text-muted-foreground'>days</p>
          </CardContent>
        </Card>
      </div>

      {/* Pool Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Pool Configuration</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <DollarSign className='h-4 w-4' />
                <span className='text-sm font-medium'>Minimum Stake</span>
              </div>
              <p className='text-lg font-semibold'>
                {parseFloat(pool.min_amount).toFixed(4)} {pool.currency}
              </p>
            </div>

            {pool.max_amount && (
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <DollarSign className='h-4 w-4' />
                  <span className='text-sm font-medium'>Maximum Stake</span>
                </div>
                <p className='text-lg font-semibold'>
                  {parseFloat(pool.max_amount).toFixed(4)} {pool.currency}
                </p>
              </div>
            )}

            <div className='space-y-2'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Calendar className='h-4 w-4' />
                <span className='text-sm font-medium'>Created At</span>
              </div>
              <p className='text-lg font-semibold'>
                {format(new Date(pool.created_at), 'PPP')}
              </p>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Calendar className='h-4 w-4' />
                <span className='text-sm font-medium'>Last Updated</span>
              </div>
              <p className='text-lg font-semibold'>
                {format(new Date(pool.updated_at), 'PPP')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
