/**
 * React Query hook for fetching user-specific audit logs
 */

import { useQuery } from '@tanstack/react-query'
import { userRepository } from '@/infrastructure/api/repositories'
import type { UserAuditLogParams } from '@/core/entities/user.entity'

/**
 * Hook to fetch audit logs for a specific user
 * @param userId - User UUID
 * @param params - Query parameters (limit)
 * @param enabled - Whether to enable the query
 * @returns React Query result with audit logs
 */
export function useUserAuditLogs(
  userId: string | null,
  params: UserAuditLogParams = {},
  enabled = true
) {
  return useQuery({
    queryKey: ['user-audit-logs', userId, params],
    queryFn: () => {
      if (!userId) throw new Error('User ID is required')
      return userRepository.getAuditLogs(userId, params)
    },
    enabled: enabled && !!userId,
    staleTime: 10000, // 10 seconds
  })
}
