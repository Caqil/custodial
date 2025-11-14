/**
 * React Query hook for fetching paginated transactions list
 */

import { useQuery } from '@tanstack/react-query'
import { transactionRepository } from '@/infrastructure/api/repositories'
import type { TransactionListParams } from '@/infrastructure/api/repositories/transaction-api.repository'

/**
 * Hook to fetch transactions list with pagination and filters
 * @param params - Query parameters (offset, limit, filters)
 * @returns React Query result with transactions list
 */
export function useTransactions(params: TransactionListParams = {}) {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => transactionRepository.list(params),
    staleTime: 30000, // 30 seconds
  })
}
