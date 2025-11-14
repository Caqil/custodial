/**
 * Cold Storage Request List Component
 * Table displaying cold storage withdrawal requests
 */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useColdStorageRequests } from '../hooks'
import { ColdStorageRequestStatus, ColdStorageRequestType } from '@/core/entities/security.entity'
import type { ColdStorageRequest } from '@/core/entities/security.entity'
import { formatDistanceToNow } from 'date-fns'
import { Clock, CheckCircle, XCircle, AlertCircle, Snowflake } from 'lucide-react'
import { useState } from 'react'
import { ColdStorageApproveDialog } from './cold-storage-approve-dialog'

interface ColdStorageRequestListProps {
  walletId?: string
  status?: ColdStorageRequestStatus
}

/**
 * Component for displaying cold storage requests
 */
export function ColdStorageRequestList({ walletId, status }: ColdStorageRequestListProps) {
  const [selectedRequest, setSelectedRequest] = useState<ColdStorageRequest | null>(null)
  const { data, isLoading } = useColdStorageRequests({ wallet_id: walletId, status })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-48' />
        </CardHeader>
        <CardContent>
          <Skeleton className='h-64 w-full' />
        </CardContent>
      </Card>
    )
  }

  const getStatusBadge = (status: ColdStorageRequestStatus) => {
    switch (status) {
      case ColdStorageRequestStatus.Pending:
        return (
          <Badge variant='outline' className='border-yellow-500 bg-yellow-50 text-yellow-700'>
            <Clock className='mr-1 h-3 w-3' />
            Pending
          </Badge>
        )
      case ColdStorageRequestStatus.WaitingPeriod:
        return (
          <Badge variant='outline' className='border-blue-500 bg-blue-50 text-blue-700'>
            <Clock className='mr-1 h-3 w-3' />
            Waiting Period
          </Badge>
        )
      case ColdStorageRequestStatus.ReadyForApproval:
        return (
          <Badge variant='outline' className='border-orange-500 bg-orange-50 text-orange-700'>
            <AlertCircle className='mr-1 h-3 w-3' />
            Ready for Approval
          </Badge>
        )
      case ColdStorageRequestStatus.Approved:
        return (
          <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
            <CheckCircle className='mr-1 h-3 w-3' />
            Approved
          </Badge>
        )
      case ColdStorageRequestStatus.Rejected:
        return (
          <Badge variant='outline' className='border-red-500 bg-red-50 text-red-700'>
            <XCircle className='mr-1 h-3 w-3' />
            Rejected
          </Badge>
        )
      case ColdStorageRequestStatus.Completed:
        return (
          <Badge variant='outline' className='border-green-600 bg-green-50 text-green-700'>
            <CheckCircle className='mr-1 h-3 w-3' />
            Completed
          </Badge>
        )
      default:
        return <Badge variant='outline'>{status}</Badge>
    }
  }

  const getTypeBadge = (type: ColdStorageRequestType) => {
    switch (type) {
      case ColdStorageRequestType.Withdrawal:
        return <Badge variant='outline'>Withdrawal</Badge>
      case ColdStorageRequestType.ColdToWarmTransfer:
        return <Badge variant='outline'>Cold to Warm Transfer</Badge>
      case ColdStorageRequestType.KeyRecovery:
        return <Badge variant='outline'>Key Recovery</Badge>
      default:
        return <Badge variant='outline'>{type}</Badge>
    }
  }

  const requests = data?.requests || []

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Snowflake className='h-5 w-5' />
            Cold Storage Requests
          </CardTitle>
          <CardDescription>Requests requiring multi-signature approval</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Wallet</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approvers</TableHead>
                <TableHead>Waiting Period</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length > 0 ? (
                requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{getTypeBadge(request.request_type)}</TableCell>
                    <TableCell className='font-mono text-xs'>
                      {request.wallet_id.slice(0, 8)}...
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      <span className='font-medium'>
                        {request.current_approvers} / {request.required_approvers}
                      </span>
                    </TableCell>
                    <TableCell className='text-muted-foreground text-sm'>
                      {new Date(request.waiting_period_ends_at) > new Date()
                        ? `Ends ${formatDistanceToNow(new Date(request.waiting_period_ends_at), { addSuffix: true })}`
                        : 'Ended'}
                    </TableCell>
                    <TableCell>
                      {request.status === ColdStorageRequestStatus.ReadyForApproval && (
                        <Button
                          size='sm'
                          onClick={() => setSelectedRequest(request)}
                        >
                          Approve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className='h-24 text-center'>
                    No cold storage requests found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ColdStorageApproveDialog
        request={selectedRequest}
        open={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />
    </>
  )
}
