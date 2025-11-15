/**
 * Chain Status Card Component
 * Displays status for a single blockchain network
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { NetworkStatus } from '@/core/entities/blockchain.entity'
import { ChainBadge } from './chain-badge'
import { Activity, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface ChainStatusCardProps {
  network: NetworkStatus
}

/**
 * Card showing health status for a blockchain network
 */
export function ChainStatusCard({ network }: ChainStatusCardProps) {
  const getStatusIcon = () => {
    switch (network.status) {
      case 'healthy':
        return <CheckCircle className='h-5 w-5 text-green-500' />
      case 'degraded':
        return <AlertTriangle className='h-5 w-5 text-yellow-500' />
      case 'offline':
        return <XCircle className='h-5 w-5 text-red-500' />
      default:
        return <Activity className='h-5 w-5 text-gray-500' />
    }
  }

  const getStatusColor = () => {
    switch (network.status) {
      case 'healthy':
        return 'border-green-500 bg-green-50 text-green-700'
      case 'degraded':
        return 'border-yellow-500 bg-yellow-50 text-yellow-700'
      case 'offline':
        return 'border-red-500 bg-red-50 text-red-700'
      default:
        return ''
    }
  }

  return (
    <Card>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-semibold flex items-center gap-2'>
            <ChainBadge chain={network.chain} />
          </CardTitle>
          {getStatusIcon()}
        </div>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-muted-foreground'>Status</span>
          <Badge variant='outline' className={getStatusColor()}>
            {network.status ? network.status.charAt(0).toUpperCase() + network.status.slice(1) : 'Unknown'}
          </Badge>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm text-muted-foreground'>Block Height</span>
          <span className='text-sm font-mono font-semibold'>
            {(network.current_block ?? 0).toLocaleString()}
          </span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm text-muted-foreground'>Synced</span>
          <Badge variant={network.is_synced ? 'outline' : 'destructive'}>
            {network.is_synced ? 'Yes' : 'No'}
          </Badge>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm text-muted-foreground'>Last Checked</span>
          <span className='text-xs text-muted-foreground'>
            {network.last_checked_at
              ? formatDistanceToNow(new Date(network.last_checked_at), { addSuffix: true })
              : 'Never'}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
