/**
 * React Query hook for fetching organizations list
 */

import { useQuery } from '@tanstack/react-query'
import { organizationRepository } from '@/infrastructure/api/repositories'
import type { OrganizationListParams } from '@/core/entities/organization.entity'

/**
 * Hook to fetch organizations list with pagination
 * @param params - Query parameters (offset, limit)
 * @returns React Query result with organizations list
 */
export function useOrganizations(params: OrganizationListParams = {}) {
  return useQuery({
    queryKey: ['organizations', params],
    queryFn: () => organizationRepository.list(params),
    staleTime: 30000, // 30 seconds
  })
}
