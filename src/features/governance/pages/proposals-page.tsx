/**
 * Proposals Page
 * Full proposal management with list and details
 */

import { useParams } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ProposalList } from '../components/proposal-list'
import { ProposalDetail } from '../components/proposal-detail'
import { ProposalCreateDialog } from '../components/proposal-create-dialog'
import { VoteDialog } from '../components/vote-dialog'
import { VoteList } from '../components/vote-list'
import { useProposal } from '../hooks'
import { Loader2, ArrowLeft } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

export function ProposalsPage() {
  const params = useParams({ strict: false })
  const navigate = useNavigate()
  const proposalId = params.id as string | undefined
  const [showVoteDialog, setShowVoteDialog] = useState(false)

  const { data: proposalDetails, isLoading } = useProposal(proposalId)

  if (proposalId) {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )
    }

    if (!proposalDetails) {
      return (
        <div className="space-y-6">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: '/governance/proposals' })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Proposals
          </Button>
          <div className="rounded-lg border border-destructive p-4 text-destructive">
            Proposal not found
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: '/governance/proposals' })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Proposals
          </Button>
        </div>

        {/* Proposal Details */}
        <ProposalDetail
          details={proposalDetails}
          onVote={() => setShowVoteDialog(true)}
        />

        {/* Tabs */}
        <Tabs defaultValue="votes">
          <TabsList>
            <TabsTrigger value="votes">Votes</TabsTrigger>
          </TabsList>
          <TabsContent value="votes" className="mt-6">
            <VoteList proposalId={proposalId} />
          </TabsContent>
        </Tabs>

        {/* Vote Dialog */}
        {showVoteDialog && (
          <VoteDialog
            proposalId={proposalId}
            proposalTitle={proposalDetails.proposal.title}
            children={<div style={{ display: 'none' }} />}
          />
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Governance Proposals</h1>
          <p className="text-muted-foreground">
            View and manage all governance proposals
          </p>
        </div>
        <ProposalCreateDialog>
          <Button>Create Proposal</Button>
        </ProposalCreateDialog>
      </div>

      {/* Proposal List */}
      <ProposalList />
    </div>
  )
}
