/**
 * Compliance Violations List Component
 * Table showing compliance violations
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatDistanceToNow } from 'date-fns'
import type { ComplianceViolation } from '@/core/entities/analytics.entity'

interface ComplianceViolationsListProps {
  data: ComplianceViolation[]
}

export function ComplianceViolationsList({ data }: ComplianceViolationsListProps) {
  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'destructive'
      case 'high':
        return 'destructive'
      case 'medium':
        return 'default'
      default:
        return 'secondary'
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'default'
      case 'pending':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Violations</CardTitle>
        <CardDescription>Recent compliance issues requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {data.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No compliance violations
              </p>
            ) : (
              data.map((violation) => (
                <div
                  key={violation.id}
                  className="border rounded-lg p-3 space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={getSeverityVariant(violation.severity) as any}>
                          {violation.severity}
                        </Badge>
                        <Badge variant="outline">{violation.type}</Badge>
                        <Badge variant={getStatusVariant(violation.status) as any}>
                          {violation.status}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{violation.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(violation.timestamp), { addSuffix: true })}
                      </p>
                    </div>
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
