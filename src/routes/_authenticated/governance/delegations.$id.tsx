/**
 * Governance Delegation Detail Route
 * Route: /governance/delegations/:id
 */

import { createFileRoute } from '@tanstack/react-router'
import { DelegationsPage } from '@/features/governance'

export const Route = createFileRoute('/_authenticated/governance/delegations/$id')({
  component: DelegationsPage,
})
