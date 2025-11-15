/**
 * Transaction Fees Chart Component
 * Bar chart showing transaction fees by currency
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useTransactionFees } from '../hooks'

/**
 * Chart component for transaction fees
 */
export function TransactionFeesChart() {
  const { data: feesData, isLoading } = useTransactionFees()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction Fees</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[300px] w-full' />
        </CardContent>
      </Card>
    )
  }

  if (!feesData || !feesData.by_currency) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction Fees</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-sm'>No fee data available</p>
        </CardContent>
      </Card>
    )
  }

  // Convert object to array if needed
  const byCurrencyData = Array.isArray(feesData.by_currency)
    ? feesData.by_currency
    : Object.entries(feesData.by_currency).map(([currency, data]: [string, any]) => ({
        currency,
        total_fees: data.total_fees,
        average_fee: data.average_fee,
        count: data.count,
      }))

  if (byCurrencyData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction Fees</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-sm'>No fee data available</p>
        </CardContent>
      </Card>
    )
  }

  const chartData = byCurrencyData.map((item) => ({
    currency: item.currency,
    totalFees: parseFloat(item.total_fees),
    avgFee: parseFloat(item.average_fee),
    count: item.count,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Fees</CardTitle>
        <CardDescription>Fee summary by currency</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='currency' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='totalFees' fill='#3b82f6' name='Total Fees' />
            <Bar dataKey='avgFee' fill='#10b981' name='Avg Fee' />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
