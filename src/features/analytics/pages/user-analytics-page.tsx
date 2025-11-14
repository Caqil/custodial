/**
 * User Analytics Page
 * User acquisition, retention, LTV, and segmentation
 */

import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { UserAcquisitionFunnel } from '../components/user-acquisition-funnel'
import { UserRetentionCohorts } from '../components/user-retention-cohorts'
import { UserLTVChart } from '../components/user-ltv-chart'
import { ActiveUsersChart } from '../components/active-users-chart'
import { UserSegmentationChart } from '../components/user-segmentation-chart'
import { DateRangePicker } from '../components/date-range-picker'
import { useUserBehaviorAnalytics } from '../hooks'
import { format } from 'date-fns'

export function UserAnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const { data, isLoading, error } = useUserBehaviorAnalytics({
    start_date: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
    end_date: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Analytics</h1>
          <p className="text-muted-foreground mt-1">
            User acquisition, retention, lifetime value, and segmentation
          </p>
        </div>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6">
        <UserAcquisitionFunnel
          data={data?.acquisition_funnel!}
          loading={isLoading}
          error={error}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActiveUsersChart
            data={data?.active_users!}
            loading={isLoading}
            error={error}
          />
          <UserSegmentationChart
            data={data?.user_segments || []}
            loading={isLoading}
            error={error}
          />
        </div>

        <UserLTVChart data={data?.ltv_data!} loading={isLoading} error={error} />

        <UserRetentionCohorts
          data={data?.retention_cohorts || []}
          loading={isLoading}
          error={error}
        />
      </div>
    </div>
  )
}
