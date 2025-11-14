/**
 * Blockchain Deposits Route
 * Route for deposit monitoring page
 */

import { createFileRoute } from '@tanstack/react-router'
import DepositsPage from '@/features/blockchain/pages/deposits-page'
import { z } from 'zod'

/**
 * Deposits search schema
 */
const depositsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(20),
  chain: z
    .union([
      z.literal('BTC'),
      z.literal('ETH'),
      z.literal('MATIC'),
      z.literal('BNB'),
      z.literal('LTC'),
      z.literal('all'),
    ])
    .optional()
    .catch('all'),
  status: z
    .union([
      z.literal('detected'),
      z.literal('confirming'),
      z.literal('confirmed'),
      z.literal('credited'),
      z.literal('failed'),
      z.literal('all'),
    ])
    .optional()
    .catch('all'),
})

/**
 * Deposits route definition
 */
export const Route = createFileRoute('/_authenticated/blockchain/deposits')({
  validateSearch: depositsSearchSchema,
  component: DepositsPage,
})
