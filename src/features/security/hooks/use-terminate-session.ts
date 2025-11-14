/**
 * React Query mutation hook for terminating sessions
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { securityRepository } from '@/infrastructure/api/repositories'
import { toast } from 'sonner'

/**
 * Hook to terminate a user session
 * @returns React Query mutation result
 */
export function useTerminateSession() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => securityRepository.terminateSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
      toast.success('Session terminated successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to terminate session: ${error.message}`)
    },
  })
}
