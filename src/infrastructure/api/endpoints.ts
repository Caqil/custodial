/**
 * API Endpoints Configuration
 * All admin API endpoints organized by module
 * Base path: /api/v1/admin/
 */

const BASE_PATH = '/admin'

/**
 * API endpoint constants organized by module
 */
export const API_ENDPOINTS = {
  /**
   * User Management Endpoints
   */
  users: {
    list: `${BASE_PATH}/users`,
    getById: (id: string) => `${BASE_PATH}/users/${id}`,
    updateStatus: (id: string) => `${BASE_PATH}/users/${id}/status`,
    resetPassword: (id: string) => `${BASE_PATH}/users/${id}/reset-password`,
    delete: (id: string) => `${BASE_PATH}/users/${id}`,
    auditLogs: (id: string) => `${BASE_PATH}/users/${id}/audit-logs`,
  },

  /**
   * Organization Management Endpoints
   */
  organizations: {
    list: `${BASE_PATH}/organizations`,
    getStats: (id: string) => `${BASE_PATH}/organizations/${id}/stats`,
  },

  /**
   * Reporting Endpoints
   */
  reports: {
    transactions: `${BASE_PATH}/reports/transactions`,
    balances: `${BASE_PATH}/reports/balances`,
    staking: `${BASE_PATH}/reports/staking`,
    governance: `${BASE_PATH}/reports/governance`,
    exportTransactions: `${BASE_PATH}/reports/transactions/export`,
  },

  /**
   * Analytics Endpoints
   */
  analytics: {
    dashboard: `${BASE_PATH}/analytics/dashboard`,
    transactionVolume: `${BASE_PATH}/analytics/transaction-volume`,
    assetsUnderCustody: `${BASE_PATH}/analytics/assets-under-custody`,
    stakingTVL: `${BASE_PATH}/analytics/staking-tvl`,
    userGrowth: `${BASE_PATH}/analytics/user-growth`,
    systemHealth: `${BASE_PATH}/analytics/system-health`,
    realTime: `${BASE_PATH}/analytics/real-time`,
    financial: `${BASE_PATH}/analytics/financial`,
    userBehavior: `${BASE_PATH}/analytics/user-behavior`,
    performance: `${BASE_PATH}/analytics/performance`,
    risk: `${BASE_PATH}/analytics/risk`,
    custom: `${BASE_PATH}/analytics/custom`,
  },

  /**
   * Audit Log Endpoints
   */
  auditLogs: {
    query: `${BASE_PATH}/audit-logs/query`,
  },

  /**
   * Wallet Management Endpoints
   */
  wallet: {
    list: `${BASE_PATH}/wallets`,
    getById: (id: string) => `${BASE_PATH}/wallets/${id}`,
    create: `${BASE_PATH}/wallets`,
    update: (id: string) => `${BASE_PATH}/wallets/${id}`,
    delete: (id: string) => `${BASE_PATH}/wallets/${id}`,
    freeze: (id: string) => `${BASE_PATH}/wallets/${id}/freeze`,
    unfreeze: (id: string) => `${BASE_PATH}/wallets/${id}/unfreeze`,
    transitions: (id: string) => `${BASE_PATH}/wallets/${id}/transitions`,
    addresses: (id: string) => `${BASE_PATH}/wallets/${id}/addresses`,
    policies: (id: string) => `${BASE_PATH}/wallets/${id}/policies`,
    balanceHistory: (id: string) => `${BASE_PATH}/wallets/${id}/balance-history`,
    analytics: `${BASE_PATH}/wallets/analytics`,
    statistics: `${BASE_PATH}/wallets/statistics`,
  },

  /**
   * Pool Wallet Endpoints
   */
  pool: {
    list: `${BASE_PATH}/pool-wallets`,
    getById: (id: string) => `${BASE_PATH}/pool-wallets/${id}`,
    children: (id: string) => `${BASE_PATH}/pool-wallets/${id}/children`,
    policies: (id: string) => `${BASE_PATH}/pool-wallets/${id}/policies`,
    transfers: `${BASE_PATH}/internal-transfers`,
    transferById: (id: string) => `${BASE_PATH}/internal-transfers/${id}`,
    hierarchy: (id: string) => `${BASE_PATH}/pool-wallets/${id}/hierarchy`,
    statistics: `${BASE_PATH}/pool-wallets/statistics`,
  },

  /**
   * Transaction Management Endpoints
   */
  transactions: {
    list: `${BASE_PATH}/transactions`,
    getById: (id: string) => `${BASE_PATH}/transactions/${id}`,
    approve: (id: string) => `${BASE_PATH}/transactions/${id}/approve`,
    reject: (id: string) => `${BASE_PATH}/transactions/${id}/reject`,
    cancel: (id: string) => `${BASE_PATH}/transactions/${id}/cancel`,
    retry: (id: string) => `${BASE_PATH}/transactions/${id}/retry`,
    fees: `${BASE_PATH}/transactions/fees`,
    statistics: `${BASE_PATH}/transactions/statistics`,
    volumeChart: `${BASE_PATH}/transactions/volume-chart`,
  },

  /**
   * Transaction Batch Endpoints
   */
  transactionBatches: {
    list: `${BASE_PATH}/transaction-batches`,
    getById: (id: string) => `${BASE_PATH}/transaction-batches/${id}`,
    transactions: (id: string) => `${BASE_PATH}/transaction-batches/${id}/transactions`,
    approve: (id: string) => `${BASE_PATH}/transaction-batches/${id}/approve`,
    reject: (id: string) => `${BASE_PATH}/transaction-batches/${id}/reject`,
  },

  /**
   * Transaction Approval Endpoints
   */
  transactionApprovals: {
    pending: `${BASE_PATH}/transaction-approvals/pending`,
    getById: (id: string) => `${BASE_PATH}/transaction-approvals/${id}`,
    approve: (id: string) => `${BASE_PATH}/transaction-approvals/${id}/approve`,
    reject: (id: string) => `${BASE_PATH}/transaction-approvals/${id}/reject`,
    history: `${BASE_PATH}/transaction-approvals/history`,
  },

  /**
   * Blockchain Integration Endpoints
   */
  blockchain: {
    networks: `${BASE_PATH}/blockchain/networks`,
    deposits: `${BASE_PATH}/blockchain/deposits`,
    depositsPending: `${BASE_PATH}/blockchain/deposits/pending`,
    withdrawals: `${BASE_PATH}/blockchain/withdrawals`,
    withdrawalsPending: `${BASE_PATH}/blockchain/withdrawals/pending`,
    withdrawalRetry: (id: string) => `${BASE_PATH}/blockchain/withdrawals/${id}/retry`,
    addresses: `${BASE_PATH}/blockchain/addresses`,
    chainStatus: (chain: string) => `${BASE_PATH}/blockchain/${chain}/status`,
  },

  /**
   * Security & MPC Management Endpoints
   */
  security: {
    mpcKeyShares: `${BASE_PATH}/security/mpc-key-shares`,
    policies: `${BASE_PATH}/security/policies`,
    createPolicy: `${BASE_PATH}/security/policies`,
    alerts: `${BASE_PATH}/security/alerts`,
    resolveAlert: (id: string) => `${BASE_PATH}/security/alerts/${id}/resolve`,
    coldStorageRequests: `${BASE_PATH}/security/cold-storage-requests`,
    approveColdStorage: (id: string) => `${BASE_PATH}/security/cold-storage-requests/${id}/approve`,
    sessions: `${BASE_PATH}/security/sessions`,
    terminateSession: (id: string) => `${BASE_PATH}/security/sessions/${id}`,
    ipWhitelist: `${BASE_PATH}/security/ip-whitelist`,
    geoRestrictions: `${BASE_PATH}/security/geo-restrictions`,
  },

  /**
   * Staking Management Endpoints
   */
  staking: {
    pools: `${BASE_PATH}/staking/pools`,
    poolById: (id: string) => `${BASE_PATH}/staking/pools/${id}`,
    createPool: `${BASE_PATH}/staking/pools`,
    positions: `${BASE_PATH}/staking/positions`,
    positionById: (id: string) => `${BASE_PATH}/staking/positions/${id}`,
    rewards: `${BASE_PATH}/staking/rewards`,
    distributeRewards: `${BASE_PATH}/staking/rewards/distribute`,
    analytics: `${BASE_PATH}/staking/analytics`,
  },

  /**
   * Governance Management Endpoints
   */
  governance: {
    proposals: `${BASE_PATH}/governance/proposals`,
    proposalById: (id: string) => `${BASE_PATH}/governance/proposals/${id}`,
    createProposal: `${BASE_PATH}/governance/proposals`,
    votes: `${BASE_PATH}/governance/votes`,
    vote: (proposalId: string) => `${BASE_PATH}/governance/proposals/${proposalId}/vote`,
    delegations: `${BASE_PATH}/governance/delegations`,
    delegationById: (id: string) => `${BASE_PATH}/governance/delegations/${id}`,
    delegate: `${BASE_PATH}/governance/delegate`,
  },

  /**
   * Authentication Endpoints (non-admin)
   */
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
  },
} as const

/**
 * Export individual endpoint groups for convenience
 */
export const {
  users,
  organizations,
  reports,
  analytics,
  auditLogs,
  wallet,
  pool,
  transactions,
  transactionBatches,
  transactionApprovals,
  blockchain,
  security,
  staking,
  governance,
  auth
} = API_ENDPOINTS
