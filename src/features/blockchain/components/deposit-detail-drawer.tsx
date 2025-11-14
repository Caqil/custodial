/**
 * Deposit Detail Drawer Component
 * Drawer showing detailed deposit information
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
import { ChainBadge } from './chain-badge'
import { ConfirmationProgress } from './confirmation-progress'
import type { DepositDetection } from '@/core/entities/blockchain.entity'
import { formatDistanceToNow } from 'date-fns'
import { ExternalLink, Copy } from 'lucide-react'
import { toast } from 'sonner'

interface DepositDetailDrawerProps {
  deposit: DepositDetection | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Drawer component for viewing detailed deposit information
 */
export function DepositDetailDrawer({ deposit, open, onOpenChange }: DepositDetailDrawerProps) {
  if (!deposit) return null

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

  const getStatusBadge = () => {
    if (deposit.processed) {
      return (
        <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
          Credited
        </Badge>
      )
    }

    switch (deposit.status) {
      case 'detected':
        return <Badge variant='outline'>Detected</Badge>
      case 'confirming':
        return <Badge variant='outline' className='border-yellow-500 bg-yellow-50 text-yellow-700'>Confirming</Badge>
      case 'confirmed':
        return <Badge variant='outline' className='border-blue-500 bg-blue-50 text-blue-700'>Confirmed</Badge>
      case 'failed':
        return <Badge variant='destructive'>Failed</Badge>
      default:
        return <Badge variant='outline'>{deposit.status}</Badge>
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='sm:max-w-[600px] overflow-y-auto'>
        <SheetHeader>
          <SheetTitle className='flex items-center gap-2'>
            Deposit Details
            <ChainBadge chain={deposit.chain} />
            {getStatusBadge()}
          </SheetTitle>
          <SheetDescription>
            Deposit ID: {deposit.id}
          </SheetDescription>
        </SheetHeader>

        <div className='mt-6 space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Transaction Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex justify-between items-start'>
                <span className='text-sm text-muted-foreground'>Transaction Hash:</span>
                <div className='flex items-center gap-2'>
                  <span className='font-mono text-xs'>{deposit.tx_hash.slice(0, 16)}...{deposit.tx_hash.slice(-16)}</span>
                  <Button size='sm' variant='ghost' onClick={() => copyToClipboard(deposit.tx_hash)}>
                    <Copy className='h-3 w-3' />
                  </Button>
                  <Button size='sm' variant='ghost' asChild>
                    <a href={`https://blockchain.com/tx/${deposit.tx_hash}`} target='_blank' rel='noopener noreferrer'>
                      <ExternalLink className='h-3 w-3' />
                    </a>
                  </Button>
                </div>
              </div>

              <div className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>Amount:</span>
                <span className='font-mono font-semibold text-lg'>{deposit.amount}</span>
              </div>

              <div className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>Block Number:</span>
                <span className='font-mono'>{deposit.block_number.toLocaleString()}</span>
              </div>

              <div className='mt-4'>
                <ConfirmationProgress confirmations={deposit.confirmations} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Addresses</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='space-y-1'>
                <span className='text-sm text-muted-foreground'>From Address:</span>
                <div className='flex items-center gap-2'>
                  <span className='font-mono text-xs break-all'>{deposit.from_address}</span>
                  <Button size='sm' variant='ghost' onClick={() => copyToClipboard(deposit.from_address)}>
                    <Copy className='h-3 w-3' />
                  </Button>
                </div>
              </div>

              <div className='space-y-1'>
                <span className='text-sm text-muted-foreground'>To Address (Our Wallet):</span>
                <div className='flex items-center gap-2'>
                  <span className='font-mono text-xs break-all'>{deposit.address}</span>
                  <Button size='sm' variant='ghost' onClick={() => copyToClipboard(deposit.address)}>
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
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Detected:</span>
                <span>{formatDistanceToNow(new Date(deposit.detected_at), { addSuffix: true })}</span>
              </div>
              {deposit.processed_at && (
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Processed:</span>
                  <span>{formatDistanceToNow(new Date(deposit.processed_at), { addSuffix: true })}</span>
                </div>
              )}
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Created:</span>
                <span>{formatDistanceToNow(new Date(deposit.created_at), { addSuffix: true })}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Last Updated:</span>
                <span>{formatDistanceToNow(new Date(deposit.updated_at), { addSuffix: true })}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  )
}
