/**
 * React Query hook for fetching all network status
 */

import { useQuery } from '@tanstack/react-query'
import { blockchainRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch all network status
 * @returns React Query result with network status array
 */
export function useNetworks() {
  return useQuery({
    queryKey: ['blockchain', 'networks'],
    queryFn: () => blockchainRepository.getNetworks(),
    staleTime: 30000, // 30 seconds
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  })
}
