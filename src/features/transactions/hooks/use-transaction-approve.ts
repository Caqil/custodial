/**
 * React Query mutation hook for approving transaction
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { transactionRepository } from '@/infrastructure/api/repositories'
import type { TransactionApprovalRequest } from '@/infrastructure/api/repositories/transaction-api.repository'

/**
 * Hook to approve transaction
 * @returns React Query mutation for approving transaction
 */
export function useTransactionApprove() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TransactionApprovalRequest }) =>
      transactionRepository.approve(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['transaction'] })
      queryClient.invalidateQueries({ queryKey: ['transaction-statistics'] })
      queryClient.invalidateQueries({ queryKey: ['transaction-approvals'] })
      toast.success('Transaction approved successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to approve transaction: ${error.message}`)
    },
  })
}
