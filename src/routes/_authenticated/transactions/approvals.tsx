/**
 * Transaction Approvals Route
 * Route for transaction approval management
 */

import { createFileRoute } from '@tanstack/react-router'
import { TransactionApprovalsPage } from '@/features/transactions'
import { z } from 'zod'

/**
 * Approvals search schema
 */
const approvalsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(20),
  status: z
    .union([
      z.literal('pending'),
      z.literal('approved'),
      z.literal('rejected'),
      z.literal('all'),
    ])
    .optional()
    .catch('all'),
})

/**
 * Transaction approvals route definition
 */
export const Route = createFileRoute('/_authenticated/transactions/approvals')({
  validateSearch: approvalsSearchSchema,
  component: TransactionApprovalsPage,
})
