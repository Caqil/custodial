/**
 * Wallets Feature - Main Page
 * Comprehensive wallet management with CRUD operations, filters, and charts
 */

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { WalletStatsCards } from './components/wallet-stats-cards'
import { WalletFilters } from './components/wallet-filters'
import { WalletTable } from './components/wallet-table'
import { CreateWalletDialog } from './components/create-wallet-dialog'
import { DeleteWalletDialog } from './components/delete-wallet-dialog'
import { FreezeWalletDialog } from './components/freeze-wallet-dialog'
import { UnfreezeWalletDialog } from './components/unfreeze-wallet-dialog'
import { WalletDetailDrawer } from './components/wallet-detail-drawer'
import { useWallets } from './hooks'
import type { Wallet, WalletType, WalletStatus } from '@/core/entities/wallet.entity'
import type { WalletFilterState } from './types'

/**
 * Main Wallets Page Component
 */
export default function WalletsPage() {
  // Filter state
  const [filters, setFilters] = useState<WalletFilterState>({
    type: 'all',
    currency: 'all',
    status: 'all',
    search: '',
  })

  // Dialog state
  const [dialogState, setDialogState] = useState({
    createWallet: false,
    deleteWallet: false,
    freezeWallet: false,
    unfreezeWallet: false,
    walletDetail: false,
  })

  // Selected wallet for actions
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)

  // Pagination
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 20,
  })

  // Build query params
  const queryParams = {
    ...pagination,
    ...(filters.type !== 'all' && { type: filters.type }),
    ...(filters.currency !== 'all' && { currency: filters.currency }),
    ...(filters.status !== 'all' && { status: filters.status }),
  }

  // Fetch wallets
  const { data, isLoading, error } = useWallets(queryParams)

  // Filter wallets locally by search
  const filteredWallets = data?.wallets.filter((wallet) => {
    if (!filters.search) return true
    const searchLower = filters.search.toLowerCase()
    return (
      wallet.name.toLowerCase().includes(searchLower) ||
      wallet.id.toLowerCase().includes(searchLower) ||
      wallet.currency.toLowerCase().includes(searchLower)
    )
  })

  // Handle filter changes
  const handleTypeChange = (type: WalletType | 'all') => {
    setFilters((prev) => ({ ...prev, type }))
    setPagination((prev) => ({ ...prev, offset: 0 }))
  }

  const handleCurrencyChange = (currency: string) => {
    setFilters((prev) => ({ ...prev, currency }))
    setPagination((prev) => ({ ...prev, offset: 0 }))
  }

  const handleStatusChange = (status: WalletStatus | 'all') => {
    setFilters((prev) => ({ ...prev, status }))
    setPagination((prev) => ({ ...prev, offset: 0 }))
  }

  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search }))
  }

  const handleResetFilters = () => {
    setFilters({
      type: 'all',
      currency: 'all',
      status: 'all',
      search: '',
    })
    setPagination({ offset: 0, limit: 20 })
  }

  // Handle wallet actions
  const handleViewDetails = (wallet: Wallet) => {
    setSelectedWallet(wallet)
    setDialogState((prev) => ({ ...prev, walletDetail: true }))
  }

  const handleEdit = (wallet: Wallet) => {
    setSelectedWallet(wallet)
    // TODO: Implement edit dialog
    console.log('Edit wallet:', wallet)
  }

  const handleFreeze = (wallet: Wallet) => {
    setSelectedWallet(wallet)
    setDialogState((prev) => ({ ...prev, freezeWallet: true }))
  }

  const handleUnfreeze = (wallet: Wallet) => {
    setSelectedWallet(wallet)
    setDialogState((prev) => ({ ...prev, unfreezeWallet: true }))
  }

  const handleDelete = (wallet: Wallet) => {
    setSelectedWallet(wallet)
    setDialogState((prev) => ({ ...prev, deleteWallet: true }))
  }

  // Close dialogs
  const closeDialog = (dialogName: keyof typeof dialogState) => {
    setDialogState((prev) => ({ ...prev, [dialogName]: false }))
  }

  if (error) {
    return (
      <div className='container mx-auto py-8'>
        <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
          <h3 className='font-semibold text-red-900'>Error loading wallets</h3>
          <p className='text-sm text-red-700'>
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto space-y-8 py-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Wallets</h1>
          <p className='text-muted-foreground'>
            Manage digital asset wallets across hot, warm, and cold storage
          </p>
        </div>
        <Button onClick={() => setDialogState((prev) => ({ ...prev, createWallet: true }))}>
          <Plus className='mr-2 h-4 w-4' />
          Create Wallet
        </Button>
      </div>

      {/* Stats Cards */}
      <WalletStatsCards />

      {/* Filters */}
      <WalletFilters
        onTypeChange={handleTypeChange}
        onCurrencyChange={handleCurrencyChange}
        onStatusChange={handleStatusChange}
        onSearchChange={handleSearchChange}
        onReset={handleResetFilters}
        searchValue={filters.search || ''}
      />

      {/* Wallets Table */}
      <WalletTable
        data={filteredWallets || []}
        isLoading={isLoading}
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
        onFreeze={handleFreeze}
        onUnfreeze={handleUnfreeze}
        onDelete={handleDelete}
      />

      {/* Pagination Info */}
      {data && (
        <div className='text-muted-foreground flex items-center justify-between text-sm'>
          <div>
            Showing {filteredWallets?.length || 0} of {data.total} wallets
          </div>
        </div>
      )}

      {/* Dialogs */}
      <CreateWalletDialog
        open={dialogState.createWallet}
        onOpenChange={(open) => closeDialog('createWallet')}
      />

      <DeleteWalletDialog
        wallet={selectedWallet}
        open={dialogState.deleteWallet}
        onOpenChange={(open) => closeDialog('deleteWallet')}
      />

      <FreezeWalletDialog
        wallet={selectedWallet}
        open={dialogState.freezeWallet}
        onOpenChange={(open) => closeDialog('freezeWallet')}
      />

      <UnfreezeWalletDialog
        wallet={selectedWallet}
        open={dialogState.unfreezeWallet}
        onOpenChange={(open) => closeDialog('unfreezeWallet')}
      />

      <WalletDetailDrawer
        wallet={selectedWallet}
        open={dialogState.walletDetail}
        onOpenChange={(open) => closeDialog('walletDetail')}
      />
    </div>
  )
}
