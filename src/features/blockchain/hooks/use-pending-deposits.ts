/**
 * React Query hook for fetching pending deposits
 */

import { useQuery } from '@tanstack/react-query'
import { blockchainRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch pending deposits
 * @returns React Query result with pending deposits array
 */
export function usePendingDeposits() {
  return useQuery({
    queryKey: ['blockchain', 'deposits', 'pending'],
    queryFn: () => blockchainRepository.getPendingDeposits(),
    staleTime: 15000, // 15 seconds
    refetchInterval: 15000, // Auto-refresh every 15 seconds
  })
}
