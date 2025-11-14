/**
 * Performance Analytics Route
 * Route: /analytics/performance
 */

import { createFileRoute } from '@tanstack/react-router'
import { PerformanceAnalyticsPage } from '@/features/analytics/pages/performance-analytics-page'

export const Route = createFileRoute('/_authenticated/analytics/performance')({
  component: PerformanceAnalyticsPage,
})
