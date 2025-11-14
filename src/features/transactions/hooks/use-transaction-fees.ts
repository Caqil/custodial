/**
 * React Query hook for fetching transaction fees summary
 */

import { useQuery } from '@tanstack/react-query'
import { transactionRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch transaction fees summary
 * @param params - Optional date range filter
 * @returns React Query result with fees summary
 */
export function useTransactionFees(params?: {
  start_date?: string
  end_date?: string
}) {
  return useQuery({
    queryKey: ['transaction-fees', params],
    queryFn: () => transactionRepository.getFeesSummary(params),
    staleTime: 60000, // 1 minute
  })
}
