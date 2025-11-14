/**
 * React Query mutation hook for cancelling transaction
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { transactionRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to cancel transaction
 * @returns React Query mutation for cancelling transaction
 */
export function useTransactionCancel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      transactionRepository.cancel(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['transaction'] })
      queryClient.invalidateQueries({ queryKey: ['transaction-statistics'] })
      toast.success('Transaction cancelled successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to cancel transaction: ${error.message}`)
    },
  })
}
