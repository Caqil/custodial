/**
 * Wallet Balance Chart Component
 * Line chart showing balance history over time
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useWalletBalanceHistory } from '../hooks'

interface WalletBalanceChartProps {
  walletId: string
  currency: string
}

/**
 * Chart component for wallet balance history
 */
export function WalletBalanceChart({ walletId, currency }: WalletBalanceChartProps) {
  const { data: balanceHistory, isLoading } = useWalletBalanceHistory(walletId, {
    interval: 'day',
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Balance History</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[300px] w-full' />
        </CardContent>
      </Card>
    )
  }

  if (!balanceHistory || balanceHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Balance History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-sm'>No balance history available</p>
        </CardContent>
      </Card>
    )
  }

  const chartData = balanceHistory.map((point) => ({
    date: new Date(point.timestamp).toLocaleDateString(),
    total: parseFloat(point.balance),
    locked: parseFloat(point.locked_balance),
    available: parseFloat(point.balance) - parseFloat(point.locked_balance),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance History</CardTitle>
        <CardDescription>Historical balance data for this wallet</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip
              formatter={(value: number) => `${value.toFixed(8)} ${currency}`}
            />
            <Legend />
            <Line
              type='monotone'
              dataKey='available'
              stroke='#10b981'
              name='Available'
              strokeWidth={2}
            />
            <Line
              type='monotone'
              dataKey='locked'
              stroke='#ef4444'
              name='Locked'
              strokeWidth={2}
            />
            <Line
              type='monotone'
              dataKey='total'
              stroke='#3b82f6'
              name='Total'
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
