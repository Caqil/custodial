/**
 * React Query mutation hook for retrying failed transaction
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { transactionRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to retry failed transaction
 * @returns React Query mutation for retrying transaction
 */
export function useTransactionRetry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => transactionRepository.retry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['transaction'] })
      queryClient.invalidateQueries({ queryKey: ['transaction-statistics'] })
      toast.success('Transaction retry initiated successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to retry transaction: ${error.message}`)
    },
  })
}
