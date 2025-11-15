/**
 * Security Dashboard Page
 * Overview of security alerts, policies, and system health
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SecurityAlertFeed } from '../components/security-alert-feed'
import { SecurityAlertsChart } from '../components/security-alerts-chart'
import { useSecurityAlerts, useSecurityPolicies, useSessions } from '../hooks'
import { Shield, AlertTriangle, Lock, Users } from 'lucide-react'

/**
 * Security dashboard page component
 */
export function SecurityDashboardPage() {
  const { data: alertsData, isLoading, error } = useSecurityAlerts({ limit: 100 })
  const { data: policies } = useSecurityPolicies()
  const { data: sessionsData } = useSessions()

  const unresolvedAlerts = alertsData?.alerts.filter((a) => !a.resolved).length || 0
  const criticalAlerts = alertsData?.alerts.filter((a) => a.severity === 'critical' && !a.resolved).length || 0
  const activePolicies = policies?.filter((p) => p.enforced).length || 0
  const activeSessions = sessionsData?.sessions.length || 0

  if (error) {
    return (
      <div className='container mx-auto py-8'>
        <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
          <h3 className='font-semibold text-red-900'>Error loading security dashboard</h3>
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
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Security & MPC Management</h1>
          <p className='text-muted-foreground'>
            Monitor security alerts, manage policies, and oversee MPC key operations
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Unresolved Alerts</CardTitle>
            <AlertTriangle className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{unresolvedAlerts}</div>
            {criticalAlerts > 0 && (
              <p className='text-red-600 text-xs'>
                {criticalAlerts} critical
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Policies</CardTitle>
            <Shield className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{activePolicies}</div>
            <p className='text-muted-foreground text-xs'>
              of {policies?.length || 0} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Sessions</CardTitle>
            <Users className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{activeSessions}</div>
            <p className='text-muted-foreground text-xs'>
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Security Score</CardTitle>
            <Lock className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>98%</div>
            <p className='text-muted-foreground text-xs'>
              System health
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className='grid gap-4'>
        <SecurityAlertsChart />
      </div>

      {/* Alert Feed */}
      <SecurityAlertFeed showResolved={false} limit={10} />
    </div>
  )
}
