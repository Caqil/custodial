/**
 * React Query hook for fetching cold storage requests
 */

import { useQuery } from '@tanstack/react-query'
import { securityRepository } from '@/infrastructure/api/repositories'
import type { ColdStorageRequestListParams } from '@/core/entities/security.entity'

/**
 * Hook to fetch cold storage requests with filtering
 * @param params - Query parameters (wallet_id, status, request_type)
 * @returns React Query result with cold storage requests list
 */
export function useColdStorageRequests(params: ColdStorageRequestListParams = {}) {
  return useQuery({
    queryKey: ['cold-storage-requests', params],
    queryFn: () => securityRepository.getColdStorageRequests(params),
    staleTime: 30000, // 30 seconds
  })
}
