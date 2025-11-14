/**
 * Wallet Feature Types
 * Component-specific types and constants
 */

import type { WalletType, WalletStatus } from '@/core/entities/wallet.entity'

/**
 * Wallet filter state
 */
export interface WalletFilterState {
  type?: WalletType | 'all'
  currency?: string
  status?: WalletStatus | 'all'
  search?: string
  organizationId?: string
}

/**
 * Dialog state
 */
export interface DialogState {
  createWallet: boolean
  editWallet: boolean
  deleteWallet: boolean
  freezeWallet: boolean
  unfreezeWallet: boolean
  walletDetail: boolean
}

/**
 * Supported currencies
 */
export const SUPPORTED_CURRENCIES = [
  { value: 'BTC', label: 'Bitcoin (BTC)' },
  { value: 'ETH', label: 'Ethereum (ETH)' },
  { value: 'USDT', label: 'Tether (USDT)' },
  { value: 'USDC', label: 'USD Coin (USDC)' },
  { value: 'BNB', label: 'BNB' },
  { value: 'SOL', label: 'Solana (SOL)' },
] as const

/**
 * Wallet type labels
 */
export const WALLET_TYPE_LABELS = {
  hot: 'Hot Wallet',
  warm: 'Warm Wallet',
  cold: 'Cold Wallet',
} as const

/**
 * Wallet status labels
 */
export const WALLET_STATUS_LABELS = {
  active: 'Active',
  inactive: 'Inactive',
  frozen: 'Frozen',
  migrating: 'Migrating',
} as const
