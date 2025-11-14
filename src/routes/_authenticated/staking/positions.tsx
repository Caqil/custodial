/**
 * Staking Positions Route
 * Route: /staking/positions
 */

import { createFileRoute } from '@tanstack/react-router'
import { StakingPositionsPage } from '@/features/staking'

export const Route = createFileRoute('/_authenticated/staking/positions')({
  component: StakingPositionsPage,
})
