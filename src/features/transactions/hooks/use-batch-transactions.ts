/**
 * React Query hook for fetching transactions in a batch
 */

import { useQuery } from '@tanstack/react-query'
import { transactionBatchRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch transactions in a batch
 * @param batchId - Batch ID
 * @param enabled - Whether to enable the query
 * @returns React Query result with batch transactions
 */
export function useBatchTransactions(batchId: string, enabled = true) {
  return useQuery({
    queryKey: ['batch-transactions', batchId],
    queryFn: () => transactionBatchRepository.getTransactions(batchId),
    enabled: enabled && !!batchId,
    staleTime: 30000, // 30 seconds
  })
}
