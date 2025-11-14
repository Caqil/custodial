/**
 * React Query hook for fetching pending withdrawals
 */

import { useQuery } from '@tanstack/react-query'
import { blockchainRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch pending withdrawals
 * @returns React Query result with pending withdrawals array
 */
export function usePendingWithdrawals() {
  return useQuery({
    queryKey: ['blockchain', 'withdrawals', 'pending'],
    queryFn: () => blockchainRepository.getPendingWithdrawals(),
    staleTime: 15000, // 15 seconds
    refetchInterval: 15000, // Auto-refresh every 15 seconds
  })
}
