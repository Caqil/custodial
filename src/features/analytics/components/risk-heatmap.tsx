/**
 * Risk Heatmap Component
 * Heatmap showing risk distribution by category and time
 */

import { ChartContainer } from './chart-container'
import type { RiskHeatmap } from '@/core/entities/analytics.entity'
import { cn } from '@/lib/utils'

interface RiskHeatmapProps {
  data: RiskHeatmap
  loading?: boolean
  error?: Error | null
}

export function RiskHeatmapComponent({ data, loading, error }: RiskHeatmapProps) {
  const getHeatColor = (value: number) => {
    if (value >= 80) return 'bg-red-600 text-white'
    if (value >= 60) return 'bg-orange-500 text-white'
    if (value >= 40) return 'bg-yellow-500 text-white'
    if (value >= 20) return 'bg-green-500 text-white'
    return 'bg-green-600 text-white'
  }

  return (
    <ChartContainer
      title="Risk Heatmap"
      description="Risk levels by category and time period"
      loading={loading}
      error={error}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-left text-sm font-medium">Category</th>
              {data?.time_periods?.map((period) => (
                <th key={period} className="border p-2 text-center text-sm font-medium">
                  {period}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.categories?.map((category, rowIndex) => (
              <tr key={category}>
                <td className="border p-2 text-sm font-medium">{category}</td>
                {data.time_periods.map((period, colIndex) => {
                  const value = data.data[rowIndex]?.[colIndex] || 0
                  return (
                    <td
                      key={`${category}-${period}`}
                      className={cn('border p-2 text-center text-sm font-bold', getHeatColor(value))}
                    >
                      {value}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartContainer>
  )
}
