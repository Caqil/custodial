/**
 * React Query hook for fetching internal transfers
 */

import { useQuery } from '@tanstack/react-query'
import { poolWalletRepository } from '@/infrastructure/api/repositories'
import type { InternalTransferListParams } from '@/core/entities/pool.entity'

/**
 * Hook to fetch internal transfers
 * @param params - Query parameters (source, destination, status, etc.)
 * @returns React Query result with transfers list
 */
export function useInternalTransfers(params: InternalTransferListParams = {}) {
  return useQuery({
    queryKey: ['internal-transfers', params],
    queryFn: () => poolWalletRepository.getTransfers(params),
    staleTime: 30000, // 30 seconds
  })
}
