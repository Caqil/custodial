/**
 * Deposits Page
 * Full deposit monitoring and history
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
import { DepositList } from '../components/deposit-list'
import { DepositDetailDrawer } from '../components/deposit-detail-drawer'
import { useDeposits } from '../hooks'
import { DepositDetection, Chain, DepositStatus } from '@/core/entities/blockchain.entity'
import { Search, Filter } from 'lucide-react'

/**
 * Deposits monitoring page
 */
export default function DepositsPage() {
  const [selectedDeposit, setSelectedDeposit] = useState<DepositDetection | null>(null)
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
    ...(selectedStatus !== 'all' && { status: selectedStatus as DepositStatus }),
  }

  const { data, isLoading } = useDeposits(filterParams)

  const totalPages = data ? Math.ceil(data.total / pageSize) : 0

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Deposit Monitoring</h1>
          <p className='text-muted-foreground'>
            Track and monitor blockchain deposits
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
                  <SelectItem value='detected'>Detected</SelectItem>
                  <SelectItem value='confirming'>Confirming</SelectItem>
                  <SelectItem value='confirmed'>Confirmed</SelectItem>
                  <SelectItem value='credited'>Credited</SelectItem>
                  <SelectItem value='failed'>Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deposits List */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Deposits</CardTitle>
              <CardDescription>
                {data ? `Showing ${data.deposits.length} of ${data.total} deposits` : 'Loading...'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DepositList
            deposits={data?.deposits || []}
            isLoading={isLoading}
            onViewDetails={setSelectedDeposit}
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
      <DepositDetailDrawer
        deposit={selectedDeposit}
        open={!!selectedDeposit}
        onOpenChange={(open) => !open && setSelectedDeposit(null)}
      />
    </div>
  )
}
