/**
 * Batch List Component
 * List of transaction batches with status
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Eye, Clock, CheckCircle, XCircle } from 'lucide-react'
import { useTransactionBatches } from '../hooks'
import { format } from 'date-fns'
import type { TransactionBatch } from '@/core/entities/transaction.entity'

interface BatchListProps {
  onViewBatch: (batch: TransactionBatch) => void
}

/**
 * List component for transaction batches
 */
export function BatchList({ onViewBatch }: BatchListProps) {
  const { data, isLoading } = useTransactionBatches({ limit: 10 })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Batches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className='h-20 w-full' />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data || data.batches.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Batches</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-sm'>No batches found</p>
        </CardContent>
      </Card>
    )
  }

  const getBatchStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant='outline' className='border-yellow-500 bg-yellow-50 text-yellow-700'>
          <Clock className='mr-1 h-3 w-3' />
          Pending
        </Badge>
      case 'processing':
        return <Badge variant='outline' className='border-blue-500 bg-blue-50 text-blue-700'>
          Processing
        </Badge>
      case 'completed':
        return <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
          <CheckCircle className='mr-1 h-3 w-3' />
          Completed
        </Badge>
      case 'failed':
        return <Badge variant='outline' className='border-red-500 bg-red-50 text-red-700'>
          <XCircle className='mr-1 h-3 w-3' />
          Failed
        </Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Batches</CardTitle>
        <CardDescription>Latest transaction batches</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {data.batches.map((batch) => (
            <div
              key={batch.id}
              className='flex items-center justify-between rounded-lg border p-4 hover:bg-accent'
            >
              <div className='flex-1 space-y-1'>
                <div className='flex items-center gap-2'>
                  <p className='font-medium'>{batch.name || 'Unnamed Batch'}</p>
                  {getBatchStatusBadge(batch.status)}
                </div>
                <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                  <span>{batch.total_count} transactions</span>
                  <span>Completed: {batch.completed_count}</span>
                  {batch.failed_count > 0 && (
                    <span className='text-red-600'>Failed: {batch.failed_count}</span>
                  )}
                </div>
                <p className='text-xs text-muted-foreground'>
                  {format(new Date(batch.created_at), 'PPp')}
                </p>
              </div>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => onViewBatch(batch)}
              >
                <Eye className='h-4 w-4' />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
