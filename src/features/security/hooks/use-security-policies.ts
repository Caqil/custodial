/**
 * React Query hook for fetching security policies
 */

import { useQuery } from '@tanstack/react-query'
import { securityRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch all security policies
 * @returns React Query result with security policies list
 */
export function useSecurityPolicies() {
  return useQuery({
    queryKey: ['security-policies'],
    queryFn: () => securityRepository.getPolicies(),
    staleTime: 60000, // 60 seconds
  })
}
