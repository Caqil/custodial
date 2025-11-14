/**
 * Transaction Batches Page
 * Manage and monitor transaction batches
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BatchList } from '../components/batch-list'
import { BatchDetailDrawer } from '../components/batch-detail-drawer'
import { TransactionSuccessRate } from '../components/transaction-success-rate'
import type { TransactionBatch } from '@/core/entities/transaction.entity'

/**
 * Transaction Batches Page Component
 */
export default function TransactionBatchesPage() {
  const [selectedBatch, setSelectedBatch] = useState<TransactionBatch | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleViewBatch = (batch: TransactionBatch) => {
    setSelectedBatch(batch)
    setDrawerOpen(true)
  }

  return (
    <div className='container mx-auto space-y-8 py-8'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Transaction Batches</h1>
        <p className='text-muted-foreground'>
          View and manage grouped transactions processed together
        </p>
      </div>

      {/* Overview */}
      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Batch Processing</CardTitle>
            <CardDescription>
              Batches allow multiple transactions to be processed efficiently as a group
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Reduces Processing Time</span>
                <span className='text-sm font-semibold'>Up to 80%</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Lower Transaction Fees</span>
                <span className='text-sm font-semibold'>Consolidated</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Atomic Operations</span>
                <span className='text-sm font-semibold'>All or Nothing</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <TransactionSuccessRate />
      </div>

      {/* Batch List */}
      <BatchList onViewBatch={handleViewBatch} />

      {/* Batch Detail Drawer */}
      <BatchDetailDrawer
        batch={selectedBatch}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  )
}
