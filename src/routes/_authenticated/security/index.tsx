/**
 * Security Dashboard Route
 * Main route for security overview
 */

import { createFileRoute } from '@tanstack/react-router'
import { SecurityDashboardPage } from '@/features/security'

/**
 * Security dashboard route definition
 */
export const Route = createFileRoute('/_authenticated/security/')({
  component: SecurityDashboardPage,
})
