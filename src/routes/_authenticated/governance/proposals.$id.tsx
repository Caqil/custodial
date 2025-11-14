/**
 * Governance Proposal Detail Route
 * Route: /governance/proposals/:id
 */

import { createFileRoute } from '@tanstack/react-router'
import { ProposalsPage } from '@/features/governance'

export const Route = createFileRoute('/_authenticated/governance/proposals/$id')({
  component: ProposalsPage,
})
