/**
 * Transactions Route
 * Main route for transaction management
 */

import { createFileRoute } from '@tanstack/react-router'
import { TransactionsPage } from '@/features/transactions'
import { z } from 'zod'

/**
 * Transaction search schema
 */
const transactionsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(20),
  type: z
    .union([
      z.literal('deposit'),
      z.literal('withdrawal'),
      z.literal('transfer'),
      z.literal('stake'),
      z.literal('unstake'),
      z.literal('governance'),
      z.literal('all'),
    ])
    .optional()
    .catch('all'),
  status: z
    .union([
      z.literal('pending'),
      z.literal('approved'),
      z.literal('processing'),
      z.literal('completed'),
      z.literal('failed'),
      z.literal('rejected'),
      z.literal('cancelled'),
      z.literal('all'),
    ])
    .optional()
    .catch('all'),
  currency: z.string().optional().catch('all'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

/**
 * Transactions route definition
 */
export const Route = createFileRoute('/_authenticated/transactions/')({
  validateSearch: transactionsSearchSchema,
  component: TransactionsPage,
})
