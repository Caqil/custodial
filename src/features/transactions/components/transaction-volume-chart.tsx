/**
 * Transaction Volume Chart Component
 * Area chart showing transaction volume over time
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useTransactionVolumeChart } from '../hooks'
import { format, subDays } from 'date-fns'

/**
 * Chart component for transaction volume
 */
export function TransactionVolumeChart() {
  const endDate = new Date()
  const startDate = subDays(endDate, 30)

  const { data: volumeData, isLoading } = useTransactionVolumeChart({
    start_date: format(startDate, 'yyyy-MM-dd'),
    end_date: format(endDate, 'yyyy-MM-dd'),
    interval: 'day',
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[300px] w-full' />
        </CardContent>
      </Card>
    )
  }

  if (!volumeData || volumeData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-sm'>No volume data available</p>
        </CardContent>
      </Card>
    )
  }

  const chartData = volumeData.map((point) => ({
    date: format(new Date(point.date), 'MMM dd'),
    deposits: point.deposit_count,
    withdrawals: point.withdrawal_count,
    transfers: point.transfer_count,
    total: point.total_count,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Volume</CardTitle>
        <CardDescription>Daily transaction counts by type (Last 30 days)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type='monotone'
              dataKey='deposits'
              stackId='1'
              stroke='#10b981'
              fill='#10b981'
              name='Deposits'
            />
            <Area
              type='monotone'
              dataKey='withdrawals'
              stackId='1'
              stroke='#ef4444'
              fill='#ef4444'
              name='Withdrawals'
            />
            <Area
              type='monotone'
              dataKey='transfers'
              stackId='1'
              stroke='#3b82f6'
              fill='#3b82f6'
              name='Transfers'
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
