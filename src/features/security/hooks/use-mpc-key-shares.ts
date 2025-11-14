/**
 * React Query hook for fetching MPC key shares
 */

import { useQuery } from '@tanstack/react-query'
import { securityRepository } from '@/infrastructure/api/repositories'
import type { MPCKeyShareListParams } from '@/infrastructure/api/repositories/security-api.repository'

/**
 * Hook to fetch MPC key shares with filtering
 * @param params - Query parameters (wallet_id, storage_location, is_online)
 * @returns React Query result with MPC key shares list
 */
export function useMPCKeyShares(params: MPCKeyShareListParams = {}) {
  return useQuery({
    queryKey: ['mpc-key-shares', params],
    queryFn: () => securityRepository.getMPCKeyShares(params),
    staleTime: 60000, // 60 seconds
  })
}
