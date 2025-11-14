/**
 * MPC Keys Route
 * Route for MPC key management
 */

import { createFileRoute } from '@tanstack/react-router'
import { MPCKeysPage } from '@/features/security'

/**
 * MPC keys route definition
 */
export const Route = createFileRoute('/_authenticated/security/mpc-keys')({
  component: MPCKeysPage,
})
