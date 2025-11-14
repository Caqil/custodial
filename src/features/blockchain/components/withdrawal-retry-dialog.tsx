/**
 * Withdrawal Retry Dialog Component
 * Confirmation dialog for retrying failed withdrawals
 */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { WithdrawalBroadcast } from '@/core/entities/blockchain.entity'
import { ChainBadge } from './chain-badge'

interface WithdrawalRetryDialogProps {
  withdrawal: WithdrawalBroadcast | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isLoading?: boolean
}

/**
 * Dialog for confirming withdrawal retry
 */
export function WithdrawalRetryDialog({
  withdrawal,
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: WithdrawalRetryDialogProps) {
  if (!withdrawal) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Retry Withdrawal Broadcast</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to retry broadcasting this withdrawal?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className='my-4 space-y-3'>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>Chain:</span>
            <ChainBadge chain={withdrawal.chain} />
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>Amount:</span>
            <span className='font-mono font-semibold'>{withdrawal.amount}</span>
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>Previous Attempts:</span>
            <span className='font-semibold'>{withdrawal.broadcast_count}</span>
          </div>

          {withdrawal.error_message && (
            <div className='space-y-1'>
              <span className='text-sm text-muted-foreground'>Previous Error:</span>
              <p className='text-xs bg-red-50 border border-red-200 rounded p-2 text-red-700'>
                {withdrawal.error_message}
              </p>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Retrying...' : 'Retry Broadcast'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
