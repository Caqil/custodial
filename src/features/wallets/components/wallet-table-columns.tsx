/**
 * Wallet Table Columns Definition
 * Column definitions for wallet data table
 */

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Eye, Edit, Trash2, Snowflake, Flame } from 'lucide-react'
import { WalletTypeBadge } from './wallet-type-badge'
import { WalletStatusBadge } from './wallet-status-badge'
import type { Wallet } from '@/core/entities/wallet.entity'

interface WalletColumnsProps {
  onViewDetails: (wallet: Wallet) => void
  onEdit: (wallet: Wallet) => void
  onFreeze: (wallet: Wallet) => void
  onUnfreeze: (wallet: Wallet) => void
  onDelete: (wallet: Wallet) => void
}

/**
 * Get wallet table columns with action handlers
 */
export function getWalletColumns({
  onViewDetails,
  onEdit,
  onFreeze,
  onUnfreeze,
  onDelete,
}: WalletColumnsProps): ColumnDef<Wallet>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        const wallet = row.original
        return (
          <div className='flex flex-col'>
            <span className='font-medium'>{wallet.name}</span>
            <span className='text-muted-foreground text-xs'>{wallet.id.slice(0, 8)}...</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => {
        const wallet = row.original
        return <WalletTypeBadge type={wallet.type} isPoolParent={wallet.is_pool_parent} />
      },
    },
    {
      accessorKey: 'currency',
      header: 'Currency',
      cell: ({ row }) => {
        return <span className='font-mono font-semibold'>{row.original.currency}</span>
      },
    },
    {
      accessorKey: 'balance',
      header: 'Balance',
      cell: ({ row }) => {
        const wallet = row.original
        const available = parseFloat(wallet.balance) - parseFloat(wallet.locked_balance)
        return (
          <div className='flex flex-col'>
            <span className='font-mono text-sm'>
              {parseFloat(wallet.balance).toFixed(8)} {wallet.currency}
            </span>
            <span className='text-muted-foreground text-xs'>
              Available: {available.toFixed(8)}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'locked_balance',
      header: 'Locked',
      cell: ({ row }) => {
        const wallet = row.original
        return (
          <span className='font-mono text-sm'>
            {parseFloat(wallet.locked_balance).toFixed(8)}
          </span>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return <WalletStatusBadge status={row.original.status} />
      },
    },
    {
      accessorKey: 'organization_id',
      header: 'Organization',
      cell: ({ row }) => {
        return (
          <span className='text-muted-foreground text-sm'>
            {row.original.organization_id.slice(0, 8)}...
          </span>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const wallet = row.original
        const isFrozen = wallet.status === 'frozen'

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
              <DropdownMenuItem onClick={() => onViewDetails(wallet)}>
                <Eye className='mr-2 h-4 w-4' />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(wallet)}>
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {isFrozen ? (
                <DropdownMenuItem onClick={() => onUnfreeze(wallet)}>
                  <Flame className='mr-2 h-4 w-4' />
                  Unfreeze
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => onFreeze(wallet)}>
                  <Snowflake className='mr-2 h-4 w-4' />
                  Freeze
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(wallet)}
                className='text-red-600'
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
