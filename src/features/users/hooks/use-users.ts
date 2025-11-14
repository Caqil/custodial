/**
 * React Query hook for fetching paginated users list
 */

import { useQuery } from '@tanstack/react-query'
import { userRepository } from '@/infrastructure/api/repositories'
import type { UserListParams } from '@/core/entities/user.entity'

/**
 * Hook to fetch users list with pagination
 * @param params - Query parameters (offset, limit)
 * @returns React Query result with users list
 */
export function useUsers(params: UserListParams = {}) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userRepository.list(params),
    staleTime: 30000, // 30 seconds
  })
}
