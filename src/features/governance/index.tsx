/**
 * Governance Module Main Entry
 * Exports all governance components, hooks, and pages
 */

// Pages
export { GovernanceDashboardPage } from './pages/governance-dashboard-page'
export { ProposalsPage } from './pages/proposals-page'
export { DelegationsPage } from './pages/delegations-page'

// Components
export { ProposalList } from './components/proposal-list'
export { ProposalCard } from './components/proposal-card'
export { ProposalDetail } from './components/proposal-detail'
export { ProposalCreateDialog } from './components/proposal-create-dialog'
export { ProposalStatusBadge } from './components/proposal-status-badge'
export { ProposalTypeBadge } from './components/proposal-type-badge'
export { VoteDialog } from './components/vote-dialog'
export { VoteList } from './components/vote-list'
export { VoteResultsChart } from './components/vote-results-chart'
export { VotingTimeline } from './components/voting-timeline'
export { VotingParticipationChart } from './components/voting-participation-chart'
export { VoteDistributionChart } from './components/vote-distribution-chart'
export { VotingPowerTreemap } from './components/voting-power-treemap'
export { DelegationFlowChart } from './components/delegation-flow-chart'
export { DelegationList } from './components/delegation-list'
export { DelegationDetail } from './components/delegation-detail'
export { DelegateDialog } from './components/delegate-dialog'

// Hooks
export {
  useProposals,
  useProposal,
  useCreateProposal,
  useVotes,
  useVote,
  useDelegations,
  useDelegation,
  useDelegate,
  useGovernanceAnalytics,
} from './hooks'
