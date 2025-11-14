/**
 * Governance Proposals Route
 * Route: /governance/proposals
 */

import { createFileRoute } from '@tanstack/react-router'
import { ProposalsPage } from '@/features/governance'

export const Route = createFileRoute('/_authenticated/governance/proposals')({
  component: ProposalsPage,
})
