/**
 * Dashboard Page
 * Professional admin dashboard with comprehensive analytics and charts
 */

import { Link } from '@tanstack/react-router'
import { Users, Wallet, Activity, DollarSign, Percent, ArrowRight, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useDashboardAnalytics, useSystemHealth } from '@/features/analytics/hooks'
import { StatsCard } from './components/stats-card'
import { TransactionTrendChart } from './components/transaction-trend-chart'
import { UserGrowthChart } from './components/user-growth-chart'
import { RecentActivity } from './components/recent-activity'
import { TopAssets } from './components/top-assets'
import { SystemHealthWidget } from './components/system-health-widget'

export function Dashboard() {
  const { data: analytics, error } = useDashboardAnalytics()
  const { data: health } = useSystemHealth()

  if (error) {
    return (
      <div className='container mx-auto py-8'>
        <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
          <h3 className='font-semibold text-red-900'>Error loading dashboard</h3>
          <p className='text-sm text-red-700'>
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto space-y-8 py-8'>
      {/* Header */}
      <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
          <p className='text-muted-foreground mt-1'>
            Real-time overview of your custodial wallet platform
          </p>
        </div>
        {health && (
          <Badge
            variant={health.status === 'healthy' ? 'default' : 'destructive'}
            className={
              health.status === 'healthy'
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : health.status === 'degraded'
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  : ''
            }
          >
            System {health.status}
          </Badge>
        )}
      </div>

      {/* Stats */}
      {analytics && (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <StatsCard
            title='Total Users'
            value={(analytics.total_users ?? 0).toLocaleString()}
            description='Active user accounts'
            trend={{ value: 12.5, isPositive: true }}
            icon={Users}
            iconClassName='text-blue-500'
          />
          <StatsCard
            title='Total Wallets'
            value={(analytics.total_wallets ?? 0).toLocaleString()}
            description='Across all organizations'
            trend={{ value: 8.2, isPositive: true }}
            icon={Wallet}
            iconClassName='text-purple-500'
          />
          <StatsCard
            title='Transactions Today'
            value={(analytics.transactions_today ?? 0).toLocaleString()}
            description='Processed today'
            trend={{ value: 15.3, isPositive: true }}
            icon={Activity}
            iconClassName='text-green-500'
          />
          <StatsCard
            title='Total Volume'
            value={analytics.total_volume ?? '$0'}
            description='24h transaction volume'
            trend={{ value: 3.1, isPositive: false }}
            icon={DollarSign}
            iconClassName='text-orange-500'
          />
        </div>
      )}

      {/* Charts */}
      <div className='grid gap-4 lg:grid-cols-7'>
        <div className='lg:col-span-4'>
          <TransactionTrendChart />
        </div>
        <div className='lg:col-span-3'>
          <SystemHealthWidget />
        </div>
      </div>

      {/* Secondary Charts */}
      <div className='grid gap-4 lg:grid-cols-2'>
        <UserGrowthChart />
        <TopAssets />
      </div>

      {/* Activity and Quick Actions */}
      <div className='grid gap-4 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <RecentActivity />
        </div>
        <div className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <BarChart3 className='h-5 w-5' />
                Quick Actions
              </CardTitle>
              <CardDescription>Navigate to key sections</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <Link to='/users'>
                <Button className='w-full justify-between' variant='outline'>
                  User Management
                  <ArrowRight className='h-4 w-4' />
                </Button>
              </Link>
              <Link to='/wallets'>
                <Button className='w-full justify-between' variant='outline'>
                  Wallet Management
                  <ArrowRight className='h-4 w-4' />
                </Button>
              </Link>
              <Link to='/transactions'>
                <Button className='w-full justify-between' variant='outline'>
                  Transactions
                  <ArrowRight className='h-4 w-4' />
                </Button>
              </Link>
              <Link to='/analytics'>
                <Button className='w-full justify-between' variant='outline'>
                  Detailed Analytics
                  <ArrowRight className='h-4 w-4' />
                </Button>
              </Link>
              <Link to='/reports'>
                <Button className='w-full justify-between' variant='outline'>
                  Generate Reports
                  <ArrowRight className='h-4 w-4' />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Secondary Stats */}
          {analytics && (
            <Card>
              <CardHeader>
                <CardTitle>Platform Metrics</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Success Rate</span>
                  <div className='flex items-center gap-2'>
                    <div className='text-sm font-semibold'>
                      {analytics.success_rate ?? 0}%
                    </div>
                    <Badge variant='outline' className='bg-green-50 text-green-700'>
                      <Percent className='h-3 w-3' />
                    </Badge>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Staking TVL</span>
                  <span className='text-sm font-semibold'>
                    {analytics.staking_tvl ?? '$0'}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Active Wallets</span>
                  <span className='text-sm font-semibold'>
                    {analytics.active_wallets ?? 0}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Pending Approvals</span>
                  <Badge variant='secondary'>
                    {analytics.pending_approvals ?? 0}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
