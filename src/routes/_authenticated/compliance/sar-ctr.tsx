import { createFileRoute } from '@tanstack/react-router'
import { SARCTRPage } from '@/features/compliance/pages/sar-ctr-page'

export const Route = createFileRoute('/_authenticated/compliance/sar-ctr')({
  component: SARCTRPage,
})
