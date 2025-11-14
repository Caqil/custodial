/**
 * Transaction Type Badge Component
 * Displays colored badge for transaction type
 */

import { Badge } from '@/components/ui/badge'
import { TransactionType } from '@/core/entities/transaction.entity'
import { ArrowDown, ArrowUp, ArrowLeftRight, Coins, TrendingUp, Vote } from 'lucide-react'

interface TransactionTypeBadgeProps {
  type: TransactionType | string
}

/**
 * Badge component for transaction type with appropriate color and icon
 */
export function TransactionTypeBadge({ type }: TransactionTypeBadgeProps) {
  switch (type) {
    case TransactionType.Deposit:
    case 'deposit':
      return (
        <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
          <ArrowDown className='mr-1 h-3 w-3' />
          Deposit
        </Badge>
      )
    case TransactionType.Withdrawal:
    case 'withdrawal':
      return (
        <Badge variant='outline' className='border-red-500 bg-red-50 text-red-700'>
          <ArrowUp className='mr-1 h-3 w-3' />
          Withdrawal
        </Badge>
      )
    case TransactionType.Transfer:
    case 'transfer':
      return (
        <Badge variant='outline' className='border-blue-500 bg-blue-50 text-blue-700'>
          <ArrowLeftRight className='mr-1 h-3 w-3' />
          Transfer
        </Badge>
      )
    case TransactionType.Stake:
    case 'stake':
      return (
        <Badge variant='outline' className='border-purple-500 bg-purple-50 text-purple-700'>
          <Coins className='mr-1 h-3 w-3' />
          Stake
        </Badge>
      )
    case TransactionType.Unstake:
    case 'unstake':
      return (
        <Badge variant='outline' className='border-orange-500 bg-orange-50 text-orange-700'>
          <TrendingUp className='mr-1 h-3 w-3' />
          Unstake
        </Badge>
      )
    case TransactionType.Governance:
    case 'governance':
      return (
        <Badge variant='outline' className='border-indigo-500 bg-indigo-50 text-indigo-700'>
          <Vote className='mr-1 h-3 w-3' />
          Governance
        </Badge>
      )
    default:
      return (
        <Badge variant='outline'>
          {type}
        </Badge>
      )
  }
}
