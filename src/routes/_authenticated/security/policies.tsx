/**
 * Security Policies Route
 * Route for security policy management
 */

import { createFileRoute } from '@tanstack/react-router'
import { SecurityPoliciesPage } from '@/features/security'

/**
 * Security policies route definition
 */
export const Route = createFileRoute('/_authenticated/security/policies')({
  component: SecurityPoliciesPage,
})
