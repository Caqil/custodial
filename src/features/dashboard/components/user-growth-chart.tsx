/**
 * User Growth Chart Component
 * Shows user growth over time with line chart
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useUserGrowth } from '@/features/analytics/hooks'
import { format, subMonths } from 'date-fns'

export function UserGrowthChart() {
  const { data, isLoading } = useUserGrowth({
    start_date: format(subMonths(new Date(), 6), 'yyyy-MM-dd'),
    end_date: format(new Date(), 'yyyy-MM-dd'),
    interval: 'week',
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
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
          <CardTitle>User Growth</CardTitle>
          <CardDescription>Last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>No user growth data available</p>
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
          <CardTitle>User Growth</CardTitle>
          <CardDescription>Last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>No user growth data available</p>
        </CardContent>
      </Card>
    )
  }

  // Format data for chart
  const chartData = dataArray.map((item) => ({
    date: item.date,
    newUsers: item.new_users || 0,
    totalUsers: item.total_users || 0,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>Weekly user registration over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={chartData}>
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
            />
            <Line
              type='monotone'
              dataKey='newUsers'
              stroke='#10b981'
              strokeWidth={2}
              dot={{ fill: '#10b981', r: 4 }}
              name='New Users'
            />
            <Line
              type='monotone'
              dataKey='totalUsers'
              stroke='#3b82f6'
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              name='Total Users'
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
