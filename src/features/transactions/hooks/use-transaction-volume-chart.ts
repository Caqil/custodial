/**
 * React Query hook for fetching transaction volume chart data
 */

import { useQuery } from '@tanstack/react-query'
import { transactionRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch transaction volume chart data
 * @param params - Date range and interval
 * @returns React Query result with volume chart data
 */
export function useTransactionVolumeChart(params: {
  start_date: string
  end_date: string
  interval?: 'day' | 'week' | 'month'
}) {
  return useQuery({
    queryKey: ['transaction-volume-chart', params],
    queryFn: () => transactionRepository.getVolumeChart(params),
    staleTime: 60000, // 1 minute
    enabled: !!params.start_date && !!params.end_date,
  })
}
