/**
 * Compliance API Repository Implementation
 * Handles KYC, GDPR, SAR/CTR endpoints
 */

import apiClient, { type ApiResponse } from '../client'
import { API_ENDPOINTS } from '../endpoints'
import type {
  KYCVerification,
  GDPRDataRequest,
  GDPRDataBreach,
  SARReport,
  CTRReport,
  ComplianceCase,
  ComplianceStatistics,
  ApproveKYCRequest,
  RejectKYCRequest,
  ProcessDataRequestRequest,
  FileSARRequest,
  FileCTRRequest,
  CloseComplianceCaseRequest,
} from '@/features/compliance/types'

// Backend response structure (direct array in data)
interface BackendListResponse<T> {
  count: number
  data: T[]
}

export interface KYCListResponse {
  verifications: KYCVerification[]
  total: number
}

export interface GDPRRequestListResponse {
  requests: GDPRDataRequest[]
  total: number
}

export interface GDPRBreachListResponse {
  breaches: GDPRDataBreach[]
  total: number
}

export interface SARListResponse {
  reports: SARReport[]
  total: number
}

export interface CTRListResponse {
  reports: CTRReport[]
  total: number
}

export interface ComplianceCaseListResponse {
  cases: ComplianceCase[]
  total: number
}

/**
 * Compliance repository implementation using API
 */
export class ComplianceApiRepository {
  // ===== KYC ENDPOINTS =====

  /**
   * Get pending KYC verifications
   */
  async getPendingKYC(params?: { limit?: number; offset?: number }): Promise<KYCListResponse> {
    const response = await apiClient.get<any>(
      API_ENDPOINTS.compliance.kyc.pending,
      { params }
    )
    // Backend returns: { success: true, count: X, data: [...] }
    return {
      verifications: response.data.data || [],
      total: response.data.count || 0,
    }
  }

  /**
   * Get expiring KYC verifications
   */
  async getExpiringKYC(params?: { days?: number; limit?: number; offset?: number }): Promise<KYCListResponse> {
    const response = await apiClient.get<any>(
      API_ENDPOINTS.compliance.kyc.expiring,
      { params }
    )
    // Backend returns: { success: true, count: X, data: [...] }
    return {
      verifications: response.data.data || [],
      total: response.data.count || 0,
    }
  }

  /**
   * Approve KYC verification
   */
  async approveKYC(id: string, request: ApproveKYCRequest): Promise<KYCVerification> {
    const response = await apiClient.post<ApiResponse<KYCVerification>>(
      API_ENDPOINTS.compliance.kyc.approve(id),
      request
    )
    return response.data.data!
  }

  /**
   * Reject KYC verification
   */
  async rejectKYC(id: string, request: RejectKYCRequest): Promise<KYCVerification> {
    const response = await apiClient.post<ApiResponse<KYCVerification>>(
      API_ENDPOINTS.compliance.kyc.reject(id),
      request
    )
    return response.data.data!
  }

  // ===== GDPR ENDPOINTS =====

  /**
   * Get all GDPR data requests
   */
  async getGDPRRequests(params?: { status?: string; type?: string; limit?: number; offset?: number }): Promise<GDPRRequestListResponse> {
    const response = await apiClient.get<any>(
      API_ENDPOINTS.compliance.gdpr.requests,
      { params }
    )
    // Backend returns: { success: true, count: X, data: [...] }
    return {
      requests: response.data.data || [],
      total: response.data.count || 0,
    }
  }

  /**
   * Process GDPR data erasure request
   */
  async processDataErasure(id: string, request: ProcessDataRequestRequest): Promise<GDPRDataRequest> {
    const response = await apiClient.post<ApiResponse<GDPRDataRequest>>(
      API_ENDPOINTS.compliance.gdpr.processErasure(id),
      request
    )
    return response.data.data!
  }

  /**
   * Get data breaches
   */
  async getDataBreaches(params?: { severity?: string; limit?: number; offset?: number }): Promise<GDPRBreachListResponse> {
    const response = await apiClient.get<any>(
      API_ENDPOINTS.compliance.gdpr.breaches,
      { params }
    )
    // Backend returns: { success: true, count: X, data: [...] }
    return {
      breaches: response.data.data || [],
      total: response.data.count || 0,
    }
  }

  /**
   * Notify authorities about data breach
   */
  async notifyAuthorities(id: string): Promise<GDPRDataBreach> {
    const response = await apiClient.post<ApiResponse<GDPRDataBreach>>(
      API_ENDPOINTS.compliance.gdpr.notifyAuthorities,
      { breach_id: id }
    )
    return response.data.data!
  }

  // ===== SAR ENDPOINTS =====

  /**
   * Get pending SAR reports
   */
  async getPendingSARs(params?: { limit?: number; offset?: number }): Promise<SARListResponse> {
    const response = await apiClient.get<any>(
      API_ENDPOINTS.compliance.sar.pending,
      { params }
    )
    // Backend returns: { success: true, count: X, data: [...] }
    return {
      reports: response.data.data || [],
      total: response.data.count || 0,
    }
  }

  /**
   * Get overdue SAR reports
   */
  async getOverdueSARs(params?: { limit?: number; offset?: number }): Promise<SARListResponse> {
    const response = await apiClient.get<any>(
      API_ENDPOINTS.compliance.sar.overdue,
      { params }
    )
    // Backend returns: { success: true, count: X, data: [...] }
    return {
      reports: response.data.data || [],
      total: response.data.count || 0,
    }
  }

  /**
   * Get SAR by ID
   */
  async getSARById(id: string): Promise<SARReport> {
    const response = await apiClient.get<ApiResponse<SARReport>>(
      API_ENDPOINTS.compliance.sar.getById(id)
    )
    return response.data.data!
  }

  /**
   * Approve SAR for filing
   */
  async approveSAR(id: string): Promise<SARReport> {
    const response = await apiClient.post<ApiResponse<SARReport>>(
      API_ENDPOINTS.compliance.sar.approve(id)
    )
    return response.data.data!
  }

  /**
   * File SAR with FinCEN
   */
  async fileSAR(id: string, request: FileSARRequest): Promise<SARReport> {
    const response = await apiClient.post<ApiResponse<SARReport>>(
      API_ENDPOINTS.compliance.sar.file(id),
      request
    )
    return response.data.data!
  }

  // ===== CTR ENDPOINTS =====

  /**
   * Get pending CTR reports
   */
  async getPendingCTRs(params?: { limit?: number; offset?: number }): Promise<CTRListResponse> {
    const response = await apiClient.get<any>(
      API_ENDPOINTS.compliance.ctr.pending,
      { params }
    )
    // Backend returns: { success: true, count: X, data: [...] }
    return {
      reports: response.data.data || [],
      total: response.data.count || 0,
    }
  }

  /**
   * Get overdue CTR reports
   */
  async getOverdueCTRs(params?: { limit?: number; offset?: number }): Promise<CTRListResponse> {
    const response = await apiClient.get<any>(
      API_ENDPOINTS.compliance.ctr.overdue,
      { params }
    )
    // Backend returns: { success: true, count: X, data: [...] }
    return {
      reports: response.data.data || [],
      total: response.data.count || 0,
    }
  }

  /**
   * Get CTR by ID
   */
  async getCTRById(id: string): Promise<CTRReport> {
    const response = await apiClient.get<ApiResponse<CTRReport>>(
      API_ENDPOINTS.compliance.ctr.getById(id)
    )
    return response.data.data!
  }

  /**
   * File CTR with FinCEN
   */
  async fileCTR(id: string, request: FileCTRRequest): Promise<CTRReport> {
    const response = await apiClient.post<ApiResponse<CTRReport>>(
      API_ENDPOINTS.compliance.ctr.file(id),
      request
    )
    return response.data.data!
  }

  // ===== COMPLIANCE CASES =====

  /**
   * Get compliance cases
   */
  async getComplianceCases(params?: { status?: string; limit?: number; offset?: number }): Promise<ComplianceCaseListResponse> {
    const response = await apiClient.get<any>(
      API_ENDPOINTS.compliance.cases.list,
      { params }
    )
    // Backend returns: { success: true, count: X, data: [...] }
    return {
      cases: response.data.data || [],
      total: response.data.count || 0,
    }
  }

  /**
   * Get compliance case by ID
   */
  async getComplianceCaseById(id: string): Promise<ComplianceCase> {
    const response = await apiClient.get<ApiResponse<ComplianceCase>>(
      API_ENDPOINTS.compliance.cases.getById(id)
    )
    return response.data.data!
  }

  /**
   * Close compliance case
   */
  async closeComplianceCase(id: string, request: CloseComplianceCaseRequest): Promise<ComplianceCase> {
    const response = await apiClient.post<ApiResponse<ComplianceCase>>(
      API_ENDPOINTS.compliance.cases.close(id),
      request
    )
    return response.data.data!
  }

  // ===== STATISTICS =====

  /**
   * Get compliance statistics
   */
  async getStatistics(): Promise<ComplianceStatistics> {
    const response = await apiClient.get<ApiResponse<ComplianceStatistics>>(
      API_ENDPOINTS.compliance.statistics
    )
    return response.data.data!
  }
}

// Export singleton instance
export const complianceRepository = new ComplianceApiRepository()
