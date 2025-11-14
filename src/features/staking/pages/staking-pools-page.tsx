/**
 * Staking Pools Page
 * Full pool management with detailed views
 */

import { useState } from 'react'
import { StakingPoolList } from '../components/staking-pool-list'
import { StakingPoolDetail } from '../components/staking-pool-detail'
import { PoolCreateDialog } from '../components/pool-create-dialog'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import type { StakingPool } from '@/core/entities/staking.entity'
import { ArrowLeft } from 'lucide-react'

/**
 * Staking Pools Page Component
 */
export function StakingPoolsPage() {
  const [selectedPool, setSelectedPool] = useState<StakingPool | null>(null)

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Staking Pools</h1>
          <p className='text-muted-foreground mt-1'>
            Manage and configure staking pools for different cryptocurrencies
          </p>
        </div>
        <PoolCreateDialog />
      </div>

      {/* Pool List */}
      <StakingPoolList onViewDetails={setSelectedPool} />

      {/* Pool Detail Sheet */}
      <Sheet open={!!selectedPool} onOpenChange={(open) => !open && setSelectedPool(null)}>
        <SheetContent side='right' className='w-full sm:max-w-2xl overflow-y-auto'>
          <SheetHeader>
            <div className='flex items-center gap-2'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setSelectedPool(null)}
              >
                <ArrowLeft className='h-4 w-4' />
              </Button>
              <SheetTitle>Pool Details</SheetTitle>
            </div>
          </SheetHeader>
          <div className='mt-6'>
            {selectedPool && <StakingPoolDetail pool={selectedPool} />}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
