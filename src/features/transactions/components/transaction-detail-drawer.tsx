/**
 * Transaction Detail Drawer Component
 * Displays full transaction details in a side drawer
 */

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { TransactionStatusBadge } from './transaction-status-badge'
import { TransactionTypeBadge } from './transaction-type-badge'
import type { Transaction } from '@/core/entities/transaction.entity'
import { format } from 'date-fns'
import { Copy, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface TransactionDetailDrawerProps {
  transaction: Transaction | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TransactionDetailDrawer({
  transaction,
  open,
  onOpenChange,
}: TransactionDetailDrawerProps) {
  if (!transaction) return null

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='w-full sm:max-w-2xl overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>Transaction Details</SheetTitle>
          <SheetDescription>
            View complete transaction information and status
          </SheetDescription>
        </SheetHeader>

        <div className='mt-6 space-y-6'>
          {/* Basic Info */}
          <div className='space-y-3'>
            <h3 className='font-semibold text-sm'>Basic Information</h3>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='text-muted-foreground text-xs'>Transaction ID</label>
                <div className='flex items-center gap-2'>
                  <span className='font-mono text-sm'>{transaction.id}</span>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-6 w-6 p-0'
                    onClick={() => copyToClipboard(transaction.id, 'Transaction ID')}
                  >
                    <Copy className='h-3 w-3' />
                  </Button>
                </div>
              </div>
              <div>
                <label className='text-muted-foreground text-xs'>Type</label>
                <div className='mt-1'>
                  <TransactionTypeBadge type={transaction.type} />
                </div>
              </div>
              <div>
                <label className='text-muted-foreground text-xs'>Status</label>
                <div className='mt-1'>
                  <TransactionStatusBadge status={transaction.status} />
                </div>
              </div>
              <div>
                <label className='text-muted-foreground text-xs'>Wallet ID</label>
                <span className='font-mono text-sm block'>{transaction.wallet_id.slice(0, 16)}...</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Amount Details */}
          <div className='space-y-3'>
            <h3 className='font-semibold text-sm'>Amount Details</h3>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='text-muted-foreground text-xs'>Amount</label>
                <span className='font-mono text-lg font-bold block'>
                  {parseFloat(transaction.amount).toFixed(8)} {transaction.currency}
                </span>
              </div>
              <div>
                <label className='text-muted-foreground text-xs'>Estimated Fee</label>
                <span className='font-mono text-sm block'>
                  {parseFloat(transaction.estimated_fee).toFixed(8)} {transaction.currency}
                </span>
              </div>
              {transaction.actual_fee && (
                <div>
                  <label className='text-muted-foreground text-xs'>Actual Fee</label>
                  <span className='font-mono text-sm block'>
                    {parseFloat(transaction.actual_fee).toFixed(8)} {transaction.currency}
                  </span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Addresses */}
          <div className='space-y-3'>
            <h3 className='font-semibold text-sm'>Addresses</h3>
            <div className='space-y-3'>
              {transaction.from_address && (
                <div>
                  <label className='text-muted-foreground text-xs'>From Address</label>
                  <div className='flex items-center gap-2'>
                    <span className='font-mono text-sm'>{transaction.from_address}</span>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-6 w-6 p-0'
                      onClick={() => copyToClipboard(transaction.from_address!, 'From Address')}
                    >
                      <Copy className='h-3 w-3' />
                    </Button>
                  </div>
                </div>
              )}
              <div>
                <label className='text-muted-foreground text-xs'>To Address</label>
                <div className='flex items-center gap-2'>
                  <span className='font-mono text-sm'>{transaction.to_address}</span>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-6 w-6 p-0'
                    onClick={() => copyToClipboard(transaction.to_address, 'To Address')}
                  >
                    <Copy className='h-3 w-3' />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {transaction.tx_hash && (
            <>
              <Separator />
              <div className='space-y-3'>
                <h3 className='font-semibold text-sm'>Blockchain</h3>
                <div>
                  <label className='text-muted-foreground text-xs'>Transaction Hash</label>
                  <div className='flex items-center gap-2'>
                    <span className='font-mono text-sm'>{transaction.tx_hash}</span>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-6 w-6 p-0'
                      onClick={() => copyToClipboard(transaction.tx_hash!, 'Transaction Hash')}
                    >
                      <Copy className='h-3 w-3' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-6 w-6 p-0'
                      asChild
                    >
                      <a href='#' target='_blank' rel='noopener noreferrer'>
                        <ExternalLink className='h-3 w-3' />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Approval Info */}
          <div className='space-y-3'>
            <h3 className='font-semibold text-sm'>Approval Information</h3>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='text-muted-foreground text-xs'>Approvals Required</label>
                <span className='text-sm block'>{transaction.requires_approvals}</span>
              </div>
              <div>
                <label className='text-muted-foreground text-xs'>Current Approvals</label>
                <span className='text-sm block'>{transaction.current_approvals}</span>
              </div>
              {transaction.risk_score !== undefined && (
                <div>
                  <label className='text-muted-foreground text-xs'>Risk Score</label>
                  <span className='text-sm block font-semibold'>{transaction.risk_score}/100</span>
                </div>
              )}
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
                  {format(new Date(transaction.created_at), 'PPpp')}
                </span>
              </div>
              <div>
                <label className='text-muted-foreground text-xs'>Updated At</label>
                <span className='text-sm block'>
                  {format(new Date(transaction.updated_at), 'PPpp')}
                </span>
              </div>
              {transaction.completed_at && (
                <div>
                  <label className='text-muted-foreground text-xs'>Completed At</label>
                  <span className='text-sm block'>
                    {format(new Date(transaction.completed_at), 'PPpp')}
                  </span>
                </div>
              )}
              {transaction.expires_at && (
                <div>
                  <label className='text-muted-foreground text-xs'>Expires At</label>
                  <span className='text-sm block'>
                    {format(new Date(transaction.expires_at), 'PPpp')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {transaction.error_message && (
            <>
              <Separator />
              <div className='space-y-3'>
                <h3 className='font-semibold text-sm'>Error Details</h3>
                <div className='bg-red-50 border border-red-200 rounded-md p-3'>
                  <p className='text-red-700 text-sm'>{transaction.error_message}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
