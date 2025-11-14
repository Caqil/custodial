/**
 * Governance Entity - Domain models for governance operations
 * Maps to backend domain/governance models
 */

/**
 * Governance proposal type enumeration
 */
export enum ProposalType {
  General = 'general',
  ParameterChange = 'parameter_change',
  TreasurySpend = 'treasury_spend',
  Upgrade = 'upgrade',
}

/**
 * Governance proposal status enumeration
 */
export enum ProposalStatus {
  Draft = 'draft',
  Active = 'active',
  Passed = 'passed',
  Rejected = 'rejected',
  Executed = 'executed',
  Cancelled = 'cancelled',
}

/**
 * Vote type enumeration
 */
export enum VoteType {
  For = 'for',
  Against = 'against',
  Abstain = 'abstain',
}

/**
 * Delegation status enumeration
 */
export enum DelegationStatus {
  Active = 'active',
  Revoked = 'revoked',
}

/**
 * GovernanceProposal entity
 * Represents a governance proposal
 */
export interface GovernanceProposal {
  /** Unique identifier (UUID) */
  id: string

  /** Cryptocurrency for this proposal */
  currency: string

  /** Proposal title */
  title: string

  /** Detailed description */
  description: string

  /** Type of proposal */
  proposal_type: ProposalType

  /** When voting starts */
  voting_starts_at: string

  /** When voting ends */
  voting_ends_at: string

  /** Quorum required (percentage) */
  quorum_required: string

  /** Proposal status */
  status: ProposalStatus

  /** Total votes in favor */
  votes_for: string

  /** Total votes against */
  votes_against: string

  /** Total abstain votes */
  votes_abstain: string

  /** Total votes cast */
  total_votes: string

  /** User who created the proposal */
  created_by: string

  /** When proposal was executed */
  executed_at?: string

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string

  /** Votes (when included) */
  votes?: GovernanceVote[]
}

/**
 * GovernanceVote entity
 * Represents a vote on a proposal
 */
export interface GovernanceVote {
  /** Unique identifier (UUID) */
  id: string

  /** Proposal ID */
  proposal_id: string

  /** Wallet ID of voter */
  wallet_id: string

  /** Vote type (for, against, abstain) */
  vote_type: VoteType

  /** Voting weight/power */
  vote_weight: string

  /** If vote was delegated, the delegator wallet ID */
  delegated_from?: string

  /** When vote was cast */
  voted_at: string
}

/**
 * GovernanceDelegation entity
 * Represents voting power delegation
 */
export interface GovernanceDelegation {
  /** Unique identifier (UUID) */
  id: string

  /** Delegator wallet ID */
  delegator_wallet_id: string

  /** Delegate wallet ID (who receives voting power) */
  delegate_wallet_id: string

  /** Voting weight delegated */
  weight: string

  /** Delegation status */
  status: DelegationStatus

  /** Creation timestamp */
  created_at: string

  /** When delegation was revoked */
  revoked_at?: string
}

/**
 * Paginated governance proposal list response
 */
export interface GovernanceProposalListResponse {
  proposals: GovernanceProposal[]
  total: number
  limit: number
  offset: number
}

/**
 * Governance proposal query parameters
 */
export interface GovernanceProposalListParams {
  offset?: number
  limit?: number
  currency?: string
  status?: ProposalStatus
  proposal_type?: ProposalType
  created_by?: string
}

/**
 * Governance vote list response
 */
export interface GovernanceVoteListResponse {
  votes: GovernanceVote[]
  total: number
  limit: number
  offset: number
}

/**
 * Governance vote query parameters
 */
export interface GovernanceVoteListParams {
  offset?: number
  limit?: number
  proposal_id?: string
  wallet_id?: string
  vote_type?: VoteType
}

/**
 * Governance delegation list response
 */
export interface GovernanceDelegationListResponse {
  delegations: GovernanceDelegation[]
  total: number
  limit: number
  offset: number
}

/**
 * Governance delegation query parameters
 */
export interface GovernanceDelegationListParams {
  offset?: number
  limit?: number
  delegator_wallet_id?: string
  delegate_wallet_id?: string
  status?: DelegationStatus
}

/**
 * Create governance proposal request
 */
export interface CreateGovernanceProposalRequest {
  /** Cryptocurrency */
  currency: string

  /** Proposal title */
  title: string

  /** Detailed description */
  description: string

  /** Proposal type */
  proposal_type: ProposalType

  /** When voting starts */
  voting_starts_at: string

  /** When voting ends */
  voting_ends_at: string

  /** Quorum required (percentage) */
  quorum_required: string
}

/**
 * Cast vote request
 */
export interface CastVoteRequest {
  /** Proposal ID */
  proposal_id: string

  /** Wallet ID voting */
  wallet_id: string

  /** Vote type */
  vote_type: VoteType
}

/**
 * Create delegation request
 */
export interface CreateDelegationRequest {
  /** Delegator wallet ID */
  delegator_wallet_id: string

  /** Delegate wallet ID */
  delegate_wallet_id: string

  /** Voting weight to delegate */
  weight: string
}

/**
 * Revoke delegation request
 */
export interface RevokeDelegationRequest {
  /** Delegation ID to revoke */
  delegation_id: string
}

/**
 * Governance statistics
 */
export interface GovernanceStatistics {
  /** Total proposals */
  total_proposals: number

  /** Active proposals */
  active_proposals: number

  /** Passed proposals */
  passed_proposals: number

  /** Rejected proposals */
  rejected_proposals: number

  /** Total votes cast */
  total_votes_cast: string

  /** Total voting power */
  total_voting_power: string

  /** Breakdown by currency */
  by_currency: GovernanceStatsByCurrency[]

  /** Generation timestamp */
  generated_at: string
}

/**
 * Governance statistics by currency
 */
export interface GovernanceStatsByCurrency {
  /** Currency */
  currency: string

  /** Proposal count */
  proposal_count: number

  /** Active proposal count */
  active_count: number

  /** Total votes for this currency */
  total_votes: string

  /** Participation rate (percentage) */
  participation_rate: string
}

/**
 * Proposal details with extended information
 */
export interface ProposalDetails {
  /** Proposal */
  proposal: GovernanceProposal

  /** Vote breakdown */
  vote_breakdown: {
    for_percentage: string
    against_percentage: string
    abstain_percentage: string
  }

  /** Whether quorum is met */
  quorum_met: boolean

  /** Current result if voting ended now */
  current_result: 'passed' | 'rejected' | 'pending'

  /** Time remaining (in seconds) */
  time_remaining?: number
}
