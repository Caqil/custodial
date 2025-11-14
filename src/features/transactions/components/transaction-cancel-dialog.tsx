/**
 * Transaction Cancel Dialog Component
 * Dialog for cancelling a transaction
 */

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useTransactionCancel } from '../hooks'
import type { Transaction } from '@/core/entities/transaction.entity'

interface TransactionCancelDialogProps {
  transaction: Transaction | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TransactionCancelDialog({
  transaction,
  open,
  onOpenChange,
}: TransactionCancelDialogProps) {
  const [reason, setReason] = useState('')
  const cancelMutation = useTransactionCancel()

  const handleCancel = async () => {
    if (!transaction) return

    await cancelMutation.mutateAsync({
      id: transaction.id,
      reason: reason || undefined,
    })

    setReason('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Transaction</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this transaction?
          </DialogDescription>
        </DialogHeader>

        {transaction && (
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <p className='text-sm'>
                <span className='text-muted-foreground'>Transaction ID:</span>{' '}
                <span className='font-mono'>{transaction.id.slice(0, 16)}...</span>
              </p>
              <p className='text-sm'>
                <span className='text-muted-foreground'>Amount:</span>{' '}
                <span className='font-semibold'>
                  {parseFloat(transaction.amount).toFixed(8)} {transaction.currency}
                </span>
              </p>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='reason'>Cancellation Reason (Optional)</Label>
              <Textarea
                id='reason'
                placeholder='Provide a reason for cancellation...'
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            No, Keep It
          </Button>
          <Button
            variant='destructive'
            onClick={handleCancel}
            disabled={cancelMutation.isPending}
          >
            {cancelMutation.isPending ? 'Cancelling...' : 'Yes, Cancel Transaction'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
