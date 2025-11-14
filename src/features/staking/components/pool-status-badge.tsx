/**
 * Pool Status Badge Component
 * Displays colored badge for pool status (Active, Inactive, Full, Closed)
 */

import { Badge } from '@/components/ui/badge'
import { PoolStatus } from '@/core/entities/staking.entity'
import { CheckCircle, XCircle, Lock, Ban } from 'lucide-react'

interface PoolStatusBadgeProps {
  status: PoolStatus | string
}

/**
 * Badge component for pool status with appropriate color and icon
 */
export function PoolStatusBadge({ status }: PoolStatusBadgeProps) {
  switch (status) {
    case PoolStatus.Active:
    case 'active':
      return (
        <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
          <CheckCircle className='mr-1 h-3 w-3' />
          Active
        </Badge>
      )
    case PoolStatus.Inactive:
    case 'inactive':
      return (
        <Badge variant='outline' className='border-gray-500 bg-gray-50 text-gray-700'>
          <XCircle className='mr-1 h-3 w-3' />
          Inactive
        </Badge>
      )
    case PoolStatus.Full:
    case 'full':
      return (
        <Badge variant='outline' className='border-orange-500 bg-orange-50 text-orange-700'>
          <Lock className='mr-1 h-3 w-3' />
          Full
        </Badge>
      )
    case PoolStatus.Closed:
    case 'closed':
      return (
        <Badge variant='outline' className='border-red-500 bg-red-50 text-red-700'>
          <Ban className='mr-1 h-3 w-3' />
          Closed
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
