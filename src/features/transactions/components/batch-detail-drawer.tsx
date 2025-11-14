/**
 * Batch Detail Drawer Component
 * Displays full batch details in a side drawer
 */

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import type { TransactionBatch } from '@/core/entities/transaction.entity'
import { format } from 'date-fns'
import { useBatchTransactions } from '../hooks'
import { TransactionTypeBadge } from './transaction-type-badge'
import { TransactionStatusBadge } from './transaction-status-badge'

interface BatchDetailDrawerProps {
  batch: TransactionBatch | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BatchDetailDrawer({
  batch,
  open,
  onOpenChange,
}: BatchDetailDrawerProps) {
  const { data: transactions, isLoading } = useBatchTransactions(
    batch?.id || '',
    !!batch
  )

  if (!batch) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='w-full sm:max-w-2xl overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>Batch Details</SheetTitle>
          <SheetDescription>
            View batch information and included transactions
          </SheetDescription>
        </SheetHeader>

        <div className='mt-6 space-y-6'>
          {/* Batch Info */}
          <div className='space-y-3'>
            <h3 className='font-semibold text-sm'>Batch Information</h3>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='text-muted-foreground text-xs'>Batch ID</label>
                <span className='font-mono text-sm block'>{batch.id}</span>
              </div>
              <div>
                <label className='text-muted-foreground text-xs'>Name</label>
                <span className='text-sm block'>{batch.name || 'Unnamed'}</span>
              </div>
              <div>
                <label className='text-muted-foreground text-xs'>Status</label>
                <span className='text-sm block capitalize'>{batch.status}</span>
              </div>
              <div>
                <label className='text-muted-foreground text-xs'>Created By</label>
                <span className='font-mono text-sm block'>{batch.created_by.slice(0, 8)}...</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Statistics */}
          <div className='space-y-3'>
            <h3 className='font-semibold text-sm'>Statistics</h3>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='text-muted-foreground text-xs'>Total Transactions</label>
                <span className='text-2xl font-bold block'>{batch.total_count}</span>
              </div>
              <div>
                <label className='text-muted-foreground text-xs'>Approved</label>
                <span className='text-2xl font-bold text-blue-600 block'>{batch.approved_count}</span>
              </div>
              <div>
                <label className='text-muted-foreground text-xs'>Completed</label>
                <span className='text-2xl font-bold text-green-600 block'>{batch.completed_count}</span>
              </div>
              <div>
                <label className='text-muted-foreground text-xs'>Failed</label>
                <span className='text-2xl font-bold text-red-600 block'>{batch.failed_count}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Timestamps */}
          <div className='space-y-3'>
            <h3 className='font-semibold text-sm'>Timestamps</h3>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='text-muted-foreground text-xs'>Created At</label>
                <span className='text-sm block'>
                  {format(new Date(batch.created_at), 'PPpp')}
                </span>
              </div>
              <div>
                <label className='text-muted-foreground text-xs'>Updated At</label>
                <span className='text-sm block'>
                  {format(new Date(batch.updated_at), 'PPpp')}
                </span>
              </div>
              {batch.completed_at && (
                <div>
                  <label className='text-muted-foreground text-xs'>Completed At</label>
                  <span className='text-sm block'>
                    {format(new Date(batch.completed_at), 'PPpp')}
                  </span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Transactions */}
          <div className='space-y-3'>
            <h3 className='font-semibold text-sm'>Transactions</h3>
            {isLoading ? (
              <div className='space-y-2'>
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className='h-16 w-full' />
                ))}
              </div>
            ) : transactions && transactions.length > 0 ? (
              <div className='space-y-2'>
                {transactions.map((txn) => (
                  <div
                    key={txn.id}
                    className='rounded-lg border p-3 space-y-2'
                  >
                    <div className='flex items-center justify-between'>
                      <span className='font-mono text-xs'>{txn.id.slice(0, 16)}...</span>
                      <TransactionStatusBadge status={txn.status} />
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                      <TransactionTypeBadge type={txn.type} />
                      <span className='font-mono font-semibold'>
                        {parseFloat(txn.amount).toFixed(8)} {txn.currency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-muted-foreground text-sm'>No transactions in this batch</p>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
