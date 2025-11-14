/**
 * Vote Distribution Chart Component
 * Bar chart showing cumulative vote distribution
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type { GovernanceProposalListResponse } from '@/core/entities/governance.entity'

interface VoteDistributionChartProps {
  proposals: GovernanceProposalListResponse
}

export function VoteDistributionChart({ proposals }: VoteDistributionChartProps) {
  if (!proposals.proposals || proposals.proposals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Vote Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            No proposals available
          </div>
        </CardContent>
      </Card>
    )
  }

  const chartData = proposals.proposals.slice(0, 10).map((proposal) => ({
    title: proposal.title.substring(0, 20) + (proposal.title.length > 20 ? '...' : ''),
    for: parseFloat(proposal.votes_for),
    against: parseFloat(proposal.votes_against),
    abstain: parseFloat(proposal.votes_abstain),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vote Distribution by Proposal</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip
              formatter={(value: number) =>
                new Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 2,
                }).format(value)
              }
            />
            <Legend />
            <Bar dataKey="for" stackId="a" fill="#10b981" name="For" />
            <Bar dataKey="against" stackId="a" fill="#ef4444" name="Against" />
            <Bar dataKey="abstain" stackId="a" fill="#6b7280" name="Abstain" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
