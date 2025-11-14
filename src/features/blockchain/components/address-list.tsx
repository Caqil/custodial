/**
 * Address List Component
 * Table displaying blockchain addresses with balances
 */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { ChainBadge } from './chain-badge'
import { Copy, ExternalLink } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'
import { AddressBalance } from '@/core/entities/blockchain.entity'

interface AddressListProps {
  addresses: AddressBalance[]
  isLoading?: boolean
}

/**
 * Address list table with balances
 */
export function AddressList({
  addresses,
  isLoading = false,
}: AddressListProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Address copied to clipboard')
  }

  if (isLoading) {
    return (
      <div className='space-y-3'>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className='h-16 w-full' />
        ))}
      </div>
    )
  }

  if (!addresses || addresses.length === 0) {
    return (
      <div className='flex items-center justify-center h-32 text-muted-foreground'>
        No addresses found
      </div>
    )
  }

  return (
    <div className='border rounded-lg'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Chain</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Pending Balance</TableHead>
            <TableHead>Last Block</TableHead>
            <TableHead>Last Synced</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {addresses.map((address) => (
            <TableRow key={address.id}>
              <TableCell>
                <ChainBadge chain={address.chain} />
              </TableCell>
              <TableCell className='font-mono text-xs'>
                {address.address.slice(0, 12)}...{address.address.slice(-10)}
              </TableCell>
              <TableCell className='font-mono font-semibold'>
                {address.balance}
              </TableCell>
              <TableCell className='font-mono'>
                {address.pending_balance !== '0' ? (
                  <Badge variant='outline' className='border-yellow-500 bg-yellow-50 text-yellow-700'>
                    {address.pending_balance}
                  </Badge>
                ) : (
                  <span className='text-muted-foreground'>0</span>
                )}
              </TableCell>
              <TableCell className='font-mono text-sm'>
                {address.last_block_number.toLocaleString()}
              </TableCell>
              <TableCell className='text-sm text-muted-foreground'>
                {formatDistanceToNow(new Date(address.last_synced_at), { addSuffix: true })}
              </TableCell>
              <TableCell className='text-right'>
                <div className='flex items-center justify-end gap-2'>
                  <Button
                    size='sm'
                    variant='ghost'
                    onClick={() => copyToClipboard(address.address)}
                  >
                    <Copy className='h-4 w-4' />
                  </Button>
                  <Button
                    size='sm'
                    variant='ghost'
                    asChild
                  >
                    <a
                      href={`https://blockchain.com/address/${address.address}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <ExternalLink className='h-4 w-4' />
                    </a>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
