/**
 * Proposal Status Badge Component
 * Visual indicator for proposal status
 */

import { Badge } from '@/components/ui/badge'
import { ProposalStatus } from '@/core/entities/governance.entity'

interface ProposalStatusBadgeProps {
  status: ProposalStatus
}

export function ProposalStatusBadge({ status }: ProposalStatusBadgeProps) {
  const variants: Record<ProposalStatus, { variant: any; label: string; className?: string }> = {
    [ProposalStatus.Draft]: { variant: 'secondary', label: 'Draft' },
    [ProposalStatus.Active]: { variant: 'default', label: 'Active' },
    [ProposalStatus.Passed]: { variant: 'default', label: 'Passed', className: 'bg-green-600' },
    [ProposalStatus.Rejected]: { variant: 'destructive', label: 'Rejected' },
    [ProposalStatus.Executed]: { variant: 'default', label: 'Executed', className: 'bg-green-600' },
    [ProposalStatus.Cancelled]: { variant: 'secondary', label: 'Cancelled' },
  }

  const { variant, label, className } = variants[status]

  return <Badge variant={variant} className={className}>{label}</Badge>
}
