/**
 * Deposit Withdrawal Trend Chart Component
 * Dual-axis line chart showing deposit and withdrawal trends
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

/**
 * Mock data for deposit/withdrawal trends - replace with real API data
 */
const mockTrendData = [
  { date: 'Jan 8', deposits: 45, withdrawals: 32, depositVolume: 125000, withdrawalVolume: 98000 },
  { date: 'Jan 9', deposits: 52, withdrawals: 38, depositVolume: 145000, withdrawalVolume: 112000 },
  { date: 'Jan 10', deposits: 48, withdrawals: 42, depositVolume: 138000, withdrawalVolume: 125000 },
  { date: 'Jan 11', deposits: 61, withdrawals: 35, depositVolume: 178000, withdrawalVolume: 105000 },
  { date: 'Jan 12', deposits: 55, withdrawals: 45, depositVolume: 165000, withdrawalVolume: 135000 },
  { date: 'Jan 13', deposits: 58, withdrawals: 40, depositVolume: 172000, withdrawalVolume: 118000 },
  { date: 'Jan 14', deposits: 63, withdrawals: 48, depositVolume: 185000, withdrawalVolume: 142000 },
]

/**
 * Chart component for deposit/withdrawal trends
 */
export function DepositWithdrawalTrend() {
  const isLoading = false

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Deposit & Withdrawal Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[300px] w-full' />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deposit & Withdrawal Trends</CardTitle>
        <CardDescription>Transaction counts and volumes (Last 7 days)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={mockTrendData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis yAxisId='left' label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId='right' orientation='right' label={{ value: 'Volume ($)', angle: 90, position: 'insideRight' }} />
            <Tooltip />
            <Legend />

            <Line
              yAxisId='left'
              type='monotone'
              dataKey='deposits'
              stroke='#10b981'
              strokeWidth={2}
              name='Deposit Count'
              dot={{ r: 4 }}
            />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='withdrawals'
              stroke='#ef4444'
              strokeWidth={2}
              name='Withdrawal Count'
              dot={{ r: 4 }}
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='depositVolume'
              stroke='#10b981'
              strokeWidth={2}
              strokeDasharray='5 5'
              name='Deposit Volume'
              dot={false}
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='withdrawalVolume'
              stroke='#ef4444'
              strokeWidth={2}
              strokeDasharray='5 5'
              name='Withdrawal Volume'
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
