/**
 * Wallets Route
 * Main route for wallet management
 */

import { createFileRoute } from '@tanstack/react-router'
import WalletsPage from '@/features/wallets'
import { z } from 'zod'

/**
 * Wallet search schema
 */
const walletsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(20),
  type: z
    .union([
      z.literal('hot'),
      z.literal('warm'),
      z.literal('cold'),
      z.literal('all'),
    ])
    .optional()
    .catch('all'),
  currency: z.string().optional().catch('all'),
  status: z
    .union([
      z.literal('active'),
      z.literal('inactive'),
      z.literal('frozen'),
      z.literal('migrating'),
      z.literal('all'),
    ])
    .optional()
    .catch('all'),
})

/**
 * Wallets route definition
 */
export const Route = createFileRoute('/_authenticated/wallets/')({
  validateSearch: walletsSearchSchema,
  component: WalletsPage,
})
