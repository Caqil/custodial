/**
 * System Health Widget Component
 * Shows real-time system health metrics
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { useSystemHealth } from '@/features/analytics/hooks'
import { Server, Database, Activity, Zap } from 'lucide-react'

export function SystemHealthWidget() {
  const { data: health, isLoading } = useSystemHealth()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[200px] w-full' />
        </CardContent>
      </Card>
    )
  }

  if (!health) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>Real-time monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>No health data available</p>
        </CardContent>
      </Card>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'healthy':
        return 'bg-green-500 hover:bg-green-600'
      case 'degraded':
        return 'bg-yellow-500 hover:bg-yellow-600'
      case 'offline':
      case 'critical':
        return 'bg-red-500 hover:bg-red-600'
      default:
        return ''
    }
  }

  const getProgressColor = (value: number) => {
    if (value >= 90) return 'bg-red-500'
    if (value >= 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Real-time infrastructure monitoring</CardDescription>
          </div>
          <Badge
            variant={health.status === 'healthy' ? 'default' : 'destructive'}
            className={getStatusColor(health.status)}
          >
            {health.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* CPU Usage */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between text-sm'>
            <div className='flex items-center gap-2'>
              <Zap className='h-4 w-4 text-muted-foreground' />
              <span className='font-medium'>CPU Usage</span>
            </div>
            <span className='text-muted-foreground'>{health.cpu_usage ?? 0}%</span>
          </div>
          <Progress value={health.cpu_usage ?? 0} className={getProgressColor(health.cpu_usage ?? 0)} />
        </div>

        {/* Memory Usage */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between text-sm'>
            <div className='flex items-center gap-2'>
              <Server className='h-4 w-4 text-muted-foreground' />
              <span className='font-medium'>Memory Usage</span>
            </div>
            <span className='text-muted-foreground'>{health.memory_usage ?? 0}%</span>
          </div>
          <Progress
            value={health.memory_usage ?? 0}
            className={getProgressColor(health.memory_usage ?? 0)}
          />
        </div>

        {/* Database */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between text-sm'>
            <div className='flex items-center gap-2'>
              <Database className='h-4 w-4 text-muted-foreground' />
              <span className='font-medium'>Database</span>
            </div>
            <Badge variant='outline' className='text-xs'>
              {health.database_status || 'Unknown'}
            </Badge>
          </div>
        </div>

        {/* API Response Time */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between text-sm'>
            <div className='flex items-center gap-2'>
              <Activity className='h-4 w-4 text-muted-foreground' />
              <span className='font-medium'>API Response</span>
            </div>
            <span className='text-muted-foreground'>{health.api_response_time ?? 0}ms</span>
          </div>
        </div>

        {/* Active Connections */}
        {health.active_connections !== undefined && (
          <div className='flex items-center justify-between text-sm pt-2 border-t'>
            <span className='text-muted-foreground'>Active Connections</span>
            <span className='font-semibold'>{health.active_connections}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
