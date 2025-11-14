/**
 * Create Wallet Dialog Component
 * Dialog for creating new wallets
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useCreateWallet } from '../hooks'
import { WalletType } from '@/core/entities/wallet.entity'
import { PoolType } from '@/core/entities/pool.entity'
import type { CreateWalletRequest } from '@/core/entities/wallet.entity'

interface CreateWalletDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Dialog component for creating new wallets
 */
export function CreateWalletDialog({ open, onOpenChange }: CreateWalletDialogProps) {
  const [isPoolParent, setIsPoolParent] = useState(false)
  const createWalletMutation = useCreateWallet()

  const form = useForm<CreateWalletRequest>({
    defaultValues: {
      organization_id: '',
      name: '',
      type: WalletType.Hot,
      currency: 'BTC',
      is_pool_parent: false,
    },
  })

  const onSubmit = async (data: CreateWalletRequest) => {
    try {
      await createWalletMutation.mutateAsync(data)
      form.reset()
      onOpenChange(false)
    } catch (error) {
      // Error handled by mutation
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Create New Wallet</DialogTitle>
          <DialogDescription>
            Create a new wallet for managing digital assets.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Name</FormLabel>
                  <FormControl>
                    <Input placeholder='My BTC Wallet' {...field} />
                  </FormControl>
                  <FormDescription>
                    A friendly name to identify this wallet
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='type'
              rules={{ required: 'Type is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select wallet type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={WalletType.Hot}>Hot Wallet</SelectItem>
                      <SelectItem value={WalletType.Warm}>Warm Wallet</SelectItem>
                      <SelectItem value={WalletType.Cold}>Cold Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Hot: Online, Warm: Semi-online, Cold: Offline
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='currency'
              rules={{ required: 'Currency is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select currency' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='BTC'>Bitcoin (BTC)</SelectItem>
                      <SelectItem value='ETH'>Ethereum (ETH)</SelectItem>
                      <SelectItem value='USDT'>Tether (USDT)</SelectItem>
                      <SelectItem value='USDC'>USD Coin (USDC)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='organization_id'
              rules={{ required: 'Organization is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization ID</FormLabel>
                  <FormControl>
                    <Input placeholder='org-uuid' {...field} />
                  </FormControl>
                  <FormDescription>
                    The organization that owns this wallet
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='max_daily_limit'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Daily Limit (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder='1000.00' type='number' step='0.01' {...field} />
                  </FormControl>
                  <FormDescription>
                    Maximum daily transaction limit
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='is_pool_parent'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked)
                        setIsPoolParent(!!checked)
                      }}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Pool Parent Wallet</FormLabel>
                    <FormDescription>
                      Make this a parent pool wallet that can have child wallets
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {isPoolParent && (
              <FormField
                control={form.control}
                name='pool_type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pool Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select pool type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={PoolType.Operational}>Operational</SelectItem>
                        <SelectItem value={PoolType.Custodial}>Custodial</SelectItem>
                        <SelectItem value={PoolType.Staking}>Staking</SelectItem>
                        <SelectItem value={PoolType.Treasury}>Treasury</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={createWalletMutation.isPending}>
                {createWalletMutation.isPending ? 'Creating...' : 'Create Wallet'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
