/**
 * React Query mutation hook for creating security policies
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { securityRepository } from '@/infrastructure/api/repositories'
import type { CreatePolicyRequest } from '@/infrastructure/api/repositories/security-api.repository'
import { toast } from 'sonner'

/**
 * Hook to create a new security policy
 * @returns React Query mutation result
 */
export function useCreateSecurityPolicy() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePolicyRequest) => securityRepository.createPolicy(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security-policies'] })
      toast.success('Security policy created successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to create policy: ${error.message}`)
    },
  })
}
