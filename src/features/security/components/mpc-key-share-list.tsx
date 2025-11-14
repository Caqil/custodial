/**
 * MPC Key Share List Component
 * Table displaying MPC key shares by wallet
 */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useMPCKeyShares } from '../hooks'
import { MPCKeyShareDetail } from './mpc-key-share-detail'
import type { MPCKeyShare } from '@/core/entities/security.entity'
import { formatDistanceToNow } from 'date-fns'
import { CheckCircle, XCircle, Database, Cloud } from 'lucide-react'

interface MPCKeyShareListProps {
  walletId?: string
}

/**
 * Component for displaying MPC key shares
 */
export function MPCKeyShareList({ walletId }: MPCKeyShareListProps) {
  const { data, isLoading } = useMPCKeyShares({ wallet_id: walletId })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-48' />
        </CardHeader>
        <CardContent>
          <Skeleton className='h-64 w-full' />
        </CardContent>
      </Card>
    )
  }

  const shares = data?.shares || []

  // Group shares by wallet_id
  const sharesByWallet = shares.reduce((acc, share) => {
    if (!acc[share.wallet_id]) {
      acc[share.wallet_id] = []
    }
    acc[share.wallet_id].push(share)
    return acc
  }, {} as Record<string, MPCKeyShare[]>)

  return (
    <Card>
      <CardHeader>
        <CardTitle>MPC Key Shares</CardTitle>
        <CardDescription>
          Distributed key management shares across secure locations
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {Object.entries(sharesByWallet).map(([wallet_id, walletShares]) => {
          const firstShare = walletShares[0]
          return (
            <div key={wallet_id} className='space-y-3'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='font-medium'>Wallet: {wallet_id}</h3>
                  <p className='text-muted-foreground text-sm'>
                    {firstShare.threshold} of {firstShare.total_shares} required
                  </p>
                </div>
                <MPCKeyShareDetail shares={walletShares} />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Share Index</TableHead>
                    <TableHead>Storage Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Used</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {walletShares.map((share) => (
                    <TableRow key={share.id}>
                      <TableCell className='font-medium'>
                        Share #{share.share_index}
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          {share.is_online ? (
                            <Cloud className='h-4 w-4 text-blue-500' />
                          ) : (
                            <Database className='h-4 w-4 text-gray-500' />
                          )}
                          {share.storage_location}
                        </div>
                      </TableCell>
                      <TableCell>
                        {share.is_online ? (
                          <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
                            <CheckCircle className='mr-1 h-3 w-3' />
                            Online
                          </Badge>
                        ) : (
                          <Badge variant='outline' className='border-gray-500 bg-gray-50 text-gray-700'>
                            <XCircle className='mr-1 h-3 w-3' />
                            Offline
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className='text-muted-foreground'>
                        {share.last_used_at
                          ? formatDistanceToNow(new Date(share.last_used_at), { addSuffix: true })
                          : 'Never'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )
        })}

        {shares.length === 0 && (
          <p className='text-muted-foreground text-center py-8'>No MPC key shares found</p>
        )}
      </CardContent>
    </Card>
  )
}
