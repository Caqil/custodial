/**
 * React Query hook for fetching organization statistics
 */

import { useQuery } from '@tanstack/react-query'
import { organizationRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch organization statistics
 * @param id - Organization UUID
 * @param enabled - Whether to enable the query
 * @returns React Query result with organization stats
 */
export function useOrganizationStats(id: string | null, enabled = true) {
  return useQuery({
    queryKey: ['organization-stats', id],
    queryFn: () => {
      if (!id) throw new Error('Organization ID is required')
      return organizationRepository.getStats(id)
    },
    enabled: enabled && !!id,
    staleTime: 30000, // 30 seconds
  })
}
