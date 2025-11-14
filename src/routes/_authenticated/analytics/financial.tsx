/**
 * Financial Analytics Route
 * Route: /analytics/financial
 */

import { createFileRoute } from '@tanstack/react-router'
import { FinancialAnalyticsPage } from '@/features/analytics/pages/financial-analytics-page'

export const Route = createFileRoute('/_authenticated/analytics/financial')({
  component: FinancialAnalyticsPage,
})
