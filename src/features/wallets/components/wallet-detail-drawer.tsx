/**
 * Wallet Detail Drawer Component
 * Drawer showing detailed wallet information with tabs
 */

import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { WalletTypeBadge } from './wallet-type-badge'
import { WalletStatusBadge } from './wallet-status-badge'
import { useWalletDetail, useWalletAddresses, useWalletPolicies, useWalletTransitions } from '../hooks'
import type { Wallet } from '@/core/entities/wallet.entity'
import { formatDistanceToNow } from 'date-fns'

interface WalletDetailDrawerProps {
  wallet: Wallet | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Drawer component for viewing detailed wallet information
 */
export function WalletDetailDrawer({ wallet, open, onOpenChange }: WalletDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const { data: details, isLoading: isLoadingDetails } = useWalletDetail(wallet?.id)
  const { data: addresses, isLoading: isLoadingAddresses } = useWalletAddresses(wallet?.id)
  const { data: policies, isLoading: isLoadingPolicies } = useWalletPolicies(wallet?.id)
  const { data: transitions, isLoading: isLoadingTransitions } = useWalletTransitions(wallet?.id)

  if (!wallet) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='sm:max-w-[600px] overflow-y-auto'>
        <SheetHeader>
          <SheetTitle className='flex items-center gap-2'>
            {wallet.name}
            <WalletTypeBadge type={wallet.type} isPoolParent={wallet.is_pool_parent} />
            <WalletStatusBadge status={wallet.status} />
          </SheetTitle>
          <SheetDescription>
            Wallet ID: {wallet.id}
          </SheetDescription>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className='mt-6'>
          <TabsList className='grid w-full grid-cols-4'>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='addresses'>Addresses</TabsTrigger>
            <TabsTrigger value='policies'>Policies</TabsTrigger>
            <TabsTrigger value='transitions'>Transitions</TabsTrigger>
          </TabsList>

          <TabsContent value='overview' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Balance Information</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Total Balance:</span>
                  <span className='font-mono font-semibold'>
                    {parseFloat(wallet.balance).toFixed(8)} {wallet.currency}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Locked:</span>
                  <span className='font-mono'>
                    {parseFloat(wallet.locked_balance).toFixed(8)} {wallet.currency}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Available:</span>
                  <span className='font-mono text-green-600'>
                    {(parseFloat(wallet.balance) - parseFloat(wallet.locked_balance)).toFixed(8)} {wallet.currency}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Currency:</span>
                  <span className='font-semibold'>{wallet.currency}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Type:</span>
                  <span>{wallet.type}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Status:</span>
                  <span>{wallet.status}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Created:</span>
                  <span>{formatDistanceToNow(new Date(wallet.created_at))} ago</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='addresses' className='space-y-4'>
            {isLoadingAddresses ? (
              <Skeleton className='h-32 w-full' />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Wallet Addresses</CardTitle>
                  <CardDescription>{addresses?.length || 0} addresses</CardDescription>
                </CardHeader>
                <CardContent>
                  {addresses && addresses.length > 0 ? (
                    <div className='space-y-2'>
                      {addresses.map((address) => (
                        <div key={address.id} className='rounded-lg border p-3'>
                          <div className='font-mono text-sm break-all'>{address.address}</div>
                          <div className='text-muted-foreground mt-1 text-xs'>
                            {address.address_type} • {address.is_active ? 'Active' : 'Inactive'}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='text-muted-foreground text-sm'>No addresses found</p>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value='policies' className='space-y-4'>
            {isLoadingPolicies ? (
              <Skeleton className='h-32 w-full' />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Wallet Policies</CardTitle>
                  <CardDescription>{policies?.length || 0} policies</CardDescription>
                </CardHeader>
                <CardContent>
                  {policies && policies.length > 0 ? (
                    <div className='space-y-3'>
                      {policies.map((policy) => (
                        <div key={policy.id} className='rounded-lg border p-3'>
                          <div className='flex justify-between items-start'>
                            <div>
                              <div className='font-medium'>Min Approvers: {policy.min_approvers}</div>
                              {policy.max_daily_limit && (
                                <div className='text-muted-foreground text-sm'>
                                  Daily Limit: {policy.max_daily_limit}
                                </div>
                              )}
                              {policy.requires_mfa && (
                                <div className='text-sm text-orange-600'>MFA Required</div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='text-muted-foreground text-sm'>No policies found</p>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value='transitions' className='space-y-4'>
            {isLoadingTransitions ? (
              <Skeleton className='h-32 w-full' />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Wallet Transitions</CardTitle>
                  <CardDescription>{transitions?.length || 0} transitions</CardDescription>
                </CardHeader>
                <CardContent>
                  {transitions && transitions.length > 0 ? (
                    <div className='space-y-2'>
                      {transitions.map((transition) => (
                        <div key={transition.id} className='rounded-lg border p-3'>
                          <div className='flex justify-between'>
                            <span className='font-medium'>
                              {transition.from_type} → {transition.to_type}
                            </span>
                            <span className='text-muted-foreground text-sm'>{transition.status}</span>
                          </div>
                          {transition.reason && (
                            <div className='text-muted-foreground mt-1 text-sm'>{transition.reason}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='text-muted-foreground text-sm'>No transitions found</p>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
