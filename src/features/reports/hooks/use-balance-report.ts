/**
 * React Query hook for balance report
 */

import { useQuery } from '@tanstack/react-query'
import { reportRepository } from '@/infrastructure/api/repositories'
import type { BalanceReportRequest } from '@/core/entities/wallet.entity'

/**
 * Hook to generate balance report
 */
export function useBalanceReport(request: BalanceReportRequest, enabled = true) {
  return useQuery({
    queryKey: ['balance-report', request],
    queryFn: () => reportRepository.generateBalanceReport(request),
    enabled,
    staleTime: 60000, // 1 minute
  })
}
