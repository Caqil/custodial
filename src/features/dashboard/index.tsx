/**
 * Dashboard Page
 * Main landing page with analytics overview and quick actions
 */

import { Link } from '@tanstack/react-router'
import { Users, Wallet, Activity, TrendingUp, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { useDashboardAnalytics, useSystemHealth } from '@/features/analytics/hooks'
import { useAuthStore } from '@/stores/auth-store'
import { formatCurrency } from '@/lib/utils'

export function Dashboard() {
  const { data: analytics, isLoading } = useDashboardAnalytics()
  const { data: health } = useSystemHealth()
  const { auth } = useAuthStore()

  return (
    <>
      <Header>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='space-y-6'>
        {/* Welcome Section */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              Welcome back, Admin
            </h1>
            <p className='text-muted-foreground mt-1'>
              Here's what's happening with your custodial wallet platform
            </p>
          </div>
          {health && (
            <Badge
              variant={
                health.status === 'healthy'
                  ? 'default'
                  : health.status === 'degraded'
                    ? 'secondary'
                    : 'destructive'
              }
              className={
                health.status === 'healthy'
                  ? 'bg-green-500 hover:bg-green-600'
                  : health.status === 'degraded'
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : ''
              }
            >
              System {health.status}
            </Badge>
          )}
        </div>

        {/* Quick Stats */}
        {isLoading ? (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className='h-32' />
            ))}
          </div>
        ) : analytics ? (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
                <Users className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {analytics.total_users.toLocaleString()}
                </div>
                <p className='text-muted-foreground text-xs'>
                  Active user accounts
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Total Wallets</CardTitle>
                <Wallet className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {analytics.total_wallets.toLocaleString()}
                </div>
                <p className='text-muted-foreground text-xs'>
                  Across all organizations
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Transactions Today
                </CardTitle>
                <Activity className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {analytics.transactions_today.toLocaleString()}
                </div>
                <p className='text-muted-foreground text-xs'>
                  Processed today
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Staking TVL</CardTitle>
                <TrendingUp className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{analytics.staking_tvl}</div>
                <p className='text-muted-foreground text-xs'>
                  Total value locked
                </p>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {/* Assets Under Custody */}
        {analytics && Object.keys(analytics.assets_under_custody).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Assets Under Custody</CardTitle>
              <CardDescription>Total value by currency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {Object.entries(analytics.assets_under_custody).map(
                  ([currency, amount]) => (
                    <div
                      key={currency}
                      className='flex items-center justify-between rounded-lg border p-4'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                          <span className='font-bold'>{currency.slice(0, 2)}</span>
                        </div>
                        <div>
                          <p className='text-sm font-medium'>{currency}</p>
                          <p className='text-muted-foreground text-xs'>Cryptocurrency</p>
                        </div>
                      </div>
                      <p className='font-mono text-sm font-semibold'>
                        {formatCurrency(amount, currency)}
                      </p>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to='/users'>
                <Button className='w-full'>
                  Go to Users
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View detailed analytics and charts</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to='/analytics'>
                <Button className='w-full' variant='outline'>
                  View Analytics
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and export reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to='/reports'>
                <Button className='w-full' variant='outline'>
                  View Reports
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
