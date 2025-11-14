/**
 * React Query hook for fetching user details by ID
 */

import { useQuery } from '@tanstack/react-query'
import { userRepository } from '@/infrastructure/api/repositories'

/**
 * Hook to fetch detailed user information
 * @param id - User UUID
 * @param enabled - Whether to enable the query
 * @returns React Query result with user details
 */
export function useUserDetail(id: string | null, enabled = true) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => {
      if (!id) throw new Error('User ID is required')
      return userRepository.getById(id)
    },
    enabled: enabled && !!id,
    staleTime: 30000, // 30 seconds
  })
}
