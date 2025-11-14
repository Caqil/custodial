/**
 * React Query mutation hook for creating a new staking pool
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { stakingRepository } from '@/infrastructure/api/repositories'
import type { CreateStakingPoolRequest } from '@/infrastructure/api/repositories/staking-api.repository'
import { toast } from 'sonner'

/**
 * Hook to create a new staking pool
 * @returns Mutation object with createPool function
 */
export function useCreateStakingPool() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: CreateStakingPoolRequest) =>
      stakingRepository.createPool(request),
    onSuccess: () => {
      // Invalidate and refetch pools list
      queryClient.invalidateQueries({ queryKey: ['staking-pools'] })
      toast.success('Staking pool created successfully')
    },
    onError: (error: Error) => {
      console.error('Failed to create staking pool:', error)
      toast.error(error.message || 'Failed to create staking pool')
    },
  })
}
