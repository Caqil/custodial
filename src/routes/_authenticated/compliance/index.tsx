import { createFileRoute } from '@tanstack/react-router'
import { ComplianceDashboardPage } from '@/features/compliance/pages/compliance-dashboard-page'

export const Route = createFileRoute('/_authenticated/compliance/')({
  component: ComplianceDashboardPage,
})
