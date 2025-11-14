/**
 * Chart Container Component
 * Wrapper for charts with loading and error states
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

interface ChartContainerProps {
  title: string
  description?: string
  loading?: boolean
  error?: Error | null
  children: React.ReactNode
  actions?: React.ReactNode
}

export function ChartContainer({
  title,
  description,
  loading,
  error,
  children,
  actions,
}: ChartContainerProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="space-y-3">
            <Skeleton className="h-[300px] w-full" />
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load chart data: {error.message}
            </AlertDescription>
          </Alert>
        )}
        {!loading && !error && children}
      </CardContent>
    </Card>
  )
}
