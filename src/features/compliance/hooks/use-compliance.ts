/**
 * React Query hooks for compliance endpoints
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { complianceRepository } from '@/infrastructure/api/repositories'
import type {
  ApproveKYCRequest,
  RejectKYCRequest,
  ProcessDataRequestRequest,
  FileSARRequest,
  FileCTRRequest,
  CloseComplianceCaseRequest,
} from '../types'

// ===== KYC HOOKS =====

/**
 * Hook to fetch pending KYC verifications
 */
export function usePendingKYC(params?: { limit?: number; offset?: number }) {
  return useQuery({
    queryKey: ['compliance', 'kyc', 'pending', params],
    queryFn: () => complianceRepository.getPendingKYC(params),
    staleTime: 30000, // 30 seconds
  })
}

/**
 * Hook to fetch expiring KYC verifications
 */
export function useExpiringKYC(params?: { days?: number; limit?: number; offset?: number }) {
  return useQuery({
    queryKey: ['compliance', 'kyc', 'expiring', params],
    queryFn: () => complianceRepository.getExpiringKYC(params),
    staleTime: 60000, // 1 minute
  })
}

/**
 * Hook to approve KYC verification
 */
export function useApproveKYC() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: ApproveKYCRequest }) =>
      complianceRepository.approveKYC(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compliance', 'kyc'] })
      queryClient.invalidateQueries({ queryKey: ['compliance', 'statistics'] })
    },
  })
}

/**
 * Hook to reject KYC verification
 */
export function useRejectKYC() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: RejectKYCRequest }) =>
      complianceRepository.rejectKYC(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compliance', 'kyc'] })
      queryClient.invalidateQueries({ queryKey: ['compliance', 'statistics'] })
    },
  })
}

// ===== GDPR HOOKS =====

/**
 * Hook to fetch GDPR data requests
 */
export function useGDPRRequests(params?: { status?: string; type?: string; limit?: number; offset?: number }) {
  return useQuery({
    queryKey: ['compliance', 'gdpr', 'requests', params],
    queryFn: () => complianceRepository.getGDPRRequests(params),
    staleTime: 30000, // 30 seconds
  })
}

/**
 * Hook to process GDPR data erasure request
 */
export function useProcessDataErasure() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: ProcessDataRequestRequest }) =>
      complianceRepository.processDataErasure(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compliance', 'gdpr', 'requests'] })
      queryClient.invalidateQueries({ queryKey: ['compliance', 'statistics'] })
    },
  })
}

/**
 * Hook to fetch data breaches
 */
export function useDataBreaches(params?: { severity?: string; limit?: number; offset?: number }) {
  return useQuery({
    queryKey: ['compliance', 'gdpr', 'breaches', params],
    queryFn: () => complianceRepository.getDataBreaches(params),
    staleTime: 60000, // 1 minute
  })
}

/**
 * Hook to notify authorities about data breach
 */
export function useNotifyAuthorities() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => complianceRepository.notifyAuthorities(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compliance', 'gdpr', 'breaches'] })
      queryClient.invalidateQueries({ queryKey: ['compliance', 'statistics'] })
    },
  })
}

// ===== SAR HOOKS =====

/**
 * Hook to fetch pending SARs
 */
export function usePendingSARs(params?: { limit?: number; offset?: number }) {
  return useQuery({
    queryKey: ['compliance', 'sar', 'pending', params],
    queryFn: () => complianceRepository.getPendingSARs(params),
    staleTime: 30000, // 30 seconds
  })
}

/**
 * Hook to fetch overdue SARs
 */
export function useOverdueSARs(params?: { limit?: number; offset?: number }) {
  return useQuery({
    queryKey: ['compliance', 'sar', 'overdue', params],
    queryFn: () => complianceRepository.getOverdueSARs(params),
    staleTime: 30000, // 30 seconds
  })
}

/**
 * Hook to fetch SAR by ID
 */
export function useSARById(id: string) {
  return useQuery({
    queryKey: ['compliance', 'sar', id],
    queryFn: () => complianceRepository.getSARById(id),
    enabled: !!id,
    staleTime: 60000, // 1 minute
  })
}

/**
 * Hook to approve SAR for filing
 */
export function useApproveSAR() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => complianceRepository.approveSAR(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compliance', 'sar'] })
      queryClient.invalidateQueries({ queryKey: ['compliance', 'statistics'] })
    },
  })
}

/**
 * Hook to file SAR with FinCEN
 */
export function useFileSAR() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: FileSARRequest }) =>
      complianceRepository.fileSAR(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compliance', 'sar'] })
      queryClient.invalidateQueries({ queryKey: ['compliance', 'statistics'] })
    },
  })
}

// ===== CTR HOOKS =====

/**
 * Hook to fetch pending CTRs
 */
export function usePendingCTRs(params?: { limit?: number; offset?: number }) {
  return useQuery({
    queryKey: ['compliance', 'ctr', 'pending', params],
    queryFn: () => complianceRepository.getPendingCTRs(params),
    staleTime: 30000, // 30 seconds
  })
}

/**
 * Hook to fetch overdue CTRs
 */
export function useOverdueCTRs(params?: { limit?: number; offset?: number }) {
  return useQuery({
    queryKey: ['compliance', 'ctr', 'overdue', params],
    queryFn: () => complianceRepository.getOverdueCTRs(params),
    staleTime: 30000, // 30 seconds
  })
}

/**
 * Hook to fetch CTR by ID
 */
export function useCTRById(id: string) {
  return useQuery({
    queryKey: ['compliance', 'ctr', id],
    queryFn: () => complianceRepository.getCTRById(id),
    enabled: !!id,
    staleTime: 60000, // 1 minute
  })
}

/**
 * Hook to file CTR with FinCEN
 */
export function useFileCTR() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: FileCTRRequest }) =>
      complianceRepository.fileCTR(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compliance', 'ctr'] })
      queryClient.invalidateQueries({ queryKey: ['compliance', 'statistics'] })
    },
  })
}

// ===== COMPLIANCE CASES HOOKS =====

/**
 * Hook to fetch compliance cases
 */
export function useComplianceCases(params?: { status?: string; limit?: number; offset?: number }) {
  return useQuery({
    queryKey: ['compliance', 'cases', params],
    queryFn: () => complianceRepository.getComplianceCases(params),
    staleTime: 30000, // 30 seconds
  })
}

/**
 * Hook to fetch compliance case by ID
 */
export function useComplianceCaseById(id: string) {
  return useQuery({
    queryKey: ['compliance', 'cases', id],
    queryFn: () => complianceRepository.getComplianceCaseById(id),
    enabled: !!id,
    staleTime: 60000, // 1 minute
  })
}

/**
 * Hook to close compliance case
 */
export function useCloseComplianceCase() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: CloseComplianceCaseRequest }) =>
      complianceRepository.closeComplianceCase(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compliance', 'cases'] })
      queryClient.invalidateQueries({ queryKey: ['compliance', 'statistics'] })
    },
  })
}

// ===== STATISTICS HOOK =====

/**
 * Hook to fetch compliance statistics
 */
export function useComplianceStatistics() {
  return useQuery({
    queryKey: ['compliance', 'statistics'],
    queryFn: () => complianceRepository.getStatistics(),
    staleTime: 60000, // 1 minute
    refetchInterval: 300000, // Refetch every 5 minutes
  })
}
