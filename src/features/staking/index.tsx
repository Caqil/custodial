/**
 * Staking Feature Module
 * Main entry point for staking management
 */

// Export pages
export { StakingDashboardPage } from './pages/staking-dashboard-page'
export { StakingPoolsPage } from './pages/staking-pools-page'
export { StakingPositionsPage } from './pages/staking-positions-page'

// Export hooks
export * from './hooks'

// Export components
export { StakingPoolCard } from './components/staking-pool-card'
export { StakingPoolList } from './components/staking-pool-list'
export { StakingPoolDetail } from './components/staking-pool-detail'
export { PoolCreateDialog } from './components/pool-create-dialog'
export { PoolStatusBadge } from './components/pool-status-badge'
export { StakingPositionList } from './components/staking-position-list'
export { StakingPositionDetail } from './components/staking-position-detail'
export { PositionStatusBadge } from './components/position-status-badge'
export { StakingRewardList } from './components/staking-reward-list'
export { RewardDistributeDialog } from './components/reward-distribute-dialog'
export { RewardStatusBadge } from './components/reward-status-badge'
export { TVLChart } from './components/tvl-chart'
export { PoolComparisonChart } from './components/pool-comparison-chart'
export { RewardsDistributionChart } from './components/rewards-distribution-chart'
export { APYTrendsChart } from './components/apy-trends-chart'
