/**
 * User Entity - Domain model for user management
 * Maps to backend domain/user models
 */

/**
 * User status enumeration
 */
export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Suspended = 'suspended',
  Locked = 'locked',
}

/**
 * User role enumeration
 */
export enum Role {
  Admin = 'admin',
  Trader = 'trader',
  Viewer = 'viewer',
  Auditor = 'auditor',
}

/**
 * API key status enumeration
 */
export enum APIKeyStatus {
  Active = 'active',
  Inactive = 'inactive',
  Expired = 'expired',
  Revoked = 'revoked',
}

/**
 * API key scope enumeration
 */
export enum APIKeyScope {
  Read = 'read',
  Write = 'write',
  Transfer = 'transfer',
  Admin = 'admin',
}

/**
 * User entity - Core user data model
 */
export interface User {
  /** Unique identifier (UUID) */
  id: string

  /** Email address (unique) */
  email: string

  /** Organization name */
  organization_name?: string

  /** User status */
  status: UserStatus

  /** Whether MFA is enabled */
  mfa_enabled: boolean

  /** Number of failed login attempts */
  failed_login_attempts?: number

  /** Account locked until (if locked) */
  locked_until?: string

  /** Last login timestamp */
  last_login_at?: string

  /** Whether email is verified */
  email_verified: boolean

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string

  /** User roles (when included) */
  roles?: UserRole[]

  /** API keys (when included) */
  api_keys?: APIKey[]
}

/**
 * UserRole entity
 * Represents user roles and permissions
 */
export interface UserRole {
  /** Unique identifier (UUID) */
  id: string

  /** User ID */
  user_id: string

  /** Role type */
  role: Role

  /** Specific permissions granted */
  permissions: string[]

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string
}

/**
 * APIKey entity
 * Represents API authentication keys
 */
export interface APIKey {
  /** Unique identifier (UUID) */
  id: string

  /** User ID */
  user_id: string

  /** Access key (public) */
  access_key: string

  /** API key scopes/permissions */
  scopes: string[]

  /** IP whitelist for this key */
  ip_whitelist?: string[]

  /** API key status */
  status: APIKeyStatus

  /** Expiration timestamp */
  expires_at?: string

  /** Last time key was used */
  last_used_at?: string

  /** Creation timestamp */
  created_at: string

  /** Last update timestamp */
  updated_at: string
}

/**
 * User details with additional information
 */
export interface UserDetails {
  /** User */
  user: User

  /** Wallet count */
  wallet_count: number

  /** Total balances by currency */
  total_balances: Record<string, string>

  /** Recent audit logs */
  recent_logs: AuditLogSummary[]
}

/**
 * Audit log summary for user details
 */
export interface AuditLogSummary {
  /** Log ID */
  id: string

  /** Action performed */
  action: string

  /** Resource type */
  resource_type: string

  /** Resource ID */
  resource_id?: string

  /** Result */
  result: 'success' | 'failure' | 'denied'

  /** IP address */
  ip_address?: string

  /** Creation timestamp */
  created_at: string
}

/**
 * Paginated user list response
 */
export interface UserListResponse {
  users: User[]
  total: number
  limit: number
  offset: number
}

/**
 * User list query parameters
 */
export interface UserListParams {
  offset?: number
  limit?: number
  status?: UserStatus
  email?: string
  organization_name?: string
}

/**
 * User role list response
 */
export interface UserRoleListResponse {
  roles: UserRole[]
  total: number
}

/**
 * API key list response
 */
export interface APIKeyListResponse {
  api_keys: APIKey[]
  total: number
}

/**
 * API key list query parameters
 */
export interface APIKeyListParams {
  user_id?: string
  status?: APIKeyStatus
}

/**
 * Create user request
 */
export interface CreateUserRequest {
  /** Email address */
  email: string

  /** Password */
  password: string

  /** Organization name */
  organization_name?: string

  /** Whether to enable MFA */
  mfa_enabled?: boolean
}

/**
 * Update user request
 */
export interface UpdateUserRequest {
  /** Organization name */
  organization_name?: string

  /** User status */
  status?: UserStatus

  /** Enable/disable MFA */
  mfa_enabled?: boolean
}

/**
 * Update user status request
 */
export interface UpdateUserStatusRequest {
  /** New status */
  status: UserStatus
}

/**
 * Reset password request
 */
export interface ResetPasswordRequest {
  /** New password */
  new_password: string
}

/**
 * Change password request
 */
export interface ChangePasswordRequest {
  /** Current password */
  current_password: string

  /** New password */
  new_password: string
}

/**
 * Create user role request
 */
export interface CreateUserRoleRequest {
  /** User ID */
  user_id: string

  /** Role type */
  role: Role

  /** Permissions */
  permissions?: string[]
}

/**
 * Update user role request
 */
export interface UpdateUserRoleRequest {
  /** Permissions to set */
  permissions: string[]
}

/**
 * Create API key request
 */
export interface CreateAPIKeyRequest {
  /** User ID */
  user_id: string

  /** Scopes */
  scopes: string[]

  /** IP whitelist */
  ip_whitelist?: string[]

  /** Expiration time (optional) */
  expires_at?: string
}

/**
 * Update API key request
 */
export interface UpdateAPIKeyRequest {
  /** Status */
  status?: APIKeyStatus

  /** Scopes */
  scopes?: string[]

  /** IP whitelist */
  ip_whitelist?: string[]
}

/**
 * Enable MFA request
 */
export interface EnableMFARequest {
  /** MFA code to verify setup */
  mfa_code: string
}

/**
 * Verify MFA request
 */
export interface VerifyMFARequest {
  /** MFA code */
  mfa_code: string
}

/**
 * User statistics
 */
export interface UserStatistics {
  /** Total users */
  total_users: number

  /** Active users */
  active_users: number

  /** Suspended users */
  suspended_users: number

  /** Users with MFA enabled */
  mfa_enabled_count: number

  /** Users by role */
  by_role: Record<Role, number>

  /** Generation timestamp */
  generated_at: string
}
