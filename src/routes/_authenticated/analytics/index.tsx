/**
 * Analytics Dashboard Route
 * Route: /analytics
 */

import { createFileRoute } from '@tanstack/react-router'
import { AnalyticsDashboardPage } from '@/features/analytics/pages/analytics-dashboard-page'

export const Route = createFileRoute('/_authenticated/analytics/')({
  component: AnalyticsDashboardPage,
})
