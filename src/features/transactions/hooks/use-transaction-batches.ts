/**
 * React Query hook for fetching transaction batches list
 */

import { useQuery } from '@tanstack/react-query'
import { transactionBatchRepository } from '@/infrastructure/api/repositories'
import type { TransactionBatchListParams } from '@/core/entities/transaction.entity'

/**
 * Hook to fetch transaction batches list
 * @param params - Query parameters (offset, limit, filters)
 * @returns React Query result with batches list
 */
export function useTransactionBatches(params: TransactionBatchListParams = {}) {
  return useQuery({
    queryKey: ['transaction-batches', params],
    queryFn: () => transactionBatchRepository.list(params),
    staleTime: 30000, // 30 seconds
  })
}
