/**
 * Reward Status Badge Component
 * Displays colored badge for reward status (Pending, Distributed, Claimed)
 */

import { Badge } from '@/components/ui/badge'
import { Clock, Send, CheckCircle } from 'lucide-react'

interface RewardStatusBadgeProps {
  claimed: boolean
  autoCompounded?: boolean
}

/**
 * Badge component for reward status with appropriate color and icon
 */
export function RewardStatusBadge({ claimed, autoCompounded }: RewardStatusBadgeProps) {
  if (claimed) {
    return (
      <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
        <CheckCircle className='mr-1 h-3 w-3' />
        Claimed
      </Badge>
    )
  }

  if (autoCompounded) {
    return (
      <Badge variant='outline' className='border-blue-500 bg-blue-50 text-blue-700'>
        <Send className='mr-1 h-3 w-3' />
        Compounded
      </Badge>
    )
  }

  return (
    <Badge variant='outline' className='border-yellow-500 bg-yellow-50 text-yellow-700'>
      <Clock className='mr-1 h-3 w-3' />
      Pending
    </Badge>
  )
}
