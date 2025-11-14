/**
 * Transaction Reject Dialog Component
 * Dialog for rejecting a transaction with required reason
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
import { useTransactionReject } from '../hooks'
import type { Transaction } from '@/core/entities/transaction.entity'

interface TransactionRejectDialogProps {
  transaction: Transaction | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TransactionRejectDialog({
  transaction,
  open,
  onOpenChange,
}: TransactionRejectDialogProps) {
  const [reason, setReason] = useState('')
  const rejectMutation = useTransactionReject()

  const handleReject = async () => {
    if (!transaction || !reason.trim()) return

    await rejectMutation.mutateAsync({
      id: transaction.id,
      data: { reason },
    })

    setReason('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Transaction</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this transaction.
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
              <p className='text-sm'>
                <span className='text-muted-foreground'>Type:</span>{' '}
                <span className='capitalize'>{transaction.type}</span>
              </p>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='reason'>Rejection Reason *</Label>
              <Textarea
                id='reason'
                placeholder='Provide a detailed reason for rejection...'
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                required
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={handleReject}
            disabled={rejectMutation.isPending || !reason.trim()}
          >
            {rejectMutation.isPending ? 'Rejecting...' : 'Reject Transaction'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
