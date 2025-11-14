/**
 * Staking Pool Card Component
 * Displays pool information including TVL, APY, and stakers
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { StakingPool } from '@/core/entities/staking.entity'
import { PoolStatusBadge } from './pool-status-badge'
import { TrendingUp, Users, Lock, Coins } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface StakingPoolCardProps {
  pool: StakingPool
  onViewDetails?: (pool: StakingPool) => void
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
 * Card component for displaying staking pool information
 */
export function StakingPoolCard({ pool, onViewDetails }: StakingPoolCardProps) {
  return (
    <Card className='hover:shadow-lg transition-shadow'>
      <CardHeader>
        <div className='flex items-start justify-between'>
          <div>
            <CardTitle className='text-lg'>{pool.name}</CardTitle>
            <CardDescription className='mt-1'>
              {pool.description || `Stake ${pool.currency} to earn rewards`}
            </CardDescription>
          </div>
          <PoolStatusBadge status={pool.status} />
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* APY */}
        <div className='flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200'>
          <div className='flex items-center gap-2 text-green-700'>
            <TrendingUp className='h-4 w-4' />
            <span className='text-sm font-medium'>APY</span>
          </div>
          <span className='text-lg font-bold text-green-700'>
            {parseFloat(pool.apy).toFixed(2)}%
          </span>
        </div>

        {/* Pool Statistics */}
        <div className='grid grid-cols-2 gap-3'>
          {/* Total Value Locked */}
          <div className='space-y-1'>
            <div className='flex items-center gap-1 text-muted-foreground'>
              <Coins className='h-3 w-3' />
              <span className='text-xs'>TVL</span>
            </div>
            <p className='text-sm font-semibold'>
              {formatLargeNumber(pool.total_staked)} {pool.currency}
            </p>
          </div>

          {/* Total Stakers */}
          <div className='space-y-1'>
            <div className='flex items-center gap-1 text-muted-foreground'>
              <Users className='h-3 w-3' />
              <span className='text-xs'>Stakers</span>
            </div>
            <p className='text-sm font-semibold'>{pool.total_stakers.toLocaleString()}</p>
          </div>

          {/* Min Amount */}
          <div className='space-y-1'>
            <div className='flex items-center gap-1 text-muted-foreground'>
              <span className='text-xs'>Min Stake</span>
            </div>
            <p className='text-sm font-semibold'>
              {parseFloat(pool.min_amount).toFixed(4)} {pool.currency}
            </p>
          </div>

          {/* Lock Period */}
          <div className='space-y-1'>
            <div className='flex items-center gap-1 text-muted-foreground'>
              <Lock className='h-3 w-3' />
              <span className='text-xs'>Lock Period</span>
            </div>
            <p className='text-sm font-semibold'>
              {pool.lock_period_days ? `${pool.lock_period_days} days` : 'No lock'}
            </p>
          </div>
        </div>

        {/* Created At */}
        <div className='pt-2 border-t'>
          <p className='text-xs text-muted-foreground'>
            Created {formatDistanceToNow(new Date(pool.created_at), { addSuffix: true })}
          </p>
        </div>

        {/* Actions */}
        {onViewDetails && (
          <Button
            variant='outline'
            className='w-full'
            onClick={() => onViewDetails(pool)}
          >
            View Details
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
