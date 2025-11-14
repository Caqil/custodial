/**
 * React Query hook for fetching security alerts
 */

import { useQuery } from '@tanstack/react-query'
import { securityRepository } from '@/infrastructure/api/repositories'
import type { SecurityAlertListParams } from '@/core/entities/security.entity'

/**
 * Hook to fetch security alerts with filtering
 * Auto-refreshes every 10 seconds for real-time monitoring
 * @param params - Query parameters (severity, alert_type, resolved)
 * @returns React Query result with security alerts list
 */
export function useSecurityAlerts(params: SecurityAlertListParams = {}) {
  return useQuery({
    queryKey: ['security-alerts', params],
    queryFn: () => securityRepository.getAlerts(params),
    staleTime: 10000, // 10 seconds
    refetchInterval: 10000, // Auto-refresh every 10 seconds
  })
}
