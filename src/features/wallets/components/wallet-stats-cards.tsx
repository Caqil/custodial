/**
 * Wallet Stats Cards Component
 * Summary cards showing wallet statistics
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Wallet, Flame, Thermometer, Snowflake } from 'lucide-react'
import { useWalletStatistics } from '../hooks'

/**
 * Stats cards component showing wallet overview
 */
export function WalletStatsCards() {
  const { data: statistics, isLoading } = useWalletStatistics()

  if (isLoading) {
    return (
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-24' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-8 w-16' />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!statistics) {
    return null
  }

  const hotWallets = statistics.by_type?.find((t) => t.type === 'hot')?.count || 0
  const warmWallets = statistics.by_type?.find((t) => t.type === 'warm')?.count || 0
  const coldWallets = statistics.by_type?.find((t) => t.type === 'cold')?.count || 0

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Wallets</CardTitle>
          <Wallet className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{statistics.total_wallets}</div>
          <p className='text-muted-foreground text-xs'>
            {statistics.active_wallets} active
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Hot Wallets</CardTitle>
          <Flame className='h-4 w-4 text-red-500' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{hotWallets}</div>
          <p className='text-muted-foreground text-xs'>Online storage</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Warm Wallets</CardTitle>
          <Thermometer className='h-4 w-4 text-orange-500' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{warmWallets}</div>
          <p className='text-muted-foreground text-xs'>Semi-online storage</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Cold Wallets</CardTitle>
          <Snowflake className='h-4 w-4 text-blue-500' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{coldWallets}</div>
          <p className='text-muted-foreground text-xs'>Offline storage</p>
        </CardContent>
      </Card>
    </div>
  )
}
