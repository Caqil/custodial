/**
 * React Query mutation hook for rejecting transaction
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { transactionRepository } from '@/infrastructure/api/repositories'
import type { TransactionApprovalRequest } from '@/infrastructure/api/repositories/transaction-api.repository'

/**
 * Hook to reject transaction
 * @returns React Query mutation for rejecting transaction
 */
export function useTransactionReject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TransactionApprovalRequest }) =>
      transactionRepository.reject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['transaction'] })
      queryClient.invalidateQueries({ queryKey: ['transaction-statistics'] })
      queryClient.invalidateQueries({ queryKey: ['transaction-approvals'] })
      toast.success('Transaction rejected successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to reject transaction: ${error.message}`)
    },
  })
}
