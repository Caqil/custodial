/**
 * Audit Log Entity - Domain model for audit trail management
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
 * Audit log entity - Core audit log data model
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
 * Paginated audit log list response
 */
export interface AuditLogListResponse {
  logs: AuditLog[]
  total: number
}

/**
 * Audit log query parameters
 */
export interface AuditLogQueryRequest {
  user_id?: string
  resource_type?: string
  resource_id?: string
  start_date: string
  end_date: string
  limit?: number
  offset?: number
}

/**
 * Audit log query parameters for specific user
 */
export interface UserAuditLogParams {
  limit?: number
}
