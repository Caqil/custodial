/**
 * React Query mutation hook for updating wallet
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { walletRepository } from '@/infrastructure/api/repositories'
import type { UpdateWalletRequest } from '@/core/entities/wallet.entity'

interface UpdateWalletVariables {
  walletId: string
  request: UpdateWalletRequest
}

/**
 * Hook to update wallet
 * @returns React Query mutation for wallet update
 */
export function useUpdateWallet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ walletId, request }: UpdateWalletVariables) =>
      walletRepository.update(walletId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
      queryClient.invalidateQueries({ queryKey: ['wallet'] })
      toast.success('Wallet updated successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to update wallet: ${error.message}`)
    },
  })
}
