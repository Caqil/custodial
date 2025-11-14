/**
 * Transaction Filters Component
 * Filter bar for transaction list with search, type, status, and date range
 */

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X, Calendar } from 'lucide-react'
import { TransactionType, TransactionStatus } from '@/core/entities/transaction.entity'

interface TransactionFiltersProps {
  onTypeChange: (type: TransactionType | 'all') => void
  onStatusChange: (status: TransactionStatus | 'all') => void
  onCurrencyChange: (currency: string) => void
  onSearchChange: (search: string) => void
  onStartDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
  onReset: () => void
  searchValue: string
  startDate: string
  endDate: string
}

/**
 * Filter component for transaction list
 */
export function TransactionFilters({
  onTypeChange,
  onStatusChange,
  onCurrencyChange,
  onSearchChange,
  onStartDateChange,
  onEndDateChange,
  onReset,
  searchValue,
  startDate,
  endDate,
}: TransactionFiltersProps) {
  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center gap-4'>
        <div className='relative flex-1 min-w-[200px]'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search by ID, wallet ID, or address...'
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className='pl-8'
          />
        </div>

        <Select onValueChange={(value) => onTypeChange(value as TransactionType | 'all')}>
          <SelectTrigger className='w-[150px]'>
            <SelectValue placeholder='All Types' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Types</SelectItem>
            <SelectItem value={TransactionType.Deposit}>Deposit</SelectItem>
            <SelectItem value={TransactionType.Withdrawal}>Withdrawal</SelectItem>
            <SelectItem value={TransactionType.Transfer}>Transfer</SelectItem>
            <SelectItem value={TransactionType.Stake}>Stake</SelectItem>
            <SelectItem value={TransactionType.Unstake}>Unstake</SelectItem>
            <SelectItem value={TransactionType.Governance}>Governance</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onStatusChange(value as TransactionStatus | 'all')}>
          <SelectTrigger className='w-[150px]'>
            <SelectValue placeholder='All Statuses' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Statuses</SelectItem>
            <SelectItem value={TransactionStatus.Pending}>Pending</SelectItem>
            <SelectItem value={TransactionStatus.Approved}>Approved</SelectItem>
            <SelectItem value={TransactionStatus.Processing}>Processing</SelectItem>
            <SelectItem value={TransactionStatus.Completed}>Completed</SelectItem>
            <SelectItem value={TransactionStatus.Failed}>Failed</SelectItem>
            <SelectItem value={TransactionStatus.Rejected}>Rejected</SelectItem>
            <SelectItem value={TransactionStatus.Cancelled}>Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onCurrencyChange}>
          <SelectTrigger className='w-[150px]'>
            <SelectValue placeholder='All Currencies' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Currencies</SelectItem>
            <SelectItem value='BTC'>Bitcoin</SelectItem>
            <SelectItem value='ETH'>Ethereum</SelectItem>
            <SelectItem value='USDT'>Tether</SelectItem>
            <SelectItem value='USDC'>USD Coin</SelectItem>
          </SelectContent>
        </Select>

        <Button variant='ghost' size='sm' onClick={onReset}>
          <X className='mr-2 h-4 w-4' />
          Reset
        </Button>
      </div>

      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2'>
          <Calendar className='h-4 w-4 text-muted-foreground' />
          <Input
            type='date'
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className='w-[150px]'
            placeholder='Start Date'
          />
          <span className='text-muted-foreground'>to</span>
          <Input
            type='date'
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className='w-[150px]'
            placeholder='End Date'
          />
        </div>
      </div>
    </div>
  )
}
