/**
 * Wallet Status Badge Component
 * Displays colored badge for wallet status (Active, Frozen, Inactive, Migrating)
 */

import { Badge } from '@/components/ui/badge'
import { WalletStatus } from '@/core/entities/wallet.entity'
import { CheckCircle, Snowflake, XCircle, RefreshCw } from 'lucide-react'

interface WalletStatusBadgeProps {
  status: WalletStatus | string
}

/**
 * Badge component for wallet status with appropriate color and icon
 */
export function WalletStatusBadge({ status }: WalletStatusBadgeProps) {
  switch (status) {
    case WalletStatus.Active:
    case 'active':
      return (
        <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
          <CheckCircle className='mr-1 h-3 w-3' />
          Active
        </Badge>
      )
    case WalletStatus.Frozen:
    case 'frozen':
      return (
        <Badge variant='outline' className='border-gray-500 bg-gray-50 text-gray-700'>
          <Snowflake className='mr-1 h-3 w-3' />
          Frozen
        </Badge>
      )
    case WalletStatus.Inactive:
    case 'inactive':
      return (
        <Badge variant='outline' className='border-red-500 bg-red-50 text-red-700'>
          <XCircle className='mr-1 h-3 w-3' />
          Inactive
        </Badge>
      )
    case WalletStatus.Migrating:
    case 'migrating':
      return (
        <Badge variant='outline' className='border-yellow-500 bg-yellow-50 text-yellow-700'>
          <RefreshCw className='mr-1 h-3 w-3' />
          Migrating
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
