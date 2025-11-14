/**
 * Staking Position List Component
 * Displays a table of staking positions
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
import { Button } from '@/components/ui/button'
import { PositionStatusBadge } from './position-status-badge'
import type { StakingPosition } from '@/core/entities/staking.entity'
import { useStakingPositions } from '../hooks'
import { ExternalLink } from 'lucide-react'
import { format } from 'date-fns'
import { useState } from 'react'

interface StakingPositionListProps {
  poolId?: string
  walletId?: string
  onViewDetails?: (position: StakingPosition) => void
}

/**
 * Format large numbers with proper decimals
 */
function formatAmount(value: string, decimals = 8): string {
  return parseFloat(value).toFixed(decimals)
}

/**
 * Table component for displaying staking positions
 */
export function StakingPositionList({ poolId, walletId, onViewDetails }: StakingPositionListProps) {
  const [limit] = useState(50)
  const { data, isLoading, error } = useStakingPositions({
    pool_id: poolId,
    wallet_id: walletId,
    limit,
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Staking Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[400px] w-full' />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Staking Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-destructive'>Failed to load staking positions</p>
          <p className='text-sm text-muted-foreground mt-2'>{error.message}</p>
        </CardContent>
      </Card>
    )
  }

  if (!data || data.positions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Staking Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-center py-8'>No staking positions found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Staking Positions ({data.total.toLocaleString()})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Wallet ID</TableHead>
              <TableHead>Pool</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Rewards Earned</TableHead>
              <TableHead>Unclaimed</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Staked At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.positions.map((position) => (
              <TableRow key={position.id}>
                <TableCell className='font-mono text-xs'>
                  {position.wallet_id.substring(0, 8)}...
                </TableCell>
                <TableCell>
                  {position.pool?.name || position.pool_id.substring(0, 8)}
                </TableCell>
                <TableCell className='font-semibold'>
                  {formatAmount(position.amount)}
                </TableCell>
                <TableCell className='text-green-600'>
                  {formatAmount(position.rewards_earned)}
                </TableCell>
                <TableCell className='text-blue-600'>
                  {formatAmount(position.unclaimed_rewards)}
                </TableCell>
                <TableCell>
                  <PositionStatusBadge status={position.status} />
                </TableCell>
                <TableCell className='text-sm text-muted-foreground'>
                  {format(new Date(position.staked_at), 'PP')}
                </TableCell>
                <TableCell>
                  {onViewDetails && (
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => onViewDetails(position)}
                    >
                      <ExternalLink className='h-4 w-4' />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
