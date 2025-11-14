/**
 * Vote Results Chart Component
 * Pie chart showing vote distribution (For/Against/Abstain)
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import type { GovernanceProposal } from '@/core/entities/governance.entity'

interface VoteResultsChartProps {
  proposal: GovernanceProposal
}

export function VoteResultsChart({ proposal }: VoteResultsChartProps) {
  const data = [
    {
      name: 'For',
      value: parseFloat(proposal.votes_for),
      color: '#10b981',
    },
    {
      name: 'Against',
      value: parseFloat(proposal.votes_against),
      color: '#ef4444',
    },
    {
      name: 'Abstain',
      value: parseFloat(proposal.votes_abstain),
      color: '#6b7280',
    },
  ].filter((item) => item.value > 0)

  const total = data.reduce((sum, item) => sum + item.value, 0)

  if (total === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Vote Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            No votes cast yet
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vote Results</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(1)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) =>
                new Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 2,
                }).format(value)
              }
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
