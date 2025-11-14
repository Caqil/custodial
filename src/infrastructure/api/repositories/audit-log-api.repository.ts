/**
 * Audit Log API Repository Implementation
 * Implements IAuditLogRepository using the API client
 */

import apiClient, { type ApiResponse } from '../client'
import { API_ENDPOINTS } from '../endpoints'
import type { IAuditLogRepository } from '@/core/repositories/audit-log.repository'
import type {
  AuditLogListResponse,
  AuditLogQueryRequest,
} from '@/core/entities/audit-log.entity'

/**
 * Audit log repository implementation using API
 */
export class AuditLogApiRepository implements IAuditLogRepository {
  /**
   * Query audit logs with filters
   */
  async query(request: AuditLogQueryRequest): Promise<AuditLogListResponse> {
    const response = await apiClient.post<ApiResponse<AuditLogListResponse>>(
      API_ENDPOINTS.auditLogs.query,
      request
    )
    return response.data.data!
  }
}

/**
 * Export singleton instance
 */
export const auditLogRepository = new AuditLogApiRepository()
