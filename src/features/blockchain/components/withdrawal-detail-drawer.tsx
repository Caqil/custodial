/**
 * Withdrawal Detail Drawer Component
 * Drawer showing detailed withdrawal information
 */

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ChainBadge } from './chain-badge'
import type { WithdrawalBroadcast } from '@/core/entities/blockchain.entity'
import { formatDistanceToNow } from 'date-fns'
import { ExternalLink, Copy, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface WithdrawalDetailDrawerProps {
  withdrawal: WithdrawalBroadcast | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Drawer component for viewing detailed withdrawal information
 */
export function WithdrawalDetailDrawer({ withdrawal, open, onOpenChange }: WithdrawalDetailDrawerProps) {
  if (!withdrawal) return null

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

  const getStatusBadge = () => {
    switch (withdrawal.status) {
      case 'pending':
        return <Badge variant='outline'>Pending</Badge>
      case 'broadcasting':
        return <Badge variant='outline' className='border-blue-500 bg-blue-50 text-blue-700'>Broadcasting</Badge>
      case 'broadcasted':
        return <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>Broadcasted</Badge>
      case 'failed':
        return <Badge variant='destructive'>Failed</Badge>
      default:
        return <Badge variant='outline'>{withdrawal.status}</Badge>
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='sm:max-w-[600px] overflow-y-auto'>
        <SheetHeader>
          <SheetTitle className='flex items-center gap-2'>
            Withdrawal Details
            <ChainBadge chain={withdrawal.chain} />
            {getStatusBadge()}
          </SheetTitle>
          <SheetDescription>
            Withdrawal ID: {withdrawal.id}
          </SheetDescription>
        </SheetHeader>

        <div className='mt-6 space-y-4'>
          {withdrawal.status === 'failed' && withdrawal.error_message && (
            <Alert variant='destructive'>
              <AlertCircle className='h-4 w-4' />
              <AlertDescription>
                {withdrawal.error_message}
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Transaction Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              {withdrawal.tx_hash && (
                <div className='flex justify-between items-start'>
                  <span className='text-sm text-muted-foreground'>Transaction Hash:</span>
                  <div className='flex items-center gap-2'>
                    <span className='font-mono text-xs'>{withdrawal.tx_hash.slice(0, 16)}...{withdrawal.tx_hash.slice(-16)}</span>
                    <Button size='sm' variant='ghost' onClick={() => copyToClipboard(withdrawal.tx_hash!)}>
                      <Copy className='h-3 w-3' />
                    </Button>
                    <Button size='sm' variant='ghost' asChild>
                      <a href={`https://blockchain.com/tx/${withdrawal.tx_hash}`} target='_blank' rel='noopener noreferrer'>
                        <ExternalLink className='h-3 w-3' />
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              <div className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>Amount:</span>
                <span className='font-mono font-semibold text-lg'>{withdrawal.amount}</span>
              </div>

              <div className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>Internal TX ID:</span>
                <span className='font-mono text-xs'>{withdrawal.internal_tx_id}</span>
              </div>

              <div className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>Broadcast Attempts:</span>
                <Badge variant='outline'>{withdrawal.broadcast_count}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Destination</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='space-y-1'>
                <span className='text-sm text-muted-foreground'>To Address:</span>
                <div className='flex items-center gap-2'>
                  <span className='font-mono text-xs break-all'>{withdrawal.to_address}</span>
                  <Button size='sm' variant='ghost' onClick={() => copyToClipboard(withdrawal.to_address)}>
                    <Copy className='h-3 w-3' />
                  </Button>
                </div>
              </div>

              <div className='space-y-1'>
                <span className='text-sm text-muted-foreground'>Source Wallet ID:</span>
                <div className='flex items-center gap-2'>
                  <span className='font-mono text-xs'>{withdrawal.wallet_id}</span>
                  <Button size='sm' variant='ghost' onClick={() => copyToClipboard(withdrawal.wallet_id)}>
                    <Copy className='h-3 w-3' />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timestamps</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-sm'>
              {withdrawal.broadcasted_at && (
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Broadcasted:</span>
                  <span>{formatDistanceToNow(new Date(withdrawal.broadcasted_at), { addSuffix: true })}</span>
                </div>
              )}
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Created:</span>
                <span>{formatDistanceToNow(new Date(withdrawal.created_at), { addSuffix: true })}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Last Updated:</span>
                <span>{formatDistanceToNow(new Date(withdrawal.updated_at), { addSuffix: true })}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  )
}
