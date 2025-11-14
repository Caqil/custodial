/**
 * User Status Badge Component
 * Displays user status with appropriate color coding
 */

import { Badge } from '@/components/ui/badge'
import { UserStatus } from '@/core/entities/user.entity'
import { cn } from '@/lib/utils'

interface UserStatusBadgeProps {
  status: UserStatus
  className?: string
}

/**
 * User status badge with color variants
 */
export function UserStatusBadge({ status, className }: UserStatusBadgeProps) {
  const variants = {
    [UserStatus.Active]: {
      variant: 'default' as const,
      className: 'bg-green-500 hover:bg-green-600',
    },
    [UserStatus.Inactive]: {
      variant: 'secondary' as const,
      className: 'bg-gray-500 hover:bg-gray-600',
    },
    [UserStatus.Suspended]: {
      variant: 'destructive' as const,
      className: 'bg-orange-500 hover:bg-orange-600',
    },
    [UserStatus.Locked]: {
      variant: 'destructive' as const,
      className: 'bg-red-500 hover:bg-red-600',
    },
  }

  const config = variants[status]

  return (
    <Badge variant={config.variant} className={cn(config.className, className)}>
      {status}
    </Badge>
  )
}
