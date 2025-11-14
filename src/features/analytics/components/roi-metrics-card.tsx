/**
 * ROI Metrics Card Component
 * Displays ROI key performance indicators
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { ROIMetrics } from '@/core/entities/analytics.entity'
import { TrendingUpIcon } from 'lucide-react'

interface ROIMetricsCardProps {
  data: ROIMetrics
}

export function ROIMetricsCard({ data }: ROIMetricsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUpIcon className="h-5 w-5" />
          ROI Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Return on Investment</span>
              <span className="text-2xl font-bold text-green-600">
                {data.roi_percentage.toFixed(2)}%
              </span>
            </div>
            <Progress value={Math.min(data.roi_percentage, 100)} className="h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Payback Period</p>
              <p className="text-lg font-bold">{data.payback_period_days} days</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Investment</p>
              <p className="text-lg font-bold">${data.total_investment.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Returns</p>
              <p className="text-lg font-bold text-green-600">
                ${data.total_returns.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
