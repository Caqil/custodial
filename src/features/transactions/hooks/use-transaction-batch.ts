/**
 * React Query hook for fetching single transaction batch by ID
 */

import { useQuery } from '@tanstack/react-query'
import { transactionBatchRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch transaction batch by ID
 * @param id - Batch ID
 * @param enabled - Whether to enable the query
 * @returns React Query result with batch details
 */
export function useTransactionBatch(id: string, enabled = true) {
  return useQuery({
    queryKey: ['transaction-batch', id],
    queryFn: () => transactionBatchRepository.getById(id),
    enabled: enabled && !!id,
    staleTime: 30000, // 30 seconds
  })
}
