/**
 * Audit Log Repository Interface
 * Defines the contract for audit log operations
 */

import type {
  AuditLogListResponse,
  AuditLogQueryRequest,
} from '../entities/audit-log.entity'

/**
 * Interface for audit log repository operations
 */
export interface IAuditLogRepository {
  /**
   * Query audit logs with filters
   * @param request - Query parameters (user_id, resource_type, date range, etc.)
   * @returns Promise resolving to paginated audit log list
   */
  query(request: AuditLogQueryRequest): Promise<AuditLogListResponse>
}
