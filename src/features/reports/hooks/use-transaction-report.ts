/**
 * React Query hook for transaction report
 */

import { useQuery } from '@tanstack/react-query'
import { reportRepository } from '@/infrastructure/api/repositories'
import type { TransactionReportRequest } from '@/core/entities/transaction.entity'

/**
 * Hook to generate transaction report
 */
export function useTransactionReport(request: TransactionReportRequest, enabled = true) {
  return useQuery({
    queryKey: ['transaction-report', request],
    queryFn: () => reportRepository.generateTransactionReport(request),
    enabled,
    staleTime: 60000, // 1 minute
  })
}
