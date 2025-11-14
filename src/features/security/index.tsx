/**
 * Security Module Entry Point
 * Exports all security-related components, hooks, and pages
 */

// Pages
export { SecurityDashboardPage } from './pages/security-dashboard-page'
export { MPCKeysPage } from './pages/mpc-keys-page'
export { SecurityPoliciesPage } from './pages/security-policies-page'
export { SessionsPage } from './pages/sessions-page'

// Components
export { AlertSeverityBadge } from './components/alert-severity-badge'
export { AlertTypeBadge } from './components/alert-type-badge'
export { SecurityAlertCard } from './components/security-alert-card'
export { SecurityAlertFeed } from './components/security-alert-feed'
export { AlertResolveDialog } from './components/alert-resolve-dialog'
export { MPCKeyShareList } from './components/mpc-key-share-list'
export { MPCKeyShareDetail } from './components/mpc-key-share-detail'
export { SecurityPolicyList } from './components/security-policy-list'
export { SecurityPolicyCreateDialog } from './components/security-policy-create-dialog'
export { ColdStorageRequestList } from './components/cold-storage-request-list'
export { ColdStorageRequestDetail } from './components/cold-storage-request-detail'
export { ColdStorageApproveDialog } from './components/cold-storage-approve-dialog'
export { SessionList } from './components/session-list'
export { SessionTerminateDialog } from './components/session-terminate-dialog'
export { IPWhitelistTable } from './components/ip-whitelist-table'
export { GeoRestrictionTable } from './components/geo-restriction-table'
export { SecurityAlertsChart } from './components/security-alerts-chart'

// Hooks
export {
  useMPCKeyShares,
  useSecurityPolicies,
  useCreateSecurityPolicy,
  useSecurityAlerts,
  useResolveAlert,
  useColdStorageRequests,
  useApproveColdStorage,
  useSessions,
  useTerminateSession,
  useIPWhitelist,
  useGeoRestrictions,
} from './hooks'
