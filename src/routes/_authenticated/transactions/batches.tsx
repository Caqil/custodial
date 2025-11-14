/**
 * Transaction Batches Route
 * Route for transaction batch management
 */

import { createFileRoute } from '@tanstack/react-router'
import { TransactionBatchesPage } from '@/features/transactions'
import { z } from 'zod'

/**
 * Batch search schema
 */
const batchesSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(20),
  status: z
    .union([
      z.literal('pending'),
      z.literal('processing'),
      z.literal('completed'),
      z.literal('partial'),
      z.literal('failed'),
      z.literal('all'),
    ])
    .optional()
    .catch('all'),
})

/**
 * Transaction batches route definition
 */
export const Route = createFileRoute('/_authenticated/transactions/batches')({
  validateSearch: batchesSearchSchema,
  component: TransactionBatchesPage,
})
