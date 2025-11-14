/**
 * Wallet Distribution Chart Component
 * Pie chart showing distribution by wallet type
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { useWalletStatistics } from '../hooks'

const COLORS = {
  hot: '#ef4444',
  warm: '#f97316',
  cold: '#3b82f6',
}

/**
 * Chart component for wallet type distribution
 */
export function WalletDistributionChart() {
  const { data: statistics, isLoading } = useWalletStatistics()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Wallet Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[300px] w-full' />
        </CardContent>
      </Card>
    )
  }

  if (!statistics || !statistics.by_type) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Wallet Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-sm'>No data available</p>
        </CardContent>
      </Card>
    )
  }

  const chartData = statistics.by_type.map((item) => ({
    name: item.type,
    value: item.count,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Distribution</CardTitle>
        <CardDescription>Distribution of wallets by type</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={80}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
