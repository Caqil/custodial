/**
 * React Query mutation hook for freezing wallet
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { walletRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to freeze wallet
 * @returns React Query mutation for freezing wallet
 */
export function useFreezeWallet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (walletId: string) => walletRepository.freeze(walletId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
      queryClient.invalidateQueries({ queryKey: ['wallet'] })
      toast.success('Wallet frozen successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to freeze wallet: ${error.message}`)
    },
  })
}
