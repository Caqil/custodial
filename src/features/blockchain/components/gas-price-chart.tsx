/**
 * Gas Price Chart Component
 * Line chart showing gas prices for EVM chains over time
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'

/**
 * Mock data for gas prices - replace with real API data
 */
const mockGasPriceData = [
  { time: '00:00', eth: 25, matic: 35, bsc: 5 },
  { time: '04:00', eth: 28, matic: 40, bsc: 6 },
  { time: '08:00', eth: 45, matic: 65, bsc: 8 },
  { time: '12:00', eth: 52, matic: 75, bsc: 10 },
  { time: '16:00', eth: 38, matic: 55, bsc: 7 },
  { time: '20:00', eth: 30, matic: 42, bsc: 6 },
  { time: '23:59', eth: 26, matic: 38, bsc: 5 },
]

/**
 * Chart component for gas prices
 */
export function GasPriceChart() {
  const isLoading = false

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gas Price Trends</CardTitle>
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
        <CardTitle>Gas Price Trends</CardTitle>
        <CardDescription>Current gas prices across EVM chains (Gwei - Last 24h)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={mockGasPriceData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='time' />
            <YAxis label={{ value: 'Gwei', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />

            {/* Reference lines for gas price zones */}
            <ReferenceLine y={30} stroke='#10b981' strokeDasharray='3 3' label='Low' />
            <ReferenceLine y={60} stroke='#eab308' strokeDasharray='3 3' label='High' />

            <Line
              type='monotone'
              dataKey='eth'
              stroke='#a855f7'
              strokeWidth={2}
              name='Ethereum'
              dot={false}
            />
            <Line
              type='monotone'
              dataKey='matic'
              stroke='#6366f1'
              strokeWidth={2}
              name='Polygon'
              dot={false}
            />
            <Line
              type='monotone'
              dataKey='bsc'
              stroke='#eab308'
              strokeWidth={2}
              name='BSC'
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
