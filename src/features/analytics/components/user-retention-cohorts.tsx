/**
 * User Retention Cohorts Component
 * Heatmap showing cohort retention rates
 */

import { ChartContainer } from './chart-container'
import type { RetentionCohort } from '@/core/entities/analytics.entity'
import { cn } from '@/lib/utils'

interface UserRetentionCohortsProps {
  data: RetentionCohort[]
  loading?: boolean
  error?: Error | null
}

export function UserRetentionCohorts({ data, loading, error }: UserRetentionCohortsProps) {
  const getHeatColor = (value: number) => {
    if (value >= 80) return 'bg-green-600 text-white'
    if (value >= 60) return 'bg-green-500 text-white'
    if (value >= 40) return 'bg-yellow-500 text-white'
    if (value >= 20) return 'bg-orange-500 text-white'
    return 'bg-red-500 text-white'
  }

  const weeks = ['Week 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4']

  return (
    <ChartContainer
      title="User Retention Cohorts"
      description="Cohort retention rates over time"
      loading={loading}
      error={error}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-left text-sm font-medium">Cohort</th>
              {weeks.map((week) => (
                <th key={week} className="border p-2 text-center text-sm font-medium">
                  {week}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((cohort) => (
              <tr key={cohort.cohort}>
                <td className="border p-2 text-sm font-medium">{cohort.cohort}</td>
                <td className={cn('border p-2 text-center text-sm', getHeatColor(cohort.week_0))}>
                  {cohort.week_0}%
                </td>
                <td className={cn('border p-2 text-center text-sm', getHeatColor(cohort.week_1))}>
                  {cohort.week_1}%
                </td>
                <td className={cn('border p-2 text-center text-sm', getHeatColor(cohort.week_2))}>
                  {cohort.week_2}%
                </td>
                <td className={cn('border p-2 text-center text-sm', getHeatColor(cohort.week_3))}>
                  {cohort.week_3}%
                </td>
                <td className={cn('border p-2 text-center text-sm', getHeatColor(cohort.week_4))}>
                  {cohort.week_4}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartContainer>
  )
}
