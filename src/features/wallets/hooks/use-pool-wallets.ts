/**
 * React Query hook for fetching pool wallet relationships
 */

import { useQuery } from '@tanstack/react-query'
import { poolWalletRepository } from '@/infrastructure/api/repositories'
import type { PooledWalletRelationshipListParams } from '@/core/entities/pool.entity'

/**
 * Hook to fetch pool wallet relationships
 * @param params - Query parameters (parent_wallet_id, filters)
 * @returns React Query result with relationships list
 */
export function usePoolWallets(params: PooledWalletRelationshipListParams = {}) {
  return useQuery({
    queryKey: ['pool-wallets', params],
    queryFn: () => poolWalletRepository.listRelationships(params),
    staleTime: 30000, // 30 seconds
  })
}
