/**
 * User API Repository Implementation
 * Implements IUserRepository using the API client
 */

import apiClient, { type ApiResponse } from '../client'
import { API_ENDPOINTS } from '../endpoints'
import type { IUserRepository } from '@/core/repositories/user.repository'
import type {
  UserListResponse,
  UserListParams,
  UserDetails,
  UpdateUserStatusRequest,
  ResetPasswordRequest,
  AuditLogListResponse,
  UserAuditLogParams,
} from '@/core/entities/user.entity'

/**
 * User repository implementation using API
 */
export class UserApiRepository implements IUserRepository {
  /**
   * Get paginated list of users
   */
  async list(params: UserListParams): Promise<UserListResponse> {
    const response = await apiClient.get<ApiResponse<UserListResponse>>(
      API_ENDPOINTS.users.list,
      { params }
    )
    console.log('🔍 Raw API response:', response.data)
    console.log('🔍 Extracted data:', response.data.data)
    const data = response.data.data!
    console.log('🔍 Users array:', data.users)
    console.log('🔍 Total:', data.total)
    return data
  }

  /**
   * Get detailed user information by ID
   */
  async getById(id: string): Promise<UserDetails> {
    const response = await apiClient.get<ApiResponse<UserDetails>>(
      API_ENDPOINTS.users.getById(id)
    )
    return response.data.data!
  }

  /**
   * Update user status
   */
  async updateStatus(id: string, request: UpdateUserStatusRequest): Promise<void> {
    await apiClient.patch(API_ENDPOINTS.users.updateStatus(id), request)
  }

  /**
   * Reset user password
   */
  async resetPassword(id: string, request: ResetPasswordRequest): Promise<void> {
    await apiClient.post(API_ENDPOINTS.users.resetPassword(id), request)
  }

  /**
   * Soft delete user
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.users.delete(id))
  }

  /**
   * Get audit logs for specific user
   */
  async getAuditLogs(id: string, params: UserAuditLogParams): Promise<AuditLogListResponse> {
    const response = await apiClient.get<ApiResponse<AuditLogListResponse>>(
      API_ENDPOINTS.users.auditLogs(id),
      { params }
    )
    return response.data.data!
  }
}

/**
 * Export singleton instance
 */
export const userRepository = new UserApiRepository()
