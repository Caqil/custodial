/**
 * Cold Storage Approve Dialog Component
 * Dialog for approving cold storage requests
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useApproveColdStorage } from '../hooks'
import type { ColdStorageRequest } from '@/core/entities/security.entity'
import { formatDistanceToNow } from 'date-fns'
import { AlertTriangle } from 'lucide-react'

interface ColdStorageApproveDialogProps {
  request: ColdStorageRequest | null
  open: boolean
  onClose: () => void
}

/**
 * Dialog for approving cold storage requests
 */
export function ColdStorageApproveDialog({ request, open, onClose }: ColdStorageApproveDialogProps) {
  const approveColdStorage = useApproveColdStorage()

  const handleApprove = async () => {
    if (!request) return

    await approveColdStorage.mutateAsync(request.id)
    onClose()
  }

  if (!request) return null

  const waitingPeriodEnded = new Date(request.waiting_period_ends_at) <= new Date()

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Cold Storage Request</DialogTitle>
          <DialogDescription>
            Review and approve this cold storage request
          </DialogDescription>
        </DialogHeader>

        {request && (
          <div className='space-y-4'>
            <div className='rounded-lg bg-muted p-4'>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground text-sm'>Request Type:</span>
                  <span className='font-medium'>{request.request_type}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground text-sm'>Wallet ID:</span>
                  <span className='font-mono text-xs'>{request.wallet_id}</span>
                </div>
                {request.amount && (
                  <div className='flex items-center justify-between'>
                    <span className='text-muted-foreground text-sm'>Amount:</span>
                    <span className='font-medium'>{request.amount}</span>
                  </div>
                )}
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground text-sm'>Approvers:</span>
                  <span className='font-medium'>
                    {request.current_approvers} / {request.required_approvers}
                  </span>
                </div>
              </div>
            </div>

            {!waitingPeriodEnded && (
              <div className='flex items-start gap-2 rounded-lg border border-yellow-500 bg-yellow-50 p-4'>
                <AlertTriangle className='h-5 w-5 text-yellow-600' />
                <div className='flex-1'>
                  <p className='font-medium text-yellow-900'>Waiting Period Active</p>
                  <p className='text-yellow-800 text-sm'>
                    The waiting period ends{' '}
                    {formatDistanceToNow(new Date(request.waiting_period_ends_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            )}

            {request.physical_verification_required && !request.physical_verification_completed && (
              <div className='flex items-start gap-2 rounded-lg border border-orange-500 bg-orange-50 p-4'>
                <AlertTriangle className='h-5 w-5 text-orange-600' />
                <div className='flex-1'>
                  <p className='font-medium text-orange-900'>Physical Verification Required</p>
                  <p className='text-orange-800 text-sm'>
                    This request requires physical verification before approval
                  </p>
                </div>
              </div>
            )}

            <div className='rounded-lg border p-4'>
              <h4 className='mb-2 font-medium'>Approval Confirmation</h4>
              <p className='text-muted-foreground text-sm'>
                By approving this request, you confirm that you have verified all security requirements
                and authorize this cold storage operation.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            disabled={
              approveColdStorage.isPending ||
              !waitingPeriodEnded ||
              (request.physical_verification_required && !request.physical_verification_completed)
            }
          >
            {approveColdStorage.isPending ? 'Approving...' : 'Approve Request'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
