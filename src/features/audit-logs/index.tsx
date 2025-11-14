/**
 * Audit Logs Page
 * Comprehensive audit trail viewer with filtering
 */

import { useState, useMemo } from 'react'
import { FileDown } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuditLogs } from './hooks'
import { formatDate } from '@/lib/utils'
import { AuditResult } from '@/core/entities/audit-log.entity'

/**
 * Audit Logs Page
 */
export function AuditLogs() {
  const [filters, setFilters] = useState({
    resource_type: '',
    result: '',
    search: '',
  })

  // Date range: last 30 days
  const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const endDate = new Date().toISOString()

  const { data, isLoading } = useAuditLogs({
    start_date: startDate,
    end_date: endDate,
    limit: 100,
  })

  // Filter logs client-side
  const filteredLogs = useMemo(() => {
    if (!data?.logs) return []

    return data.logs.filter((log) => {
      if (filters.resource_type && log.resource_type !== filters.resource_type) {
        return false
      }
      if (filters.result && log.result !== filters.result) {
        return false
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesAction = log.action.toLowerCase().includes(searchLower)
        const matchesResource = log.resource_type.toLowerCase().includes(searchLower)
        const matchesIP = log.ip_address?.toLowerCase().includes(searchLower)
        if (!matchesAction && !matchesResource && !matchesIP) {
          return false
        }
      }
      return true
    })
  }, [data?.logs, filters])

  const handleExport = () => {
    const headers = ['Timestamp', 'User ID', 'Action', 'Resource Type', 'Resource ID', 'Result', 'IP Address']
    const rows = filteredLogs.map((log) => [
      log.created_at,
      log.user_id || '',
      log.action,
      log.resource_type,
      log.resource_id || '',
      log.result,
      log.ip_address || '',
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        {/* Page Header */}
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Audit Logs</h2>
            <p className='text-muted-foreground'>
              Complete audit trail of system activities
            </p>
          </div>
          <Button onClick={handleExport} variant='outline'>
            <FileDown className='mr-2 h-4 w-4' />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <div className='flex flex-wrap gap-4'>
          <div className='relative flex-1 min-w-[200px]'>
            <Input
              placeholder='Search actions, resources, IP...'
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
          <Select
            value={filters.resource_type}
            onValueChange={(value) => setFilters({ ...filters, resource_type: value })}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Resource Type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=''>All Types</SelectItem>
              <SelectItem value='user'>User</SelectItem>
              <SelectItem value='wallet'>Wallet</SelectItem>
              <SelectItem value='transaction'>Transaction</SelectItem>
              <SelectItem value='staking'>Staking</SelectItem>
              <SelectItem value='proposal'>Proposal</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filters.result}
            onValueChange={(value) => setFilters({ ...filters, result: value })}
          >
            <SelectTrigger className='w-[150px]'>
              <SelectValue placeholder='Result' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=''>All Results</SelectItem>
              <SelectItem value={AuditResult.Success}>Success</SelectItem>
              <SelectItem value={AuditResult.Failure}>Failure</SelectItem>
              <SelectItem value={AuditResult.Denied}>Denied</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        {data && (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <div className='rounded-lg border p-4'>
              <p className='text-muted-foreground text-sm font-medium'>Total Logs</p>
              <p className='text-2xl font-bold'>{data.total}</p>
            </div>
            <div className='rounded-lg border p-4'>
              <p className='text-muted-foreground text-sm font-medium'>Filtered</p>
              <p className='text-2xl font-bold'>{filteredLogs.length}</p>
            </div>
            <div className='rounded-lg border p-4'>
              <p className='text-muted-foreground text-sm font-medium'>Success</p>
              <p className='text-2xl font-bold text-green-600'>
                {data.logs.filter((l) => l.result === 'success').length}
              </p>
            </div>
            <div className='rounded-lg border p-4'>
              <p className='text-muted-foreground text-sm font-medium'>Failures</p>
              <p className='text-2xl font-bold text-red-600'>
                {data.logs.filter((l) => l.result === 'failure' || l.result === 'denied').length}
              </p>
            </div>
          </div>
        )}

        {/* Audit Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Audit Trail</CardTitle>
            <CardDescription>Last 30 days of system activity</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className='space-y-3'>
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} className='h-20 w-full' />
                ))}
              </div>
            ) : filteredLogs.length > 0 ? (
              <div className='space-y-2'>
                {filteredLogs.map((log) => (
                  <div key={log.id} className='rounded-lg border p-4'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1 space-y-1'>
                        <div className='flex items-center gap-2'>
                          <p className='font-medium'>{log.action}</p>
                          <Badge
                            variant={
                              log.result === 'success'
                                ? 'default'
                                : log.result === 'failure'
                                  ? 'destructive'
                                  : 'secondary'
                            }
                            className={
                              log.result === 'success'
                                ? 'bg-green-500 hover:bg-green-600'
                                : log.result === 'denied'
                                  ? 'bg-yellow-500 hover:bg-yellow-600'
                                  : ''
                            }
                          >
                            {log.result}
                          </Badge>
                          {log.severity && (
                            <Badge variant='outline' className='text-xs'>
                              {log.severity}
                            </Badge>
                          )}
                        </div>
                        <div className='flex gap-4 text-sm text-muted-foreground'>
                          <span>Resource: {log.resource_type}</span>
                          {log.resource_id && (
                            <span>ID: {log.resource_id.slice(0, 8)}...</span>
                          )}
                          {log.ip_address && <span>IP: {log.ip_address}</span>}
                        </div>
                        <p className='text-xs text-muted-foreground'>
                          {formatDate(log.created_at)}
                        </p>
                      </div>
                    </div>
                    {log.changes && Object.keys(log.changes).length > 0 && (
                      <div className='bg-muted mt-3 rounded p-2'>
                        <p className='text-muted-foreground mb-1 text-xs font-medium'>
                          Changes:
                        </p>
                        <pre className='text-xs overflow-x-auto'>
                          {JSON.stringify(log.changes, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-muted-foreground py-8 text-center'>
                No audit logs found matching the filters
              </div>
            )}
          </CardContent>
        </Card>
      </Main>
    </>
  )
}
