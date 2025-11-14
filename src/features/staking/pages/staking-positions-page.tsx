/**
 * Staking Positions Page
 * View and manage all user staking positions
 */

import { useState } from 'react'
import { StakingPositionList } from '../components/staking-position-list'
import { StakingPositionDetail } from '../components/staking-position-detail'
import { StakingRewardList } from '../components/staking-reward-list'
import { RewardDistributeDialog } from '../components/reward-distribute-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { StakingPosition, PositionStatus } from '@/core/entities/staking.entity'
import { ArrowLeft, Search } from 'lucide-react'

/**
 * Staking Positions Page Component
 */
export function StakingPositionsPage() {
  const [selectedPosition, setSelectedPosition] = useState<StakingPosition | null>(null)
  const [walletId, setWalletId] = useState('')
  const [poolId, setPoolId] = useState('')
  const [status, setStatus] = useState<PositionStatus | undefined>(undefined)

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Staking Positions</h1>
          <p className='text-muted-foreground mt-1'>
            View and manage all user staking positions across all pools
          </p>
        </div>
        <RewardDistributeDialog />
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='wallet_id'>Wallet ID</Label>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  id='wallet_id'
                  placeholder='Search by wallet ID'
                  value={walletId}
                  onChange={(e) => setWalletId(e.target.value)}
                  className='pl-9'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='pool_id'>Pool ID</Label>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  id='pool_id'
                  placeholder='Search by pool ID'
                  value={poolId}
                  onChange={(e) => setPoolId(e.target.value)}
                  className='pl-9'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='status'>Status</Label>
              <Select
                value={status || 'all'}
                onValueChange={(value) => setStatus(value === 'all' ? undefined : value as PositionStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Statuses</SelectItem>
                  <SelectItem value='active'>Active</SelectItem>
                  <SelectItem value='unstaking'>Unstaking</SelectItem>
                  <SelectItem value='unstaked'>Unstaked</SelectItem>
                  <SelectItem value='locked'>Locked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Position List */}
      <StakingPositionList
        walletId={walletId || undefined}
        poolId={poolId || undefined}
        onViewDetails={setSelectedPosition}
      />

      {/* Position Detail Sheet */}
      <Sheet open={!!selectedPosition} onOpenChange={(open) => !open && setSelectedPosition(null)}>
        <SheetContent side='right' className='w-full sm:max-w-3xl overflow-y-auto'>
          <SheetHeader>
            <div className='flex items-center gap-2'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setSelectedPosition(null)}
              >
                <ArrowLeft className='h-4 w-4' />
              </Button>
              <SheetTitle>Position Details</SheetTitle>
            </div>
          </SheetHeader>
          <div className='mt-6 space-y-6'>
            {selectedPosition && (
              <>
                <StakingPositionDetail position={selectedPosition} />
                <StakingRewardList positionId={selectedPosition.id} />
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
