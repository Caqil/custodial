/**
 * Fraud Metrics Card Component
 * Displays fraud detection statistics
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import type { FraudMetrics } from '@/core/entities/analytics.entity'
import { ShieldAlertIcon } from 'lucide-react'

interface FraudMetricsCardProps {
  data: FraudMetrics
}

export function FraudMetricsCard({ data }: FraudMetricsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldAlertIcon className="h-5 w-5 text-red-600" />
          Fraud Detection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Flags</p>
              <p className="text-2xl font-bold">{data.total_flags}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Confirmed Fraud</p>
              <p className="text-2xl font-bold text-red-600">{data.confirmed_fraud}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Detection Rate</span>
              <Badge variant="default">{data.detection_rate.toFixed(1)}%</Badge>
            </div>
            <Progress value={data.detection_rate} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">False Positives</p>
              <p className="text-lg font-medium">{data.false_positives}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Amount at Risk</p>
              <p className="text-lg font-medium text-red-600">{data.amount_at_risk}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
