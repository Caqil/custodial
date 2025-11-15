/**
 * SAR/CTR Reports Management Page
 * Handle Suspicious Activity Reports and Currency Transaction Reports
 */

import { useState } from 'react'
import { FileText, AlertTriangle, CheckCircle, Clock, Send, XCircle } from 'lucide-react'
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
  usePendingSARs,
  useOverdueSARs,
  useApproveSAR,
  useFileSAR,
  usePendingCTRs,
  useOverdueCTRs,
  useFileCTR,
  useComplianceCases,
  useCloseComplianceCase,
} from '../hooks'
import type { SARReport, CTRReport, ComplianceCase } from '../types'

export function SARCTRPage() {
  const { data: pendingSARsData, isLoading: pendingSARsLoading } = usePendingSARs()
  const { data: overdueSARsData, isLoading: overdueSARsLoading } = useOverdueSARs()
  const { data: pendingCTRsData, isLoading: pendingCTRsLoading } = usePendingCTRs()
  const { data: overdueCTRsData, isLoading: overdueCTRsLoading } = useOverdueCTRs()
  const { data: casesData, isLoading: casesLoading } = useComplianceCases()

  const [selectedSAR, setSelectedSAR] = useState<SARReport | null>(null)
  const [selectedCTR, setSelectedCTR] = useState<CTRReport | null>(null)
  const [selectedCase, setSelectedCase] = useState<ComplianceCase | null>(null)

  const [approveSARDialogOpen, setApproveSARDialogOpen] = useState(false)
  const [fileSARDialogOpen, setFileSARDialogOpen] = useState(false)
  const [fileCTRDialogOpen, setFileCTRDialogOpen] = useState(false)
  const [closeCaseDialogOpen, setCloseCaseDialogOpen] = useState(false)

  const [filingNotes, setFilingNotes] = useState('')
  const [caseResolution, setCaseResolution] = useState('')

  const approveSAR = useApproveSAR()
  const fileSAR = useFileSAR()
  const fileCTR = useFileCTR()
  const closeCase = useCloseComplianceCase()

  const handleApproveSAR = async () => {
    if (!selectedSAR) return

    try {
      await approveSAR.mutateAsync(selectedSAR.id)
      setApproveSARDialogOpen(false)
      setSelectedSAR(null)
    } catch {
      // Error handled by React Query
    }
  }

  const handleFileSAR = async () => {
    if (!selectedSAR) return

    try {
      await fileSAR.mutateAsync({
        id: selectedSAR.id,
        request: { filing_notes: filingNotes },
      })
      setFileSARDialogOpen(false)
      setFilingNotes('')
      setSelectedSAR(null)
    } catch {
      // Error handled by React Query
    }
  }

  const handleFileCTR = async () => {
    if (!selectedCTR) return

    try {
      await fileCTR.mutateAsync({
        id: selectedCTR.id,
        request: { filing_notes: filingNotes },
      })
      setFileCTRDialogOpen(false)
      setFilingNotes('')
      setSelectedCTR(null)
    } catch {
      // Error handled by React Query
    }
  }

  const handleCloseCase = async () => {
    if (!selectedCase) return

    try {
      await closeCase.mutateAsync({
        id: selectedCase.id,
        request: { resolution: caseResolution },
      })
      setCloseCaseDialogOpen(false)
      setCaseResolution('')
      setSelectedCase(null)
    } catch {
      // Error handled by React Query
    }
  }

  const getSARPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'normal':
        return { variant: 'outline' as const, label: 'Normal' }
      case 'high':
        return { variant: 'default' as const, label: 'High' }
      case 'urgent':
        return { variant: 'destructive' as const, label: 'Urgent' }
      default:
        return { variant: 'outline' as const, label: priority }
    }
  }

  const getSARStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return { variant: 'outline' as const, label: 'Draft' }
      case 'review':
        return { variant: 'secondary' as const, label: 'Under Review' }
      case 'approved':
        return { variant: 'default' as const, label: 'Approved' }
      case 'filed':
        return { variant: 'default' as const, label: 'Filed', icon: CheckCircle }
      case 'rejected':
        return { variant: 'destructive' as const, label: 'Rejected' }
      default:
        return { variant: 'outline' as const, label: status }
    }
  }

  const getCTRStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return { variant: 'secondary' as const, label: 'Pending' }
      case 'filed':
        return { variant: 'default' as const, label: 'Filed', icon: CheckCircle }
      case 'error':
        return { variant: 'destructive' as const, label: 'Error' }
      default:
        return { variant: 'outline' as const, label: status }
    }
  }

  const isOverdue = (deadlineDate: string) => {
    return new Date(deadlineDate) < new Date()
  }

  return (
    <div className='container mx-auto space-y-8 py-8'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Regulatory Filing (SAR/CTR)</h1>
        <p className='text-muted-foreground mt-1'>
          Manage suspicious activity reports and currency transaction reports
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue='pending-sars' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='pending-sars' className='gap-2'>
            <Clock className='h-4 w-4' />
            Pending SARs
            {pendingSARsData && pendingSARsData.reports.length > 0 && (
              <Badge variant='secondary' className='ml-2'>
                {pendingSARsData.reports.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value='overdue-sars' className='gap-2'>
            <AlertTriangle className='h-4 w-4' />
            Overdue SARs
            {overdueSARsData && overdueSARsData.reports.length > 0 && (
              <Badge variant='destructive' className='ml-2'>
                {overdueSARsData.reports.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value='pending-ctrs' className='gap-2'>
            <FileText className='h-4 w-4' />
            Pending CTRs
            {pendingCTRsData && pendingCTRsData.reports.length > 0 && (
              <Badge variant='secondary' className='ml-2'>
                {pendingCTRsData.reports.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value='overdue-ctrs' className='gap-2'>
            <AlertTriangle className='h-4 w-4' />
            Overdue CTRs
            {overdueCTRsData && overdueCTRsData.reports.length > 0 && (
              <Badge variant='destructive' className='ml-2'>
                {overdueCTRsData.reports.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value='cases' className='gap-2'>
            <FileText className='h-4 w-4' />
            Cases
            {casesData && casesData.cases.length > 0 && (
              <Badge variant='outline' className='ml-2'>
                {casesData.cases.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Pending SARs Tab */}
        <TabsContent value='pending-sars' className='space-y-4'>
          {pendingSARsLoading ? (
            <div className='flex items-center justify-center py-20'>
              <div className='text-center'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto' />
                <p className='mt-4 text-sm text-muted-foreground'>Loading SARs...</p>
              </div>
            </div>
          ) : pendingSARsData?.reports.length === 0 ? (
            <Card>
              <CardContent className='flex flex-col items-center justify-center py-20'>
                <CheckCircle className='h-12 w-12 text-green-600 mb-4' />
                <h3 className='text-lg font-semibold'>No pending SARs</h3>
                <p className='text-sm text-muted-foreground'>All SAR reports are filed or in review</p>
              </CardContent>
            </Card>
          ) : (
            <div className='grid gap-4'>
              {pendingSARsData?.reports.map((sar) => {
                const statusBadge = getSARStatusBadge(sar.status)
                const priorityBadge = getSARPriorityBadge(sar.priority)

                return (
                  <Card key={sar.id}>
                    <CardHeader>
                      <div className='flex items-start justify-between'>
                        <div>
                          <CardTitle className='text-lg'>SAR #{sar.sar_number}</CardTitle>
                          <CardDescription className='mt-1'>
                            Created {new Date(sar.created_at).toLocaleDateString()}
                            {' • '}
                            Deadline {new Date(sar.deadline_date).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className='flex gap-2'>
                          <Badge variant={priorityBadge.variant}>{priorityBadge.label}</Badge>
                          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div>
                        <Label className='text-xs text-muted-foreground'>Activity Types</Label>
                        <div className='mt-2 flex flex-wrap gap-2'>
                          {sar.activity_type.map((type, idx) => (
                            <Badge key={idx} variant='secondary'>
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className='text-xs text-muted-foreground'>Description</Label>
                        <p className='text-sm mt-1'>{sar.suspicious_activity_description}</p>
                      </div>

                      <div className='grid gap-4 md:grid-cols-2'>
                        <div>
                          <Label className='text-xs text-muted-foreground'>Total Amount Involved</Label>
                          <p className='text-sm font-medium'>${parseFloat(sar.total_amount_involved).toLocaleString()}</p>
                        </div>
                        <div>
                          <Label className='text-xs text-muted-foreground'>Activity Period</Label>
                          <p className='text-sm font-medium'>
                            {new Date(sar.activity_start_date).toLocaleDateString()} -{' '}
                            {new Date(sar.activity_end_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className='flex gap-3 pt-4'>
                        {sar.status === 'review' && (
                          <Button
                            variant='outline'
                            className='flex-1'
                            onClick={() => {
                              setSelectedSAR(sar)
                              setApproveSARDialogOpen(true)
                            }}
                          >
                            <CheckCircle className='mr-2 h-4 w-4' />
                            Approve
                          </Button>
                        )}
                        {sar.status === 'approved' && (
                          <Button
                            className='flex-1'
                            onClick={() => {
                              setSelectedSAR(sar)
                              setFileSARDialogOpen(true)
                            }}
                          >
                            <Send className='mr-2 h-4 w-4' />
                            File with FinCEN
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        {/* Overdue SARs Tab */}
        <TabsContent value='overdue-sars' className='space-y-4'>
          {overdueSARsLoading ? (
            <div className='flex items-center justify-center py-20'>
              <div className='text-center'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto' />
                <p className='mt-4 text-sm text-muted-foreground'>Loading overdue SARs...</p>
              </div>
            </div>
          ) : overdueSARsData?.reports.length === 0 ? (
            <Card>
              <CardContent className='flex flex-col items-center justify-center py-20'>
                <CheckCircle className='h-12 w-12 text-green-600 mb-4' />
                <h3 className='text-lg font-semibold'>No overdue SARs</h3>
                <p className='text-sm text-muted-foreground'>All reports filed within the 30-day deadline</p>
              </CardContent>
            </Card>
          ) : (
            <div className='grid gap-4'>
              {overdueSARsData?.reports.map((sar) => (
                <Card key={sar.id} className='border-red-200 bg-red-50'>
                  <CardHeader>
                    <div className='flex items-start justify-between'>
                      <div>
                        <CardTitle className='text-lg text-red-900'>SAR #{sar.sar_number}</CardTitle>
                        <CardDescription className='text-red-700'>
                          Deadline was {new Date(sar.deadline_date).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge variant='destructive'>
                        <AlertTriangle className='mr-1 h-3 w-3' />
                        30-Day Deadline Missed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-red-700'>
                      This SAR must be filed immediately to comply with FinCEN regulations and avoid penalties.
                    </p>
                    {sar.status === 'approved' && (
                      <Button
                        variant='destructive'
                        className='mt-4 w-full'
                        onClick={() => {
                          setSelectedSAR(sar)
                          setFileSARDialogOpen(true)
                        }}
                      >
                        <Send className='mr-2 h-4 w-4' />
                        File Now
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Pending CTRs Tab */}
        <TabsContent value='pending-ctrs' className='space-y-4'>
          {pendingCTRsLoading ? (
            <div className='flex items-center justify-center py-20'>
              <div className='text-center'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto' />
                <p className='mt-4 text-sm text-muted-foreground'>Loading CTRs...</p>
              </div>
            </div>
          ) : pendingCTRsData?.reports.length === 0 ? (
            <Card>
              <CardContent className='flex flex-col items-center justify-center py-20'>
                <CheckCircle className='h-12 w-12 text-green-600 mb-4' />
                <h3 className='text-lg font-semibold'>No pending CTRs</h3>
                <p className='text-sm text-muted-foreground'>All currency transaction reports are filed</p>
              </CardContent>
            </Card>
          ) : (
            <div className='grid gap-4'>
              {pendingCTRsData?.reports.map((ctr) => {
                const statusBadge = getCTRStatusBadge(ctr.status)

                return (
                  <Card key={ctr.id}>
                    <CardHeader>
                      <div className='flex items-start justify-between'>
                        <div>
                          <CardTitle className='text-lg'>CTR #{ctr.ctr_number}</CardTitle>
                          <CardDescription className='mt-1'>
                            Transaction {new Date(ctr.transaction_date).toLocaleDateString()}
                            {' • '}
                            Deadline {new Date(ctr.deadline_date).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div className='grid gap-4 md:grid-cols-2'>
                        <div>
                          <Label className='text-xs text-muted-foreground'>Transaction Amount</Label>
                          <p className='text-sm font-medium'>${parseFloat(ctr.transaction_amount).toLocaleString()}</p>
                        </div>
                        <div>
                          <Label className='text-xs text-muted-foreground'>Transaction Type</Label>
                          <p className='text-sm font-medium capitalize'>{ctr.transaction_type}</p>
                        </div>
                      </div>

                      {ctr.status === 'pending' && (
                        <Button
                          className='w-full'
                          onClick={() => {
                            setSelectedCTR(ctr)
                            setFileCTRDialogOpen(true)
                          }}
                        >
                          <Send className='mr-2 h-4 w-4' />
                          File with FinCEN
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        {/* Overdue CTRs Tab */}
        <TabsContent value='overdue-ctrs' className='space-y-4'>
          {overdueCTRsLoading ? (
            <div className='flex items-center justify-center py-20'>
              <div className='text-center'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto' />
                <p className='mt-4 text-sm text-muted-foreground'>Loading overdue CTRs...</p>
              </div>
            </div>
          ) : overdueCTRsData?.reports.length === 0 ? (
            <Card>
              <CardContent className='flex flex-col items-center justify-center py-20'>
                <CheckCircle className='h-12 w-12 text-green-600 mb-4' />
                <h3 className='text-lg font-semibold'>No overdue CTRs</h3>
                <p className='text-sm text-muted-foreground'>All reports filed within the 15-day deadline</p>
              </CardContent>
            </Card>
          ) : (
            <div className='grid gap-4'>
              {overdueCTRsData?.reports.map((ctr) => (
                <Card key={ctr.id} className='border-red-200 bg-red-50'>
                  <CardHeader>
                    <div className='flex items-start justify-between'>
                      <div>
                        <CardTitle className='text-lg text-red-900'>CTR #{ctr.ctr_number}</CardTitle>
                        <CardDescription className='text-red-700'>
                          Deadline was {new Date(ctr.deadline_date).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge variant='destructive'>
                        <AlertTriangle className='mr-1 h-3 w-3' />
                        15-Day Deadline Missed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-red-700'>
                      This CTR must be filed immediately to comply with FinCEN regulations.
                    </p>
                    <Button
                      variant='destructive'
                      className='mt-4 w-full'
                      onClick={() => {
                        setSelectedCTR(ctr)
                        setFileCTRDialogOpen(true)
                      }}
                    >
                      <Send className='mr-2 h-4 w-4' />
                      File Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Compliance Cases Tab */}
        <TabsContent value='cases' className='space-y-4'>
          {casesLoading ? (
            <div className='flex items-center justify-center py-20'>
              <div className='text-center'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto' />
                <p className='mt-4 text-sm text-muted-foreground'>Loading cases...</p>
              </div>
            </div>
          ) : casesData?.cases.length === 0 ? (
            <Card>
              <CardContent className='flex flex-col items-center justify-center py-20'>
                <FileText className='h-12 w-12 text-muted-foreground mb-4' />
                <h3 className='text-lg font-semibold'>No compliance cases</h3>
                <p className='text-sm text-muted-foreground'>No active compliance investigations</p>
              </CardContent>
            </Card>
          ) : (
            <div className='grid gap-4'>
              {casesData?.cases.map((complianceCase) => (
                <Card key={complianceCase.id}>
                  <CardHeader>
                    <div className='flex items-start justify-between'>
                      <div>
                        <CardTitle className='text-lg'>Case #{complianceCase.case_number}</CardTitle>
                        <CardDescription className='mt-1'>
                          Opened {new Date(complianceCase.opened_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          complianceCase.status === 'open' || complianceCase.status === 'investigating'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {complianceCase.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div>
                      <Label className='text-xs text-muted-foreground'>Case Type</Label>
                      <p className='text-sm font-medium capitalize'>{complianceCase.case_type}</p>
                    </div>

                    <div>
                      <Label className='text-xs text-muted-foreground'>Description</Label>
                      <p className='text-sm'>{complianceCase.description}</p>
                    </div>

                    {complianceCase.status === 'open' || complianceCase.status === 'investigating' ? (
                      <Button
                        variant='outline'
                        className='w-full'
                        onClick={() => {
                          setSelectedCase(complianceCase)
                          setCloseCaseDialogOpen(true)
                        }}
                      >
                        <XCircle className='mr-2 h-4 w-4' />
                        Close Case
                      </Button>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Approve SAR Dialog */}
      <Dialog open={approveSARDialogOpen} onOpenChange={setApproveSARDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve SAR for Filing</DialogTitle>
            <DialogDescription>
              Confirm that SAR #{selectedSAR?.sar_number} is ready to be filed with FinCEN
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            <p className='text-sm text-muted-foreground'>
              This will approve the SAR report for filing. The compliance team can then submit it to FinCEN.
            </p>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setApproveSARDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApproveSAR} disabled={approveSAR.isPending}>
              {approveSAR.isPending ? 'Approving...' : 'Approve SAR'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* File SAR Dialog */}
      <Dialog open={fileSARDialogOpen} onOpenChange={setFileSARDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>File SAR with FinCEN</DialogTitle>
            <DialogDescription>
              Submit SAR #{selectedSAR?.sar_number} to FinCEN's BSA E-Filing System
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label htmlFor='filing-notes'>Filing Notes (Optional)</Label>
              <Textarea
                id='filing-notes'
                value={filingNotes}
                onChange={(e) => setFilingNotes(e.target.value)}
                placeholder='Add any notes about this filing...'
                className='mt-2'
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setFileSARDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleFileSAR} disabled={fileSAR.isPending}>
              {fileSAR.isPending ? 'Filing...' : 'File with FinCEN'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* File CTR Dialog */}
      <Dialog open={fileCTRDialogOpen} onOpenChange={setFileCTRDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>File CTR with FinCEN</DialogTitle>
            <DialogDescription>
              Submit CTR #{selectedCTR?.ctr_number} to FinCEN's BSA E-Filing System
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label htmlFor='ctr-filing-notes'>Filing Notes (Optional)</Label>
              <Textarea
                id='ctr-filing-notes'
                value={filingNotes}
                onChange={(e) => setFilingNotes(e.target.value)}
                placeholder='Add any notes about this filing...'
                className='mt-2'
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setFileCTRDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleFileCTR} disabled={fileCTR.isPending}>
              {fileCTR.isPending ? 'Filing...' : 'File with FinCEN'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Close Case Dialog */}
      <Dialog open={closeCaseDialogOpen} onOpenChange={setCloseCaseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Close Compliance Case</DialogTitle>
            <DialogDescription>
              Provide resolution details for case #{selectedCase?.case_number}
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label htmlFor='resolution'>Resolution *</Label>
              <Textarea
                id='resolution'
                value={caseResolution}
                onChange={(e) => setCaseResolution(e.target.value)}
                placeholder='Describe how this case was resolved...'
                className='mt-2'
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setCloseCaseDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCloseCase} disabled={!caseResolution || closeCase.isPending}>
              {closeCase.isPending ? 'Closing...' : 'Close Case'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
