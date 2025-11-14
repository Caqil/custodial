/**
 * Blockchain Entity - Domain models for blockchain operations
 * Maps to backend domain/blockchain models
 */

/**
 * Supported blockchain networks
 */
export enum Chain {
  Bitcoin = 'BTC',
  Ethereum = 'ETH',
  Polygon = 'MATIC',
  BSC = 'BNB',
  Litecoin = 'LTC',
}

/**
 * Blockchain transaction status
 */
export enum BlockchainTransactionStatus {
  Pending = 'pending',
  Confirming = 'confirming',
  Confirmed = 'confirmed',
  Failed = 'failed',
  Dropped = 'dropped',
}

/**
 * Deposit detection status
 */
export enum DepositStatus {
  Detected = 'detected',
  Confirming = 'confirming',
  Confirmed = 'confirmed',
  Credited = 'credited',
  Failed = 'failed',
}

/**
 * Withdrawal broadcast status
 */
export enum WithdrawalStatus {
  Pending = 'pending',
  Broadcasting = 'broadcasting',
  Broadcasted = 'broadcasted',
  Failed = 'failed',
}

/**
 * BlockchainTransaction entity
 * Represents a transaction on the blockchain network
 */
export interface BlockchainTransaction {
  /** Unique identifier (UUID) */
  id: string

  /** Reference to internal transaction ID */
  internal_tx_id: string

  /** Wallet ID */
  wallet_id: string

  /** Blockchain network (BTC, ETH, etc.) */
  chain: Chain

  /** Transaction hash on blockchain */
  tx_hash: string

  /** Source address */
  from_address: string

  /** Destination address */
  to_address: string

  /** Transaction amount */
  amount: string

  /** Transaction fee */
  fee: string

  /** Block number where transaction was included */
  block_number: number

  /** Block hash */
  block_hash: string

  /** Number of confirmations */
  confirmations: number

  /** Transaction status */
  status: BlockchainTransactionStatus

  /** Gas used (for EVM chains) */
  gas_used?: number

  /** Gas price (for EVM chains) */
  gas_price?: string

  /** Nonce (for EVM chains) */
  nonce?: number

  /** Raw blockchain transaction data (JSON) */
  raw_data?: string

  /** Error message if failed */
  error_message?: string

  /** When transaction was first detected */
  first_seen_at: string

  /** When transaction was confirmed */
  confirmed_at?: string

  /** Last time checked on blockchain */
  last_checked_at: string

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string
}

/**
 * AddressBalance entity
 * Represents the balance of an address on the blockchain
 */
export interface AddressBalance {
  /** Unique identifier (UUID) */
  id: string

  /** Wallet ID */
  wallet_id: string

  /** Blockchain address */
  address: string

  /** Blockchain network */
  chain: Chain

  /** Confirmed balance */
  balance: string

  /** Unconfirmed/pending balance */
  pending_balance: string

  /** Last sync timestamp */
  last_synced_at: string

  /** Last block number synced */
  last_block_number: number

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string
}

/**
 * BlockchainBlock entity
 * Tracks block heights for each chain (for monitoring)
 */
export interface BlockchainBlock {
  /** Unique identifier (UUID) */
  id: string

  /** Blockchain network */
  chain: Chain

  /** Block number/height */
  block_number: number

  /** Block hash */
  block_hash: string

  /** Block timestamp */
  timestamp: string

  /** Last update timestamp */
  updated_at: string
}

/**
 * DepositDetection entity
 * Represents detected deposits to wallet addresses
 */
export interface DepositDetection {
  /** Unique identifier (UUID) */
  id: string

  /** Wallet ID receiving deposit */
  wallet_id: string

  /** Receiving address */
  address: string

  /** Blockchain network */
  chain: Chain

  /** Transaction hash */
  tx_hash: string

  /** Sender address */
  from_address: string

  /** Deposit amount */
  amount: string

  /** Number of confirmations */
  confirmations: number

  /** Deposit processing status */
  status: DepositStatus

  /** Block number */
  block_number: number

  /** Whether deposit has been credited to wallet */
  processed: boolean

  /** When deposit was processed/credited */
  processed_at?: string

  /** When deposit was first detected */
  detected_at: string

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string
}

/**
 * WithdrawalBroadcast entity
 * Tracks withdrawal broadcasts to blockchain
 */
export interface WithdrawalBroadcast {
  /** Unique identifier (UUID) */
  id: string

  /** Internal transaction ID */
  internal_tx_id: string

  /** Source wallet ID */
  wallet_id: string

  /** Blockchain network */
  chain: Chain

  /** Destination address */
  to_address: string

  /** Withdrawal amount */
  amount: string

  /** Transaction hash (after broadcast) */
  tx_hash?: string

  /** Broadcast status */
  status: WithdrawalStatus

  /** Number of broadcast attempts */
  broadcast_count: number

  /** Error message if failed */
  error_message?: string

  /** When successfully broadcasted */
  broadcasted_at?: string

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string
}

/**
 * Network status information
 */
export interface NetworkStatus {
  /** Blockchain network */
  chain: Chain

  /** Current block height */
  current_block: number

  /** Network is synced */
  is_synced: boolean

  /** Network health status */
  status: 'healthy' | 'degraded' | 'offline'

  /** Last check timestamp */
  last_checked_at: string
}

/**
 * Paginated blockchain transaction list response
 */
export interface BlockchainTransactionListResponse {
  transactions: BlockchainTransaction[]
  total: number
  limit: number
  offset: number
}

/**
 * Blockchain transaction query parameters
 */
export interface BlockchainTransactionListParams {
  offset?: number
  limit?: number
  wallet_id?: string
  chain?: Chain
  status?: BlockchainTransactionStatus
  from_address?: string
  to_address?: string
}

/**
 * Deposit detection list response
 */
export interface DepositDetectionListResponse {
  deposits: DepositDetection[]
  total: number
  limit: number
  offset: number
}

/**
 * Deposit detection query parameters
 */
export interface DepositDetectionListParams {
  offset?: number
  limit?: number
  wallet_id?: string
  chain?: Chain
  status?: DepositStatus
  processed?: boolean
}

/**
 * Withdrawal broadcast list response
 */
export interface WithdrawalBroadcastListResponse {
  withdrawals: WithdrawalBroadcast[]
  total: number
  limit: number
  offset: number
}

/**
 * Withdrawal broadcast query parameters
 */
export interface WithdrawalBroadcastListParams {
  offset?: number
  limit?: number
  wallet_id?: string
  chain?: Chain
  status?: WithdrawalStatus
}
