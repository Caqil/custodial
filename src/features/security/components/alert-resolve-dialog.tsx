/**
 * Alert Resolve Dialog Component
 * Dialog for resolving security alerts with notes
 */

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useResolveAlert } from '../hooks'
import type { SecurityAlert } from '@/core/entities/security.entity'

interface AlertResolveDialogProps {
  alert: SecurityAlert | null
  open: boolean
  onClose: () => void
}

/**
 * Dialog for resolving security alerts
 */
export function AlertResolveDialog({ alert, open, onClose }: AlertResolveDialogProps) {
  const [notes, setNotes] = useState('')
  const resolveAlert = useResolveAlert()

  const handleResolve = async () => {
    if (!alert) return

    await resolveAlert.mutateAsync({
      id: alert.id,
      data: {
        resolution_notes: notes,
        resolved_by: 'admin', // This should come from auth context
      },
    })

    setNotes('')
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resolve Security Alert</DialogTitle>
          <DialogDescription>
            Add resolution notes for this alert
          </DialogDescription>
        </DialogHeader>

        {alert && (
          <div className='space-y-4'>
            <div className='rounded-lg bg-muted p-4'>
              <p className='font-medium'>{alert.description}</p>
              <p className='text-muted-foreground mt-1 text-sm'>
                Type: {alert.alert_type} • Severity: {alert.severity}
              </p>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='notes'>Resolution Notes</Label>
              <Textarea
                id='notes'
                placeholder='Describe how this alert was resolved...'
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleResolve}
            disabled={resolveAlert.isPending}
          >
            {resolveAlert.isPending ? 'Resolving...' : 'Resolve Alert'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
