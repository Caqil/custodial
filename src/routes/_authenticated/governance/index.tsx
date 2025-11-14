/**
 * Governance Dashboard Route
 * Route: /governance
 */

import { createFileRoute } from '@tanstack/react-router'
import { GovernanceDashboardPage } from '@/features/governance'

export const Route = createFileRoute('/_authenticated/governance/')({
  component: GovernanceDashboardPage,
})
