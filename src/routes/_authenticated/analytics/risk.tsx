/**
 * Risk Analytics Route
 * Route: /analytics/risk
 */

import { createFileRoute } from '@tanstack/react-router'
import { RiskAnalyticsPage } from '@/features/analytics/pages/risk-analytics-page'

export const Route = createFileRoute('/_authenticated/analytics/risk')({
  component: RiskAnalyticsPage,
})
