/**
 * React Query mutation hook for resolving security alerts
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { securityRepository } from '@/infrastructure/api/repositories'
import type { ResolveAlertRequest } from '@/infrastructure/api/repositories/security-api.repository'
import { toast } from 'sonner'

/**
 * Hook to resolve a security alert
 * @returns React Query mutation result
 */
export function useResolveAlert() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ResolveAlertRequest }) =>
      securityRepository.resolveAlert(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security-alerts'] })
      toast.success('Alert resolved successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to resolve alert: ${error.message}`)
    },
  })
}
