/**
 * React Query mutation hook for resetting user password
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { userRepository } from '@/infrastructure/api/repositories'
import type { ResetPasswordRequest } from '@/core/entities/user.entity'

interface ResetPasswordVariables {
  userId: string
  request: ResetPasswordRequest
}

/**
 * Hook to reset user password (admin operation)
 * @returns React Query mutation for password reset
 */
export function useResetPassword() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, request }: ResetPasswordVariables) =>
      userRepository.resetPassword(userId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast.success('Password reset successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to reset password: ${error.message}`)
    },
  })
}
