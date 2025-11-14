/**
 * React Query hook for fetching a single staking position by ID
 */

import { useQuery } from '@tanstack/react-query'
import { stakingRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch staking position details by ID
 * @param id - Staking position ID
 * @param enabled - Whether to enable the query
 * @returns React Query result with staking position details
 */
export function useStakingPosition(id: string, enabled = true) {
  return useQuery({
    queryKey: ['staking-position', id],
    queryFn: () => stakingRepository.getPositionById(id),
    enabled: enabled && !!id,
    staleTime: 30000, // 30 seconds
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  })
}
