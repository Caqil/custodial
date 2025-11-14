/**
 * Session Terminate Dialog Component
 * Dialog for terminating user sessions
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
import { useTerminateSession } from '../hooks'
import type { Session } from '@/core/entities/security.entity'
import { AlertTriangle } from 'lucide-react'

interface SessionTerminateDialogProps {
  session: Session | null
  open: boolean
  onClose: () => void
}

/**
 * Dialog for terminating sessions
 */
export function SessionTerminateDialog({ session, open, onClose }: SessionTerminateDialogProps) {
  const terminateSession = useTerminateSession()

  const handleTerminate = async () => {
    if (!session) return

    await terminateSession.mutateAsync(session.id)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terminate Session</DialogTitle>
          <DialogDescription>
            This will immediately end the user's session
          </DialogDescription>
        </DialogHeader>

        {session && (
          <div className='space-y-4'>
            <div className='flex items-start gap-2 rounded-lg border border-yellow-500 bg-yellow-50 p-4'>
              <AlertTriangle className='h-5 w-5 text-yellow-600' />
              <div className='flex-1'>
                <p className='font-medium text-yellow-900'>Warning</p>
                <p className='text-yellow-800 text-sm'>
                  The user will be logged out immediately and will need to authenticate again.
                </p>
              </div>
            </div>

            <div className='rounded-lg bg-muted p-4'>
              <div className='space-y-2 text-sm'>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>User ID:</span>
                  <span className='font-mono text-xs'>{session.user_id}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>IP Address:</span>
                  <span className='font-mono text-xs'>{session.ip_address}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>User Agent:</span>
                  <span className='truncate text-xs'>{session.user_agent}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={handleTerminate}
            disabled={terminateSession.isPending}
          >
            {terminateSession.isPending ? 'Terminating...' : 'Terminate Session'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
