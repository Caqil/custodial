/**
 * Transaction Stats Cards Component
 * Summary cards showing key transaction metrics
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowUpRight, ArrowDownRight, Activity, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react'
import { useTransactionStatistics } from '../hooks'

/**
 * Cards component displaying transaction statistics
 */
export function TransactionStatsCards() {
  const { data: stats, isLoading } = useTransactionStatistics()

  if (isLoading) {
    return (
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-24' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-8 w-32' />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!stats) {
    return null
  }

  const successRate = (stats.total_count ?? 0) > 0
    ? (((stats.success_count ?? 0) / (stats.total_count ?? 1)) * 100).toFixed(1)
    : '0.0'

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Transactions</CardTitle>
          <Activity className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{(stats.total_count ?? 0).toLocaleString()}</div>
          <p className='text-xs text-muted-foreground'>
            All time transactions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Volume</CardTitle>
          <DollarSign className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>${stats.total_volume ?? '0.00'}</div>
          <p className='text-xs text-muted-foreground'>
            Across all currencies
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Success Rate</CardTitle>
          <CheckCircle className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-green-600'>{successRate}%</div>
          <p className='text-xs text-muted-foreground'>
            {(stats.success_count ?? 0).toLocaleString()} completed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Pending</CardTitle>
          <Clock className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-yellow-600'>
            {(stats.pending_count ?? 0).toLocaleString()}
          </div>
          <p className='text-xs text-muted-foreground'>
            Awaiting processing
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Failed</CardTitle>
          <XCircle className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-red-600'>
            {(stats.failed_count ?? 0).toLocaleString()}
          </div>
          <p className='text-xs text-muted-foreground'>
            Requires attention
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Avg Amount</CardTitle>
          <ArrowUpRight className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>${stats.average_amount ?? '0.00'}</div>
          <p className='text-xs text-muted-foreground'>
            Per transaction
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
