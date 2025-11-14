/**
 * Withdrawals Page
 * Full withdrawal broadcasting monitoring and management
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { WithdrawalList } from '../components/withdrawal-list'
import { WithdrawalDetailDrawer } from '../components/withdrawal-detail-drawer'
import { WithdrawalRetryDialog } from '../components/withdrawal-retry-dialog'
import { useWithdrawals, useWithdrawalRetry } from '../hooks'
import { WithdrawalBroadcast, Chain, WithdrawalStatus } from '@/core/entities/blockchain.entity'
import { Search, Filter } from 'lucide-react'

/**
 * Withdrawals monitoring page
 */
export default function WithdrawalsPage() {
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalBroadcast | null>(null)
  const [retryWithdrawal, setRetryWithdrawal] = useState<WithdrawalBroadcast | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedChain, setSelectedChain] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [page, setPage] = useState(1)
  const pageSize = 20

  // Build filter params
  const filterParams = {
    offset: (page - 1) * pageSize,
    limit: pageSize,
    ...(selectedChain !== 'all' && { chain: selectedChain as Chain }),
    ...(selectedStatus !== 'all' && { status: selectedStatus as WithdrawalStatus }),
  }

  const { data, isLoading } = useWithdrawals(filterParams)
  const { mutate: retryMutation, isPending: isRetrying } = useWithdrawalRetry()

  const totalPages = data ? Math.ceil(data.total / pageSize) : 0

  const handleRetryConfirm = () => {
    if (retryWithdrawal) {
      retryMutation(retryWithdrawal.id, {
        onSuccess: () => {
          setRetryWithdrawal(null)
        },
      })
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Withdrawal Broadcasting</h1>
          <p className='text-muted-foreground'>
            Monitor and manage blockchain withdrawal broadcasts
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Filter className='h-5 w-5' />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 md:grid-cols-3'>
            <div className='space-y-2'>
              <Label htmlFor='search'>Search</Label>
              <div className='relative'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  id='search'
                  placeholder='TX hash or address...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-8'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='chain'>Chain</Label>
              <Select value={selectedChain} onValueChange={setSelectedChain}>
                <SelectTrigger id='chain'>
                  <SelectValue placeholder='Select chain' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Chains</SelectItem>
                  <SelectItem value='BTC'>Bitcoin</SelectItem>
                  <SelectItem value='ETH'>Ethereum</SelectItem>
                  <SelectItem value='MATIC'>Polygon</SelectItem>
                  <SelectItem value='BNB'>BSC</SelectItem>
                  <SelectItem value='LTC'>Litecoin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='status'>Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger id='status'>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Status</SelectItem>
                  <SelectItem value='pending'>Pending</SelectItem>
                  <SelectItem value='broadcasting'>Broadcasting</SelectItem>
                  <SelectItem value='broadcasted'>Broadcasted</SelectItem>
                  <SelectItem value='failed'>Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Withdrawals List */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Withdrawals</CardTitle>
              <CardDescription>
                {data ? `Showing ${data.withdrawals.length} of ${data.total} withdrawals` : 'Loading...'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <WithdrawalList
            withdrawals={data?.withdrawals || []}
            isLoading={isLoading}
            onViewDetails={setSelectedWithdrawal}
            onRetry={setRetryWithdrawal}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='mt-4 flex items-center justify-between'>
              <p className='text-sm text-muted-foreground'>
                Page {page} of {totalPages}
              </p>
              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Drawer */}
      <WithdrawalDetailDrawer
        withdrawal={selectedWithdrawal}
        open={!!selectedWithdrawal}
        onOpenChange={(open) => !open && setSelectedWithdrawal(null)}
      />

      {/* Retry Dialog */}
      <WithdrawalRetryDialog
        withdrawal={retryWithdrawal}
        open={!!retryWithdrawal}
        onOpenChange={(open) => !open && setRetryWithdrawal(null)}
        onConfirm={handleRetryConfirm}
        isLoading={isRetrying}
      />
    </div>
  )
}
