/**
 * React Query hook for fetching withdrawal list
 */

import { useQuery } from '@tanstack/react-query'
import { blockchainRepository } from '@/infrastructure/api/repositories'
import type { WithdrawalBroadcastListParams } from '@/core/entities/blockchain.entity'

/**
 * Hook to fetch withdrawals list with pagination and filters
 * @param params - Query parameters (offset, limit, filters)
 * @returns React Query result with withdrawals list
 */
export function useWithdrawals(params: WithdrawalBroadcastListParams = {}) {
  return useQuery({
    queryKey: ['blockchain', 'withdrawals', params],
    queryFn: () => blockchainRepository.getWithdrawals(params),
    staleTime: 30000, // 30 seconds
  })
}
