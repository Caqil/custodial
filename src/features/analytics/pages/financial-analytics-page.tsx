/**
 * Financial Analytics Page
 * P&L, revenue, costs, and ROI analytics
 */

import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { ProfitLossChart } from '../components/profit-loss-chart'
import { FeeRevenueChart } from '../components/fee-revenue-chart'
import { CostBreakdownChart } from '../components/cost-breakdown-chart'
import { ROIMetricsCard } from '../components/roi-metrics-card'
import { ProfitabilityByService } from '../components/profitability-by-service'
import { DateRangePicker } from '../components/date-range-picker'
import { useFinancialAnalytics } from '../hooks'
import { format } from 'date-fns'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function FinancialAnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [period, setPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly')

  const { data, isLoading, error } = useFinancialAnalytics({
    start_date: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
    end_date: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
    period,
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Financial Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Profit & Loss, revenue, costs, and ROI metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={(v: any) => setPeriod(v)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <DateRangePicker value={dateRange} onChange={setDateRange} />
        </div>
      </div>

      {/* ROI Metrics */}
      {data?.roi_metrics && <ROIMetricsCard data={data.roi_metrics} />}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfitLossChart data={data?.profit_loss!} loading={isLoading} error={error} />
        <FeeRevenueChart data={data?.fee_revenue!} loading={isLoading} error={error} />
        <CostBreakdownChart data={data?.cost_breakdown!} loading={isLoading} error={error} />
        <div className="lg:col-span-2">
          <ProfitabilityByService
            data={data?.profitability_by_service || []}
            loading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  )
}
