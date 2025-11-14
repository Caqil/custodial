/**
 * Transaction Status Badge Component
 * Displays colored badge for transaction status
 */

import { Badge } from '@/components/ui/badge'
import { TransactionStatus } from '@/core/entities/transaction.entity'
import {
  Clock,
  CheckCircle,
  Loader,
  CheckCheck,
  XCircle,
  Ban,
  MinusCircle
} from 'lucide-react'

interface TransactionStatusBadgeProps {
  status: TransactionStatus | string
}

/**
 * Badge component for transaction status with appropriate color and icon
 */
export function TransactionStatusBadge({ status }: TransactionStatusBadgeProps) {
  switch (status) {
    case TransactionStatus.Pending:
    case 'pending':
      return (
        <Badge variant='outline' className='border-yellow-500 bg-yellow-50 text-yellow-700'>
          <Clock className='mr-1 h-3 w-3' />
          Pending
        </Badge>
      )
    case TransactionStatus.Approved:
    case 'approved':
      return (
        <Badge variant='outline' className='border-blue-500 bg-blue-50 text-blue-700'>
          <CheckCircle className='mr-1 h-3 w-3' />
          Approved
        </Badge>
      )
    case TransactionStatus.Processing:
    case 'processing':
      return (
        <Badge variant='outline' className='border-indigo-500 bg-indigo-50 text-indigo-700'>
          <Loader className='mr-1 h-3 w-3' />
          Processing
        </Badge>
      )
    case TransactionStatus.Completed:
    case 'completed':
      return (
        <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
          <CheckCheck className='mr-1 h-3 w-3' />
          Completed
        </Badge>
      )
    case TransactionStatus.Failed:
    case 'failed':
      return (
        <Badge variant='outline' className='border-red-500 bg-red-50 text-red-700'>
          <XCircle className='mr-1 h-3 w-3' />
          Failed
        </Badge>
      )
    case TransactionStatus.Rejected:
    case 'rejected':
      return (
        <Badge variant='outline' className='border-orange-500 bg-orange-50 text-orange-700'>
          <Ban className='mr-1 h-3 w-3' />
          Rejected
        </Badge>
      )
    case TransactionStatus.Cancelled:
    case 'cancelled':
      return (
        <Badge variant='outline' className='border-gray-500 bg-gray-50 text-gray-700'>
          <MinusCircle className='mr-1 h-3 w-3' />
          Cancelled
        </Badge>
      )
    default:
      return (
        <Badge variant='outline'>
          {status}
        </Badge>
      )
  }
}
