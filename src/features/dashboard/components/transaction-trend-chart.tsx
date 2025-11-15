/**
 * Transaction Trend Chart Component
 * Shows transaction volume over time with area chart
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useTransactionVolume } from '@/features/analytics/hooks'
import { format, subDays } from 'date-fns'

export function TransactionTrendChart() {
  const { data, isLoading } = useTransactionVolume({
    start_date: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    end_date: format(new Date(), 'yyyy-MM-dd'),
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

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction Volume</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>No transaction data available</p>
        </CardContent>
      </Card>
    )
  }

  // Convert to array if needed
  const dataArray = Array.isArray(data) ? data : Object.values(data)

  if (dataArray.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction Volume</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>No transaction data available</p>
        </CardContent>
      </Card>
    )
  }

  // Format data for chart
  const chartData = dataArray.map((item) => ({
    date: item.date,
    volume: parseFloat(item.total_volume || '0'),
    count: item.total_count || 0,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Volume</CardTitle>
        <CardDescription>Daily transaction volume over the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id='colorVolume' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray='3 3' className='stroke-muted' />
            <XAxis
              dataKey='date'
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => format(new Date(value), 'MMM d')}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy')}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Volume']}
            />
            <Area
              type='monotone'
              dataKey='volume'
              stroke='#3b82f6'
              fillOpacity={1}
              fill='url(#colorVolume)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
