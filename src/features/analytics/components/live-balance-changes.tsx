/**
 * Live Balance Changes Component
 * Stream of wallet balance updates
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatDistanceToNow } from 'date-fns'
import type { BalanceChange } from '@/core/entities/analytics.entity'
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LiveBalanceChangesProps {
  changes: BalanceChange[]
}

export function LiveBalanceChanges({ changes }: LiveBalanceChangesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Balance Changes</CardTitle>
        <CardDescription>Real-time wallet balance updates</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {changes.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No recent balance changes
              </p>
            ) : (
              changes.map((change, index) => {
                const isIncrease = parseFloat(change.change) > 0
                return (
                  <div
                    key={`${change.wallet_id}-${index}`}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'flex items-center justify-center w-8 h-8 rounded-full',
                          isIncrease ? 'bg-green-100' : 'bg-red-100'
                        )}
                      >
                        {isIncrease ? (
                          <TrendingUpIcon className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDownIcon className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{change.wallet_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(change.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={cn(
                          'text-sm font-medium',
                          isIncrease ? 'text-green-600' : 'text-red-600'
                        )}
                      >
                        {isIncrease ? '+' : ''}
                        {change.change} {change.currency}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        New: {change.new_balance}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
