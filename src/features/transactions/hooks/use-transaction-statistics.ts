/**
 * React Query hook for fetching transaction statistics
 */

import { useQuery } from '@tanstack/react-query'
import { transactionRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch transaction statistics
 * @param params - Optional date range filter
 * @returns React Query result with transaction statistics
 */
export function useTransactionStatistics(params?: {
  start_date?: string
  end_date?: string
}) {
  return useQuery({
    queryKey: ['transaction-statistics', params],
    queryFn: () => transactionRepository.getStatistics(params),
    staleTime: 60000, // 1 minute
  })
}
