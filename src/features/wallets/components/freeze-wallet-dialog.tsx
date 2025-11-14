/**
 * Freeze Wallet Dialog Component
 */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useFreezeWallet } from '../hooks'
import type { Wallet } from '@/core/entities/wallet.entity'

interface FreezeWalletDialogProps {
  wallet: Wallet | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FreezeWalletDialog({ wallet, open, onOpenChange }: FreezeWalletDialogProps) {
  const freezeWalletMutation = useFreezeWallet()

  const handleFreeze = async () => {
    if (!wallet) return
    try {
      await freezeWalletMutation.mutateAsync(wallet.id)
      onOpenChange(false)
    } catch (error) {
      // Error handled by mutation
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Freeze Wallet</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to freeze wallet "{wallet?.name}"? No transactions will be allowed until unfrozen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleFreeze}>
            {freezeWalletMutation.isPending ? 'Freezing...' : 'Freeze'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
