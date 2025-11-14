/**
 * React Query hook for fetching IP whitelist
 */

import { useQuery } from '@tanstack/react-query'
import { securityRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch IP whitelist entries
 * @returns React Query result with IP whitelist
 */
export function useIPWhitelist() {
  return useQuery({
    queryKey: ['ip-whitelist'],
    queryFn: () => securityRepository.getIPWhitelist(),
    staleTime: 60000, // 60 seconds
  })
}
