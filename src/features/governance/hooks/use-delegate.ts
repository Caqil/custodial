/**
 * React Query mutation hook for delegating voting power
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { governanceRepository } from '@/infrastructure/api/repositories'
import type { CreateDelegationRequest } from '@/core/entities/governance.entity'
import { toast } from 'sonner'

/**
 * Hook to delegate voting power
 * @returns React Query mutation for delegating voting power
 */
export function useDelegate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: CreateDelegationRequest) =>
      governanceRepository.delegate(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['governance-delegations'] })
      toast.success('Voting power delegated successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to delegate voting power: ${error.message}`)
    },
  })
}
