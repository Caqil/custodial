/**
 * Delegation Flow Chart Component
 * Simplified network diagram showing delegation relationships
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { GovernanceAnalytics } from '@/infrastructure/api/repositories/governance-api.repository'

interface DelegationFlowChartProps {
  data: GovernanceAnalytics
}

export function DelegationFlowChart({ data }: DelegationFlowChartProps) {
  if (!data.top_delegates || data.top_delegates.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Delegates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            No delegation data available
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Delegates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.top_delegates.slice(0, 10).map((delegate, index) => {
            const weight = parseFloat(delegate.total_weight)
            const maxWeight = parseFloat(data.top_delegates![0].total_weight)
            const percentage = (weight / maxWeight) * 100

            return (
              <div key={delegate.wallet_id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    #{index + 1} {delegate.wallet_id.substring(0, 12)}...
                  </span>
                  <span className="text-muted-foreground">
                    {new Intl.NumberFormat('en-US', {
                      maximumFractionDigits: 2,
                    }).format(weight)}{' '}
                    ({delegate.delegation_count} delegations)
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
