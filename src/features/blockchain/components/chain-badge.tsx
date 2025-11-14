/**
 * Chain Badge Component
 * Displays colored badge for blockchain networks
 */

import { Badge } from '@/components/ui/badge'
import { Chain } from '@/core/entities/blockchain.entity'
import { Bitcoin, Hexagon, Triangle, Coins, DollarSign } from 'lucide-react'

interface ChainBadgeProps {
  chain: Chain | string
}

/**
 * Badge component for blockchain with appropriate color and icon
 */
export function ChainBadge({ chain }: ChainBadgeProps) {
  switch (chain) {
    case Chain.Bitcoin:
    case 'BTC':
      return (
        <Badge variant='outline' className='border-orange-500 bg-orange-50 text-orange-700'>
          <Bitcoin className='mr-1 h-3 w-3' />
          Bitcoin
        </Badge>
      )
    case Chain.Ethereum:
    case 'ETH':
      return (
        <Badge variant='outline' className='border-purple-500 bg-purple-50 text-purple-700'>
          <Hexagon className='mr-1 h-3 w-3' />
          Ethereum
        </Badge>
      )
    case Chain.Polygon:
    case 'MATIC':
      return (
        <Badge variant='outline' className='border-indigo-500 bg-indigo-50 text-indigo-700'>
          <Triangle className='mr-1 h-3 w-3' />
          Polygon
        </Badge>
      )
    case Chain.BSC:
    case 'BNB':
      return (
        <Badge variant='outline' className='border-yellow-500 bg-yellow-50 text-yellow-700'>
          <DollarSign className='mr-1 h-3 w-3' />
          BSC
        </Badge>
      )
    case Chain.Litecoin:
    case 'LTC':
      return (
        <Badge variant='outline' className='border-blue-500 bg-blue-50 text-blue-700'>
          <Coins className='mr-1 h-3 w-3' />
          Litecoin
        </Badge>
      )
    default:
      return (
        <Badge variant='outline'>
          {chain}
        </Badge>
      )
  }
}
