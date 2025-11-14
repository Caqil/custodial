/**
 * Reward Distribute Dialog Component
 * Dialog for distributing staking rewards to users
 */

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDistributeRewards } from '../hooks'
import { Send, Loader2 } from 'lucide-react'
import type { DistributeRewardsRequest } from '@/infrastructure/api/repositories/staking-api.repository'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface RewardDistributeDialogProps {
  trigger?: React.ReactNode
  defaultPoolId?: string
  defaultPositionId?: string
}

/**
 * Dialog component for distributing staking rewards
 */
export function RewardDistributeDialog({
  trigger,
  defaultPoolId,
  defaultPositionId,
}: RewardDistributeDialogProps) {
  const [open, setOpen] = useState(false)
  const [distributionType, setDistributionType] = useState<'pool' | 'position' | 'all'>('all')
  const [formData, setFormData] = useState<DistributeRewardsRequest>({
    pool_id: defaultPoolId,
    position_id: defaultPositionId,
    amount: undefined,
  })

  const { mutate: distributeRewards, isPending } = useDistributeRewards()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const request: DistributeRewardsRequest = {
      pool_id: distributionType === 'pool' ? formData.pool_id : undefined,
      position_id: distributionType === 'position' ? formData.position_id : undefined,
      amount: formData.amount || undefined,
    }

    distributeRewards(request, {
      onSuccess: () => {
        setOpen(false)
        setFormData({
          pool_id: defaultPoolId,
          position_id: defaultPositionId,
          amount: undefined,
        })
        setDistributionType('all')
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Send className='mr-2 h-4 w-4' />
            Distribute Rewards
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>Distribute Staking Rewards</DialogTitle>
          <DialogDescription>
            Distribute rewards to stakers. Leave fields empty to distribute to all eligible positions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='distribution_type'>Distribution Type</Label>
            <Select
              value={distributionType}
              onValueChange={(value) => setDistributionType(value as 'pool' | 'position' | 'all')}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Eligible Positions</SelectItem>
                <SelectItem value='pool'>Specific Pool</SelectItem>
                <SelectItem value='position'>Specific Position</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {distributionType === 'pool' && (
            <div className='space-y-2'>
              <Label htmlFor='pool_id'>Pool ID</Label>
              <Input
                id='pool_id'
                placeholder='Enter pool ID'
                value={formData.pool_id || ''}
                onChange={(e) =>
                  setFormData({ ...formData, pool_id: e.target.value })
                }
                required
              />
            </div>
          )}

          {distributionType === 'position' && (
            <div className='space-y-2'>
              <Label htmlFor='position_id'>Position ID</Label>
              <Input
                id='position_id'
                placeholder='Enter position ID'
                value={formData.position_id || ''}
                onChange={(e) =>
                  setFormData({ ...formData, position_id: e.target.value })
                }
                required
              />
            </div>
          )}

          <div className='space-y-2'>
            <Label htmlFor='amount'>Amount (Optional)</Label>
            <Input
              id='amount'
              type='number'
              step='0.00000001'
              placeholder='Leave empty for auto-calculation'
              value={formData.amount || ''}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value || undefined })
              }
            />
            <p className='text-xs text-muted-foreground'>
              If not specified, rewards will be calculated based on APY and staking duration
            </p>
          </div>

          <div className='rounded-lg bg-yellow-50 border border-yellow-200 p-3'>
            <p className='text-sm text-yellow-800'>
              <strong>Warning:</strong> This action will distribute rewards to stakers.
              Make sure to verify the distribution parameters before proceeding.
            </p>
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isPending}>
              {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Distribute Rewards
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
