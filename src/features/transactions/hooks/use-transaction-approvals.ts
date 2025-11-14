/**
 * React Query hook for fetching transaction approvals
 */

import { useQuery } from '@tanstack/react-query'
import { transactionApprovalRepository } from '@/infrastructure/api/repositories'
import type { ApprovalListParams } from '@/infrastructure/api/repositories/transaction-approval-api.repository'

/**
 * Hook to fetch pending transaction approvals
 * @param params - Query parameters
 * @returns React Query result with pending approvals
 */
export function useTransactionApprovals(params: ApprovalListParams = {}) {
  return useQuery({
    queryKey: ['transaction-approvals', params],
    queryFn: () => transactionApprovalRepository.getPending(params),
    staleTime: 30000, // 30 seconds
  })
}
