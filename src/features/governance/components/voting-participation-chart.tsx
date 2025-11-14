/**
 * Voting Participation Chart Component
 * Line chart showing participation rate over time
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { format } from 'date-fns'
import type { GovernanceAnalytics } from '@/infrastructure/api/repositories/governance-api.repository'

interface VotingParticipationChartProps {
  data: GovernanceAnalytics
}

export function VotingParticipationChart({ data }: VotingParticipationChartProps) {
  if (!data.participation_history || data.participation_history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Voting Participation Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            No participation data available
          </div>
        </CardContent>
      </Card>
    )
  }

  const chartData = data.participation_history.map((item) => ({
    date: format(new Date(item.date), 'MMM dd'),
    participationRate: parseFloat(item.participation_rate),
    votesCast: parseFloat(item.votes_cast),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Voting Participation Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              yAxisId="left"
              label={{ value: 'Participation Rate (%)', angle: -90, position: 'insideLeft' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: 'Votes Cast', angle: 90, position: 'insideRight' }}
            />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === 'participationRate') {
                  return [`${value.toFixed(2)}%`, 'Participation Rate']
                }
                return [new Intl.NumberFormat('en-US').format(value), 'Votes Cast']
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="participationRate"
              stroke="#8b5cf6"
              strokeWidth={2}
              name="Participation Rate"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="votesCast"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Votes Cast"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
