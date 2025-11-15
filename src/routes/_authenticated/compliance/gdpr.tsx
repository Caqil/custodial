import { createFileRoute } from '@tanstack/react-router'
import { GDPRRequestsPage } from '@/features/compliance/pages/gdpr-requests-page'

export const Route = createFileRoute('/_authenticated/compliance/gdpr')({
  component: GDPRRequestsPage,
})
