/**
 * Staking Dashboard Route
 * Route: /staking
 */

import { createFileRoute } from '@tanstack/react-router'
import { StakingDashboardPage } from '@/features/staking'

export const Route = createFileRoute('/_authenticated/staking/')({
  component: StakingDashboardPage,
})
