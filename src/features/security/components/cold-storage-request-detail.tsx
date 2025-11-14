/**
 * Cold Storage Request Detail Component
 * Detailed view of a cold storage request
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { ColdStorageRequest } from '@/core/entities/security.entity'
import { formatDistanceToNow } from 'date-fns'
import { CheckCircle, XCircle, Clock, Shield } from 'lucide-react'

interface ColdStorageRequestDetailProps {
  request: ColdStorageRequest
}

/**
 * Component showing detailed information about a cold storage request
 */
export function ColdStorageRequestDetail({ request }: ColdStorageRequestDetailProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Shield className='h-5 w-5' />
          Request Details
        </CardTitle>
        <CardDescription>ID: {request.id}</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <p className='text-muted-foreground text-sm'>Request Type</p>
            <p className='font-medium'>{request.request_type}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Status</p>
            <p className='font-medium'>{request.status}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Wallet ID</p>
            <p className='font-mono text-sm'>{request.wallet_id}</p>
          </div>
          {request.amount && (
            <div>
              <p className='text-muted-foreground text-sm'>Amount</p>
              <p className='font-medium'>{request.amount}</p>
            </div>
          )}
          {request.to_address && (
            <div className='col-span-2'>
              <p className='text-muted-foreground text-sm'>Destination Address</p>
              <p className='font-mono text-sm'>{request.to_address}</p>
            </div>
          )}
        </div>

        <div className='rounded-lg border p-4'>
          <h4 className='mb-3 font-medium'>Approval Progress</h4>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground text-sm'>Required Approvers:</span>
              <span className='font-medium'>{request.required_approvers}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground text-sm'>Current Approvers:</span>
              <span className='font-medium'>{request.current_approvers}</span>
            </div>
            <div className='mt-4 flex items-center gap-2'>
              {request.approvers.map((approver, index) => (
                <Badge key={index} variant='outline' className='border-green-500 bg-green-50 text-green-700'>
                  <CheckCircle className='mr-1 h-3 w-3' />
                  {approver.slice(0, 8)}...
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className='rounded-lg border p-4'>
          <h4 className='mb-3 font-medium'>Security Checks</h4>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground text-sm'>Physical Verification Required:</span>
              {request.physical_verification_required ? (
                <Badge variant='outline' className='border-yellow-500 bg-yellow-50 text-yellow-700'>
                  Required
                </Badge>
              ) : (
                <Badge variant='outline'>Not Required</Badge>
              )}
            </div>
            {request.physical_verification_required && (
              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground text-sm'>Physical Verification Status:</span>
                {request.physical_verification_completed ? (
                  <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
                    <CheckCircle className='mr-1 h-3 w-3' />
                    Completed
                  </Badge>
                ) : (
                  <Badge variant='outline' className='border-gray-500 bg-gray-50 text-gray-700'>
                    <XCircle className='mr-1 h-3 w-3' />
                    Pending
                  </Badge>
                )}
              </div>
            )}
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground text-sm'>Waiting Period Ends:</span>
              <span className='font-medium'>
                {formatDistanceToNow(new Date(request.waiting_period_ends_at), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>

        {request.signing_ceremony_scheduled_at && (
          <div className='rounded-lg border p-4'>
            <h4 className='mb-3 font-medium'>Signing Ceremony</h4>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground text-sm'>Scheduled:</span>
                <span className='font-medium'>
                  {formatDistanceToNow(new Date(request.signing_ceremony_scheduled_at), { addSuffix: true })}
                </span>
              </div>
              {request.signing_ceremony_completed_at && (
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground text-sm'>Completed:</span>
                  <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
                    <CheckCircle className='mr-1 h-3 w-3' />
                    {formatDistanceToNow(new Date(request.signing_ceremony_completed_at), { addSuffix: true })}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        )}

        <div className='rounded-lg border p-4'>
          <h4 className='mb-3 font-medium'>Timeline</h4>
          <div className='space-y-2'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>Requested:</span>
              <span>{formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}</span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>Last Updated:</span>
              <span>{formatDistanceToNow(new Date(request.updated_at), { addSuffix: true })}</span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>Requested By:</span>
              <span className='font-mono text-xs'>{request.requested_by}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
