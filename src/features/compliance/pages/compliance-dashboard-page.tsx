/**
 * Compliance Dashboard Page
 * Overview of KYC, GDPR, SAR/CTR compliance status
 */

import { Link } from '@tanstack/react-router'
import {
  Shield,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  FileText,
  AlertCircle,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useComplianceStatistics } from '../hooks'

export function ComplianceDashboardPage() {
  const { data: stats, isLoading, error } = useComplianceStatistics()

  if (error) {
    return (
      <div className='container mx-auto py-8'>
        <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
          <h3 className='font-semibold text-red-900'>Error loading compliance dashboard</h3>
          <p className='text-sm text-red-700'>
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='container mx-auto py-8'>
        <div className='flex items-center justify-center py-20'>
          <div className='text-center'>
            <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto' />
            <p className='mt-4 text-sm text-muted-foreground'>Loading compliance data...</p>
          </div>
        </div>
      </div>
    )
  }

  const overdueCount = (stats?.sar_ctr.overdue_sars || 0) + (stats?.sar_ctr.overdue_ctrs || 0) + (stats?.gdpr.overdue_requests || 0)
  const hasDeadlineAlerts = overdueCount > 0

  return (
    <div className='container mx-auto space-y-8 py-8'>
      {/* Header */}
      <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Compliance Dashboard</h1>
          <p className='text-muted-foreground mt-1'>
            Monitor KYC, GDPR, and regulatory compliance status
          </p>
        </div>
        <Badge
          variant={hasDeadlineAlerts ? 'destructive' : 'default'}
          className='w-fit'
        >
          <Shield className='mr-1 h-3 w-3' />
          {hasDeadlineAlerts ? `${overdueCount} Overdue Items` : 'All Clear'}
        </Badge>
      </div>

      {/* Critical Alerts */}
      {hasDeadlineAlerts && (
        <Card className='border-red-200 bg-red-50'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-red-900'>
              <AlertTriangle className='h-5 w-5' />
              Critical Deadline Alerts
            </CardTitle>
            <CardDescription className='text-red-700'>
              Immediate action required to avoid regulatory penalties
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {stats?.sar_ctr.overdue_sars > 0 && (
              <div className='flex items-center justify-between rounded-lg bg-white p-4'>
                <div className='flex items-center gap-3'>
                  <AlertCircle className='h-5 w-5 text-red-600' />
                  <div>
                    <p className='font-medium text-red-900'>
                      {stats.sar_ctr.overdue_sars} Overdue SAR Reports
                    </p>
                    <p className='text-sm text-red-700'>Filing deadline exceeded (30 days)</p>
                  </div>
                </div>
                <Button asChild size='sm' variant='destructive'>
                  <Link to='/compliance/sar-ctr'>
                    Review Now
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
              </div>
            )}
            {stats?.sar_ctr.overdue_ctrs > 0 && (
              <div className='flex items-center justify-between rounded-lg bg-white p-4'>
                <div className='flex items-center gap-3'>
                  <AlertCircle className='h-5 w-5 text-red-600' />
                  <div>
                    <p className='font-medium text-red-900'>
                      {stats.sar_ctr.overdue_ctrs} Overdue CTR Reports
                    </p>
                    <p className='text-sm text-red-700'>Filing deadline exceeded (15 days)</p>
                  </div>
                </div>
                <Button asChild size='sm' variant='destructive'>
                  <Link to='/compliance/sar-ctr'>
                    Review Now
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
              </div>
            )}
            {stats?.gdpr.overdue_requests > 0 && (
              <div className='flex items-center justify-between rounded-lg bg-white p-4'>
                <div className='flex items-center gap-3'>
                  <AlertCircle className='h-5 w-5 text-orange-600' />
                  <div>
                    <p className='font-medium text-orange-900'>
                      {stats.gdpr.overdue_requests} Overdue GDPR Requests
                    </p>
                    <p className='text-sm text-orange-700'>Response deadline exceeded (30 days)</p>
                  </div>
                </div>
                <Button asChild size='sm' variant='outline'>
                  <Link to='/compliance/gdpr'>
                    Review Now
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* KYC Statistics */}
      <div>
        <h2 className='mb-4 text-xl font-semibold'>KYC Verification Status</h2>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Pending Reviews</CardTitle>
              <Clock className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stats?.kyc.pending || 0}</div>
              <p className='text-xs text-muted-foreground mt-1'>
                Awaiting verification
              </p>
              <Button asChild variant='link' className='mt-2 h-auto p-0 text-xs'>
                <Link to='/compliance/kyc'>View pending →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Approved</CardTitle>
              <CheckCircle className='h-4 w-4 text-green-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stats?.kyc.approved || 0}</div>
              <p className='text-xs text-muted-foreground mt-1'>
                Active verifications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Expiring Soon</CardTitle>
              <AlertTriangle className='h-4 w-4 text-orange-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stats?.kyc.expiring_soon || 0}</div>
              <p className='text-xs text-muted-foreground mt-1'>
                Within 30 days
              </p>
              <Button asChild variant='link' className='mt-2 h-auto p-0 text-xs'>
                <Link to='/compliance/kyc'>Review →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Rejected</CardTitle>
              <XCircle className='h-4 w-4 text-red-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stats?.kyc.rejected || 0}</div>
              <p className='text-xs text-muted-foreground mt-1'>
                Failed verification
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* GDPR & Regulatory */}
      <div className='grid gap-4 md:grid-cols-2'>
        {/* GDPR Card */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Shield className='h-5 w-5' />
              GDPR Compliance
            </CardTitle>
            <CardDescription>Data protection and privacy requests</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>Active Consents</span>
              <span className='font-semibold'>{stats?.gdpr.active_consents || 0}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>Pending Requests</span>
              <Badge variant={stats?.gdpr.pending_requests > 0 ? 'default' : 'outline'}>
                {stats?.gdpr.pending_requests || 0}
              </Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>Data Breaches (This Month)</span>
              <Badge variant={stats?.gdpr.breaches_this_month > 0 ? 'destructive' : 'outline'}>
                {stats?.gdpr.breaches_this_month || 0}
              </Badge>
            </div>
            <Button asChild className='w-full' variant='outline'>
              <Link to='/compliance/gdpr'>
                Manage GDPR
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* SAR/CTR Card */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <FileText className='h-5 w-5' />
              Regulatory Filing (SAR/CTR)
            </CardTitle>
            <CardDescription>Suspicious activity and currency transaction reports</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>Pending SARs</span>
              <Badge variant={stats?.sar_ctr.pending_sars > 0 ? 'default' : 'outline'}>
                {stats?.sar_ctr.pending_sars || 0}
              </Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>Pending CTRs</span>
              <Badge variant={stats?.sar_ctr.pending_ctrs > 0 ? 'default' : 'outline'}>
                {stats?.sar_ctr.pending_ctrs || 0}
              </Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>Open Cases</span>
              <Badge variant={stats?.sar_ctr.open_cases > 0 ? 'secondary' : 'outline'}>
                {stats?.sar_ctr.open_cases || 0}
              </Badge>
            </div>
            <Button asChild className='w-full' variant='outline'>
              <Link to='/compliance/sar-ctr'>
                Manage Reports
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Users className='h-5 w-5' />
            High-Risk User Monitoring
          </CardTitle>
          <CardDescription>Users requiring additional compliance review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 md:grid-cols-3'>
            <div className='rounded-lg border p-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>High Risk</span>
                <Badge variant='secondary'>{stats?.risk.high_risk_users || 0}</Badge>
              </div>
              <p className='mt-1 text-xs text-muted-foreground'>
                Score 70-89
              </p>
            </div>
            <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-red-900'>Critical Risk</span>
                <Badge variant='destructive'>{stats?.risk.critical_risk_users || 0}</Badge>
              </div>
              <p className='mt-1 text-xs text-red-700'>
                Score 90-100
              </p>
            </div>
            <div className='rounded-lg border border-orange-200 bg-orange-50 p-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-orange-900'>PEP Users</span>
                <Badge variant='outline' className='border-orange-300'>
                  {stats?.risk.pep_users || 0}
                </Badge>
              </div>
              <p className='mt-1 text-xs text-orange-700'>
                Politically exposed persons
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
