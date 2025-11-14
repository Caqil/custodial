/**
 * Security API Repository
 * Implements security and MPC management API operations
 */

import apiClient from '../client'
import { API_ENDPOINTS } from '../endpoints'
import type { ApiResponse } from '../types'
import type {
  MPCKeyShare,
  MPCKeyShareListResponse,
  SecurityPolicy,
  SecurityAlert,
  SecurityAlertListResponse,
  SecurityAlertListParams,
  Session,
  SessionListResponse,
  ColdStorageRequest,
  ColdStorageRequestListResponse,
  ColdStorageRequestListParams,
  IPWhitelist,
  GeoRestriction,
} from '@/core/entities/security.entity'

/**
 * MPC key share query parameters
 */
export interface MPCKeyShareListParams {
  wallet_id?: string
  is_online?: boolean
  storage_location?: string
}

/**
 * Session query parameters
 */
export interface SessionListParams {
  user_id?: string
  limit?: number
  offset?: number
}

/**
 * Create policy request
 */
export interface CreatePolicyRequest {
  organization_id: string
  policy_type: string
  config: Record<string, unknown>
  enforced?: boolean
}

/**
 * Resolve alert request
 */
export interface ResolveAlertRequest {
  resolution_notes?: string
  resolved_by: string
}

/**
 * Security repository interface
 */
export interface ISecurityRepository {
  getMPCKeyShares(params: MPCKeyShareListParams): Promise<MPCKeyShareListResponse>
  getPolicies(): Promise<SecurityPolicy[]>
  createPolicy(data: CreatePolicyRequest): Promise<SecurityPolicy>
  getAlerts(params: SecurityAlertListParams): Promise<SecurityAlertListResponse>
  resolveAlert(id: string, data: ResolveAlertRequest): Promise<void>
  getColdStorageRequests(params: ColdStorageRequestListParams): Promise<ColdStorageRequestListResponse>
  approveColdStorage(id: string): Promise<void>
  getSessions(params: SessionListParams): Promise<SessionListResponse>
  terminateSession(id: string): Promise<void>
  getIPWhitelist(): Promise<IPWhitelist[]>
  getGeoRestrictions(): Promise<GeoRestriction[]>
}

/**
 * Security API Repository Implementation
 */
export class SecurityApiRepository implements ISecurityRepository {
  /**
   * Get MPC key shares with filtering
   */
  async getMPCKeyShares(params: MPCKeyShareListParams): Promise<MPCKeyShareListResponse> {
    const response = await apiClient.get<ApiResponse<MPCKeyShareListResponse>>(
      API_ENDPOINTS.security.mpcKeyShares,
      { params }
    )
    return response.data.data!
  }

  /**
   * Get all security policies
   */
  async getPolicies(): Promise<SecurityPolicy[]> {
    const response = await apiClient.get<ApiResponse<SecurityPolicy[]>>(
      API_ENDPOINTS.security.policies
    )
    return response.data.data!
  }

  /**
   * Create a new security policy
   */
  async createPolicy(data: CreatePolicyRequest): Promise<SecurityPolicy> {
    const response = await apiClient.post<ApiResponse<SecurityPolicy>>(
      API_ENDPOINTS.security.createPolicy,
      data
    )
    return response.data.data!
  }

  /**
   * Get security alerts with filtering
   */
  async getAlerts(params: SecurityAlertListParams): Promise<SecurityAlertListResponse> {
    const response = await apiClient.get<ApiResponse<SecurityAlertListResponse>>(
      API_ENDPOINTS.security.alerts,
      { params }
    )
    return response.data.data!
  }

  /**
   * Resolve a security alert
   */
  async resolveAlert(id: string, data: ResolveAlertRequest): Promise<void> {
    await apiClient.post(
      API_ENDPOINTS.security.resolveAlert(id),
      data
    )
  }

  /**
   * Get cold storage requests with filtering
   */
  async getColdStorageRequests(params: ColdStorageRequestListParams): Promise<ColdStorageRequestListResponse> {
    const response = await apiClient.get<ApiResponse<ColdStorageRequestListResponse>>(
      API_ENDPOINTS.security.coldStorageRequests,
      { params }
    )
    return response.data.data!
  }

  /**
   * Approve a cold storage request
   */
  async approveColdStorage(id: string): Promise<void> {
    await apiClient.post(
      API_ENDPOINTS.security.approveColdStorage(id)
    )
  }

  /**
   * Get active sessions
   */
  async getSessions(params: SessionListParams): Promise<SessionListResponse> {
    const response = await apiClient.get<ApiResponse<SessionListResponse>>(
      API_ENDPOINTS.security.sessions,
      { params }
    )
    return response.data.data!
  }

  /**
   * Terminate a user session
   */
  async terminateSession(id: string): Promise<void> {
    await apiClient.delete(
      API_ENDPOINTS.security.terminateSession(id)
    )
  }

  /**
   * Get IP whitelist entries
   */
  async getIPWhitelist(): Promise<IPWhitelist[]> {
    const response = await apiClient.get<ApiResponse<IPWhitelist[]>>(
      API_ENDPOINTS.security.ipWhitelist
    )
    return response.data.data!
  }

  /**
   * Get geo restrictions
   */
  async getGeoRestrictions(): Promise<GeoRestriction[]> {
    const response = await apiClient.get<ApiResponse<GeoRestriction[]>>(
      API_ENDPOINTS.security.geoRestrictions
    )
    return response.data.data!
  }
}

/**
 * Export singleton instance
 */
export const securityRepository = new SecurityApiRepository()
