/**
 * Anomaly Detection Chart Component
 * Scatter plot showing detected anomalies
 */

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts'
import { ChartContainer } from './chart-container'
import type { AnomalyData } from '@/core/entities/analytics.entity'
import { format } from 'date-fns'

interface AnomalyDetectionChartProps {
  data: AnomalyData[]
  loading?: boolean
  error?: Error | null
}

export function AnomalyDetectionChart({ data, loading, error }: AnomalyDetectionChartProps) {
  const chartData = data.map((anomaly, index) => ({
    index,
    score: anomaly.score,
    timestamp: new Date(anomaly.timestamp).getTime(),
    type: anomaly.type,
    description: anomaly.description,
  }))

  return (
    <ChartContainer
      title="Anomaly Detection"
      description="Detected anomalies and their risk scores"
      loading={loading}
      error={error}
    >
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => format(new Date(value), 'MM/dd')}
          />
          <YAxis dataKey="score" name="Risk Score" />
          <ZAxis range={[50, 400]} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="text-sm font-medium">{data.type}</p>
                    <p className="text-xs text-muted-foreground">{data.description}</p>
                    <p className="text-xs mt-1">
                      Risk Score: <span className="font-bold">{data.score}</span>
                    </p>
                    <p className="text-xs">
                      {format(new Date(data.timestamp), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                )
              }
              return null
            }}
          />
          <Scatter data={chartData} fill="#ef4444" />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
