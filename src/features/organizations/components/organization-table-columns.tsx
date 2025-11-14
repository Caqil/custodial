/**
 * Organization Table Column Definitions
 */

import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import type { Organization } from '@/core/entities/organization.entity'
import { formatDate } from '@/lib/utils'

interface OrganizationTableActionsProps {
  organization: Organization
  onViewStats: (organization: Organization) => void
}

function OrganizationTableActions({
  organization,
  onViewStats,
}: OrganizationTableActionsProps) {
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
        <DropdownMenuItem onClick={() => onViewStats(organization)}>
          View statistics
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(organization.id)}
        >
          Copy organization ID
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface GetOrganizationColumnsParams {
  onViewStats: (organization: Organization) => void
}

/**
 * Get organization table column definitions
 */
export function getOrganizationColumns({
  onViewStats,
}: GetOrganizationColumnsParams): ColumnDef<Organization>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Organization Name
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <span className='font-medium'>{row.getValue('name')}</span>
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => {
        return <span className='text-muted-foreground'>{row.getValue('email')}</span>
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return (
          <Badge
            variant={status === 'active' ? 'default' : 'secondary'}
            className={
              status === 'active' ? 'bg-green-500 hover:bg-green-600' : ''
            }
          >
            {status}
          </Badge>
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
        <OrganizationTableActions
          organization={row.original}
          onViewStats={onViewStats}
        />
      ),
    },
  ]
}
