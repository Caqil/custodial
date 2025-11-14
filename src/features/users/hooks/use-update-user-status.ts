/**
 * React Query mutation hook for updating user status
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { userRepository } from '@/infrastructure/api/repositories'
import type { UpdateUserStatusRequest } from '@/core/entities/user.entity'

interface UpdateUserStatusVariables {
  userId: string
  request: UpdateUserStatusRequest
}

/**
 * Hook to update user status
 * @returns React Query mutation for status update
 */
export function useUpdateUserStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, request }: UpdateUserStatusVariables) =>
      userRepository.updateStatus(userId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast.success('User status updated successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to update user status: ${error.message}`)
    },
  })
}
