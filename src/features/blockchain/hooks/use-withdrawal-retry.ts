/**
 * React Query mutation hook for retrying failed withdrawals
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { blockchainRepository } from '@/infrastructure/api/repositories'
import { toast } from 'sonner'

/**
 * Hook to retry a failed withdrawal
 * @returns React Query mutation result
 */
export function useWithdrawalRetry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => blockchainRepository.retryWithdrawal(id),
    onSuccess: (data) => {
      toast.success('Withdrawal retry initiated successfully')
      // Invalidate and refetch withdrawals
      queryClient.invalidateQueries({ queryKey: ['blockchain', 'withdrawals'] })
    },
    onError: (error: Error) => {
      toast.error(`Failed to retry withdrawal: ${error.message}`)
    },
  })
}
