/**
 * Transactions Feature - Main Entry Point
 * Exports the main transactions page component
 */

export { default as TransactionsPage } from './pages/transactions-page'
export { default as TransactionBatchesPage } from './pages/transaction-batches-page'
export { default as TransactionApprovalsPage } from './pages/transaction-approvals-page'

// Re-export hooks for convenience
export * from './hooks'

// Re-export components for convenience
export { TransactionStatusBadge } from './components/transaction-status-badge'
export { TransactionTypeBadge } from './components/transaction-type-badge'
