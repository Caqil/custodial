/**
 * User Repository Interface
 * Defines the contract for user data operations
 */

import type {
  User,
  UserDetails,
  UserListResponse,
  UserListParams,
  UpdateUserStatusRequest,
  ResetPasswordRequest,
  AuditLogListResponse,
  UserAuditLogParams,
} from '../entities/user.entity'

/**
 * Interface for user repository operations
 */
export interface IUserRepository {
  /**
   * Get paginated list of users
   * @param params - Pagination parameters (offset, limit)
   * @returns Promise resolving to paginated user list
   */
  list(params: UserListParams): Promise<UserListResponse>

  /**
   * Get detailed user information by ID
   * @param id - User UUID
   * @returns Promise resolving to user details with balances and recent logs
   */
  getById(id: string): Promise<UserDetails>

  /**
   * Update user status (active/inactive/suspended/locked)
   * @param id - User UUID
   * @param request - Status update request
   * @returns Promise resolving when status is updated
   */
  updateStatus(id: string, request: UpdateUserStatusRequest): Promise<void>

  /**
   * Reset user password (admin operation)
   * @param id - User UUID
   * @param request - Password reset request
   * @returns Promise resolving when password is reset
   */
  resetPassword(id: string, request: ResetPasswordRequest): Promise<void>

  /**
   * Soft delete user
   * @param id - User UUID
   * @returns Promise resolving when user is deleted
   */
  delete(id: string): Promise<void>

  /**
   * Get audit logs for specific user
   * @param id - User UUID
   * @param params - Query parameters (limit)
   * @returns Promise resolving to audit log list
   */
  getAuditLogs(id: string, params: UserAuditLogParams): Promise<AuditLogListResponse>
}
