/**
 * MPC Keys Page
 * Management of MPC key shares
 */

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MPCKeyShareList } from '../components/mpc-key-share-list'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Key } from 'lucide-react'

/**
 * MPC keys management page component
 */
export function MPCKeysPage() {
  const [walletIdFilter, setWalletIdFilter] = useState('')

  return (
    <div className='container mx-auto space-y-8 py-8'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>MPC Key Management</h1>
        <p className='text-muted-foreground'>
          Manage multi-party computation key shares and threshold configurations
        </p>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Filters</CardTitle>
          <CardDescription>Filter MPC key shares by wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center gap-4'>
            <div className='flex-1'>
              <Label htmlFor='wallet-filter'>Wallet ID</Label>
              <Input
                id='wallet-filter'
                placeholder='Enter wallet ID to filter...'
                value={walletIdFilter}
                onChange={(e) => setWalletIdFilter(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Share List */}
      <MPCKeyShareList walletId={walletIdFilter || undefined} />

      {/* Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Key className='h-5 w-5' />
            About MPC Key Shares
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          <div>
            <h4 className='mb-1 font-medium'>Threshold Signatures</h4>
            <p className='text-muted-foreground text-sm'>
              MPC key shares use threshold signature schemes (e.g., 3-of-5) where a minimum number of shares
              are required to sign transactions. This provides both security and redundancy.
            </p>
          </div>
          <div>
            <h4 className='mb-1 font-medium'>Storage Locations</h4>
            <p className='text-muted-foreground text-sm'>
              Shares are distributed across secure locations including HSMs, cloud vaults, and offline storage.
              Online shares enable faster signing while offline shares provide cold storage security.
            </p>
          </div>
          <div>
            <h4 className='mb-1 font-medium'>Security Model</h4>
            <p className='text-muted-foreground text-sm'>
              No single party can reconstruct the full private key. All signing operations require cooperation
              from the threshold number of share holders, preventing single points of failure.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
