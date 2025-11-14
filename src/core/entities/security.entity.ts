/**
 * Security Entity - Domain models for security operations
 * Maps to backend domain/security models
 */

/**
 * Audit result enumeration
 */
export enum AuditResult {
  Success = 'success',
  Failure = 'failure',
  Denied = 'denied',
}

/**
 * Audit severity enumeration
 */
export enum AuditSeverity {
  Info = 'info',
  Warning = 'warning',
  Critical = 'critical',
}

/**
 * Security policy type enumeration
 */
export enum PolicyType {
  IPWhitelist = 'ip_whitelist',
  GeoFencing = 'geo_fencing',
  TimeRestriction = 'time_restriction',
  RateLimit = 'rate_limit',
  MFAEnforcement = 'mfa_enforcement',
  PasswordPolicy = 'password_policy',
}

/**
 * Security alert type enumeration
 */
export enum AlertType {
  UnauthorizedAccess = 'unauthorized_access',
  SuspiciousTransaction = 'suspicious_transaction',
  AnomalousActivity = 'anomalous_activity',
  FailedLogin = 'failed_login',
  LargeTransaction = 'large_transaction',
  VelocityCheck = 'velocity_check',
  IPChange = 'ip_change',
  MFADisabled = 'mfa_disabled',
}

/**
 * Alert severity enumeration
 */
export enum AlertSeverity {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Critical = 'critical',
}

/**
 * Cold storage request type
 */
export enum ColdStorageRequestType {
  Withdrawal = 'withdrawal',
  ColdToWarmTransfer = 'cold_to_warm_transfer',
  KeyRecovery = 'key_recovery',
}

/**
 * Cold storage request status
 */
export enum ColdStorageRequestStatus {
  Pending = 'pending',
  WaitingPeriod = 'waiting_period',
  ReadyForApproval = 'ready_for_approval',
  Approved = 'approved',
  Rejected = 'rejected',
  Completed = 'completed',
}

/**
 * MPCKeyShare entity
 * Represents MPC key share for distributed key management
 */
export interface MPCKeyShare {
  /** Unique identifier (UUID) */
  id: string

  /** Wallet ID this share belongs to */
  wallet_id: string

  /** Share index (1, 2, 3, etc.) */
  share_index: number

  /** Storage location (hsm, database, vault-region-X) */
  storage_location: string

  /** Whether share is stored online */
  is_online: boolean

  /** Minimum shares required to sign */
  threshold: number

  /** Total number of shares generated */
  total_shares: number

  /** Master key identifier */
  master_key_id?: string

  /** Last time share was used for signing */
  last_used_at?: string

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string
}

/**
 * AuditLog entity
 * Represents an immutable audit trail entry
 */
export interface AuditLog {
  /** Unique identifier (UUID) */
  id: string

  /** User ID who performed the action */
  user_id?: string

  /** Action performed (e.g., 'user.login', 'wallet.create') */
  action: string

  /** Resource type (e.g., 'wallet', 'transaction') */
  resource_type: string

  /** Resource ID affected */
  resource_id?: string

  /** Changes made (before/after values) */
  changes?: Record<string, unknown>

  /** IP address of requester */
  ip_address?: string

  /** User agent string */
  user_agent?: string

  /** Result of the action */
  result: AuditResult

  /** Severity level */
  severity: AuditSeverity

  /** Additional metadata */
  metadata?: Record<string, unknown>

  /** Creation timestamp */
  created_at: string
}

/**
 * SecurityPolicy entity
 * Represents organization security policies
 */
export interface SecurityPolicy {
  /** Unique identifier (UUID) */
  id: string

  /** Organization ID */
  organization_id: string

  /** Type of security policy */
  policy_type: PolicyType

  /** Policy configuration (JSON) */
  config: Record<string, unknown>

  /** Whether policy is actively enforced */
  enforced: boolean

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string
}

/**
 * SecurityAlert entity
 * Represents security alerts and anomalies
 */
export interface SecurityAlert {
  /** Unique identifier (UUID) */
  id: string

  /** Type of alert */
  alert_type: AlertType

  /** Alert severity */
  severity: AlertSeverity

  /** Resource type related to alert */
  resource_type?: string

  /** Resource ID related to alert */
  resource_id?: string

  /** Alert description */
  description: string

  /** Additional alert metadata */
  metadata?: Record<string, unknown>

  /** Whether alert has been resolved */
  resolved: boolean

  /** User who resolved the alert */
  resolved_by?: string

  /** When alert was resolved */
  resolved_at?: string

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string
}

/**
 * Session entity
 * Represents user sessions
 */
export interface Session {
  /** Unique identifier (UUID) */
  id: string

  /** User ID */
  user_id: string

  /** IP address */
  ip_address: string

  /** User agent string */
  user_agent: string

  /** Device information (JSON) */
  device_info?: Record<string, unknown>

  /** Session expiration time */
  expires_at: string

  /** Last activity timestamp */
  last_activity: string

  /** Creation timestamp */
  created_at: string
}

/**
 * ColdStorageRequest entity
 * Represents a cold storage withdrawal request
 */
export interface ColdStorageRequest {
  /** Unique identifier (UUID) */
  id: string

  /** Wallet ID */
  wallet_id: string

  /** Transaction ID (if created) */
  transaction_id?: string

  /** Request type */
  request_type: ColdStorageRequestType

  /** Amount to withdraw (for withdrawal type) */
  amount?: number

  /** Destination address (for withdrawal type) */
  to_address?: string

  /** Request status */
  status: ColdStorageRequestStatus

  /** When waiting period ends */
  waiting_period_ends_at: string

  /** Number of approvers required */
  required_approvers: number

  /** Current number of approvers */
  current_approvers: number

  /** Array of approver user IDs */
  approvers: string[]

  /** Whether physical verification is required */
  physical_verification_required: boolean

  /** Whether physical verification completed */
  physical_verification_completed: boolean

  /** When signing ceremony is scheduled */
  signing_ceremony_scheduled_at?: string

  /** When signing ceremony was completed */
  signing_ceremony_completed_at?: string

  /** Additional metadata */
  metadata?: Record<string, unknown>

  /** Rejection reason (if rejected) */
  rejection_reason?: string

  /** User who requested */
  requested_by: string

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string
}

/**
 * IPWhitelist entity
 * Represents whitelisted IP addresses
 */
export interface IPWhitelist {
  /** Unique identifier (UUID) */
  id: string

  /** Organization ID (optional) */
  organization_id?: string

  /** User ID (optional) */
  user_id?: string

  /** IP address */
  ip_address: string

  /** IP range in CIDR notation */
  ip_range?: string

  /** Description */
  description?: string

  /** Whether whitelist entry is active */
  is_active: boolean

  /** Expiration time (optional) */
  expires_at?: string

  /** User who created this entry */
  created_by: string

  /** Creation timestamp */
  created_at: string
}

/**
 * GeoRestriction entity
 * Represents geographic access restrictions
 */
export interface GeoRestriction {
  /** Unique identifier (UUID) */
  id: string

  /** Organization ID */
  organization_id: string

  /** Restriction type (allow_list or block_list) */
  restriction_type: 'allow_list' | 'block_list'

  /** Array of country codes (ISO 3166-1 alpha-2) */
  country_codes: string[]

  /** What operations this applies to */
  applies_to: 'all' | 'withdrawals' | 'logins' | 'api_access'

  /** Whether restriction is active */
  is_active: boolean

  /** User who created this restriction */
  created_by: string

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string
}

/**
 * EncryptionKey entity
 * Represents encryption key metadata and rotation tracking
 */
export interface EncryptionKey {
  /** Unique identifier (UUID) */
  id: string

  /** Key identifier */
  key_id: string

  /** Key type (master, data_encryption, mpc_share, backup) */
  key_type: 'master' | 'data_encryption' | 'mpc_share' | 'backup'

  /** Key version */
  version: number

  /** Encryption algorithm */
  algorithm: string

  /** Storage location */
  storage_location: string

  /** Whether key is active */
  is_active: boolean

  /** When key was rotated */
  rotated_at?: string

  /** When key expires */
  expires_at?: string

  /** Creation timestamp */
  created_at: string
}

/**
 * KeyRotationHistory entity
 * Tracks encryption key rotations
 */
export interface KeyRotationHistory {
  /** Unique identifier (UUID) */
  id: string

  /** Key identifier */
  key_id: string

  /** Old key version */
  old_version: number

  /** New key version */
  new_version: number

  /** Rotation type */
  rotation_type: 'scheduled' | 'manual' | 'compromised' | 'policy_required'

  /** Reason for rotation */
  rotation_reason?: string

  /** User who performed rotation */
  rotated_by: string

  /** When rotation occurred */
  rotated_at: string

  /** Additional metadata */
  metadata?: Record<string, unknown>
}

/**
 * Paginated audit log list response
 */
export interface AuditLogListResponse {
  logs: AuditLog[]
  total: number
  limit: number
  offset: number
}

/**
 * Audit log query parameters
 */
export interface AuditLogQueryParams {
  user_id?: string
  resource_type?: string
  resource_id?: string
  action?: string
  result?: AuditResult
  severity?: AuditSeverity
  start_date?: string
  end_date?: string
  limit?: number
  offset?: number
}

/**
 * Security alert list response
 */
export interface SecurityAlertListResponse {
  alerts: SecurityAlert[]
  total: number
  limit: number
  offset: number
}

/**
 * Security alert query parameters
 */
export interface SecurityAlertListParams {
  alert_type?: AlertType
  severity?: AlertSeverity
  resolved?: boolean
  limit?: number
  offset?: number
}

/**
 * Cold storage request list response
 */
export interface ColdStorageRequestListResponse {
  requests: ColdStorageRequest[]
  total: number
  limit: number
  offset: number
}

/**
 * Cold storage request query parameters
 */
export interface ColdStorageRequestListParams {
  wallet_id?: string
  status?: ColdStorageRequestStatus
  request_type?: ColdStorageRequestType
  limit?: number
  offset?: number
}

/**
 * MPC key share list response
 */
export interface MPCKeyShareListResponse {
  shares: MPCKeyShare[]
  total: number
}

/**
 * Session list response
 */
export interface SessionListResponse {
  sessions: Session[]
  total: number
}
