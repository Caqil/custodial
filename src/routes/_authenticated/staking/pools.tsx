/**
 * Staking Pools Route
 * Route: /staking/pools
 */

import { createFileRoute } from '@tanstack/react-router'
import { StakingPoolsPage } from '@/features/staking'

export const Route = createFileRoute('/_authenticated/staking/pools')({
  component: StakingPoolsPage,
})
