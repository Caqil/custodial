/**
 * Proposal Card Component
 * Summary card for a proposal
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProposalStatusBadge } from './proposal-status-badge'
import { ProposalTypeBadge } from './proposal-type-badge'
import type { GovernanceProposal } from '@/core/entities/governance.entity'
import { format } from 'date-fns'
import { useNavigate } from '@tanstack/react-router'

interface ProposalCardProps {
  proposal: GovernanceProposal
}

export function ProposalCard({ proposal }: ProposalCardProps) {
  const navigate = useNavigate()
  const totalVotes = parseFloat(proposal.total_votes)
  const votesFor = parseFloat(proposal.votes_for)
  const votesAgainst = parseFloat(proposal.votes_against)

  const forPercentage = totalVotes > 0 ? (votesFor / totalVotes) * 100 : 0
  const againstPercentage = totalVotes > 0 ? (votesAgainst / totalVotes) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{proposal.title}</CardTitle>
            <CardDescription>
              {proposal.description.substring(0, 100)}
              {proposal.description.length > 100 && '...'}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <ProposalTypeBadge type={proposal.proposal_type} />
            <ProposalStatusBadge status={proposal.status} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Vote Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Votes</span>
              <span className="font-medium">
                {new Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 2,
                }).format(totalVotes)}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div className="flex h-full">
                <div
                  className="bg-green-500"
                  style={{ width: `${forPercentage}%` }}
                />
                <div
                  className="bg-red-500"
                  style={{ width: `${againstPercentage}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>For: {forPercentage.toFixed(1)}%</span>
              <span>Against: {againstPercentage.toFixed(1)}%</span>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Currency</div>
              <div className="font-mono font-medium">{proposal.currency}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Quorum</div>
              <div className="font-medium">{parseFloat(proposal.quorum_required).toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-muted-foreground">Voting Ends</div>
              <div className="font-medium">
                {format(new Date(proposal.voting_ends_at), 'PPp')}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Created</div>
              <div className="font-medium">
                {format(new Date(proposal.created_at), 'PP')}
              </div>
            </div>
          </div>

          {/* Actions */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              navigate({ to: '/governance/proposals/$id', params: { id: proposal.id } })
            }
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
