/**
 * Deposit List Component
 * Table displaying blockchain deposit transactions
 */

import { useState } from 'react'
import { DepositDetection } from '@/core/entities/blockchain.entity'
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
import { ConfirmationProgress } from './confirmation-progress'
import { Eye, ExternalLink } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface DepositListProps {
  deposits: DepositDetection[]
  isLoading?: boolean
  onViewDetails: (deposit: DepositDetection) => void
}

/**
 * Deposit list table with pagination
 */
export function DepositList({
  deposits,
  isLoading = false,
  onViewDetails,
}: DepositListProps) {
  if (isLoading) {
    return (
      <div className='space-y-3'>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className='h-16 w-full' />
        ))}
      </div>
    )
  }

  if (!deposits || deposits.length === 0) {
    return (
      <div className='flex items-center justify-center h-32 text-muted-foreground'>
        No deposits found
      </div>
    )
  }

  const getStatusBadge = (status: string, processed: boolean) => {
    if (processed) {
      return (
        <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
          Credited
        </Badge>
      )
    }

    switch (status) {
      case 'detected':
        return <Badge variant='outline'>Detected</Badge>
      case 'confirming':
        return <Badge variant='outline' className='border-yellow-500 bg-yellow-50 text-yellow-700'>Confirming</Badge>
      case 'confirmed':
        return <Badge variant='outline' className='border-blue-500 bg-blue-50 text-blue-700'>Confirmed</Badge>
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
            <TableHead>From Address</TableHead>
            <TableHead>To Address</TableHead>
            <TableHead>Confirmations</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Detected</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deposits.map((deposit) => (
            <TableRow key={deposit.id}>
              <TableCell>
                <ChainBadge chain={deposit.chain} />
              </TableCell>
              <TableCell className='font-mono font-semibold'>
                {deposit.amount}
              </TableCell>
              <TableCell className='font-mono text-xs'>
                {deposit.from_address.slice(0, 8)}...{deposit.from_address.slice(-6)}
              </TableCell>
              <TableCell className='font-mono text-xs'>
                {deposit.address.slice(0, 8)}...{deposit.address.slice(-6)}
              </TableCell>
              <TableCell>
                <div className='w-32'>
                  <ConfirmationProgress confirmations={deposit.confirmations} />
                </div>
              </TableCell>
              <TableCell>
                {getStatusBadge(deposit.status, deposit.processed)}
              </TableCell>
              <TableCell className='text-sm text-muted-foreground'>
                {formatDistanceToNow(new Date(deposit.detected_at), { addSuffix: true })}
              </TableCell>
              <TableCell className='text-right'>
                <div className='flex items-center justify-end gap-2'>
                  <Button
                    size='sm'
                    variant='ghost'
                    onClick={() => onViewDetails(deposit)}
                  >
                    <Eye className='h-4 w-4' />
                  </Button>
                  <Button
                    size='sm'
                    variant='ghost'
                    asChild
                  >
                    <a
                      href={`https://blockchain.com/tx/${deposit.tx_hash}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <ExternalLink className='h-4 w-4' />
                    </a>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
