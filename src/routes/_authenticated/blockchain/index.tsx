/**
 * Blockchain Dashboard Route
 * Main route for blockchain integration dashboard
 */

import { createFileRoute } from '@tanstack/react-router'
import BlockchainDashboardPage from '@/features/blockchain/pages/blockchain-dashboard-page'

/**
 * Blockchain dashboard route definition
 */
export const Route = createFileRoute('/_authenticated/blockchain/')({
  component: BlockchainDashboardPage,
})
