/**
 * Analytics Dashboard Page
 * Comprehensive analytics with charts and metrics
 */

import { useState, useEffect } from 'react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Activity, Users, Wallet, TrendingUp, Database, Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  useDashboardAnalytics,
  useTransactionVolume,
  useAssetsUnderCustody,
  useStakingTVL,
  useUserGrowth,
  useSystemHealth,
} from './hooks'
import { formatCurrency } from '@/lib/utils'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

/**
 * Analytics Dashboard Page
 */
export function Analytics() {
  const { data: dashboardData, isLoading: isLoadingDashboard } = useDashboardAnalytics()
  const { data: volumeData, isLoading: isLoadingVolume } = useTransactionVolume({
    group_by: 'day',
  })
  const { data: aucData, isLoading: isLoadingAUC } = useAssetsUnderCustody()
  const { data: tvlData, isLoading: isLoadingTVL } = useStakingTVL()
  const { data: userGrowthData, isLoading: isLoadingGrowth } = useUserGrowth({ period: 'day' })
  const { data: healthData } = useSystemHealth()

  if (!dashboardData && !isLoadingDashboard) {
    return (
      <div className='container mx-auto py-8'>
        <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
          <h3 className='font-semibold text-red-900'>Error loading analytics</h3>
          <p className='text-sm text-red-700'>
            Unable to load analytics data. Please try again.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto space-y-8 py-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Analytics Dashboard</h1>
          <p className='text-muted-foreground'>
            Real-time metrics and insights
          </p>
        </div>
        {healthData && (
          <Badge
            variant={
              healthData.status === 'healthy'
                ? 'default'
                : healthData.status === 'degraded'
                  ? 'secondary'
                  : 'destructive'
            }
            className={
              healthData.status === 'healthy'
                ? 'bg-green-500 hover:bg-green-600'
                : healthData.status === 'degraded'
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : ''
            }
          >
            System {healthData.status}
          </Badge>
        )}
      </div>

      {/* Stats */}
      {isLoadingDashboard ? (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className='h-32' />
          ))}
        </div>
      ) : dashboardData ? (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
              <Users className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{dashboardData.total_users.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Wallets</CardTitle>
              <Wallet className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{dashboardData.total_wallets.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Transactions Today</CardTitle>
              <Activity className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{dashboardData.transactions_today.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Staking TVL</CardTitle>
              <TrendingUp className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{dashboardData.staking_tvl}</div>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {/* Charts */}
      <div className='grid gap-4 lg:grid-cols-2'>
        {/* Transaction Volume Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
            <CardDescription>Daily transaction trends</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingVolume ? (
              <Skeleton className='h-80 w-full' />
            ) : volumeData ? (
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={volumeData.data_points}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis
                    dataKey='date'
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='count'
                    stroke='#8884d8'
                    strokeWidth={2}
                    name='Transactions'
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : null}
          </CardContent>
        </Card>

        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New users over time</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingGrowth ? (
              <Skeleton className='h-80 w-full' />
            ) : userGrowthData ? (
              <ResponsiveContainer width='100%' height={300}>
                <AreaChart data={userGrowthData.data_points}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis
                    dataKey='date'
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Area
                    type='monotone'
                    dataKey='count'
                    stroke='#82ca9d'
                    fill='#82ca9d'
                    fillOpacity={0.6}
                    name='Users'
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : null}
          </CardContent>
        </Card>

        {/* Assets Under Custody Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Assets Under Custody</CardTitle>
            <CardDescription>Distribution by currency</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingAUC ? (
              <Skeleton className='h-80 w-full' />
            ) : aucData ? (
              <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                  <Pie
                    data={aucData.currencies}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={(entry) => `${entry.currency}: ${entry.wallet_count}`}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='wallet_count'
                  >
                    {aucData.currencies.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : null}
          </CardContent>
        </Card>

        {/* Staking TVL Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Staking TVL by Currency</CardTitle>
            <CardDescription>Total value locked</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingTVL ? (
              <Skeleton className='h-80 w-full' />
            ) : tvlData ? (
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={tvlData.currencies}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='currency' tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey='staker_count' fill='#8884d8' name='Stakers' />
                  <Bar dataKey='pool_count' fill='#82ca9d' name='Pools' />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      {healthData && (
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Real-time system status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4 sm:grid-cols-3'>
              <div className='flex items-center gap-3 rounded-lg border p-4'>
                <Database className={healthData.database_healthy ? 'text-green-500' : 'text-red-500'} />
                <div>
                  <p className='font-medium'>Database</p>
                  <p className='text-muted-foreground text-sm'>
                    {healthData.database_healthy ? 'Healthy' : 'Unhealthy'}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-3 rounded-lg border p-4'>
                <Shield className={healthData.audit_healthy ? 'text-green-500' : 'text-red-500'} />
                <div>
                  <p className='font-medium'>Audit System</p>
                  <p className='text-muted-foreground text-sm'>
                    {healthData.audit_healthy ? 'Healthy' : 'Unhealthy'}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-3 rounded-lg border p-4'>
                <Activity className='text-green-500' />
                <div>
                  <p className='font-medium'>Overall Status</p>
                  <p className='text-muted-foreground text-sm capitalize'>{healthData.status}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
