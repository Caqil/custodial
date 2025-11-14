/**
 * React Query mutation hook for creating wallet
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { walletRepository } from '@/infrastructure/api/repositories'
import type { CreateWalletRequest } from '@/core/entities/wallet.entity'

/**
 * Hook to create new wallet
 * @returns React Query mutation for wallet creation
 */
export function useCreateWallet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: CreateWalletRequest) => walletRepository.create(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
      queryClient.invalidateQueries({ queryKey: ['wallet-statistics'] })
      toast.success('Wallet created successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to create wallet: ${error.message}`)
    },
  })
}
