/**
 * React Query hook for governance report
 */

import { useQuery } from '@tanstack/react-query'
import { reportRepository } from '@/infrastructure/api/repositories'
import type { GovernanceReportRequest } from '@/core/entities/report.entity'

/**
 * Hook to generate governance report
 */
export function useGovernanceReport(request: GovernanceReportRequest, enabled = true) {
  return useQuery({
    queryKey: ['governance-report', request],
    queryFn: () => reportRepository.generateGovernanceReport(request),
    enabled,
    staleTime: 60000, // 1 minute
  })
}
