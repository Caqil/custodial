/**
 * Unfreeze Wallet Dialog Component
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
import { useUnfreezeWallet } from '../hooks'
import type { Wallet } from '@/core/entities/wallet.entity'

interface UnfreezeWalletDialogProps {
  wallet: Wallet | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UnfreezeWalletDialog({ wallet, open, onOpenChange }: UnfreezeWalletDialogProps) {
  const unfreezeWalletMutation = useUnfreezeWallet()

  const handleUnfreeze = async () => {
    if (!wallet) return
    try {
      await unfreezeWalletMutation.mutateAsync(wallet.id)
      onOpenChange(false)
    } catch (error) {
      // Error handled by mutation
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unfreeze Wallet</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to unfreeze wallet "{wallet?.name}"? Transactions will be allowed again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleUnfreeze}>
            {unfreezeWalletMutation.isPending ? 'Unfreezing...' : 'Unfreeze'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
