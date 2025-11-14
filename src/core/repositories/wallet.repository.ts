/**
 * Wallet Repository Interface
 * Defines the contract for wallet data operations
 */

import type {
  Wallet,
  WalletListResponse,
  WalletListParams,
  WalletDetailsResponse,
  CreateWalletRequest,
  UpdateWalletRequest,
  WalletTransition,
  WalletAddress,
  WalletPolicy,
  BalanceHistoryPoint,
  WalletStatistics,
} from '../entities/wallet.entity'

/**
 * Balance history query parameters
 */
export interface BalanceHistoryParams {
  start_date?: string
  end_date?: string
  interval?: 'hour' | 'day' | 'week' | 'month'
}

/**
 * Wallet analytics query parameters
 */
export interface WalletAnalyticsParams {
  organization_id?: string
  start_date?: string
  end_date?: string
}

/**
 * Wallet analytics response
 */
export interface WalletAnalytics {
  total_wallets: number
  active_wallets: number
  total_balance_usd: string
  distribution_by_type: {
    type: string
    count: number
    total_balance: string
  }[]
  distribution_by_currency: {
    currency: string
    count: number
    total_balance: string
  }[]
  balance_trend: {
    date: string
    total_balance: string
  }[]
}

/**
 * Interface for wallet repository operations
 */
export interface IWalletRepository {
  /**
   * Get paginated list of wallets
   * @param params - Query parameters
   * @returns Promise resolving to paginated wallet list
   */
  list(params: WalletListParams): Promise<WalletListResponse>

  /**
   * Get detailed wallet information by ID
   * @param id - Wallet UUID
   * @returns Promise resolving to wallet details
   */
  getById(id: string): Promise<WalletDetailsResponse>

  /**
   * Create new wallet
   * @param request - Create wallet request
   * @returns Promise resolving to created wallet
   */
  create(request: CreateWalletRequest): Promise<Wallet>

  /**
   * Update wallet
   * @param id - Wallet UUID
   * @param request - Update wallet request
   * @returns Promise resolving to updated wallet
   */
  update(id: string, request: UpdateWalletRequest): Promise<Wallet>

  /**
   * Delete wallet
   * @param id - Wallet UUID
   * @returns Promise resolving when wallet is deleted
   */
  delete(id: string): Promise<void>

  /**
   * Freeze wallet
   * @param id - Wallet UUID
   * @returns Promise resolving when wallet is frozen
   */
  freeze(id: string): Promise<void>

  /**
   * Unfreeze wallet
   * @param id - Wallet UUID
   * @returns Promise resolving when wallet is unfrozen
   */
  unfreeze(id: string): Promise<void>

  /**
   * Get wallet transitions
   * @param id - Wallet UUID
   * @returns Promise resolving to transitions list
   */
  getTransitions(id: string): Promise<WalletTransition[]>

  /**
   * Get wallet addresses
   * @param id - Wallet UUID
   * @returns Promise resolving to addresses list
   */
  getAddresses(id: string): Promise<WalletAddress[]>

  /**
   * Get wallet policies
   * @param id - Wallet UUID
   * @returns Promise resolving to policies list
   */
  getPolicies(id: string): Promise<WalletPolicy[]>

  /**
   * Get balance history
   * @param id - Wallet UUID
   * @param params - Query parameters
   * @returns Promise resolving to balance history
   */
  getBalanceHistory(id: string, params: BalanceHistoryParams): Promise<BalanceHistoryPoint[]>

  /**
   * Get wallet analytics
   * @param params - Query parameters
   * @returns Promise resolving to analytics data
   */
  getAnalytics(params: WalletAnalyticsParams): Promise<WalletAnalytics>

  /**
   * Get wallet statistics
   * @param params - Query parameters
   * @returns Promise resolving to statistics
   */
  getStatistics(params: WalletListParams): Promise<WalletStatistics>
}
