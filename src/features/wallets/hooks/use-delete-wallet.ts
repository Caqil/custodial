/**
 * React Query mutation hook for deleting wallet
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { walletRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to delete wallet
 * @returns React Query mutation for wallet deletion
 */
export function useDeleteWallet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (walletId: string) => walletRepository.delete(walletId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
      queryClient.invalidateQueries({ queryKey: ['wallet-statistics'] })
      toast.success('Wallet deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete wallet: ${error.message}`)
    },
  })
}
