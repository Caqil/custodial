import { createFileRoute } from '@tanstack/react-router'
import { KYCManagementPage } from '@/features/compliance/pages/kyc-management-page'

export const Route = createFileRoute('/_authenticated/compliance/kyc')({
  component: KYCManagementPage,
})
