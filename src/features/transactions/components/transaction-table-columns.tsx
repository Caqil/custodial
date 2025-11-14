/**
 * Transaction Table Columns Definition
 * Column definitions for transaction data table
 */

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Eye, CheckCircle, XCircle, Ban, RefreshCw } from 'lucide-react'
import { TransactionTypeBadge } from './transaction-type-badge'
import { TransactionStatusBadge } from './transaction-status-badge'
import type { Transaction } from '@/core/entities/transaction.entity'
import { format } from 'date-fns'

interface TransactionColumnsProps {
  onViewDetails: (transaction: Transaction) => void
  onApprove: (transaction: Transaction) => void
  onReject: (transaction: Transaction) => void
  onCancel: (transaction: Transaction) => void
  onRetry: (transaction: Transaction) => void
}

/**
 * Get transaction table columns with action handlers
 */
export function getTransactionColumns({
  onViewDetails,
  onApprove,
  onReject,
  onCancel,
  onRetry,
}: TransactionColumnsProps): ColumnDef<Transaction>[] {
  return [
    {
      accessorKey: 'id',
      header: 'Transaction ID',
      cell: ({ row }) => {
        const txn = row.original
        return (
          <div className='flex flex-col'>
            <span className='font-mono text-sm'>{txn.id.slice(0, 8)}...</span>
            <span className='text-muted-foreground text-xs'>
              {format(new Date(txn.created_at), 'MMM dd, HH:mm')}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => {
        return <TransactionTypeBadge type={row.original.type} />
      },
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const txn = row.original
        return (
          <div className='flex flex-col'>
            <span className='font-mono font-semibold'>
              {parseFloat(txn.amount).toFixed(8)} {txn.currency}
            </span>
            <span className='text-muted-foreground text-xs'>
              Fee: {parseFloat(txn.estimated_fee).toFixed(8)}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'to_address',
      header: 'To Address',
      cell: ({ row }) => {
        const address = row.original.to_address
        return (
          <span className='font-mono text-xs'>
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return <TransactionStatusBadge status={row.original.status} />
      },
    },
    {
      accessorKey: 'risk_score',
      header: 'Risk',
      cell: ({ row }) => {
        const risk = row.original.risk_score
        if (!risk) return <span className='text-muted-foreground'>-</span>

        let color = 'text-green-600'
        if (risk > 70) color = 'text-red-600'
        else if (risk > 40) color = 'text-yellow-600'

        return <span className={`font-semibold ${color}`}>{risk}</span>
      },
    },
    {
      accessorKey: 'current_approvals',
      header: 'Approvals',
      cell: ({ row }) => {
        const txn = row.original
        return (
          <span className='text-sm'>
            {txn.current_approvals}/{txn.requires_approvals}
          </span>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const txn = row.original
        const canApprove = txn.status === 'pending' || txn.status === 'approved'
        const canRetry = txn.status === 'failed'
        const canCancel = txn.status === 'pending' || txn.status === 'approved'

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onViewDetails(txn)}>
                <Eye className='mr-2 h-4 w-4' />
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {canApprove && (
                <DropdownMenuItem onClick={() => onApprove(txn)}>
                  <CheckCircle className='mr-2 h-4 w-4' />
                  Approve
                </DropdownMenuItem>
              )}
              {canApprove && (
                <DropdownMenuItem onClick={() => onReject(txn)}>
                  <XCircle className='mr-2 h-4 w-4' />
                  Reject
                </DropdownMenuItem>
              )}
              {canCancel && (
                <DropdownMenuItem onClick={() => onCancel(txn)}>
                  <Ban className='mr-2 h-4 w-4' />
                  Cancel
                </DropdownMenuItem>
              )}
              {canRetry && (
                <DropdownMenuItem onClick={() => onRetry(txn)}>
                  <RefreshCw className='mr-2 h-4 w-4' />
                  Retry
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
