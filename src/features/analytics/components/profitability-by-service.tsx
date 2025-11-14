/**
 * Profitability by Service Component
 * Bar chart showing profitability across different services
 */

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer } from './chart-container'
import type { ServiceProfitability } from '@/core/entities/analytics.entity'

interface ProfitabilityByServiceProps {
  data: ServiceProfitability[]
  loading?: boolean
  error?: Error | null
}

export function ProfitabilityByService({ data, loading, error }: ProfitabilityByServiceProps) {
  return (
    <ChartContainer
      title="Profitability by Service"
      description="Revenue, costs, and profit by service type"
      loading={loading}
      error={error}
    >
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="service" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => `$${value.toLocaleString()}`}
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
          />
          <Legend />
          <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
          <Bar dataKey="costs" fill="#ef4444" name="Costs" />
          <Bar dataKey="profit" fill="#3b82f6" name="Profit" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
