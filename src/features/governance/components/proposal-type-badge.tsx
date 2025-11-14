/**
 * Proposal Type Badge Component
 * Visual indicator for proposal type
 */

import { Badge } from '@/components/ui/badge'
import { ProposalType } from '@/core/entities/governance.entity'

interface ProposalTypeBadgeProps {
  type: ProposalType
}

export function ProposalTypeBadge({ type }: ProposalTypeBadgeProps) {
  const labels: Record<ProposalType, string> = {
    [ProposalType.General]: 'General',
    [ProposalType.ParameterChange]: 'Parameter Change',
    [ProposalType.TreasurySpend]: 'Treasury Spend',
    [ProposalType.Upgrade]: 'Upgrade',
  }

  return <Badge variant="outline">{labels[type]}</Badge>
}
