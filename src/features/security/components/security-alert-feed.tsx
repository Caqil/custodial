/**
 * Security Alert Feed Component
 * Real-time feed of security alerts with auto-refresh
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useSecurityAlerts } from '../hooks'
import { SecurityAlertCard } from './security-alert-card'
import { AlertResolveDialog } from './alert-resolve-dialog'
import type { SecurityAlert, AlertSeverity } from '@/core/entities/security.entity'
import { RefreshCw } from 'lucide-react'

interface SecurityAlertFeedProps {
  severity?: AlertSeverity
  showResolved?: boolean
  limit?: number
}

/**
 * Feed component for displaying real-time security alerts
 */
export function SecurityAlertFeed({ severity, showResolved = false, limit = 10 }: SecurityAlertFeedProps) {
  const [selectedAlert, setSelectedAlert] = useState<SecurityAlert | null>(null)

  const { data, isLoading, refetch, isFetching } = useSecurityAlerts({
    severity,
    resolved: showResolved ? undefined : false,
    limit,
  })

  const handleResolve = (alert: SecurityAlert) => {
    setSelectedAlert(alert)
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-48' />
        </CardHeader>
        <CardContent className='space-y-4'>
          <Skeleton className='h-24 w-full' />
          <Skeleton className='h-24 w-full' />
          <Skeleton className='h-24 w-full' />
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Security Alerts</CardTitle>
              <CardDescription>
                Real-time security alerts {!showResolved && '(unresolved only)'}
              </CardDescription>
            </div>
            <Button
              variant='outline'
              size='sm'
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className='space-y-3'>
          {data?.alerts && data.alerts.length > 0 ? (
            data.alerts.map((alert) => (
              <SecurityAlertCard
                key={alert.id}
                alert={alert}
                onResolve={handleResolve}
              />
            ))
          ) : (
            <p className='text-muted-foreground text-center py-8'>No alerts found</p>
          )}
          {data?.total && data.total > limit && (
            <p className='text-muted-foreground text-center text-sm'>
              Showing {Math.min(limit, data.alerts.length)} of {data.total} alerts
            </p>
          )}
        </CardContent>
      </Card>

      <AlertResolveDialog
        alert={selectedAlert}
        open={!!selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />
    </>
  )
}
