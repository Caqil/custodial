/**
 * Uptime Metrics Component
 * Gauge chart showing uptime percentage and related metrics
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { UptimeMetrics } from '@/core/entities/analytics.entity'
import { CheckCircleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UptimeMetricsProps {
  data: UptimeMetrics
}

export function UptimeMetrics({ data }: UptimeMetricsProps) {
  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99.9) return 'text-green-600'
    if (uptime >= 99) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressColor = (uptime: number) => {
    if (uptime >= 99.9) return 'bg-green-600'
    if (uptime >= 99) return 'bg-yellow-600'
    return 'bg-red-600'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircleIcon className="h-5 w-5" />
          Uptime Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">System Uptime</p>
            <p className={cn('text-4xl font-bold', getUptimeColor(data.uptime_percentage))}>
              {data.uptime_percentage.toFixed(3)}%
            </p>
            <Progress
              value={data.uptime_percentage}
              className="h-3"
              indicatorClassName={getProgressColor(data.uptime_percentage)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1 text-center">
              <p className="text-xs text-muted-foreground">Downtime</p>
              <p className="text-lg font-bold">{data.downtime_minutes} min</p>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-xs text-muted-foreground">Incidents</p>
              <p className="text-lg font-bold">{data.incidents}</p>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-xs text-muted-foreground">MTBF</p>
              <p className="text-lg font-bold">{data.mtbf_hours}h</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">Mean Time To Recovery</p>
            <p className="text-lg font-bold">{data.mttr_minutes} minutes</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
