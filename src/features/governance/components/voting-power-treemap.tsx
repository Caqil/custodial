/**
 * Voting Power Treemap Component
 * Treemap showing voting power concentration
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts'
import type { GovernanceAnalytics } from '@/infrastructure/api/repositories/governance-api.repository'

interface VotingPowerTreemapProps {
  data: GovernanceAnalytics
}

export function VotingPowerTreemap({ data }: VotingPowerTreemapProps) {
  if (!data.voting_power_distribution || data.voting_power_distribution.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Voting Power Concentration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            No voting power data available
          </div>
        </CardContent>
      </Card>
    )
  }

  const chartData = data.voting_power_distribution.slice(0, 20).map((item) => ({
    name: item.wallet_id.substring(0, 8) + '...',
    size: parseFloat(item.voting_power),
    percentage: parseFloat(item.percentage),
  }))

  const CustomContent = (props: any) => {
    const { x, y, width, height, name, percentage } = props

    if (width < 50 || height < 50) return null

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: `hsl(${220 + percentage * 50}, 70%, 50%)`,
            stroke: '#fff',
            strokeWidth: 2,
          }}
        />
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="#fff"
          fontSize={12}
        >
          {name}
        </text>
        <text
          x={x + width / 2}
          y={y + height / 2 + 15}
          textAnchor="middle"
          fill="#fff"
          fontSize={10}
        >
          {percentage.toFixed(1)}%
        </text>
      </g>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Voting Power Concentration</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <Treemap
            data={chartData}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
            content={<CustomContent />}
          >
            <Tooltip
              formatter={(value: number) =>
                new Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 2,
                }).format(value)
              }
            />
          </Treemap>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
