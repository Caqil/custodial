/**
 * Pool Create Dialog Component
 * Dialog for creating a new staking pool
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
import { Textarea } from '@/components/ui/textarea'
import { useCreateStakingPool } from '../hooks'
import { Plus, Loader2 } from 'lucide-react'
import type { CreateStakingPoolRequest } from '@/infrastructure/api/repositories/staking-api.repository'

interface PoolCreateDialogProps {
  trigger?: React.ReactNode
}

/**
 * Dialog component for creating a new staking pool
 */
export function PoolCreateDialog({ trigger }: PoolCreateDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<CreateStakingPoolRequest>({
    currency: '',
    name: '',
    description: '',
    apy: '',
    min_amount: '',
    max_amount: '',
    lock_period_days: undefined,
  })

  const { mutate: createPool, isPending } = useCreateStakingPool()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const request: CreateStakingPoolRequest = {
      ...formData,
      max_amount: formData.max_amount || undefined,
      lock_period_days: formData.lock_period_days || undefined,
    }

    createPool(request, {
      onSuccess: () => {
        setOpen(false)
        setFormData({
          currency: '',
          name: '',
          description: '',
          apy: '',
          min_amount: '',
          max_amount: '',
          lock_period_days: undefined,
        })
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Create Pool
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Create Staking Pool</DialogTitle>
          <DialogDescription>
            Create a new staking pool for users to stake their assets
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='currency'>Currency *</Label>
              <Input
                id='currency'
                placeholder='ETH, BTC, etc.'
                value={formData.currency}
                onChange={(e) =>
                  setFormData({ ...formData, currency: e.target.value.toUpperCase() })
                }
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='name'>Pool Name *</Label>
              <Input
                id='name'
                placeholder='High Yield ETH Pool'
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              placeholder='Optional pool description'
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='apy'>APY (%) *</Label>
              <Input
                id='apy'
                type='number'
                step='0.01'
                placeholder='5.00'
                value={formData.apy}
                onChange={(e) =>
                  setFormData({ ...formData, apy: e.target.value })
                }
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='lock_period_days'>Lock Period (days)</Label>
              <Input
                id='lock_period_days'
                type='number'
                placeholder='0 for no lock'
                value={formData.lock_period_days || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lock_period_days: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='min_amount'>Minimum Stake Amount *</Label>
              <Input
                id='min_amount'
                type='number'
                step='0.00000001'
                placeholder='0.01'
                value={formData.min_amount}
                onChange={(e) =>
                  setFormData({ ...formData, min_amount: e.target.value })
                }
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='max_amount'>Maximum Stake Amount</Label>
              <Input
                id='max_amount'
                type='number'
                step='0.00000001'
                placeholder='Optional'
                value={formData.max_amount}
                onChange={(e) =>
                  setFormData({ ...formData, max_amount: e.target.value })
                }
              />
            </div>
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
              Create Pool
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
