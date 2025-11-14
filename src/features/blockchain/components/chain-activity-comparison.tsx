/**
 * Chain Activity Comparison Chart Component
 * Grouped bar chart comparing activity across different chains
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

/**
 * Mock data for chain activity comparison - replace with real API data
 */
const mockActivityData = [
  { chain: 'BTC', deposits: 245, withdrawals: 198, addresses: 1250 },
  { chain: 'ETH', deposits: 428, withdrawals: 356, addresses: 2340 },
  { chain: 'MATIC', deposits: 312, withdrawals: 289, addresses: 1890 },
  { chain: 'BSC', deposits: 356, withdrawals: 312, addresses: 2100 },
  { chain: 'LTC', deposits: 189, withdrawals: 165, addresses: 980 },
]

/**
 * Chart component for chain activity comparison
 */
export function ChainActivityComparison() {
  const isLoading = false

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Chain Activity Comparison</CardTitle>
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
        <CardTitle>Chain Activity Comparison</CardTitle>
        <CardDescription>Transaction activity across all supported chains (Last 30 days)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={mockActivityData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='chain' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='deposits' fill='#10b981' name='Deposits' />
            <Bar dataKey='withdrawals' fill='#ef4444' name='Withdrawals' />
            <Bar dataKey='addresses' fill='#3b82f6' name='Active Addresses' />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
