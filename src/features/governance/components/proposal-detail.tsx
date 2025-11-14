/**
 * Proposal Detail Component
 * Full proposal view with all information
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProposalStatusBadge } from './proposal-status-badge'
import { ProposalTypeBadge } from './proposal-type-badge'
import { VoteResultsChart } from './vote-results-chart'
import { VotingTimeline } from './voting-timeline'
import type { ProposalDetails } from '@/core/entities/governance.entity'
import { format } from 'date-fns'
import { ProposalStatus } from '@/core/entities/governance.entity'

interface ProposalDetailProps {
  details: ProposalDetails
  onVote?: () => void
}

export function ProposalDetail({ details, onVote }: ProposalDetailProps) {
  const { proposal, vote_breakdown, quorum_met, current_result, time_remaining } = details

  const canVote = proposal.status === ProposalStatus.Active && time_remaining && time_remaining > 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">{proposal.title}</CardTitle>
                <ProposalStatusBadge status={proposal.status} />
                <ProposalTypeBadge type={proposal.proposal_type} />
              </div>
              <CardDescription>
                Created by {proposal.created_by} on {format(new Date(proposal.created_at), 'PPpp')}
              </CardDescription>
            </div>
            {canVote && onVote && (
              <Button onClick={onVote}>Cast Vote</Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Description</h3>
              <p className="whitespace-pre-wrap text-muted-foreground">
                {proposal.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-4 md:grid-cols-4">
              <div>
                <div className="text-sm text-muted-foreground">Currency</div>
                <div className="font-mono font-medium">{proposal.currency}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Quorum Required</div>
                <div className="font-medium">
                  {parseFloat(proposal.quorum_required).toFixed(1)}%
                  {quorum_met && (
                    <span className="ml-2 text-xs text-green-600">✓ Met</span>
                  )}
                  {!quorum_met && (
                    <span className="ml-2 text-xs text-muted-foreground">Not met</span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Current Result</div>
                <div className="font-medium capitalize">{current_result}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Votes</div>
                <div className="font-medium">
                  {new Intl.NumberFormat('en-US', {
                    maximumFractionDigits: 2,
                  }).format(parseFloat(proposal.total_votes))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t pt-4">
              <div>
                <div className="text-sm text-muted-foreground">Votes For</div>
                <div className="text-lg font-bold text-green-600">
                  {new Intl.NumberFormat('en-US', {
                    maximumFractionDigits: 2,
                  }).format(parseFloat(proposal.votes_for))}
                </div>
                <div className="text-xs text-muted-foreground">
                  {vote_breakdown.for_percentage}%
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Votes Against</div>
                <div className="text-lg font-bold text-red-600">
                  {new Intl.NumberFormat('en-US', {
                    maximumFractionDigits: 2,
                  }).format(parseFloat(proposal.votes_against))}
                </div>
                <div className="text-xs text-muted-foreground">
                  {vote_breakdown.against_percentage}%
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Abstain</div>
                <div className="text-lg font-bold text-gray-600">
                  {new Intl.NumberFormat('en-US', {
                    maximumFractionDigits: 2,
                  }).format(parseFloat(proposal.votes_abstain))}
                </div>
                <div className="text-xs text-muted-foreground">
                  {vote_breakdown.abstain_percentage}%
                </div>
              </div>
            </div>

            {proposal.executed_at && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
                <div className="font-medium text-green-900 dark:text-green-100">
                  Executed on {format(new Date(proposal.executed_at), 'PPpp')}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Charts and Timeline */}
      <div className="grid gap-6 md:grid-cols-2">
        <VoteResultsChart proposal={proposal} />
        <VotingTimeline proposal={proposal} />
      </div>
    </div>
  )
}
