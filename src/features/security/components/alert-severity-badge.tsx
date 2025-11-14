/**
 * Alert Severity Badge Component
 * Displays colored badge for alert severity levels
 */

import { Badge } from '@/components/ui/badge'
import { AlertSeverity } from '@/core/entities/security.entity'
import { AlertTriangle, AlertOctagon, AlertCircle, Info } from 'lucide-react'

interface AlertSeverityBadgeProps {
  severity: AlertSeverity | string
}

/**
 * Badge component for alert severity with appropriate color and icon
 */
export function AlertSeverityBadge({ severity }: AlertSeverityBadgeProps) {
  switch (severity) {
    case AlertSeverity.Critical:
    case 'critical':
      return (
        <Badge variant='outline' className='border-red-600 bg-red-50 text-red-700'>
          <AlertOctagon className='mr-1 h-3 w-3' />
          Critical
        </Badge>
      )
    case AlertSeverity.High:
    case 'high':
      return (
        <Badge variant='outline' className='border-orange-500 bg-orange-50 text-orange-700'>
          <AlertTriangle className='mr-1 h-3 w-3' />
          High
        </Badge>
      )
    case AlertSeverity.Medium:
    case 'medium':
      return (
        <Badge variant='outline' className='border-yellow-500 bg-yellow-50 text-yellow-700'>
          <AlertCircle className='mr-1 h-3 w-3' />
          Medium
        </Badge>
      )
    case AlertSeverity.Low:
    case 'low':
      return (
        <Badge variant='outline' className='border-blue-500 bg-blue-50 text-blue-700'>
          <Info className='mr-1 h-3 w-3' />
          Low
        </Badge>
      )
    default:
      return (
        <Badge variant='outline' className='border-gray-500 bg-gray-50 text-gray-700'>
          <Info className='mr-1 h-3 w-3' />
          {severity}
        </Badge>
      )
  }
}
