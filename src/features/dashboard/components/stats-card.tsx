/**
 * Enhanced Stats Card Component
 * Shows a metric with trend indicator and comparison
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpIcon, ArrowDownIcon, LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  icon: LucideIcon
  iconClassName?: string
}

export function StatsCard({
  title,
  value,
  description,
  trend,
  icon: Icon,
  iconClassName,
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon className={cn('h-4 w-4 text-muted-foreground', iconClassName)} />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        <div className='flex items-center justify-between mt-1'>
          <p className='text-xs text-muted-foreground'>{description}</p>
          {trend && (
            <div
              className={cn(
                'flex items-center text-xs font-medium',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend.isPositive ? (
                <ArrowUpIcon className='h-3 w-3 mr-0.5' />
              ) : (
                <ArrowDownIcon className='h-3 w-3 mr-0.5' />
              )}
              {Math.abs(trend.value).toFixed(1)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
