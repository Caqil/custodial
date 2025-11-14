/**
 * Wallet Filters Component
 * Filter bar for wallet list
 */

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { WalletType, WalletStatus } from '@/core/entities/wallet.entity'

interface WalletFiltersProps {
  onTypeChange: (type: WalletType | 'all') => void
  onCurrencyChange: (currency: string) => void
  onStatusChange: (status: WalletStatus | 'all') => void
  onSearchChange: (search: string) => void
  onReset: () => void
  searchValue: string
}

/**
 * Filter component for wallet list
 */
export function WalletFilters({
  onTypeChange,
  onCurrencyChange,
  onStatusChange,
  onSearchChange,
  onReset,
  searchValue,
}: WalletFiltersProps) {
  return (
    <div className='flex flex-wrap items-center gap-4'>
      <div className='relative flex-1 min-w-[200px]'>
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Search by name or ID...'
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className='pl-8'
        />
      </div>

      <Select onValueChange={(value) => onTypeChange(value as WalletType | 'all')}>
        <SelectTrigger className='w-[150px]'>
          <SelectValue placeholder='All Types' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Types</SelectItem>
          <SelectItem value={WalletType.Hot}>Hot</SelectItem>
          <SelectItem value={WalletType.Warm}>Warm</SelectItem>
          <SelectItem value={WalletType.Cold}>Cold</SelectItem>
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

      <Select onValueChange={(value) => onStatusChange(value as WalletStatus | 'all')}>
        <SelectTrigger className='w-[150px]'>
          <SelectValue placeholder='All Statuses' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Statuses</SelectItem>
          <SelectItem value={WalletStatus.Active}>Active</SelectItem>
          <SelectItem value={WalletStatus.Frozen}>Frozen</SelectItem>
          <SelectItem value={WalletStatus.Inactive}>Inactive</SelectItem>
          <SelectItem value={WalletStatus.Migrating}>Migrating</SelectItem>
        </SelectContent>
      </Select>

      <Button variant='ghost' size='sm' onClick={onReset}>
        <X className='mr-2 h-4 w-4' />
        Reset
      </Button>
    </div>
  )
}
