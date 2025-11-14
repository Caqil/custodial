/**
 * React Query hook for fetching deposit list
 */

import { useQuery } from '@tanstack/react-query'
import { blockchainRepository } from '@/infrastructure/api/repositories'
import type { DepositDetectionListParams } from '@/core/entities/blockchain.entity'

/**
 * Hook to fetch deposits list with pagination and filters
 * @param params - Query parameters (offset, limit, filters)
 * @returns React Query result with deposits list
 */
export function useDeposits(params: DepositDetectionListParams = {}) {
  return useQuery({
    queryKey: ['blockchain', 'deposits', params],
    queryFn: () => blockchainRepository.getDeposits(params),
    staleTime: 30000, // 30 seconds
  })
}
