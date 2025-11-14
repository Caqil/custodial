/**
 * React Query hook for fetching user growth
 */

import { useQuery } from '@tanstack/react-query'
import { analyticsRepository } from '@/infrastructure/api/repositories'
import type { UserGrowthParams } from '@/core/entities/analytics.entity'

/**
 * Hook to fetch user growth metrics
 * @param params - Query parameters (period)
 * @returns React Query result with user growth data
 */
export function useUserGrowth(params: UserGrowthParams = {}) {
  return useQuery({
    queryKey: ['user-growth', params],
    queryFn: () => analyticsRepository.getUserGrowth(params),
    staleTime: 60000, // 1 minute
  })
}
