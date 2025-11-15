/**
 * Recent Activity Component
 * Shows recent system activities and events
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAuditLogs } from '@/features/audit-logs/hooks'
import { formatDistanceToNow } from 'date-fns'
import { Activity, User, Wallet, DollarSign, Shield, AlertCircle } from 'lucide-react'

export function RecentActivity() {
  const { data, isLoading } = useAuditLogs({
    limit: 10,
  })

  const getActivityIcon = (resourceType: string) => {
    switch (resourceType.toLowerCase()) {
      case 'user':
        return <User className='h-4 w-4' />
      case 'wallet':
        return <Wallet className='h-4 w-4' />
      case 'transaction':
        return <DollarSign className='h-4 w-4' />
      case 'security':
        return <Shield className='h-4 w-4' />
      default:
        return <Activity className='h-4 w-4' />
    }
  }

  const getResultVariant = (result: string) => {
    switch (result.toLowerCase()) {
      case 'success':
        return 'default'
      case 'failure':
        return 'destructive'
      case 'denied':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='h-16 w-full' />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data?.logs) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center justify-center py-8 text-muted-foreground'>
            <AlertCircle className='h-8 w-8 mb-2' />
            <p className='text-sm'>No recent activity</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Convert to array if needed
  const logsArray = Array.isArray(data.logs) ? data.logs : Object.values(data.logs)

  if (logsArray.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center justify-center py-8 text-muted-foreground'>
            <AlertCircle className='h-8 w-8 mb-2' />
            <p className='text-sm'>No recent activity</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest system events and actions</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[400px] pr-4'>
          <div className='space-y-3'>
            {logsArray.map((log) => (
              <div
                key={log.id}
                className='flex items-start gap-3 rounded-lg border p-3 hover:bg-accent transition-colors'
              >
                <div className='mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10'>
                  {getActivityIcon(log.resource_type)}
                </div>
                <div className='flex-1 space-y-1 min-w-0'>
                  <div className='flex items-center gap-2 flex-wrap'>
                    <p className='text-sm font-medium truncate'>{log.action}</p>
                    <Badge variant={getResultVariant(log.result)} className='text-xs'>
                      {log.result}
                    </Badge>
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {log.resource_type}
                    {log.resource_id && ` • ID: ${log.resource_id.slice(0, 8)}`}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
