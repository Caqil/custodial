/**
 * System Health Indicators Component
 * Visual indicators for system metrics (CPU, memory, DB, etc.)
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { SystemMetrics } from '@/core/entities/analytics.entity'
import { cn } from '@/lib/utils'
import { ActivityIcon, DatabaseIcon, CpuIcon, NetworkIcon } from 'lucide-react'

interface SystemHealthIndicatorsProps {
  metrics: SystemMetrics
}

export function SystemHealthIndicators({ metrics }: SystemHealthIndicatorsProps) {
  const getHealthColor = (value: number, threshold1 = 70, threshold2 = 90) => {
    if (value >= threshold2) return 'text-red-600'
    if (value >= threshold1) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getHealthBg = (value: number, threshold1 = 70, threshold2 = 90) => {
    if (value >= threshold2) return 'bg-red-600'
    if (value >= threshold1) return 'bg-yellow-600'
    return 'bg-green-600'
  }

  const indicators = [
    {
      label: 'CPU Usage',
      value: metrics.cpu_usage,
      icon: CpuIcon,
      unit: '%',
    },
    {
      label: 'Memory Usage',
      value: metrics.memory_usage,
      icon: ActivityIcon,
      unit: '%',
    },
    {
      label: 'DB Connections',
      value: metrics.db_connections,
      icon: DatabaseIcon,
      unit: '',
      max: 100,
    },
    {
      label: 'Active Requests',
      value: metrics.active_requests,
      icon: NetworkIcon,
      unit: '',
      max: 1000,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
        <CardDescription>Real-time system metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {indicators.map((indicator) => {
            const Icon = indicator.icon
            const percentage = indicator.max
              ? (indicator.value / indicator.max) * 100
              : indicator.value

            return (
              <div key={indicator.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={cn('h-4 w-4', getHealthColor(percentage))} />
                    <span className="text-sm font-medium">{indicator.label}</span>
                  </div>
                  <span className={cn('text-sm font-bold', getHealthColor(percentage))}>
                    {indicator.value}
                    {indicator.unit}
                  </span>
                </div>
                <Progress
                  value={percentage}
                  className="h-2"
                  indicatorClassName={getHealthBg(percentage)}
                />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
