/**
 * React Query hook for fetching single transaction by ID
 */

import { useQuery } from '@tanstack/react-query'
import { transactionRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch transaction by ID
 * @param id - Transaction ID
 * @param enabled - Whether to enable the query
 * @returns React Query result with transaction details
 */
export function useTransaction(id: string, enabled = true) {
  return useQuery({
    queryKey: ['transaction', id],
    queryFn: () => transactionRepository.getById(id),
    enabled: enabled && !!id,
    staleTime: 30000, // 30 seconds
  })
}
