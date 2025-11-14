/**
 * Trend Indicator Component
 * Shows trend direction with arrow and percentage
 */

import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TrendIndicatorProps {
  value: number
  isPositive: boolean
  className?: string
}

export function TrendIndicator({ value, isPositive, className }: TrendIndicatorProps) {
  const isUp = value > 0
  const Icon = isUp ? ArrowUpIcon : ArrowDownIcon

  return (
    <div
      className={cn(
        'flex items-center gap-1 text-xs font-medium',
        isPositive
          ? isUp
            ? 'text-green-600'
            : 'text-red-600'
          : isUp
          ? 'text-red-600'
          : 'text-green-600',
        className
      )}
    >
      <Icon className="h-3 w-3" />
      <span>{Math.abs(value).toFixed(2)}%</span>
    </div>
  )
}
