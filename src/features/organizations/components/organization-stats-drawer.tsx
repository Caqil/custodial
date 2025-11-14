/**
 * Organization Statistics Drawer Component
 * Displays detailed statistics for a specific organization
 */

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { useOrganizationStats } from '../hooks'
import { formatDate, formatCurrency } from '@/lib/utils'
import type { Organization } from '@/core/entities/organization.entity'

interface OrganizationStatsDrawerProps {
  organization: Organization | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Drawer showing comprehensive organization statistics
 */
export function OrganizationStatsDrawer({
  organization,
  open,
  onOpenChange,
}: OrganizationStatsDrawerProps) {
  const { data: stats, isLoading } = useOrganizationStats(
    organization?.id ?? null,
    open
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='sm:max-w-lg'>
        <SheetHeader>
          <SheetTitle>Organization Statistics</SheetTitle>
          <SheetDescription>
            Detailed metrics for {organization?.name}
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className='mt-6 space-y-4'>
            <Skeleton className='h-32 w-full' />
            <Skeleton className='h-48 w-full' />
          </div>
        ) : stats ? (
          <div className='mt-6 space-y-6'>
            {/* Basic Info */}
            <div className='space-y-3'>
              <h3 className='font-semibold'>Organization Info</h3>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground text-sm'>Name</span>
                  <span className='text-sm font-medium'>{stats.name}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground text-sm'>
                    Created At
                  </span>
                  <span className='text-sm'>{formatDate(stats.created_at)}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Metrics */}
            <div className='space-y-3'>
              <h3 className='font-semibold'>Metrics</h3>
              <div className='grid grid-cols-2 gap-4'>
                <div className='rounded-lg border p-3'>
                  <p className='text-muted-foreground text-xs'>Wallets</p>
                  <p className='text-2xl font-bold'>{stats.wallet_count}</p>
                </div>
                <div className='rounded-lg border p-3'>
                  <p className='text-muted-foreground text-xs'>Transactions</p>
                  <p className='text-2xl font-bold'>{stats.transaction_count}</p>
                </div>
                <div className='col-span-2 rounded-lg border p-3'>
                  <p className='text-muted-foreground text-xs'>
                    Staking Positions
                  </p>
                  <p className='text-2xl font-bold'>{stats.staking_positions}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Assets Under Custody */}
            <div className='space-y-3'>
              <h3 className='font-semibold'>Assets Under Custody</h3>
              {Object.keys(stats.assets_under_custody).length > 0 ? (
                <div className='space-y-2'>
                  {Object.entries(stats.assets_under_custody).map(
                    ([currency, amount]) => (
                      <div
                        key={currency}
                        className='flex items-center justify-between rounded-lg border p-3'
                      >
                        <div className='flex items-center gap-2'>
                          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/10'>
                            <span className='text-xs font-bold'>
                              {currency.slice(0, 2)}
                            </span>
                          </div>
                          <span className='font-medium'>{currency}</span>
                        </div>
                        <span className='font-mono text-sm font-semibold'>
                          {formatCurrency(amount, currency)}
                        </span>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className='text-muted-foreground text-sm'>
                  No assets under custody
                </p>
              )}
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
