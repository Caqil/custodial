/**
 * Transactions Feature - Main Page
 * Comprehensive transaction management with filters, actions, and analytics
 */

import { useState } from 'react'
import { TransactionStatsCards } from '../components/transaction-stats-cards'
import { TransactionFilters } from '../components/transaction-filters'
import { TransactionTable } from '../components/transaction-table'
import { TransactionDetailDrawer } from '../components/transaction-detail-drawer'
import { TransactionApproveDialog } from '../components/transaction-approve-dialog'
import { TransactionRejectDialog } from '../components/transaction-reject-dialog'
import { TransactionCancelDialog } from '../components/transaction-cancel-dialog'
import { TransactionVolumeChart } from '../components/transaction-volume-chart'
import { TransactionTypeDistribution } from '../components/transaction-type-distribution'
import { useTransactions, useTransactionRetry } from '../hooks'
import type { Transaction, TransactionType, TransactionStatus } from '@/core/entities/transaction.entity'

interface TransactionFilterState {
  type: TransactionType | 'all'
  status: TransactionStatus | 'all'
  currency: string
  search: string
  startDate: string
  endDate: string
}

/**
 * Main Transactions Page Component
 */
export default function TransactionsPage() {
  // Filter state
  const [filters, setFilters] = useState<TransactionFilterState>({
    type: 'all',
    status: 'all',
    currency: 'all',
    search: '',
    startDate: '',
    endDate: '',
  })

  // Dialog state
  const [dialogState, setDialogState] = useState({
    transactionDetail: false,
    approveTransaction: false,
    rejectTransaction: false,
    cancelTransaction: false,
  })

  // Selected transaction for actions
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  // Pagination
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 20,
  })

  // Build query params
  const queryParams = {
    ...pagination,
    ...(filters.type !== 'all' && { type: filters.type }),
    ...(filters.status !== 'all' && { status: filters.status }),
    ...(filters.currency !== 'all' && { currency: filters.currency }),
    ...(filters.startDate && { start_date: filters.startDate }),
    ...(filters.endDate && { end_date: filters.endDate }),
  }

  // Fetch transactions
  const { data, isLoading, error } = useTransactions(queryParams)
  const retryMutation = useTransactionRetry()

  // Filter transactions locally by search
  const filteredTransactions = data?.transactions.filter((txn) => {
    if (!filters.search) return true
    const searchLower = filters.search.toLowerCase()
    return (
      txn.id.toLowerCase().includes(searchLower) ||
      txn.wallet_id.toLowerCase().includes(searchLower) ||
      txn.to_address.toLowerCase().includes(searchLower) ||
      (txn.from_address && txn.from_address.toLowerCase().includes(searchLower)) ||
      (txn.tx_hash && txn.tx_hash.toLowerCase().includes(searchLower))
    )
  })

  // Handle filter changes
  const handleTypeChange = (type: TransactionType | 'all') => {
    setFilters((prev) => ({ ...prev, type }))
    setPagination((prev) => ({ ...prev, offset: 0 }))
  }

  const handleStatusChange = (status: TransactionStatus | 'all') => {
    setFilters((prev) => ({ ...prev, status }))
    setPagination((prev) => ({ ...prev, offset: 0 }))
  }

  const handleCurrencyChange = (currency: string) => {
    setFilters((prev) => ({ ...prev, currency }))
    setPagination((prev) => ({ ...prev, offset: 0 }))
  }

  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search }))
  }

  const handleStartDateChange = (startDate: string) => {
    setFilters((prev) => ({ ...prev, startDate }))
    setPagination((prev) => ({ ...prev, offset: 0 }))
  }

  const handleEndDateChange = (endDate: string) => {
    setFilters((prev) => ({ ...prev, endDate }))
    setPagination((prev) => ({ ...prev, offset: 0 }))
  }

  const handleResetFilters = () => {
    setFilters({
      type: 'all',
      status: 'all',
      currency: 'all',
      search: '',
      startDate: '',
      endDate: '',
    })
    setPagination({ offset: 0, limit: 20 })
  }

  // Handle transaction actions
  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setDialogState((prev) => ({ ...prev, transactionDetail: true }))
  }

  const handleApprove = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setDialogState((prev) => ({ ...prev, approveTransaction: true }))
  }

  const handleReject = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setDialogState((prev) => ({ ...prev, rejectTransaction: true }))
  }

  const handleCancel = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setDialogState((prev) => ({ ...prev, cancelTransaction: true }))
  }

  const handleRetry = async (transaction: Transaction) => {
    await retryMutation.mutateAsync(transaction.id)
  }

  // Close dialogs
  const closeDialog = (dialogName: keyof typeof dialogState) => {
    setDialogState((prev) => ({ ...prev, [dialogName]: false }))
  }

  if (error) {
    return (
      <div className='container mx-auto py-8'>
        <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
          <h3 className='font-semibold text-red-900'>Error loading transactions</h3>
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
          <h1 className='text-3xl font-bold tracking-tight'>Transactions</h1>
          <p className='text-muted-foreground'>
            Monitor and manage all transaction activities across the platform
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <TransactionStatsCards />

      {/* Charts */}
      <div className='grid gap-4 md:grid-cols-2'>
        <TransactionVolumeChart />
        <TransactionTypeDistribution />
      </div>

      {/* Filters */}
      <TransactionFilters
        onTypeChange={handleTypeChange}
        onStatusChange={handleStatusChange}
        onCurrencyChange={handleCurrencyChange}
        onSearchChange={handleSearchChange}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onReset={handleResetFilters}
        searchValue={filters.search}
        startDate={filters.startDate}
        endDate={filters.endDate}
      />

      {/* Transactions Table */}
      <TransactionTable
        data={filteredTransactions || []}
        isLoading={isLoading}
        onViewDetails={handleViewDetails}
        onApprove={handleApprove}
        onReject={handleReject}
        onCancel={handleCancel}
        onRetry={handleRetry}
      />

      {/* Pagination Info */}
      {data && (
        <div className='text-muted-foreground flex items-center justify-between text-sm'>
          <div>
            Showing {filteredTransactions?.length || 0} of {data.total} transactions
          </div>
        </div>
      )}

      {/* Dialogs */}
      <TransactionDetailDrawer
        transaction={selectedTransaction}
        open={dialogState.transactionDetail}
        onOpenChange={(open) => closeDialog('transactionDetail')}
      />

      <TransactionApproveDialog
        transaction={selectedTransaction}
        open={dialogState.approveTransaction}
        onOpenChange={(open) => closeDialog('approveTransaction')}
      />

      <TransactionRejectDialog
        transaction={selectedTransaction}
        open={dialogState.rejectTransaction}
        onOpenChange={(open) => closeDialog('rejectTransaction')}
      />

      <TransactionCancelDialog
        transaction={selectedTransaction}
        open={dialogState.cancelTransaction}
        onOpenChange={(open) => closeDialog('cancelTransaction')}
      />
    </div>
  )
}
