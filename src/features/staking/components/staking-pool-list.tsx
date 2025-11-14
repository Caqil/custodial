/**
 * Staking Pool List Component
 * Displays a grid of staking pool cards
 */

import { StakingPoolCard } from './staking-pool-card'
import { Skeleton } from '@/components/ui/skeleton'
import type { StakingPool } from '@/core/entities/staking.entity'
import { useStakingPools } from '../hooks'
import { useState } from 'react'
import { PoolStatus } from '@/core/entities/staking.entity'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface StakingPoolListProps {
  onViewDetails?: (pool: StakingPool) => void
}

/**
 * Grid component for displaying staking pools
 */
export function StakingPoolList({ onViewDetails }: StakingPoolListProps) {
  const [status, setStatus] = useState<PoolStatus | undefined>(undefined)
  const { data, isLoading, error } = useStakingPools({ status, limit: 100 })

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className='h-[400px]' />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className='text-center py-12'>
        <p className='text-destructive'>Failed to load staking pools</p>
        <p className='text-sm text-muted-foreground mt-2'>{error.message}</p>
      </div>
    )
  }

  if (!data || data.pools.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-muted-foreground'>No staking pools found</p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <Tabs defaultValue='all' onValueChange={(v) => setStatus(v === 'all' ? undefined : v as PoolStatus)}>
        <TabsList>
          <TabsTrigger value='all'>All Pools</TabsTrigger>
          <TabsTrigger value={PoolStatus.Active}>Active</TabsTrigger>
          <TabsTrigger value={PoolStatus.Full}>Full</TabsTrigger>
          <TabsTrigger value={PoolStatus.Inactive}>Inactive</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data.pools.map((pool) => (
          <StakingPoolCard
            key={pool.id}
            pool={pool}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  )
}
