/**
 * Withdrawal List Component
 * Table displaying blockchain withdrawal transactions
 */

import { WithdrawalBroadcast } from '@/core/entities/blockchain.entity'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { ChainBadge } from './chain-badge'
import { Eye, ExternalLink, RefreshCw } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface WithdrawalListProps {
  withdrawals: WithdrawalBroadcast[]
  isLoading?: boolean
  onViewDetails: (withdrawal: WithdrawalBroadcast) => void
  onRetry: (withdrawal: WithdrawalBroadcast) => void
}

/**
 * Withdrawal list table with pagination
 */
export function WithdrawalList({
  withdrawals,
  isLoading = false,
  onViewDetails,
  onRetry,
}: WithdrawalListProps) {
  if (isLoading) {
    return (
      <div className='space-y-3'>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className='h-16 w-full' />
        ))}
      </div>
    )
  }

  if (!withdrawals || withdrawals.length === 0) {
    return (
      <div className='flex items-center justify-center h-32 text-muted-foreground'>
        No withdrawals found
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant='outline'>Pending</Badge>
      case 'broadcasting':
        return <Badge variant='outline' className='border-blue-500 bg-blue-50 text-blue-700'>Broadcasting</Badge>
      case 'broadcasted':
        return <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>Broadcasted</Badge>
      case 'failed':
        return <Badge variant='destructive'>Failed</Badge>
      default:
        return <Badge variant='outline'>{status}</Badge>
    }
  }

  return (
    <div className='border rounded-lg'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Chain</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>To Address</TableHead>
            <TableHead>TX Hash</TableHead>
            <TableHead>Attempts</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawals.map((withdrawal) => (
            <TableRow key={withdrawal.id}>
              <TableCell>
                <ChainBadge chain={withdrawal.chain} />
              </TableCell>
              <TableCell className='font-mono font-semibold'>
                {withdrawal.amount}
              </TableCell>
              <TableCell className='font-mono text-xs'>
                {withdrawal.to_address.slice(0, 8)}...{withdrawal.to_address.slice(-6)}
              </TableCell>
              <TableCell className='font-mono text-xs'>
                {withdrawal.tx_hash ? (
                  <>
                    {withdrawal.tx_hash.slice(0, 8)}...{withdrawal.tx_hash.slice(-6)}
                  </>
                ) : (
                  <span className='text-muted-foreground'>-</span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant='outline'>
                  {withdrawal.broadcast_count}
                </Badge>
              </TableCell>
              <TableCell>
                {getStatusBadge(withdrawal.status)}
              </TableCell>
              <TableCell className='text-sm text-muted-foreground'>
                {formatDistanceToNow(new Date(withdrawal.created_at), { addSuffix: true })}
              </TableCell>
              <TableCell className='text-right'>
                <div className='flex items-center justify-end gap-2'>
                  <Button
                    size='sm'
                    variant='ghost'
                    onClick={() => onViewDetails(withdrawal)}
                  >
                    <Eye className='h-4 w-4' />
                  </Button>
                  {withdrawal.status === 'failed' && (
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={() => onRetry(withdrawal)}
                    >
                      <RefreshCw className='h-4 w-4' />
                    </Button>
                  )}
                  {withdrawal.tx_hash && (
                    <Button
                      size='sm'
                      variant='ghost'
                      asChild
                    >
                      <a
                        href={`https://blockchain.com/tx/${withdrawal.tx_hash}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ExternalLink className='h-4 w-4' />
                      </a>
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
