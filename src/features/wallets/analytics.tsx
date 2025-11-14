/**
 * Wallet Analytics Page
 * Charts and analytics for wallet management
 */

import { WalletDistributionChart } from './components/wallet-distribution-chart'
import { WalletStatsCards } from './components/wallet-stats-cards'

/**
 * Wallet Analytics Page Component
 */
export default function WalletAnalyticsPage() {
  return (
    <div className='container mx-auto space-y-8 py-8'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Wallet Analytics</h1>
        <p className='text-muted-foreground'>
          Comprehensive analytics and insights for your wallet ecosystem
        </p>
      </div>

      {/* Stats Cards */}
      <WalletStatsCards />

      {/* Charts */}
      <div className='grid gap-6 md:grid-cols-2'>
        <WalletDistributionChart />
      </div>
    </div>
  )
}
