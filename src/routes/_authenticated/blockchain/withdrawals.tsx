/**
 * Blockchain Withdrawals Route
 * Route for withdrawal broadcasting page
 */

import { createFileRoute } from '@tanstack/react-router'
import WithdrawalsPage from '@/features/blockchain/pages/withdrawals-page'
import { z } from 'zod'

/**
 * Withdrawals search schema
 */
const withdrawalsSearchSchema = z.object({
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
      z.literal('pending'),
      z.literal('broadcasting'),
      z.literal('broadcasted'),
      z.literal('failed'),
      z.literal('all'),
    ])
    .optional()
    .catch('all'),
})

/**
 * Withdrawals route definition
 */
export const Route = createFileRoute('/_authenticated/blockchain/withdrawals')({
  validateSearch: withdrawalsSearchSchema,
  component: WithdrawalsPage,
})
