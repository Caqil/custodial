/**
 * React Query mutation hook for creating governance proposal
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { governanceRepository } from '@/infrastructure/api/repositories'
import type { CreateGovernanceProposalRequest } from '@/core/entities/governance.entity'
import { toast } from 'sonner'

/**
 * Hook to create a new governance proposal
 * @returns React Query mutation for creating proposal
 */
export function useCreateProposal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: CreateGovernanceProposalRequest) =>
      governanceRepository.createProposal(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['governance-proposals'] })
      toast.success('Proposal created successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to create proposal: ${error.message}`)
    },
  })
}
