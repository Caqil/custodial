/**
 * React Query hook for staking report
 */

import { useQuery } from '@tanstack/react-query'
import { reportRepository } from '@/infrastructure/api/repositories'
import type { StakingReportRequest } from '@/core/entities/report.entity'

/**
 * Hook to generate staking report
 */
export function useStakingReport(request: StakingReportRequest, enabled = true) {
  return useQuery({
    queryKey: ['staking-report', request],
    queryFn: () => reportRepository.generateStakingReport(request),
    enabled,
    staleTime: 60000, // 1 minute
  })
}
