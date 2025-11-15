// ===== KYC TYPES =====

export type KYCStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'expired'
  | 'under_review';

export type VerificationLevel =
  | 'none'
  | 'basic'
  | 'intermediate'
  | 'advanced'
  | 'institutional';

export type RiskLevel =
  | 'low'
  | 'medium'
  | 'high'
  | 'critical';

export type DocumentType =
  | 'passport'
  | 'drivers_license'
  | 'national_id'
  | 'utility_bill'
  | 'bank_statement';

export interface KYCVerification {
  id: string;
  user_id: string;
  status: KYCStatus;
  verification_level: VerificationLevel;
  risk_level: RiskLevel;
  risk_score: number;

  // Personal Information
  first_name: string;
  last_name: string;
  date_of_birth: string;
  nationality: string;
  country_of_residence: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state_province: string;
  postal_code: string;

  // Identity Document
  document_type: DocumentType;
  document_number: string;
  document_country: string;
  document_expiry: string;

  // Risk Assessment
  is_pep: boolean;
  pep_details?: string;
  risk_factors: string[];

  // Transaction Limits
  daily_limit: string;
  monthly_limit: string;

  // Workflow
  submitted_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  reviewer_notes?: string;
  expires_at?: string;

  created_at: string;
  updated_at: string;
}

export interface KYCDocument {
  id: string;
  kyc_verification_id: string;
  document_type: DocumentType;
  file_name: string;
  file_size: number;
  mime_type: string;
  storage_path: string;
  uploaded_at: string;
}

// ===== GDPR TYPES =====

export type ConsentPurpose =
  | 'marketing'
  | 'analytics'
  | 'third_party_sharing'
  | 'profiling';

export type DataRequestType =
  | 'access'
  | 'portability'
  | 'erasure';

export type DataRequestStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'rejected';

export type BreachType =
  | 'unauthorized_access'
  | 'data_loss'
  | 'ransomware'
  | 'phishing'
  | 'insider_threat'
  | 'other';

export type BreachSeverity =
  | 'low'
  | 'medium'
  | 'high'
  | 'critical';

export interface GDPRConsent {
  id: string;
  user_id: string;
  purpose: ConsentPurpose;
  consent_text: string;
  is_active: boolean;
  ip_address: string;
  user_agent: string;
  given_at: string;
  withdrawn_at?: string;
  created_at: string;
  updated_at: string;
}

export interface GDPRDataRequest {
  id: string;
  user_id: string;
  request_type: DataRequestType;
  status: DataRequestStatus;
  reason?: string;
  requested_at: string;
  due_date: string;
  processed_at?: string;
  processed_by?: string;
  data_export_path?: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface GDPRDataBreach {
  id: string;
  breach_type: BreachType;
  severity: BreachSeverity;
  description: string;
  estimated_affected_users: number;
  detected_at: string;
  contained_at?: string;
  notification_deadline: string;
  requires_authority_notification: boolean;
  authority_notified_at?: string;
  users_notified_at?: string;
  root_cause?: string;
  remediation_steps?: string;
  created_at: string;
  updated_at: string;
}

// ===== SAR/CTR TYPES =====

export type SARStatus =
  | 'draft'
  | 'review'
  | 'approved'
  | 'filed'
  | 'rejected';

export type SARPriority =
  | 'normal'
  | 'high'
  | 'urgent';

export type CTRStatus =
  | 'pending'
  | 'filed'
  | 'error';

export interface SARReport {
  id: string;
  sar_number: string;
  user_id: string;
  status: SARStatus;
  priority: SARPriority;

  // Activity Details
  activity_type: string[];
  suspicious_activity_description: string;
  total_amount_involved: string;
  transaction_ids: string[];

  // Timeline
  activity_start_date: string;
  activity_end_date: string;
  deadline_date: string;

  // Workflow
  created_by: string;
  reviewed_by?: string;
  filed_by?: string;
  filed_at?: string;
  fincen_bsa_id?: string;

  created_at: string;
  updated_at: string;
}

export interface CTRReport {
  id: string;
  ctr_number: string;
  transaction_id: string;
  user_id: string;
  status: CTRStatus;

  // Transaction Details
  transaction_date: string;
  transaction_amount: string;
  transaction_type: string;

  // Filing
  deadline_date: string;
  filed_at?: string;
  filed_by?: string;
  fincen_bsa_id?: string;
  error_message?: string;

  created_at: string;
  updated_at: string;
}

export interface ComplianceCase {
  id: string;
  case_number: string;
  user_id: string;
  case_type: string;
  severity: BreachSeverity;
  status: 'open' | 'investigating' | 'resolved' | 'closed';

  description: string;
  assigned_to?: string;
  resolution?: string;

  opened_at: string;
  closed_at?: string;

  created_at: string;
  updated_at: string;
}

// ===== COMPLIANCE STATISTICS =====

export interface ComplianceStatistics {
  kyc: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    expired: number;
    expiring_soon: number;
  };
  gdpr: {
    active_consents: number;
    pending_requests: number;
    overdue_requests: number;
    breaches_this_month: number;
  };
  sar_ctr: {
    pending_sars: number;
    overdue_sars: number;
    pending_ctrs: number;
    overdue_ctrs: number;
    open_cases: number;
  };
  risk: {
    high_risk_users: number;
    critical_risk_users: number;
    pep_users: number;
  };
}

// ===== API REQUEST/RESPONSE TYPES =====

export interface ApproveKYCRequest {
  reviewer_notes?: string;
}

export interface RejectKYCRequest {
  rejection_reason: string;
  reviewer_notes?: string;
}

export interface ProcessDataRequestRequest {
  admin_notes?: string;
}

export interface FileSARRequest {
  filing_notes?: string;
}

export interface FileCTRRequest {
  filing_notes?: string;
}

export interface CloseComplianceCaseRequest {
  resolution: string;
}
