/**
 * Approval Queue Component
 * List of transactions pending approval
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { CheckCircle, XCircle, Clock } from 'lucide-react'
import { useTransactionApprovals } from '../hooks'
import { format } from 'date-fns'
import type { Transaction } from '@/core/entities/transaction.entity'

interface ApprovalQueueProps {
  onApprove: (transaction: Transaction) => void
  onReject: (transaction: Transaction) => void
}

/**
 * Component showing pending transaction approvals
 */
export function ApprovalQueue({ onApprove, onReject }: ApprovalQueueProps) {
  const { data, isLoading } = useTransactionApprovals({ limit: 10 })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className='h-24 w-full' />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data || data.approvals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>Transactions requiring your approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='text-center py-8'>
            <CheckCircle className='mx-auto h-12 w-12 text-muted-foreground' />
            <p className='mt-4 text-muted-foreground'>No pending approvals</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Approvals</CardTitle>
        <CardDescription>
          {data.total} transaction(s) requiring approval
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {data.approvals.map((approval) => {
            // Note: This assumes the approval has transaction details embedded
            // Adjust based on actual API response structure
            const transaction = approval.transaction_id as any

            return (
              <div
                key={approval.id}
                className='flex items-center justify-between rounded-lg border p-4 hover:bg-accent'
              >
                <div className='flex-1 space-y-1'>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4 text-yellow-600' />
                    <p className='font-mono text-sm'>{approval.transaction_id.toString().slice(0, 16)}...</p>
                  </div>
                  <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                    <span>Approver: {approval.approver_id.slice(0, 8)}...</span>
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {format(new Date(approval.created_at), 'PPp')}
                  </p>
                </div>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='text-green-600 border-green-600 hover:bg-green-50'
                    onClick={() => onApprove(transaction)}
                  >
                    <CheckCircle className='mr-1 h-4 w-4' />
                    Approve
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='text-red-600 border-red-600 hover:bg-red-50'
                    onClick={() => onReject(transaction)}
                  >
                    <XCircle className='mr-1 h-4 w-4' />
                    Reject
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
