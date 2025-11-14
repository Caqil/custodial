/**
 * Risk Analytics Page
 * Risk scores, fraud, compliance, and anomaly detection
 */

import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { RiskScoreDistribution } from '../components/risk-score-distribution'
import { AnomalyDetectionChart } from '../components/anomaly-detection-chart'
import { FraudMetricsCard } from '../components/fraud-metrics-card'
import { ComplianceViolationsList } from '../components/compliance-violations-list'
import { RiskHeatmapComponent } from '../components/risk-heatmap'
import { DateRangePicker } from '../components/date-range-picker'
import { useRiskAnalytics } from '../hooks'
import { format } from 'date-fns'

export function RiskAnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const { data, isLoading, error } = useRiskAnalytics({
    start_date: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
    end_date: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Risk Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Risk assessment, fraud detection, compliance, and anomaly monitoring
          </p>
        </div>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* Fraud Metrics */}
      {data?.fraud_metrics && <FraudMetricsCard data={data.fraud_metrics} />}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskScoreDistribution
          data={data?.risk_score_distribution || []}
          loading={isLoading}
          error={error}
        />
        <AnomalyDetectionChart
          data={data?.anomalies || []}
          loading={isLoading}
          error={error}
        />
      </div>

      {/* Heatmap */}
      <RiskHeatmapComponent
        data={data?.risk_heatmap!}
        loading={isLoading}
        error={error}
      />

      {/* Compliance Violations */}
      {data?.compliance_violations && (
        <ComplianceViolationsList data={data.compliance_violations} />
      )}
    </div>
  )
}
