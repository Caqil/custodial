/**
 * User Status Update Dialog Component
 * Dialog for changing user status (active/inactive/suspended/locked)
 */

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UserStatus } from '@/core/entities/user.entity'
import { useUpdateUserStatus } from '../hooks'
import type { User } from '@/core/entities/user.entity'

interface UserStatusUpdateDialogProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Dialog for updating user status
 */
export function UserStatusUpdateDialog({
  user,
  open,
  onOpenChange,
}: UserStatusUpdateDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | ''>('')
  const updateStatusMutation = useUpdateUserStatus()

  const handleSubmit = async () => {
    if (!user || !selectedStatus) return

    await updateStatusMutation.mutateAsync({
      userId: user.id,
      request: { status: selectedStatus },
    })

    onOpenChange(false)
    setSelectedStatus('')
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setSelectedStatus('')
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User Status</DialogTitle>
          <DialogDescription>
            Change the status of {user?.email}
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='status'>New Status</Label>
            <Select
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value as UserStatus)}
            >
              <SelectTrigger id='status'>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={UserStatus.Active}>Active</SelectItem>
                <SelectItem value={UserStatus.Inactive}>Inactive</SelectItem>
                <SelectItem value={UserStatus.Suspended}>Suspended</SelectItem>
                <SelectItem value={UserStatus.Locked}>Locked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedStatus === UserStatus.Suspended && (
            <div className='bg-orange-50 dark:bg-orange-900/20 rounded-md border border-orange-200 dark:border-orange-800 p-3'>
              <p className='text-sm text-orange-800 dark:text-orange-200'>
                Suspended users cannot access the system but can be reactivated later.
              </p>
            </div>
          )}

          {selectedStatus === UserStatus.Locked && (
            <div className='bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800 p-3'>
              <p className='text-sm text-red-800 dark:text-red-200'>
                Locked users cannot access the system due to security concerns.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => handleOpenChange(false)}
            disabled={updateStatusMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedStatus || updateStatusMutation.isPending}
          >
            {updateStatusMutation.isPending && (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            )}
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
