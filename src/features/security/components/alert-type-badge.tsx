/**
 * Alert Type Badge Component
 * Displays badge for different alert types
 */

import { Badge } from '@/components/ui/badge'
import { AlertType } from '@/core/entities/security.entity'
import {
  ShieldAlert,
  DollarSign,
  Activity,
  UserX,
  TrendingUp,
  Zap,
  MapPin,
  ShieldOff
} from 'lucide-react'

interface AlertTypeBadgeProps {
  alertType: AlertType | string
}

/**
 * Badge component for alert type with appropriate icon
 */
export function AlertTypeBadge({ alertType }: AlertTypeBadgeProps) {
  switch (alertType) {
    case AlertType.UnauthorizedAccess:
    case 'unauthorized_access':
      return (
        <Badge variant='outline'>
          <UserX className='mr-1 h-3 w-3' />
          Unauthorized Access
        </Badge>
      )
    case AlertType.SuspiciousTransaction:
    case 'suspicious_transaction':
      return (
        <Badge variant='outline'>
          <ShieldAlert className='mr-1 h-3 w-3' />
          Suspicious Transaction
        </Badge>
      )
    case AlertType.AnomalousActivity:
    case 'anomalous_activity':
      return (
        <Badge variant='outline'>
          <Activity className='mr-1 h-3 w-3' />
          Anomalous Activity
        </Badge>
      )
    case AlertType.FailedLogin:
    case 'failed_login':
      return (
        <Badge variant='outline'>
          <UserX className='mr-1 h-3 w-3' />
          Failed Login
        </Badge>
      )
    case AlertType.LargeTransaction:
    case 'large_transaction':
      return (
        <Badge variant='outline'>
          <DollarSign className='mr-1 h-3 w-3' />
          Large Transaction
        </Badge>
      )
    case AlertType.VelocityCheck:
    case 'velocity_check':
      return (
        <Badge variant='outline'>
          <TrendingUp className='mr-1 h-3 w-3' />
          Velocity Check
        </Badge>
      )
    case AlertType.IPChange:
    case 'ip_change':
      return (
        <Badge variant='outline'>
          <MapPin className='mr-1 h-3 w-3' />
          IP Change
        </Badge>
      )
    case AlertType.MFADisabled:
    case 'mfa_disabled':
      return (
        <Badge variant='outline'>
          <ShieldOff className='mr-1 h-3 w-3' />
          MFA Disabled
        </Badge>
      )
    default:
      return (
        <Badge variant='outline'>
          <Zap className='mr-1 h-3 w-3' />
          {alertType}
        </Badge>
      )
  }
}
