/**
 * Security Alert Card Component
 * Displays a single security alert with severity and type badges
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertSeverityBadge } from './alert-severity-badge'
import { AlertTypeBadge } from './alert-type-badge'
import type { SecurityAlert } from '@/core/entities/security.entity'
import { formatDistanceToNow } from 'date-fns'
import { CheckCircle } from 'lucide-react'

interface SecurityAlertCardProps {
  alert: SecurityAlert
  onResolve?: (alert: SecurityAlert) => void
}

/**
 * Card component for displaying a security alert
 */
export function SecurityAlertCard({ alert, onResolve }: SecurityAlertCardProps) {
  return (
    <Card className={alert.resolved ? 'opacity-60' : ''}>
      <CardHeader>
        <div className='flex items-start justify-between'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <AlertSeverityBadge severity={alert.severity} />
              <AlertTypeBadge alertType={alert.alert_type} />
              {alert.resolved && (
                <span className='text-muted-foreground text-sm flex items-center gap-1'>
                  <CheckCircle className='h-3 w-3' />
                  Resolved
                </span>
              )}
            </div>
            <CardTitle className='text-base'>{alert.description}</CardTitle>
          </div>
          {!alert.resolved && onResolve && (
            <Button size='sm' onClick={() => onResolve(alert)}>
              Resolve
            </Button>
          )}
        </div>
        <CardDescription>
          {formatDistanceToNow(new Date(alert.created_at), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      {alert.metadata && Object.keys(alert.metadata).length > 0 && (
        <CardContent>
          <div className='text-muted-foreground space-y-1 text-sm'>
            {alert.resource_type && (
              <p>
                <span className='font-medium'>Resource:</span> {alert.resource_type}
                {alert.resource_id && ` (${alert.resource_id})`}
              </p>
            )}
            {alert.metadata.ip_address && (
              <p>
                <span className='font-medium'>IP:</span> {alert.metadata.ip_address as string}
              </p>
            )}
            {alert.metadata.location && (
              <p>
                <span className='font-medium'>Location:</span> {alert.metadata.location as string}
              </p>
            )}
          </div>
          {alert.resolved && alert.resolved_at && (
            <div className='text-muted-foreground mt-2 text-sm'>
              <p>
                <span className='font-medium'>Resolved:</span>{' '}
                {formatDistanceToNow(new Date(alert.resolved_at), { addSuffix: true })}
                {alert.resolved_by && ` by ${alert.resolved_by}`}
              </p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
