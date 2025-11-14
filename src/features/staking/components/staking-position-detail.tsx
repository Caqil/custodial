/**
 * Staking Position Detail Component
 * Displays detailed position information with rewards
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { StakingPosition } from '@/core/entities/staking.entity'
import { PositionStatusBadge } from './position-status-badge'
import { Coins, TrendingUp, Calendar, Lock, Award } from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'
import { Badge } from '@/components/ui/badge'

interface StakingPositionDetailProps {
  position: StakingPosition
}

/**
 * Format amount with proper decimals
 */
function formatAmount(value: string, decimals = 8): string {
  return parseFloat(value).toFixed(decimals)
}

/**
 * Detailed view component for staking position
 */
export function StakingPositionDetail({ position }: StakingPositionDetailProps) {
  const unlocksAt = position.unlocks_at ? new Date(position.unlocks_at) : null
  const isLocked = unlocksAt && unlocksAt > new Date()

  return (
    <div className='space-y-6'>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className='flex items-start justify-between'>
            <div>
              <CardTitle>Staking Position</CardTitle>
              <CardDescription className='mt-2 space-y-1'>
                <p>Wallet: <span className='font-mono'>{position.wallet_id}</span></p>
                {position.pool && <p>Pool: {position.pool.name}</p>}
              </CardDescription>
            </div>
            <PositionStatusBadge status={position.status} />
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <Coins className='h-4 w-4 text-blue-600' />
              Staked Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {formatAmount(position.amount)}
            </p>
            <p className='text-sm text-muted-foreground'>
              {position.pool?.currency || 'tokens'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <TrendingUp className='h-4 w-4 text-green-600' />
              Total Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold text-green-600'>
              {formatAmount(position.rewards_earned)}
            </p>
            <p className='text-sm text-muted-foreground'>
              {position.pool?.currency || 'tokens'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <Award className='h-4 w-4 text-purple-600' />
              Unclaimed Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold text-purple-600'>
              {formatAmount(position.unclaimed_rewards)}
            </p>
            <p className='text-sm text-muted-foreground'>
              {position.pool?.currency || 'tokens'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <Calendar className='h-4 w-4 text-orange-600' />
              Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {formatDistanceToNow(new Date(position.staked_at))}
            </p>
            <p className='text-sm text-muted-foreground'>
              Since {format(new Date(position.staked_at), 'PP')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Position Details */}
      <Card>
        <CardHeader>
          <CardTitle>Position Details</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Calendar className='h-4 w-4' />
                <span className='text-sm font-medium'>Staked At</span>
              </div>
              <p className='text-lg font-semibold'>
                {format(new Date(position.staked_at), 'PPpp')}
              </p>
            </div>

            {position.unlocks_at && (
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Lock className='h-4 w-4' />
                  <span className='text-sm font-medium'>Unlocks At</span>
                </div>
                <p className='text-lg font-semibold'>
                  {format(new Date(position.unlocks_at), 'PPpp')}
                </p>
                {isLocked && (
                  <Badge variant='outline' className='border-orange-500 bg-orange-50 text-orange-700'>
                    Locked for {formatDistanceToNow(new Date(position.unlocks_at))}
                  </Badge>
                )}
              </div>
            )}

            {position.unstake_requested_at && (
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Calendar className='h-4 w-4' />
                  <span className='text-sm font-medium'>Unstake Requested</span>
                </div>
                <p className='text-lg font-semibold'>
                  {format(new Date(position.unstake_requested_at), 'PPpp')}
                </p>
              </div>
            )}

            <div className='space-y-2'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <span className='text-sm font-medium'>Auto Compound</span>
              </div>
              <Badge variant={position.auto_compound ? 'default' : 'outline'}>
                {position.auto_compound ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pool Information */}
      {position.pool && (
        <Card>
          <CardHeader>
            <CardTitle>Pool Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Pool Name:</span>
              <span className='font-semibold'>{position.pool.name}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Currency:</span>
              <span className='font-semibold'>{position.pool.currency}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>APY:</span>
              <span className='font-semibold text-green-600'>
                {parseFloat(position.pool.apy).toFixed(2)}%
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Lock Period:</span>
              <span className='font-semibold'>
                {position.pool.lock_period_days ? `${position.pool.lock_period_days} days` : 'No lock'}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
