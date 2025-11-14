/**
 * Wallet Type Badge Component
 * Displays colored badge for wallet types (Hot, Warm, Cold, Pool)
 */

import { Badge } from '@/components/ui/badge'
import { WalletType } from '@/core/entities/wallet.entity'
import { Flame, Thermometer, Snowflake, Layers } from 'lucide-react'

interface WalletTypeBadgeProps {
  type: WalletType | string
  isPoolParent?: boolean
}

/**
 * Badge component for wallet type with appropriate color and icon
 */
export function WalletTypeBadge({ type, isPoolParent = false }: WalletTypeBadgeProps) {
  if (isPoolParent) {
    return (
      <Badge variant='outline' className='border-purple-500 bg-purple-50 text-purple-700'>
        <Layers className='mr-1 h-3 w-3' />
        Pool
      </Badge>
    )
  }

  switch (type) {
    case WalletType.Hot:
    case 'hot':
      return (
        <Badge variant='outline' className='border-red-500 bg-red-50 text-red-700'>
          <Flame className='mr-1 h-3 w-3' />
          Hot
        </Badge>
      )
    case WalletType.Warm:
    case 'warm':
      return (
        <Badge variant='outline' className='border-orange-500 bg-orange-50 text-orange-700'>
          <Thermometer className='mr-1 h-3 w-3' />
          Warm
        </Badge>
      )
    case WalletType.Cold:
    case 'cold':
      return (
        <Badge variant='outline' className='border-blue-500 bg-blue-50 text-blue-700'>
          <Snowflake className='mr-1 h-3 w-3' />
          Cold
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
