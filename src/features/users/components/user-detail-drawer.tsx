/**
 * User Detail Drawer Component
 * Side panel showing comprehensive user information
 */

import { Loader2 } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserDetail } from '../hooks'
import { UserStatusBadge } from './user-status-badge'
import { formatDate, formatCurrency } from '@/lib/utils'
import type { User } from '@/core/entities/user.entity'

interface UserDetailDrawerProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Drawer component for displaying detailed user information
 */
export function UserDetailDrawer({
  user,
  open,
  onOpenChange,
}: UserDetailDrawerProps) {
  const { data: userDetails, isLoading } = useUserDetail(user?.id ?? null, open)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='sm:max-w-lg'>
        <SheetHeader>
          <SheetTitle>User Details</SheetTitle>
          <SheetDescription>
            Comprehensive information about the user
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className='mt-6 space-y-4'>
            <Skeleton className='h-20 w-full' />
            <Skeleton className='h-32 w-full' />
            <Skeleton className='h-24 w-full' />
          </div>
        ) : userDetails ? (
          <div className='mt-6 space-y-6'>
            {/* Basic Information */}
            <div className='space-y-3'>
              <h3 className='font-semibold'>Basic Information</h3>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground text-sm'>Email</span>
                  <span className='text-sm font-medium'>
                    {userDetails.user.email}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground text-sm'>Status</span>
                  <UserStatusBadge status={userDetails.user.status} />
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground text-sm'>Role</span>
                  <span className='text-sm font-medium capitalize'>
                    {userDetails.user.role}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground text-sm'>MFA</span>
                  <Badge
                    variant={userDetails.user.mfa_enabled ? 'default' : 'secondary'}
                  >
                    {userDetails.user.mfa_enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
                {userDetails.user.organization_name && (
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground text-sm'>
                      Organization
                    </span>
                    <span className='text-sm font-medium'>
                      {userDetails.user.organization_name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Wallet Information */}
            <div className='space-y-3'>
              <h3 className='font-semibold'>Wallet Information</h3>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground text-sm'>Wallets</span>
                  <span className='text-sm font-medium'>
                    {userDetails.wallet_count}
                  </span>
                </div>
                {Object.keys(userDetails.total_balances).length > 0 && (
                  <>
                    <div className='mt-2'>
                      <span className='text-muted-foreground text-sm'>
                        Total Balances
                      </span>
                    </div>
                    {Object.entries(userDetails.total_balances).map(
                      ([currency, balance]) => (
                        <div key={currency} className='flex justify-between'>
                          <span className='text-sm font-mono'>{currency}</span>
                          <span className='text-sm font-medium'>
                            {formatCurrency(balance, currency)}
                          </span>
                        </div>
                      )
                    )}
                  </>
                )}
              </div>
            </div>

            <Separator />

            {/* Recent Activity */}
            <div className='space-y-3'>
              <h3 className='font-semibold'>Recent Activity</h3>
              {userDetails.recent_logs.length > 0 ? (
                <div className='space-y-2'>
                  {userDetails.recent_logs.map((log) => (
                    <div
                      key={log.id}
                      className='bg-muted/50 rounded-lg border p-3'
                    >
                      <div className='flex items-start justify-between'>
                        <div className='flex-1'>
                          <p className='text-sm font-medium'>{log.action}</p>
                          <p className='text-muted-foreground text-xs'>
                            {log.resource_type}
                            {log.resource_id && ` (${log.resource_id.slice(0, 8)}...)`}
                          </p>
                        </div>
                        <Badge
                          variant={
                            log.result === 'success'
                              ? 'default'
                              : log.result === 'failure'
                                ? 'destructive'
                                : 'secondary'
                          }
                          className='text-xs'
                        >
                          {log.result}
                        </Badge>
                      </div>
                      <p className='text-muted-foreground mt-1 text-xs'>
                        {formatDate(log.created_at)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-muted-foreground text-sm'>No recent activity</p>
              )}
            </div>

            <Separator />

            {/* Timestamps */}
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground text-sm'>Created</span>
                <span className='text-sm'>
                  {formatDate(userDetails.user.created_at)}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground text-sm'>Updated</span>
                <span className='text-sm'>
                  {formatDate(userDetails.user.updated_at)}
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
