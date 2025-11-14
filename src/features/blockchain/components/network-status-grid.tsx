/**
 * Network Status Grid Component
 * Displays grid of all blockchain network statuses
 */

import { NetworkStatus } from '@/core/entities/blockchain.entity'
import { ChainStatusCard } from './chain-status-card'
import { Loader2 } from 'lucide-react'

interface NetworkStatusGridProps {
  networks: NetworkStatus[]
  isLoading?: boolean
}

/**
 * Grid layout showing all network statuses
 */
export function NetworkStatusGrid({ networks, isLoading }: NetworkStatusGridProps) {
  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
      </div>
    )
  }

  if (!networks || networks.length === 0) {
    return (
      <div className='flex items-center justify-center h-64 text-muted-foreground'>
        No network data available
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
      {networks.map((network) => (
        <ChainStatusCard key={network.chain} network={network} />
      ))}
    </div>
  )
}
