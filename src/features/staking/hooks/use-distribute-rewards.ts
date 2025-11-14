/**
 * React Query mutation hook for distributing staking rewards
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { stakingRepository } from '@/infrastructure/api/repositories'
import type { DistributeRewardsRequest } from '@/infrastructure/api/repositories/staking-api.repository'
import { toast } from 'sonner'

/**
 * Hook to distribute staking rewards
 * @returns Mutation object with distributeRewards function
 */
export function useDistributeRewards() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: DistributeRewardsRequest) =>
      stakingRepository.distributeRewards(request),
    onSuccess: () => {
      // Invalidate and refetch rewards and positions
      queryClient.invalidateQueries({ queryKey: ['staking-rewards'] })
      queryClient.invalidateQueries({ queryKey: ['staking-positions'] })
      queryClient.invalidateQueries({ queryKey: ['staking-analytics'] })
      toast.success('Rewards distributed successfully')
    },
    onError: (error: Error) => {
      console.error('Failed to distribute rewards:', error)
      toast.error(error.message || 'Failed to distribute rewards')
    },
  })
}
