/**
 * Governance API Repository Implementation
 * Implements governance operations using HTTP API
 */

import apiClient from '../client'
import { API_ENDPOINTS } from '../endpoints'
import type { ApiResponse } from '../types'
import type {
  GovernanceProposal,
  GovernanceProposalListResponse,
  GovernanceProposalListParams,
  GovernanceVote,
  GovernanceVoteListResponse,
  GovernanceVoteListParams,
  GovernanceDelegation,
  GovernanceDelegationListResponse,
  GovernanceDelegationListParams,
  CreateGovernanceProposalRequest,
  CastVoteRequest,
  CreateDelegationRequest,
  ProposalDetails,
} from '@/core/entities/governance.entity'

/**
 * Governance analytics parameters
 */
export interface GovernanceAnalyticsParams {
  start_date?: string
  end_date?: string
  currency?: string
}

/**
 * Governance analytics response
 */
export interface GovernanceAnalytics {
  total_proposals: number
  active_proposals: number
  passed_proposals: number
  rejected_proposals: number
  total_votes_cast: string
  total_voting_power: string
  participation_rate: string
  participation_history?: Array<{
    date: string
    participation_rate: string
    votes_cast: string
  }>
  proposal_outcomes?: Array<{
    status: string
    count: number
    percentage: string
  }>
  top_delegates?: Array<{
    wallet_id: string
    total_weight: string
    delegation_count: number
  }>
  voting_power_distribution?: Array<{
    wallet_id: string
    voting_power: string
    percentage: string
  }>
}

/**
 * Governance API repository implementation
 */
export class GovernanceApiRepository {
  /**
   * Get paginated list of governance proposals
   */
  async getProposals(params: GovernanceProposalListParams): Promise<GovernanceProposalListResponse> {
    try {
      console.log('📋 Fetching governance proposals:', params)

      const response = await apiClient.get<ApiResponse<GovernanceProposalListResponse>>(
        API_ENDPOINTS.governance.proposals,
        { params }
      )

      const data = response.data.data!
      console.log('✅ Governance proposals loaded:', {
        count: data.proposals.length,
        total: data.total,
      })

      return data
    } catch (error) {
      console.error('❌ Error loading governance proposals:', error)
      throw error
    }
  }

  /**
   * Get governance proposal by ID
   */
  async getProposalById(id: string): Promise<ProposalDetails> {
    try {
      console.log('📋 Fetching governance proposal details:', id)

      const response = await apiClient.get<ApiResponse<ProposalDetails>>(
        API_ENDPOINTS.governance.proposalById(id)
      )

      const data = response.data.data!
      console.log('✅ Governance proposal details loaded:', data.proposal.title)

      return data
    } catch (error) {
      console.error('❌ Error loading governance proposal details:', error)
      throw error
    }
  }

  /**
   * Create new governance proposal
   */
  async createProposal(request: CreateGovernanceProposalRequest): Promise<GovernanceProposal> {
    try {
      console.log('🔨 Creating governance proposal:', request)

      const response = await apiClient.post<ApiResponse<GovernanceProposal>>(
        API_ENDPOINTS.governance.createProposal,
        request
      )

      const data = response.data.data!
      console.log('✅ Governance proposal created:', data.id)

      return data
    } catch (error) {
      console.error('❌ Error creating governance proposal:', error)
      throw error
    }
  }

  /**
   * Get paginated list of governance votes
   */
  async getVotes(params: GovernanceVoteListParams): Promise<GovernanceVoteListResponse> {
    try {
      console.log('📋 Fetching governance votes:', params)

      const response = await apiClient.get<ApiResponse<GovernanceVoteListResponse>>(
        API_ENDPOINTS.governance.votes,
        { params }
      )

      const data = response.data.data!
      console.log('✅ Governance votes loaded:', {
        count: data.votes.length,
        total: data.total,
      })

      return data
    } catch (error) {
      console.error('❌ Error loading governance votes:', error)
      throw error
    }
  }

  /**
   * Cast vote on a proposal
   */
  async vote(proposalId: string, request: CastVoteRequest): Promise<GovernanceVote> {
    try {
      console.log('🗳️ Casting vote:', { proposalId, ...request })

      const response = await apiClient.post<ApiResponse<GovernanceVote>>(
        API_ENDPOINTS.governance.vote(proposalId),
        request
      )

      const data = response.data.data!
      console.log('✅ Vote cast successfully:', data.id)

      return data
    } catch (error) {
      console.error('❌ Error casting vote:', error)
      throw error
    }
  }

  /**
   * Get paginated list of governance delegations
   */
  async getDelegations(params: GovernanceDelegationListParams): Promise<GovernanceDelegationListResponse> {
    try {
      console.log('📋 Fetching governance delegations:', params)

      const response = await apiClient.get<ApiResponse<GovernanceDelegationListResponse>>(
        API_ENDPOINTS.governance.delegations,
        { params }
      )

      const data = response.data.data!
      console.log('✅ Governance delegations loaded:', {
        count: data.delegations.length,
        total: data.total,
      })

      return data
    } catch (error) {
      console.error('❌ Error loading governance delegations:', error)
      throw error
    }
  }

  /**
   * Get governance delegation by ID
   */
  async getDelegationById(id: string): Promise<GovernanceDelegation> {
    try {
      console.log('📋 Fetching governance delegation details:', id)

      const response = await apiClient.get<ApiResponse<GovernanceDelegation>>(
        API_ENDPOINTS.governance.delegationById(id)
      )

      const data = response.data.data!
      console.log('✅ Governance delegation details loaded')

      return data
    } catch (error) {
      console.error('❌ Error loading governance delegation details:', error)
      throw error
    }
  }

  /**
   * Delegate voting power
   */
  async delegate(request: CreateDelegationRequest): Promise<GovernanceDelegation> {
    try {
      console.log('🤝 Delegating voting power:', request)

      const response = await apiClient.post<ApiResponse<GovernanceDelegation>>(
        API_ENDPOINTS.governance.delegate,
        request
      )

      const data = response.data.data!
      console.log('✅ Voting power delegated successfully:', data.id)

      return data
    } catch (error) {
      console.error('❌ Error delegating voting power:', error)
      throw error
    }
  }

  /**
   * Get governance analytics
   */
  async getAnalytics(params: GovernanceAnalyticsParams): Promise<GovernanceAnalytics> {
    try {
      console.log('📊 Fetching governance analytics:', params)

      // Note: Using reports endpoint since there's no dedicated analytics endpoint
      const response = await apiClient.get<ApiResponse<GovernanceAnalytics>>(
        API_ENDPOINTS.reports.governance,
        { params }
      )

      const data = response.data.data!
      console.log('✅ Governance analytics loaded')

      return data
    } catch (error) {
      console.error('❌ Error loading governance analytics:', error)
      throw error
    }
  }
}

/**
 * Export singleton instance
 */
export const governanceRepository = new GovernanceApiRepository()
