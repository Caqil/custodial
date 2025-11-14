/**
 * MPC Key Share Detail Component
 * Visual representation of MPC threshold and share distribution
 */

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import type { MPCKeyShare } from '@/core/entities/security.entity'
import { Shield, Info } from 'lucide-react'

interface MPCKeyShareDetailProps {
  shares: MPCKeyShare[]
}

/**
 * Component showing threshold visualization and share details
 */
export function MPCKeyShareDetail({ shares }: MPCKeyShareDetailProps) {
  if (shares.length === 0) return null

  const firstShare = shares[0]
  const onlineShares = shares.filter((s) => s.is_online).length
  const thresholdPercentage = (firstShare.threshold / firstShare.total_shares) * 100

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Info className='mr-2 h-4 w-4' />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Shield className='h-5 w-5' />
            MPC Key Share Distribution
          </DialogTitle>
          <DialogDescription>
            Threshold signature scheme for wallet: {firstShare.wallet_id}
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Threshold Information */}
          <div className='rounded-lg border p-4'>
            <h4 className='mb-2 font-medium'>Threshold Configuration</h4>
            <div className='space-y-2'>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-muted-foreground'>Required Shares:</span>
                <span className='font-medium'>{firstShare.threshold}</span>
              </div>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-muted-foreground'>Total Shares:</span>
                <span className='font-medium'>{firstShare.total_shares}</span>
              </div>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-muted-foreground'>Online Shares:</span>
                <span className='font-medium'>{onlineShares}</span>
              </div>
            </div>
            <div className='mt-4'>
              <div className='mb-2 flex items-center justify-between text-sm'>
                <span className='text-muted-foreground'>Threshold</span>
                <span className='font-medium'>{thresholdPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={thresholdPercentage} className='h-2' />
            </div>
          </div>

          {/* Visual Share Distribution */}
          <div className='rounded-lg border p-4'>
            <h4 className='mb-4 font-medium'>Share Distribution</h4>
            <div className='grid grid-cols-5 gap-2'>
              {shares.map((share) => (
                <div
                  key={share.id}
                  className={`rounded border-2 p-2 text-center ${
                    share.is_online
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <div className='text-xs font-medium'>#{share.share_index}</div>
                  <div className='text-xs text-muted-foreground truncate'>
                    {share.storage_location.split('-').pop()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Share Locations */}
          <div className='rounded-lg border p-4'>
            <h4 className='mb-3 font-medium'>Storage Locations</h4>
            <div className='space-y-2'>
              {shares.map((share) => (
                <div
                  key={share.id}
                  className='text-muted-foreground flex items-center justify-between text-sm'
                >
                  <span>Share #{share.share_index}</span>
                  <span className='font-mono text-xs'>{share.storage_location}</span>
                </div>
              ))}
            </div>
          </div>

          {firstShare.master_key_id && (
            <div className='rounded-lg border p-4'>
              <h4 className='mb-2 font-medium'>Master Key Information</h4>
              <p className='font-mono text-muted-foreground text-xs'>{firstShare.master_key_id}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
