/**
 * Real-Time Feed Component
 * Live transaction/event feed with auto-refresh
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatDistanceToNow } from 'date-fns'
import type { LiveTransaction } from '@/core/entities/analytics.entity'
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

interface RealTimeFeedProps {
  transactions: LiveTransaction[]
}

export function RealTimeFeed({ transactions }: RealTimeFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Transaction Feed</CardTitle>
        <CardDescription>Real-time transaction activity</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No recent transactions
              </p>
            ) : (
              transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between border-b pb-3 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      {tx.type === 'deposit' ? (
                        <ArrowDownIcon className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowUpIcon className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium capitalize">{tx.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(tx.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {tx.amount} {tx.currency}
                    </p>
                    <Badge
                      variant={
                        tx.status === 'completed'
                          ? 'default'
                          : tx.status === 'pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                      className="text-xs"
                    >
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
