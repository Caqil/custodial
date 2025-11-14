/**
 * Audit Logs Hooks
 */

import { useQuery } from '@tanstack/react-query'
import { auditLogRepository } from '@/infrastructure/api/repositories'
import type { AuditLogQueryRequest } from '@/core/entities/audit-log.entity'

export function useAuditLogs(request: AuditLogQueryRequest) {
  return useQuery({
    queryKey: ['audit-logs', request],
    queryFn: () => auditLogRepository.query(request),
    staleTime: 10000, // 10 seconds
  })
}
