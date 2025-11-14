/**
 * React Query hook for fetching user behavior analytics
 */

import { useQuery } from '@tanstack/react-query'
import { analyticsRepository } from '@/infrastructure/api/repositories'
import type { UserBehaviorParams } from '@/core/entities/analytics.entity'

/**
 * Hook to fetch user behavior analytics
 * Includes acquisition funnel, retention cohorts, LTV, active users, and segments
 * @param params - Query parameters (date range)
 * @returns React Query result with user behavior data
 */
export function useUserBehaviorAnalytics(params: UserBehaviorParams = {}) {
  return useQuery({
    queryKey: ['user-behavior-analytics', params],
    queryFn: () => analyticsRepository.getUserBehavior(params),
    staleTime: 60000, // 1 minute
  })
}
