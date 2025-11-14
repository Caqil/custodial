/**
 * Staking Reward List Component
 * Displays a table of staking rewards history
 */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { RewardStatusBadge } from './reward-status-badge'
import type { StakingReward } from '@/core/entities/staking.entity'
import { useStakingRewards } from '../hooks'
import { format } from 'date-fns'

interface StakingRewardListProps {
  positionId?: string
}

/**
 * Format amount with proper decimals
 */
function formatAmount(value: string, decimals = 8): string {
  return parseFloat(value).toFixed(decimals)
}

/**
 * Table component for displaying staking rewards
 */
export function StakingRewardList({ positionId }: StakingRewardListProps) {
  const { data, isLoading, error } = useStakingRewards({
    position_id: positionId,
    limit: 100,
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rewards History</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[300px] w-full' />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rewards History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-destructive'>Failed to load rewards</p>
          <p className='text-sm text-muted-foreground mt-2'>{error.message}</p>
        </CardContent>
      </Card>
    )
  }

  if (!data || data.rewards.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rewards History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-center py-8'>No rewards found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Rewards History ({data.total.toLocaleString()})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Earned At</TableHead>
              <TableHead>Claimed At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.rewards.map((reward) => (
              <TableRow key={reward.id}>
                <TableCell className='font-mono text-xs'>
                  {reward.position_id.substring(0, 12)}...
                </TableCell>
                <TableCell className='font-semibold text-green-600'>
                  {formatAmount(reward.amount)}
                </TableCell>
                <TableCell>
                  <RewardStatusBadge
                    claimed={!!reward.claimed_at}
                    autoCompounded={reward.auto_compounded}
                  />
                </TableCell>
                <TableCell className='text-sm text-muted-foreground'>
                  {format(new Date(reward.created_at), 'PP')}
                </TableCell>
                <TableCell className='text-sm text-muted-foreground'>
                  {reward.claimed_at ? format(new Date(reward.claimed_at), 'PP') : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
