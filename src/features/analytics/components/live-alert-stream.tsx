/**
 * Live Alert Stream Component
 * Security alerts stream
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { formatDistanceToNow } from 'date-fns'
import type { LiveAlert } from '@/core/entities/analytics.entity'
import { AlertTriangleIcon, AlertCircleIcon, InfoIcon } from 'lucide-react'

interface LiveAlertStreamProps {
  alerts: LiveAlert[]
}

export function LiveAlertStream({ alerts }: LiveAlertStreamProps) {
  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangleIcon className="h-4 w-4" />
      case 'medium':
        return <AlertCircleIcon className="h-4 w-4" />
      default:
        return <InfoIcon className="h-4 w-4" />
    }
  }

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'destructive'
      case 'high':
        return 'destructive'
      case 'medium':
        return 'default'
      default:
        return 'secondary'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Security Alerts</CardTitle>
        <CardDescription>Real-time security event notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No recent alerts
              </p>
            ) : (
              alerts.map((alert) => (
                <Alert key={alert.id} variant={getSeverityVariant(alert.severity) as any}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.severity)}
                      <div className="flex-1">
                        <AlertDescription>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge variant={getSeverityVariant(alert.severity) as any}>
                                {alert.severity}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {alert.type}
                              </span>
                            </div>
                            <p className="text-sm">{alert.message}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(alert.timestamp), {
                                addSuffix: true,
                              })}
                            </p>
                          </div>
                        </AlertDescription>
                      </div>
                    </div>
                  </div>
                </Alert>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
