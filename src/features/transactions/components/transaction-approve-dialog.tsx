/**
 * Transaction Approve Dialog Component
 * Dialog for approving a transaction with optional reason
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
import { useTransactionApprove } from '../hooks'
import type { Transaction } from '@/core/entities/transaction.entity'

interface TransactionApproveDialogProps {
  transaction: Transaction | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TransactionApproveDialog({
  transaction,
  open,
  onOpenChange,
}: TransactionApproveDialogProps) {
  const [comments, setComments] = useState('')
  const approveMutation = useTransactionApprove()

  const handleApprove = async () => {
    if (!transaction) return

    await approveMutation.mutateAsync({
      id: transaction.id,
      data: { reason: comments || undefined },
    })

    setComments('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Transaction</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve this transaction? This action cannot be undone.
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
              <Label htmlFor='comments'>Comments (Optional)</Label>
              <Textarea
                id='comments'
                placeholder='Add approval comments...'
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            disabled={approveMutation.isPending}
          >
            {approveMutation.isPending ? 'Approving...' : 'Approve Transaction'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
