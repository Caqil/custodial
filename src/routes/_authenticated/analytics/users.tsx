/**
 * User Analytics Route
 * Route: /analytics/users
 */

import { createFileRoute } from '@tanstack/react-router'
import { UserAnalyticsPage } from '@/features/analytics/pages/user-analytics-page'

export const Route = createFileRoute('/_authenticated/analytics/users')({
  component: UserAnalyticsPage,
})
