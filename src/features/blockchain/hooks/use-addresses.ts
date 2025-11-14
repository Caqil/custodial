/**
 * React Query hook for fetching blockchain addresses
 */

import { useQuery } from '@tanstack/react-query'
import { blockchainRepository } from '@/infrastructure/api/repositories'
import type { AddressListParams } from '@/infrastructure/api/repositories/blockchain-api.repository'

/**
 * Hook to fetch addresses list with pagination and filters
 * @param params - Query parameters (offset, limit, filters)
 * @returns React Query result with addresses list
 */
export function useAddresses(params: AddressListParams = {}) {
  return useQuery({
    queryKey: ['blockchain', 'addresses', params],
    queryFn: () => blockchainRepository.getAddresses(params),
    staleTime: 30000, // 30 seconds
  })
}
