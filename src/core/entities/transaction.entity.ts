/**
 * Transaction Entity - Domain model for transaction management
 * Maps to backend domain/transaction models
 */

/**
 * Transaction type enumeration
 */
export enum TransactionType {
  Deposit = 'deposit',
  Withdrawal = 'withdrawal',
  Transfer = 'transfer',
  Stake = 'stake',
  Unstake = 'unstake',
  Governance = 'governance',
}

/**
 * Transaction status enumeration
 */
export enum TransactionStatus {
  Pending = 'pending',
  Approved = 'approved',
  Processing = 'processing',
  Completed = 'completed',
  Failed = 'failed',
  Rejected = 'rejected',
  Cancelled = 'cancelled',
}

/**
 * Approval status enumeration
 */
export enum ApprovalStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

/**
 * Fee type enumeration
 */
export enum FeeType {
  Network = 'network',
  Platform = 'platform',
  Priority = 'priority',
}

/**
 * Batch status enumeration
 */
export enum BatchStatus {
  Pending = 'pending',
  Processing = 'processing',
  Completed = 'completed',
  Partial = 'partial',
  Failed = 'failed',
}

/**
 * Transaction entity - Core transaction data model
 */
export interface Transaction {
  /** Unique identifier (UUID) */
  id: string

  /** Wallet ID */
  wallet_id: string

  /** Batch ID (if part of a batch) */
  batch_id?: string

  /** Transaction type */
  type: TransactionType

  /** Source address */
  from_address?: string

  /** Destination address */
  to_address: string

  /** Transaction amount */
  amount: string

  /** Estimated fee */
  estimated_fee: string

  /** Actual fee (after completion) */
  actual_fee?: string

  /** Currency */
  currency: string

  /** Transaction status */
  status: TransactionStatus

  /** Blockchain transaction hash */
  tx_hash?: string

  /** Risk score (0-100) */
  risk_score?: number

  /** Number of approvals required */
  requires_approvals: number

  /** Number of approvals received */
  current_approvals: number

  /** Expiration timestamp */
  expires_at?: string

  /** Additional metadata (JSON) */
  metadata?: Record<string, unknown>

  /** Error message (if failed) */
  error_message?: string

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string

  /** Completion timestamp */
  completed_at?: string

  /** Approvals (when included) */
  approvals?: TransactionApproval[]

  /** Fee breakdown (when included) */
  fees?: TransactionFee[]
}

/**
 * TransactionApproval entity
 * Represents an approval for a transaction
 */
export interface TransactionApproval {
  /** Unique identifier (UUID) */
  id: string

  /** Transaction ID */
  transaction_id: string

  /** Approver user ID */
  approver_id: string

  /** Approval status */
  status: ApprovalStatus

  /** IP address of approver */
  ip_address?: string

  /** User agent string */
  user_agent?: string

  /** Whether MFA was verified */
  mfa_verified: boolean

  /** Digital signature (if applicable) */
  signature?: string

  /** Approval comments */
  comments?: string

  /** When approval was given */
  approved_at?: string

  /** Creation timestamp */
  created_at: string
}

/**
 * TransactionFee entity
 * Represents transaction fee breakdown
 */
export interface TransactionFee {
  /** Unique identifier (UUID) */
  id: string

  /** Transaction ID */
  transaction_id: string

  /** Fee amount */
  fee_amount: string

  /** Fee currency */
  fee_currency: string

  /** Gas price (for EVM chains) */
  gas_price?: string

  /** Gas used (for EVM chains) */
  gas_used?: number

  /** Fee type */
  fee_type: FeeType

  /** Creation timestamp */
  created_at: string
}

/**
 * TransactionBatch entity
 * Represents a batch of transactions
 */
export interface TransactionBatch {
  /** Unique identifier (UUID) */
  id: string

  /** Organization ID */
  organization_id: string

  /** Batch name */
  name?: string

  /** Total transaction count */
  total_count: number

  /** Approved transaction count */
  approved_count: number

  /** Completed transaction count */
  completed_count: number

  /** Failed transaction count */
  failed_count: number

  /** Batch status */
  status: BatchStatus

  /** User who created the batch */
  created_by: string

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string

  /** Completion timestamp */
  completed_at?: string

  /** Transactions in this batch (when included) */
  transactions?: Transaction[]
}

/**
 * Paginated transaction list response
 */
export interface TransactionListResponse {
  transactions: Transaction[]
  total: number
  limit: number
  offset: number
}

/**
 * Transaction list query parameters
 */
export interface TransactionListParams {
  offset?: number
  limit?: number
  wallet_id?: string
  batch_id?: string
  type?: TransactionType
  status?: TransactionStatus
  currency?: string
  start_date?: string
  end_date?: string
}

/**
 * Transaction batch list response
 */
export interface TransactionBatchListResponse {
  batches: TransactionBatch[]
  total: number
  limit: number
  offset: number
}

/**
 * Transaction batch query parameters
 */
export interface TransactionBatchListParams {
  offset?: number
  limit?: number
  organization_id?: string
  status?: BatchStatus
  created_by?: string
}

/**
 * Create transaction request
 */
export interface CreateTransactionRequest {
  /** Wallet ID */
  wallet_id: string

  /** Batch ID (optional) */
  batch_id?: string

  /** Transaction type */
  type: TransactionType

  /** Source address (optional for withdrawals) */
  from_address?: string

  /** Destination address */
  to_address: string

  /** Amount */
  amount: string

  /** Currency */
  currency: string

  /** Additional metadata */
  metadata?: Record<string, unknown>
}

/**
 * Create transaction batch request
 */
export interface CreateTransactionBatchRequest {
  /** Organization ID */
  organization_id: string

  /** Batch name */
  name?: string

  /** Transactions to include */
  transactions: CreateTransactionRequest[]
}

/**
 * Approve transaction request
 */
export interface ApproveTransactionRequest {
  /** Transaction ID */
  transaction_id: string

  /** Approval comments */
  comments?: string

  /** MFA code (if required) */
  mfa_code?: string
}

/**
 * Reject transaction request
 */
export interface RejectTransactionRequest {
  /** Transaction ID */
  transaction_id: string

  /** Rejection reason */
  reason: string
}

/**
 * Transaction report response
 */
export interface TransactionReportResponse {
  transactions: Transaction[]
  total_count: number
  total_volume: string
  completed_count: number
  failed_count: number
  pending_count: number
  start_date: string
  end_date: string
  generated_at: string
}

/**
 * Transaction report request parameters
 */
export interface TransactionReportRequest {
  organization_id?: string
  wallet_id?: string
  start_date: string
  end_date: string
  type?: TransactionType
  status?: TransactionStatus
  currency?: string
}

/**
 * Transaction volume data point for analytics
 */
export interface TransactionVolumeDataPoint {
  date: string
  volume: string
  count: number
}

/**
 * Transaction volume response
 */
export interface TransactionVolumeResponse {
  data_points: TransactionVolumeDataPoint[]
  start_date: string
  end_date: string
  group_by: string
}

/**
 * Transaction statistics
 */
export interface TransactionStatistics {
  /** Total transaction count */
  total_transactions: number

  /** Total volume by currency */
  total_volume: Record<string, string>

  /** Transaction count by status */
  by_status: Record<TransactionStatus, number>

  /** Transaction count by type */
  by_type: Record<TransactionType, number>

  /** Average transaction value by currency */
  average_value: Record<string, string>

  /** Total fees collected */
  total_fees: Record<string, string>

  /** Generation timestamp */
  generated_at: string
}

/**
 * Transaction details with extended information
 */
export interface TransactionDetails {
  /** Transaction */
  transaction: Transaction

  /** Approvals */
  approvals: TransactionApproval[]

  /** Fee breakdown */
  fees: TransactionFee[]

  /** Blockchain status (if applicable) */
  blockchain_status?: {
    confirmations: number
    block_number?: number
    block_hash?: string
  }

  /** Related wallet */
  wallet?: {
    id: string
    name: string
    type: string
  }
}
