/**
 * Blockchain Dashboard Page
 * Overview of all blockchain networks and recent activity
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NetworkStatusGrid } from '../components/network-status-grid'
import { GasPriceChart } from '../components/gas-price-chart'
import { DepositWithdrawalTrend } from '../components/deposit-withdrawal-trend'
import { ChainActivityComparison } from '../components/chain-activity-comparison'
import { DepositList } from '../components/deposit-list'
import { WithdrawalList } from '../components/withdrawal-list'
import { DepositDetailDrawer } from '../components/deposit-detail-drawer'
import { WithdrawalDetailDrawer } from '../components/withdrawal-detail-drawer'
import { useNetworks, usePendingDeposits, usePendingWithdrawals } from '../hooks'
import { DepositDetection, WithdrawalBroadcast } from '@/core/entities/blockchain.entity'
import { Activity, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'

/**
 * Main blockchain dashboard page
 */
export default function BlockchainDashboardPage() {
  const [selectedDeposit, setSelectedDeposit] = useState<DepositDetection | null>(null)
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalBroadcast | null>(null)

  const { data: networks, isLoading: isLoadingNetworks } = useNetworks()
  const { data: pendingDeposits, isLoading: isLoadingDeposits } = usePendingDeposits()
  const { data: pendingWithdrawals, isLoading: isLoadingWithdrawals } = usePendingWithdrawals()

  // Calculate summary stats
  const healthyNetworks = networks?.filter(n => n.status === 'healthy').length || 0
  const totalNetworks = networks?.length || 0
  const pendingDepositCount = pendingDeposits?.length || 0
  const pendingWithdrawalCount = pendingWithdrawals?.length || 0

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Blockchain Integration</h1>
          <p className='text-muted-foreground'>
            Monitor blockchain networks, deposits, and withdrawals
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Network Status</CardTitle>
            <Activity className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {healthyNetworks}/{totalNetworks}
            </div>
            <p className='text-xs text-muted-foreground'>
              Networks healthy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Pending Deposits</CardTitle>
            <TrendingUp className='h-4 w-4 text-green-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{pendingDepositCount}</div>
            <p className='text-xs text-muted-foreground'>
              Awaiting confirmations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Pending Withdrawals</CardTitle>
            <TrendingDown className='h-4 w-4 text-red-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{pendingWithdrawalCount}</div>
            <p className='text-xs text-muted-foreground'>
              In broadcast queue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Alerts</CardTitle>
            <AlertCircle className='h-4 w-4 text-yellow-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {networks?.filter(n => n.status !== 'healthy').length || 0}
            </div>
            <p className='text-xs text-muted-foreground'>
              Networks degraded/offline
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Network Status Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Network Status</CardTitle>
          <CardDescription>Real-time status of all blockchain networks</CardDescription>
        </CardHeader>
        <CardContent>
          <NetworkStatusGrid networks={networks || []} isLoading={isLoadingNetworks} />
        </CardContent>
      </Card>

      {/* Charts */}
      <div className='grid gap-4 md:grid-cols-2'>
        <DepositWithdrawalTrend />
        <ChainActivityComparison />
      </div>

      <GasPriceChart />

      {/* Pending Transactions */}
      <Tabs defaultValue='deposits' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='deposits'>
            Pending Deposits ({pendingDepositCount})
          </TabsTrigger>
          <TabsTrigger value='withdrawals'>
            Pending Withdrawals ({pendingWithdrawalCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value='deposits' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Pending Deposits</CardTitle>
              <CardDescription>Deposits awaiting blockchain confirmations</CardDescription>
            </CardHeader>
            <CardContent>
              <DepositList
                deposits={pendingDeposits || []}
                isLoading={isLoadingDeposits}
                onViewDetails={setSelectedDeposit}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='withdrawals' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Pending Withdrawals</CardTitle>
              <CardDescription>Withdrawals in broadcast queue</CardDescription>
            </CardHeader>
            <CardContent>
              <WithdrawalList
                withdrawals={pendingWithdrawals || []}
                isLoading={isLoadingWithdrawals}
                onViewDetails={setSelectedWithdrawal}
                onRetry={() => {}}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detail Drawers */}
      <DepositDetailDrawer
        deposit={selectedDeposit}
        open={!!selectedDeposit}
        onOpenChange={(open) => !open && setSelectedDeposit(null)}
      />

      <WithdrawalDetailDrawer
        withdrawal={selectedWithdrawal}
        open={!!selectedWithdrawal}
        onOpenChange={(open) => !open && setSelectedWithdrawal(null)}
      />
    </div>
  )
}
