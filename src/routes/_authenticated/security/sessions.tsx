/**
 * Sessions Route
 * Route for session and access control management
 */

import { createFileRoute } from '@tanstack/react-router'
import { SessionsPage } from '@/features/security'

/**
 * Sessions route definition
 */
export const Route = createFileRoute('/_authenticated/security/sessions')({
  component: SessionsPage,
})
