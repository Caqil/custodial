/**
 * GDPR Requests Management Page
 * Handle data access, portability, erasure requests and breach notifications
 */

import { useState } from 'react'
import { Shield, FileText, AlertTriangle, CheckCircle, Clock, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  useGDPRRequests,
  useProcessDataErasure,
  useDataBreaches,
  useNotifyAuthorities,
} from '../hooks'
import type { GDPRDataRequest, GDPRDataBreach } from '../types'

export function GDPRRequestsPage() {
  const { data: requestsData, isLoading: requestsLoading } = useGDPRRequests()
  const { data: breachesData, isLoading: breachesLoading } = useDataBreaches()

  const [selectedRequest, setSelectedRequest] = useState<GDPRDataRequest | null>(null)
  const [selectedBreach, setSelectedBreach] = useState<GDPRDataBreach | null>(null)
  const [processDialogOpen, setProcessDialogOpen] = useState(false)
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false)
  const [adminNotes, setAdminNotes] = useState('')

  const processErasure = useProcessDataErasure()
  const notifyAuthorities = useNotifyAuthorities()

  const handleProcessErasure = async () => {
    if (!selectedRequest) return

    try {
      await processErasure.mutateAsync({
        id: selectedRequest.id,
        request: { admin_notes: adminNotes },
      })
      setProcessDialogOpen(false)
      setAdminNotes('')
      setSelectedRequest(null)
    } catch {
      // Error handled by React Query
    }
  }

  const handleNotifyAuthorities = async () => {
    if (!selectedBreach) return

    try {
      await notifyAuthorities.mutateAsync(selectedBreach.id)
      setNotifyDialogOpen(false)
      setSelectedBreach(null)
    } catch {
      // Error handled by React Query
    }
  }

  const getRequestTypeBadge = (type: string) => {
    const variants: Record<string, string> = {
      access: 'Access Request',
      portability: 'Data Export',
      erasure: 'Data Deletion',
    }
    return variants[type] || type
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return { variant: 'outline' as const, label: 'Pending' }
      case 'in_progress':
        return { variant: 'secondary' as const, label: 'In Progress' }
      case 'completed':
        return { variant: 'default' as const, label: 'Completed' }
      case 'rejected':
        return { variant: 'destructive' as const, label: 'Rejected' }
      default:
        return { variant: 'outline' as const, label: status }
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'low':
        return { variant: 'outline' as const, label: 'Low' }
      case 'medium':
        return { variant: 'secondary' as const, label: 'Medium' }
      case 'high':
        return { variant: 'default' as const, label: 'High' }
      case 'critical':
        return { variant: 'destructive' as const, label: 'Critical' }
      default:
        return { variant: 'outline' as const, label: severity }
    }
  }

  const isBreachOverdue = (breach: GDPRDataBreach) => {
    return new Date(breach.notification_deadline) < new Date() && !breach.authority_notified_at
  }

  return (
    <div className='container mx-auto space-y-8 py-8'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>GDPR Compliance</h1>
        <p className='text-muted-foreground mt-1'>
          Manage data subject requests and breach notifications
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue='requests' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='requests' className='gap-2'>
            <FileText className='h-4 w-4' />
            Data Requests
            {requestsData && requestsData.requests.length > 0 && (
              <Badge variant='secondary' className='ml-2'>
                {requestsData.requests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value='breaches' className='gap-2'>
            <AlertTriangle className='h-4 w-4' />
            Data Breaches
            {breachesData && breachesData.breaches.length > 0 && (
              <Badge variant='destructive' className='ml-2'>
                {breachesData.breaches.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Data Requests Tab */}
        <TabsContent value='requests' className='space-y-4'>
          {requestsLoading ? (
            <div className='flex items-center justify-center py-20'>
              <div className='text-center'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto' />
                <p className='mt-4 text-sm text-muted-foreground'>Loading GDPR requests...</p>
              </div>
            </div>
          ) : requestsData?.requests.length === 0 ? (
            <Card>
              <CardContent className='flex flex-col items-center justify-center py-20'>
                <Shield className='h-12 w-12 text-green-600 mb-4' />
                <h3 className='text-lg font-semibold'>No pending requests</h3>
                <p className='text-sm text-muted-foreground'>All GDPR data requests have been processed</p>
              </CardContent>
            </Card>
          ) : (
            <div className='grid gap-4'>
              {requestsData?.requests.map((request) => {
                const statusBadge = getStatusBadge(request.status)
                const isOverdue = new Date(request.due_date) < new Date() && request.status === 'pending'

                return (
                  <Card key={request.id} className={isOverdue ? 'border-red-200 bg-red-50' : ''}>
                    <CardHeader>
                      <div className='flex items-start justify-between'>
                        <div>
                          <CardTitle className='text-lg'>
                            {getRequestTypeBadge(request.request_type)}
                          </CardTitle>
                          <CardDescription className='mt-1'>
                            Requested {new Date(request.requested_at).toLocaleDateString()}
                            {' • '}
                            Due {new Date(request.due_date).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className='flex gap-2'>
                          {isOverdue && (
                            <Badge variant='destructive'>
                              <AlertTriangle className='mr-1 h-3 w-3' />
                              Overdue
                            </Badge>
                          )}
                          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div className='grid gap-4 md:grid-cols-2'>
                        <div>
                          <Label className='text-xs text-muted-foreground'>Request Type</Label>
                          <p className='text-sm font-medium'>
                            {request.request_type === 'access' && 'Data Access (GDPR Art. 15)'}
                            {request.request_type === 'portability' && 'Data Portability (GDPR Art. 20)'}
                            {request.request_type === 'erasure' && 'Right to Erasure (GDPR Art. 17)'}
                          </p>
                        </div>
                        <div>
                          <Label className='text-xs text-muted-foreground'>Status</Label>
                          <p className='text-sm font-medium'>{statusBadge.label}</p>
                        </div>
                        {request.reason && (
                          <div className='md:col-span-2'>
                            <Label className='text-xs text-muted-foreground'>Reason</Label>
                            <p className='text-sm'>{request.reason}</p>
                          </div>
                        )}
                        {request.processed_at && (
                          <div>
                            <Label className='text-xs text-muted-foreground'>Processed Date</Label>
                            <p className='text-sm font-medium'>
                              {new Date(request.processed_at).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </div>

                      {request.request_type === 'erasure' && request.status === 'pending' && (
                        <div className='flex gap-3 pt-4'>
                          <Button
                            className='flex-1'
                            onClick={() => {
                              setSelectedRequest(request)
                              setProcessDialogOpen(true)
                            }}
                          >
                            <CheckCircle className='mr-2 h-4 w-4' />
                            Process Erasure
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        {/* Data Breaches Tab */}
        <TabsContent value='breaches' className='space-y-4'>
          {breachesLoading ? (
            <div className='flex items-center justify-center py-20'>
              <div className='text-center'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto' />
                <p className='mt-4 text-sm text-muted-foreground'>Loading data breaches...</p>
              </div>
            </div>
          ) : breachesData?.breaches.length === 0 ? (
            <Card>
              <CardContent className='flex flex-col items-center justify-center py-20'>
                <Shield className='h-12 w-12 text-green-600 mb-4' />
                <h3 className='text-lg font-semibold'>No data breaches</h3>
                <p className='text-sm text-muted-foreground'>No breach incidents have been reported</p>
              </CardContent>
            </Card>
          ) : (
            <div className='grid gap-4'>
              {breachesData?.breaches.map((breach) => {
                const severityBadge = getSeverityBadge(breach.severity)
                const overdue = isBreachOverdue(breach)

                return (
                  <Card key={breach.id} className={overdue ? 'border-red-200 bg-red-50' : ''}>
                    <CardHeader>
                      <div className='flex items-start justify-between'>
                        <div>
                          <CardTitle className='text-lg capitalize'>
                            {breach.breach_type.replace('_', ' ')}
                          </CardTitle>
                          <CardDescription className='mt-1'>
                            Detected {new Date(breach.detected_at).toLocaleDateString()}
                            {' • '}
                            Deadline {new Date(breach.notification_deadline).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className='flex gap-2'>
                          {overdue && (
                            <Badge variant='destructive'>
                              <AlertTriangle className='mr-1 h-3 w-3' />
                              72h Deadline Missed
                            </Badge>
                          )}
                          <Badge variant={severityBadge.variant}>{severityBadge.label}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div>
                        <Label className='text-xs text-muted-foreground'>Description</Label>
                        <p className='text-sm mt-1'>{breach.description}</p>
                      </div>

                      <div className='grid gap-4 md:grid-cols-2'>
                        <div>
                          <Label className='text-xs text-muted-foreground'>Affected Users</Label>
                          <p className='text-sm font-medium'>{breach.estimated_affected_users.toLocaleString()}</p>
                        </div>
                        <div>
                          <Label className='text-xs text-muted-foreground'>Requires Authority Notification</Label>
                          <Badge variant={breach.requires_authority_notification ? 'destructive' : 'outline'}>
                            {breach.requires_authority_notification ? 'Yes - Required' : 'No'}
                          </Badge>
                        </div>
                        {breach.contained_at && (
                          <div>
                            <Label className='text-xs text-muted-foreground'>Contained Date</Label>
                            <p className='text-sm font-medium'>
                              {new Date(breach.contained_at).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                        {breach.authority_notified_at && (
                          <div>
                            <Label className='text-xs text-muted-foreground'>Authority Notified</Label>
                            <p className='text-sm font-medium text-green-700'>
                              ✓ {new Date(breach.authority_notified_at).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </div>

                      {breach.requires_authority_notification && !breach.authority_notified_at && (
                        <div className='flex gap-3 pt-4'>
                          <Button
                            variant={overdue ? 'destructive' : 'default'}
                            className='flex-1'
                            onClick={() => {
                              setSelectedBreach(breach)
                              setNotifyDialogOpen(true)
                            }}
                          >
                            <Bell className='mr-2 h-4 w-4' />
                            Notify Authorities (GDPR Art. 33)
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Process Erasure Dialog */}
      <Dialog open={processDialogOpen} onOpenChange={setProcessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Data Erasure Request</DialogTitle>
            <DialogDescription>
              This will permanently delete all user data in compliance with GDPR Art. 17
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='rounded-lg bg-yellow-50 border border-yellow-200 p-4'>
              <div className='flex gap-3'>
                <AlertTriangle className='h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5' />
                <div>
                  <p className='font-medium text-yellow-900'>Warning: This action is irreversible</p>
                  <p className='text-sm text-yellow-700 mt-1'>
                    All user data, including transactions, KYC documents, and personal information will be permanently deleted.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor='admin-notes'>Admin Notes (Optional)</Label>
              <Textarea
                id='admin-notes'
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder='Add notes about this data erasure...'
                className='mt-2'
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setProcessDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleProcessErasure} disabled={processErasure.isPending}>
              {processErasure.isPending ? 'Processing...' : 'Confirm Erasure'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notify Authorities Dialog */}
      <Dialog open={notifyDialogOpen} onOpenChange={setNotifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notify Supervisory Authority</DialogTitle>
            <DialogDescription>
              Report this data breach to the relevant authority within 72 hours (GDPR Art. 33)
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='rounded-lg bg-blue-50 border border-blue-200 p-4'>
              <div className='flex gap-3'>
                <Clock className='h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5' />
                <div>
                  <p className='font-medium text-blue-900'>72-Hour Deadline Requirement</p>
                  <p className='text-sm text-blue-700 mt-1'>
                    GDPR requires notification to supervisory authorities within 72 hours of becoming aware of the breach.
                  </p>
                </div>
              </div>
            </div>
            {selectedBreach && (
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Breach Type:</span>
                  <span className='font-medium capitalize'>{selectedBreach.breach_type.replace('_', ' ')}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Severity:</span>
                  <Badge variant={getSeverityBadge(selectedBreach.severity).variant}>
                    {getSeverityBadge(selectedBreach.severity).label}
                  </Badge>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Affected Users:</span>
                  <span className='font-medium'>{selectedBreach.estimated_affected_users.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setNotifyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleNotifyAuthorities} disabled={notifyAuthorities.isPending}>
              {notifyAuthorities.isPending ? 'Notifying...' : 'Confirm Notification'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
