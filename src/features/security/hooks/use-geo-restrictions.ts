/**
 * React Query hook for fetching geo restrictions
 */

import { useQuery } from '@tanstack/react-query'
import { securityRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch geo restrictions
 * @returns React Query result with geo restrictions
 */
export function useGeoRestrictions() {
  return useQuery({
    queryKey: ['geo-restrictions'],
    queryFn: () => securityRepository.getGeoRestrictions(),
    staleTime: 60000, // 60 seconds
  })
}
