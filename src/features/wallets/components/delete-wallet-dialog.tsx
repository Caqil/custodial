/**
 * Delete Wallet Dialog Component
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
import { useDeleteWallet } from '../hooks'
import type { Wallet } from '@/core/entities/wallet.entity'

interface DeleteWalletDialogProps {
  wallet: Wallet | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteWalletDialog({ wallet, open, onOpenChange }: DeleteWalletDialogProps) {
  const deleteWalletMutation = useDeleteWallet()

  const handleDelete = async () => {
    if (!wallet) return
    try {
      await deleteWalletMutation.mutateAsync(wallet.id)
      onOpenChange(false)
    } catch (error) {
      // Error handled by mutation
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Wallet</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete wallet "{wallet?.name}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className='bg-red-600 hover:bg-red-700'>
            {deleteWalletMutation.isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
