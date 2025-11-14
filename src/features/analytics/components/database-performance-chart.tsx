/**
 * Database Performance Chart Component
 * Bar chart showing database performance metrics
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { DatabasePerformance } from '@/core/entities/analytics.entity'
import { DatabaseIcon } from 'lucide-react'

interface DatabasePerformanceChartProps {
  data: DatabasePerformance
}

export function DatabasePerformanceChart({ data }: DatabasePerformanceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DatabaseIcon className="h-5 w-5" />
          Database Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Query Time</span>
                <span className="text-lg font-bold">{data.average_query_time_ms}ms</span>
              </div>
              <Progress
                value={Math.min((data.average_query_time_ms / 1000) * 100, 100)}
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Connection Pool</span>
                <span className="text-lg font-bold">{data.connection_pool_usage}%</span>
              </div>
              <Progress value={data.connection_pool_usage} className="h-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 text-center p-4 border rounded-lg">
              <p className="text-xs text-muted-foreground">Slow Queries</p>
              <p className="text-2xl font-bold text-orange-600">{data.slow_queries}</p>
            </div>
            <div className="space-y-1 text-center p-4 border rounded-lg">
              <p className="text-xs text-muted-foreground">Deadlocks</p>
              <p className="text-2xl font-bold text-red-600">{data.deadlocks}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
