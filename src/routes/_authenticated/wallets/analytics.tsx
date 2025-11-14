/**
 * Wallet Analytics Route
 * Route for wallet analytics and charts
 */

import { createFileRoute } from '@tanstack/react-router'
import WalletAnalyticsPage from '@/features/wallets/analytics'

/**
 * Wallet analytics route definition
 */
export const Route = createFileRoute('/_authenticated/wallets/analytics')({
  component: WalletAnalyticsPage,
})
