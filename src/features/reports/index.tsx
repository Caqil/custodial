/**
 * Reports Page
 * Dashboard with tabs for different report types
 */

import { useState } from 'react'
import { FileDown, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ReportDateFilter } from './components/report-date-filter'
import {
  useTransactionReport,
  useBalanceReport,
  useStakingReport,
  useGovernanceReport,
  useExportCSV,
} from './hooks'
import { formatDate, formatCurrency } from '@/lib/utils'

/**
 * Main reports page component
 */
export function Reports() {
  // Date filter state
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
  )
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())

  // Transaction report
  const transactionReportRequest = {
    start_date: startDate?.toISOString() ?? '',
    end_date: endDate?.toISOString() ?? '',
  }
  const { data: transactionReport, isLoading: isLoadingTransactions } =
    useTransactionReport(transactionReportRequest, !!(startDate && endDate))

  // Balance report
  const { data: balanceReport, isLoading: isLoadingBalances } = useBalanceReport({})

  // Staking report
  const { data: stakingReport, isLoading: isLoadingStaking } = useStakingReport({})

  // Governance report
  const { data: governanceReport, isLoading: isLoadingGovernance } =
    useGovernanceReport({})

  // CSV export
  const exportCSV = useExportCSV()

  const handleExportTransactions = () => {
    exportCSV.mutate(transactionReportRequest)
  }

  if (!transactionReport && !isLoadingTransactions && startDate && endDate) {
    return (
      <div className='container mx-auto py-8'>
        <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
          <h3 className='font-semibold text-red-900'>Error loading reports</h3>
          <p className='text-sm text-red-700'>
            Unable to load report data. Please try again.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto space-y-8 py-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Reports</h1>
          <p className='text-muted-foreground'>
            Generate and export various reports
          </p>
        </div>
      </div>

      {/* Filters */}
      <ReportDateFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      {/* Report Tabs */}
      <Tabs defaultValue='transactions' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='transactions'>Transactions</TabsTrigger>
          <TabsTrigger value='balances'>Balances</TabsTrigger>
          <TabsTrigger value='staking'>Staking</TabsTrigger>
          <TabsTrigger value='governance'>Governance</TabsTrigger>
        </TabsList>

        {/* Transactions Tab */}
        <TabsContent value='transactions' className='space-y-4'>
          <div className='flex justify-end'>
            <Button
              onClick={handleExportTransactions}
              disabled={exportCSV.isPending}
            >
              {exportCSV.isPending ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <FileDown className='mr-2 h-4 w-4' />
              )}
              Export CSV
            </Button>
          </div>

          {isLoadingTransactions ? (
            <Skeleton className='h-64 w-full' />
          ) : transactionReport ? (
            <>
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium'>Total Volume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-bold'>{transactionReport.total_volume}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium'>Completed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-bold text-green-600'>
                      {transactionReport.completed_count}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium'>Failed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-bold text-red-600'>
                      {transactionReport.failed_count}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium'>Pending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-bold text-orange-600'>
                      {transactionReport.pending_count}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
                    Last {transactionReport.transactions.length} transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    {transactionReport.transactions.slice(0, 10).map((tx) => (
                      <div
                        key={tx.id}
                        className='flex items-center justify-between rounded-lg border p-3'
                      >
                        <div className='flex-1'>
                          <p className='font-medium'>{tx.type}</p>
                          <p className='text-muted-foreground text-xs'>
                            {tx.tx_hash?.slice(0, 16)}...
                          </p>
                        </div>
                        <div className='text-right'>
                          <p className='font-mono text-sm font-semibold'>
                            {formatCurrency(tx.amount, tx.currency)} {tx.currency}
                          </p>
                          <Badge
                            variant={
                              tx.status === 'completed'
                                ? 'default'
                                : tx.status === 'failed'
                                  ? 'destructive'
                                  : 'secondary'
                            }
                            className='text-xs'
                          >
                            {tx.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : null}
        </TabsContent>

        {/* Balances Tab */}
        <TabsContent value='balances' className='space-y-4'>
          {isLoadingBalances ? (
            <Skeleton className='h-64 w-full' />
          ) : balanceReport ? (
            <Card>
              <CardHeader>
                <CardTitle>Balance Report by Currency</CardTitle>
                <CardDescription>
                  Generated at {formatDate(balanceReport.generated_at)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {balanceReport.balances.map((balance) => (
                    <div
                      key={balance.currency}
                      className='grid grid-cols-2 gap-4 rounded-lg border p-4 sm:grid-cols-4'
                    >
                      <div>
                        <p className='text-muted-foreground text-sm'>Currency</p>
                        <p className='font-medium'>{balance.currency}</p>
                      </div>
                      <div>
                        <p className='text-muted-foreground text-sm'>Total Balance</p>
                        <p className='font-mono text-sm font-semibold'>
                          {formatCurrency(balance.total_balance, balance.currency)}
                        </p>
                      </div>
                      <div>
                        <p className='text-muted-foreground text-sm'>Available</p>
                        <p className='font-mono text-sm font-semibold text-green-600'>
                          {formatCurrency(balance.available_balance, balance.currency)}
                        </p>
                      </div>
                      <div>
                        <p className='text-muted-foreground text-sm'>Wallets</p>
                        <p className='font-semibold'>{balance.wallet_count}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </TabsContent>

        {/* Staking Tab */}
        <TabsContent value='staking' className='space-y-4'>
          {isLoadingStaking ? (
            <Skeleton className='h-64 w-full' />
          ) : stakingReport ? (
            <>
              <div className='grid gap-4 sm:grid-cols-3'>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium'>Total Staked</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-bold'>{stakingReport.total_staked}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium'>Total Rewards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-bold text-green-600'>
                      {stakingReport.total_rewards}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium'>Active Positions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-bold'>{stakingReport.active_count}</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Staking Pools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    {stakingReport.pools.map((pool) => (
                      <div
                        key={pool.id}
                        className='flex items-center justify-between rounded-lg border p-3'
                      >
                        <div>
                          <p className='font-medium'>{pool.name}</p>
                          <p className='text-muted-foreground text-sm'>{pool.currency}</p>
                        </div>
                        <div className='text-right'>
                          <p className='font-mono text-sm font-semibold'>
                            {formatCurrency(pool.total_staked, pool.currency)}
                          </p>
                          <p className='text-muted-foreground text-xs'>
                            {pool.reward_rate}% APY
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : null}
        </TabsContent>

        {/* Governance Tab */}
        <TabsContent value='governance' className='space-y-4'>
          {isLoadingGovernance ? (
            <Skeleton className='h-64 w-full' />
          ) : governanceReport ? (
            <>
              <div className='grid gap-4 sm:grid-cols-4'>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium'>Total Proposals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-bold'>{governanceReport.total_count}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium'>Active</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-bold text-blue-600'>
                      {governanceReport.active_count}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium'>Passed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-bold text-green-600'>
                      {governanceReport.passed_count}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-sm font-medium'>Rejected</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-2xl font-bold text-red-600'>
                      {governanceReport.rejected_count}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Proposals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    {governanceReport.proposals.map((proposal) => (
                      <div key={proposal.id} className='rounded-lg border p-4'>
                        <div className='flex items-start justify-between'>
                          <div className='flex-1'>
                            <p className='font-medium'>{proposal.title}</p>
                            <p className='text-muted-foreground mt-1 text-sm'>
                              {proposal.description}
                            </p>
                          </div>
                          <Badge
                            variant={
                              proposal.status === 'passed'
                                ? 'default'
                                : proposal.status === 'active'
                                  ? 'secondary'
                                  : 'destructive'
                            }
                          >
                            {proposal.status}
                          </Badge>
                        </div>
                        <div className='mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3'>
                          <div>
                            <p className='text-muted-foreground text-xs'>Votes For</p>
                            <p className='font-mono text-sm font-semibold text-green-600'>
                              {proposal.votes_for}
                            </p>
                          </div>
                          <div>
                            <p className='text-muted-foreground text-xs'>Votes Against</p>
                            <p className='font-mono text-sm font-semibold text-red-600'>
                              {proposal.votes_against}
                            </p>
                          </div>
                          <div>
                            <p className='text-muted-foreground text-xs'>Expires</p>
                            <p className='text-sm'>
                              {formatDate(proposal.expires_at, false)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  )
}
