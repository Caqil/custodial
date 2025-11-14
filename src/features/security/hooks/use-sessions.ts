/**
 * React Query hook for fetching active sessions
 */

import { useQuery } from '@tanstack/react-query'
import { securityRepository } from '@/infrastructure/api/repositories'
import type { SessionListParams } from '@/infrastructure/api/repositories/security-api.repository'

/**
 * Hook to fetch active sessions
 * Auto-refreshes every 30 seconds for real-time monitoring
 * @param params - Query parameters (user_id, limit, offset)
 * @returns React Query result with sessions list
 */
export function useSessions(params: SessionListParams = {}) {
  return useQuery({
    queryKey: ['sessions', params],
    queryFn: () => securityRepository.getSessions(params),
    staleTime: 30000, // 30 seconds
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  })
}
