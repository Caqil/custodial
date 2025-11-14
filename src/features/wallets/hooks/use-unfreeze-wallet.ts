/**
 * React Query mutation hook for unfreezing wallet
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { walletRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to unfreeze wallet
 * @returns React Query mutation for unfreezing wallet
 */
export function useUnfreezeWallet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (walletId: string) => walletRepository.unfreeze(walletId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
      queryClient.invalidateQueries({ queryKey: ['wallet'] })
      toast.success('Wallet unfrozen successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to unfreeze wallet: ${error.message}`)
    },
  })
}
