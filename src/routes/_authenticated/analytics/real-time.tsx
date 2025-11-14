/**
 * Real-Time Monitoring Route
 * Route: /analytics/real-time
 */

import { createFileRoute } from '@tanstack/react-router'
import { RealTimeMonitoringPage } from '@/features/analytics/pages/real-time-monitoring-page'

export const Route = createFileRoute('/_authenticated/analytics/real-time')({
  component: RealTimeMonitoringPage,
})
