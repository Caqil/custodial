/**
 * Governance Dashboard Page
 * Overview of governance statistics and active proposals
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProposalCard } from '../components/proposal-card'
import { ProposalCreateDialog } from '../components/proposal-create-dialog'
import { VotingParticipationChart } from '../components/voting-participation-chart'
import { VoteDistributionChart } from '../components/vote-distribution-chart'
import { VotingPowerTreemap } from '../components/voting-power-treemap'
import { DelegationFlowChart } from '../components/delegation-flow-chart'
import { useProposals, useGovernanceAnalytics } from '../hooks'
import { ProposalStatus } from '@/core/entities/governance.entity'
import { useNavigate } from '@tanstack/react-router'
import { Loader2, FileText, Vote, Users, TrendingUp } from 'lucide-react'

export function GovernanceDashboardPage() {
  const navigate = useNavigate()

  const { data: activeProposals, isLoading: proposalsLoading } = useProposals({
    status: ProposalStatus.Active,
    limit: 6,
  })

  const { data: analytics, isLoading: analyticsLoading } = useGovernanceAnalytics()

  const isLoading = proposalsLoading || analyticsLoading

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Governance Dashboard</h1>
          <p className="text-muted-foreground">
            Manage proposals, votes, and delegations
          </p>
        </div>
        <ProposalCreateDialog>
          <Button>Create Proposal</Button>
        </ProposalCreateDialog>
      </div>

      {/* Stats Cards */}
      {analytics && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.total_proposals.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Proposals</CardTitle>
              <Vote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.active_proposals.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Votes Cast</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 0,
                }).format(parseFloat(analytics.total_votes_cast))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participation Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {parseFloat(analytics.participation_rate).toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Active Proposals */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Active Proposals</h2>
          <Button
            variant="outline"
            onClick={() => navigate({ to: '/governance/proposals' })}
          >
            View All
          </Button>
        </div>

        {activeProposals && activeProposals.proposals.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeProposals.proposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex h-32 items-center justify-center">
              <p className="text-muted-foreground">No active proposals</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Analytics Charts */}
      {analytics && (
        <div className="grid gap-6 md:grid-cols-2">
          <VotingParticipationChart data={analytics} />
          <DelegationFlowChart data={analytics} />
        </div>
      )}

      {analytics && activeProposals && (
        <div className="grid gap-6 md:grid-cols-2">
          <VoteDistributionChart proposals={activeProposals} />
          <VotingPowerTreemap data={analytics} />
        </div>
      )}
    </div>
  )
}
