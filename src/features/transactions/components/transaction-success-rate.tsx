/**
 * Transaction Success Rate Chart Component
 * Line chart showing transaction success rate over time
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useTransactionStatistics } from '../hooks'

/**
 * Chart component for transaction success rate
 */
export function TransactionSuccessRate() {
  const { data: statistics, isLoading } = useTransactionStatistics()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Success Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[300px] w-full' />
        </CardContent>
      </Card>
    )
  }

  if (!statistics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Success Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-sm'>No success rate data available</p>
        </CardContent>
      </Card>
    )
  }

  const total = statistics.total_count
  const successRate = total > 0 ? (statistics.success_count / total) * 100 : 0
  const failureRate = total > 0 ? (statistics.failed_count / total) * 100 : 0

  const chartData = [
    { name: 'Success', value: successRate },
    { name: 'Failed', value: failureRate },
    { name: 'Pending', value: 100 - successRate - failureRate },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Success Rate</CardTitle>
        <CardDescription>Transaction completion statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='text-center'>
              <p className='text-muted-foreground text-xs'>Success</p>
              <p className='text-2xl font-bold text-green-600'>{successRate.toFixed(1)}%</p>
            </div>
            <div className='text-center'>
              <p className='text-muted-foreground text-xs'>Failed</p>
              <p className='text-2xl font-bold text-red-600'>{failureRate.toFixed(1)}%</p>
            </div>
            <div className='text-center'>
              <p className='text-muted-foreground text-xs'>Total</p>
              <p className='text-2xl font-bold'>{statistics.total_count}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
