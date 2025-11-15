/**
 * KYC Management Page
 * Review and approve/reject KYC verifications
 */

import { useState } from 'react'
import { Shield, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react'
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
import { usePendingKYC, useExpiringKYC, useApproveKYC, useRejectKYC } from '../hooks'
import type { KYCVerification } from '../types'

export function KYCManagementPage() {
  const { data: pendingData, isLoading: pendingLoading } = usePendingKYC()
  const { data: expiringData, isLoading: expiringLoading } = useExpiringKYC({ days: 30 })

  const [selectedKYC, setSelectedKYC] = useState<KYCVerification | null>(null)
  const [approveDialogOpen, setApproveDialogOpen] = useState(false)
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [reviewerNotes, setReviewerNotes] = useState('')
  const [rejectionReason, setRejectionReason] = useState('')

  const approveKYC = useApproveKYC()
  const rejectKYC = useRejectKYC()

  const handleApprove = async () => {
    if (!selectedKYC) return

    try {
      await approveKYC.mutateAsync({
        id: selectedKYC.id,
        request: { reviewer_notes: reviewerNotes },
      })
      setApproveDialogOpen(false)
      setReviewerNotes('')
      setSelectedKYC(null)
    } catch {
      // Error handled by React Query
    }
  }

  const handleReject = async () => {
    if (!selectedKYC) return

    try {
      await rejectKYC.mutateAsync({
        id: selectedKYC.id,
        request: {
          rejection_reason: rejectionReason,
          reviewer_notes: reviewerNotes,
        },
      })
      setRejectDialogOpen(false)
      setRejectionReason('')
      setReviewerNotes('')
      setSelectedKYC(null)
    } catch {
      // Error handled by React Query
    }
  }

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'outline'
      case 'medium':
        return 'secondary'
      case 'high':
        return 'default'
      case 'critical':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getVerificationLevelBadge = (level: string) => {
    const labels: Record<string, string> = {
      none: 'None',
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      institutional: 'Institutional',
    }
    return labels[level] || level
  }

  return (
    <div className='container mx-auto space-y-8 py-8'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>KYC Management</h1>
        <p className='text-muted-foreground mt-1'>
          Review and approve identity verification requests
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue='pending' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='pending' className='gap-2'>
            <Clock className='h-4 w-4' />
            Pending Reviews
            {pendingData?.verifications && pendingData.verifications.length > 0 && (
              <Badge variant='secondary' className='ml-2'>
                {pendingData.verifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value='expiring' className='gap-2'>
            <AlertTriangle className='h-4 w-4' />
            Expiring Soon
            {expiringData?.verifications && expiringData.verifications.length > 0 && (
              <Badge variant='outline' className='ml-2'>
                {expiringData.verifications.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Pending KYC Tab */}
        <TabsContent value='pending' className='space-y-4'>
          {pendingLoading ? (
            <div className='flex items-center justify-center py-20'>
              <div className='text-center'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto' />
                <p className='mt-4 text-sm text-muted-foreground'>Loading pending KYC...</p>
              </div>
            </div>
          ) : pendingData?.verifications?.length === 0 ? (
            <Card>
              <CardContent className='flex flex-col items-center justify-center py-20'>
                <CheckCircle className='h-12 w-12 text-green-600 mb-4' />
                <h3 className='text-lg font-semibold'>All caught up!</h3>
                <p className='text-sm text-muted-foreground'>No pending KYC verifications</p>
              </CardContent>
            </Card>
          ) : (
            <div className='grid gap-4'>
              {pendingData?.verifications.map((kyc) => (
                <Card key={kyc.id}>
                  <CardHeader>
                    <div className='flex items-start justify-between'>
                      <div>
                        <CardTitle className='text-lg'>
                          {kyc.first_name} {kyc.last_name}
                        </CardTitle>
                        <CardDescription className='mt-1'>
                          Submitted {new Date(kyc.submitted_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className='flex gap-2'>
                        <Badge variant={getRiskBadgeVariant(kyc.risk_level)}>
                          {kyc.risk_level} risk ({kyc.risk_score})
                        </Badge>
                        <Badge variant='outline'>
                          {getVerificationLevelBadge(kyc.verification_level)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='grid gap-4 md:grid-cols-2'>
                      <div>
                        <Label className='text-xs text-muted-foreground'>Date of Birth</Label>
                        <p className='text-sm font-medium'>
                          {new Date(kyc.date_of_birth).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <Label className='text-xs text-muted-foreground'>Nationality</Label>
                        <p className='text-sm font-medium'>{kyc.nationality}</p>
                      </div>
                      <div>
                        <Label className='text-xs text-muted-foreground'>Document Type</Label>
                        <p className='text-sm font-medium capitalize'>
                          {kyc.document_type.replace('_', ' ')}
                        </p>
                      </div>
                      <div>
                        <Label className='text-xs text-muted-foreground'>Document Number</Label>
                        <p className='text-sm font-medium'>{kyc.document_number}</p>
                      </div>
                      <div>
                        <Label className='text-xs text-muted-foreground'>Country of Residence</Label>
                        <p className='text-sm font-medium'>{kyc.country_of_residence}</p>
                      </div>
                      <div>
                        <Label className='text-xs text-muted-foreground'>PEP Status</Label>
                        <Badge variant={kyc.is_pep ? 'destructive' : 'outline'}>
                          {kyc.is_pep ? 'Yes - PEP' : 'No'}
                        </Badge>
                      </div>
                    </div>

                    {kyc.risk_factors && kyc.risk_factors.length > 0 && (
                      <div>
                        <Label className='text-xs text-muted-foreground'>Risk Factors</Label>
                        <div className='mt-2 flex flex-wrap gap-2'>
                          {kyc.risk_factors.map((factor, idx) => (
                            <Badge key={idx} variant='secondary'>
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className='flex gap-3 pt-4'>
                      <Button
                        className='flex-1'
                        onClick={() => {
                          setSelectedKYC(kyc)
                          setApproveDialogOpen(true)
                        }}
                      >
                        <CheckCircle className='mr-2 h-4 w-4' />
                        Approve
                      </Button>
                      <Button
                        variant='outline'
                        className='flex-1'
                        onClick={() => {
                          setSelectedKYC(kyc)
                          setRejectDialogOpen(true)
                        }}
                      >
                        <XCircle className='mr-2 h-4 w-4' />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Expiring KYC Tab */}
        <TabsContent value='expiring' className='space-y-4'>
          {expiringLoading ? (
            <div className='flex items-center justify-center py-20'>
              <div className='text-center'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto' />
                <p className='mt-4 text-sm text-muted-foreground'>Loading expiring KYC...</p>
              </div>
            </div>
          ) : expiringData?.verifications?.length === 0 ? (
            <Card>
              <CardContent className='flex flex-col items-center justify-center py-20'>
                <Shield className='h-12 w-12 text-green-600 mb-4' />
                <h3 className='text-lg font-semibold'>No expiring verifications</h3>
                <p className='text-sm text-muted-foreground'>All KYC verifications are up to date</p>
              </CardContent>
            </Card>
          ) : (
            <div className='grid gap-4'>
              {expiringData?.verifications.map((kyc) => (
                <Card key={kyc.id}>
                  <CardHeader>
                    <div className='flex items-start justify-between'>
                      <div>
                        <CardTitle className='text-lg'>
                          {kyc.first_name} {kyc.last_name}
                        </CardTitle>
                        <CardDescription className='mt-1'>
                          Expires {kyc.expires_at && new Date(kyc.expires_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge variant='outline' className='border-orange-300 bg-orange-50'>
                        <AlertTriangle className='mr-1 h-3 w-3' />
                        Expiring Soon
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-muted-foreground'>
                      User will need to re-verify their identity. Contact them to begin the renewal process.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Approve Dialog */}
      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve KYC Verification</DialogTitle>
            <DialogDescription>
              Confirm approval for {selectedKYC?.first_name} {selectedKYC?.last_name}
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label htmlFor='approve-notes'>Reviewer Notes (Optional)</Label>
              <Textarea
                id='approve-notes'
                value={reviewerNotes}
                onChange={(e) => setReviewerNotes(e.target.value)}
                placeholder='Add any notes about this approval...'
                className='mt-2'
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApprove} disabled={approveKYC.isPending}>
              {approveKYC.isPending ? 'Approving...' : 'Approve KYC'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject KYC Verification</DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting {selectedKYC?.first_name} {selectedKYC?.last_name}
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label htmlFor='reject-reason'>Rejection Reason *</Label>
              <Textarea
                id='reject-reason'
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder='Explain why this verification is being rejected...'
                className='mt-2'
                required
              />
            </div>
            <div>
              <Label htmlFor='reject-notes'>Additional Notes (Optional)</Label>
              <Textarea
                id='reject-notes'
                value={reviewerNotes}
                onChange={(e) => setReviewerNotes(e.target.value)}
                placeholder='Add any additional notes...'
                className='mt-2'
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={handleReject}
              disabled={!rejectionReason || rejectKYC.isPending}
            >
              {rejectKYC.isPending ? 'Rejecting...' : 'Reject KYC'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
