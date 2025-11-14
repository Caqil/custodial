/**
 * Position Status Badge Component
 * Displays colored badge for position status (Active, Unstaking, Unstaked, Locked)
 */

import { Badge } from '@/components/ui/badge'
import { PositionStatus } from '@/core/entities/staking.entity'
import { CheckCircle, ArrowDownCircle, XCircle, Lock } from 'lucide-react'

interface PositionStatusBadgeProps {
  status: PositionStatus | string
}

/**
 * Badge component for position status with appropriate color and icon
 */
export function PositionStatusBadge({ status }: PositionStatusBadgeProps) {
  switch (status) {
    case PositionStatus.Active:
    case 'active':
      return (
        <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
          <CheckCircle className='mr-1 h-3 w-3' />
          Active
        </Badge>
      )
    case PositionStatus.Unstaking:
    case 'unstaking':
      return (
        <Badge variant='outline' className='border-yellow-500 bg-yellow-50 text-yellow-700'>
          <ArrowDownCircle className='mr-1 h-3 w-3' />
          Unstaking
        </Badge>
      )
    case PositionStatus.Unstaked:
    case 'unstaked':
      return (
        <Badge variant='outline' className='border-gray-500 bg-gray-50 text-gray-700'>
          <XCircle className='mr-1 h-3 w-3' />
          Unstaked
        </Badge>
      )
    case PositionStatus.Locked:
    case 'locked':
      return (
        <Badge variant='outline' className='border-blue-500 bg-blue-50 text-blue-700'>
          <Lock className='mr-1 h-3 w-3' />
          Locked
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
