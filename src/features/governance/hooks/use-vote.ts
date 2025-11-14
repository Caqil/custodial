/**
 * React Query mutation hook for casting vote
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { governanceRepository } from '@/infrastructure/api/repositories'
import type { CastVoteRequest } from '@/core/entities/governance.entity'
import { toast } from 'sonner'

/**
 * Hook to cast a vote on a proposal
 * @returns React Query mutation for casting vote
 */
export function useVote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ proposalId, ...request }: CastVoteRequest & { proposalId: string }) =>
      governanceRepository.vote(proposalId, request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['governance-proposals'] })
      queryClient.invalidateQueries({ queryKey: ['governance-proposal', variables.proposalId] })
      queryClient.invalidateQueries({ queryKey: ['governance-votes'] })
      toast.success('Vote cast successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to cast vote: ${error.message}`)
    },
  })
}
