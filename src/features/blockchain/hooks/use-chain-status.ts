/**
 * React Query hook for fetching specific chain status
 */

import { useQuery } from '@tanstack/react-query'
import { blockchainRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch specific chain status
 * @param chain - Blockchain network identifier (BTC, ETH, etc.)
 * @returns React Query result with chain status
 */
export function useChainStatus(chain: string) {
  return useQuery({
    queryKey: ['blockchain', 'chain-status', chain],
    queryFn: () => blockchainRepository.getChainStatus(chain),
    staleTime: 30000, // 30 seconds
    refetchInterval: 30000, // Auto-refresh every 30 seconds
    enabled: !!chain, // Only fetch if chain is provided
  })
}
