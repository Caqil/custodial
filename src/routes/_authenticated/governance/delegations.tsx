/**
 * Governance Delegations Route
 * Route: /governance/delegations
 */

import { createFileRoute } from '@tanstack/react-router'
import { DelegationsPage } from '@/features/governance'

export const Route = createFileRoute('/_authenticated/governance/delegations')({
  component: DelegationsPage,
})
