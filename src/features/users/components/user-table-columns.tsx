/**
 * User Table Column Definitions
 * Defines columns for the user data table with sortable headers
 */

import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'
import { UserStatusBadge } from './user-status-badge'
import type { User } from '@/core/entities/user.entity'
import { formatDate } from '@/lib/utils'

interface UserTableActionsProps {
  user: User
  onViewDetails: (user: User) => void
  onUpdateStatus: (user: User) => void
  onResetPassword: (user: User) => void
  onDelete: (user: User) => void
}

function UserTableActions({
  user,
  onViewDetails,
  onUpdateStatus,
  onResetPassword,
  onDelete,
}: UserTableActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onViewDetails(user)}>
          View details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
          Copy user ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onUpdateStatus(user)}>
          Update status
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onResetPassword(user)}>
          Reset password
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onDelete(user)}
          className='text-destructive'
        >
          Delete user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface GetUserColumnsParams {
  onViewDetails: (user: User) => void
  onUpdateStatus: (user: User) => void
  onResetPassword: (user: User) => void
  onDelete: (user: User) => void
}

/**
 * Get user table column definitions
 */
export function getUserColumns({
  onViewDetails,
  onUpdateStatus,
  onResetPassword,
  onDelete,
}: GetUserColumnsParams): ColumnDef<User>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        const email = row.getValue('email') as string
        const orgName = row.original.organization_name

        return (
          <div className='flex flex-col'>
            <span className='font-medium'>{email}</span>
            {orgName && (
              <span className='text-muted-foreground text-xs'>{orgName}</span>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Status
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <UserStatusBadge status={row.getValue('status')} />
      },
    },
    {
      accessorKey: 'role',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Role
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        const role = row.getValue('role') as string
        return <span className='capitalize'>{role}</span>
      },
    },
    {
      accessorKey: 'mfa_enabled',
      header: 'MFA',
      cell: ({ row }) => {
        const mfaEnabled = row.getValue('mfa_enabled') as boolean
        return (
          <span className={mfaEnabled ? 'text-green-600' : 'text-muted-foreground'}>
            {mfaEnabled ? 'Enabled' : 'Disabled'}
          </span>
        )
      },
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Created
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = row.getValue('created_at') as string
        return <span className='text-muted-foreground'>{formatDate(date)}</span>
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <UserTableActions
          user={row.original}
          onViewDetails={onViewDetails}
          onUpdateStatus={onUpdateStatus}
          onResetPassword={onResetPassword}
          onDelete={onDelete}
        />
      ),
    },
  ]
}
