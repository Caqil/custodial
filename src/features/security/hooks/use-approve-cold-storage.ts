/**
 * React Query mutation hook for approving cold storage requests
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { securityRepository } from '@/infrastructure/api/repositories'
import { toast } from 'sonner'

/**
 * Hook to approve a cold storage request
 * @returns React Query mutation result
 */
export function useApproveColdStorage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => securityRepository.approveColdStorage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cold-storage-requests'] })
      toast.success('Cold storage request approved successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to approve request: ${error.message}`)
    },
  })
}
