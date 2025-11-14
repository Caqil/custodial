/**
 * Transaction Type Distribution Chart Component
 * Donut chart showing distribution of transaction types
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { useTransactionStatistics } from '../hooks'

const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#8b5cf6', '#f59e0b', '#6366f1']

/**
 * Chart component for transaction type distribution
 */
export function TransactionTypeDistribution() {
  const { data: statistics, isLoading } = useTransactionStatistics()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[300px] w-full' />
        </CardContent>
      </Card>
    )
  }

  if (!statistics || !statistics.by_type || statistics.by_type.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-sm'>No distribution data available</p>
        </CardContent>
      </Card>
    )
  }

  const chartData = statistics.by_type.map((item) => ({
    name: item.type.charAt(0).toUpperCase() + item.type.slice(1),
    value: item.count,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Type Distribution</CardTitle>
        <CardDescription>Transaction breakdown by type</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey='value'
              label={(entry) => `${entry.name}: ${entry.value}`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
