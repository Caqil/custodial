/**
 * Security Policies Page
 * Management of security policies
 */

import { useState } from 'react'
import { SecurityPolicyList } from '../components/security-policy-list'
import { SecurityPolicyCreateDialog } from '../components/security-policy-create-dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Info } from 'lucide-react'

/**
 * Security policies management page component
 */
export function SecurityPoliciesPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  return (
    <div className='container mx-auto space-y-8 py-8'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Security Policies</h1>
        <p className='text-muted-foreground'>
          Configure and manage organization security policies
        </p>
      </div>

      {/* Policy List */}
      <SecurityPolicyList onCreatePolicy={() => setCreateDialogOpen(true)} />

      {/* Policy Types Information */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Info className='h-5 w-5' />
            Policy Types
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          <div className='grid gap-4 md:grid-cols-2'>
            <div>
              <h4 className='mb-1 font-medium'>IP Whitelist</h4>
              <p className='text-muted-foreground text-sm'>
                Restrict access to specific IP addresses or ranges. Only whitelisted IPs can access the system.
              </p>
            </div>
            <div>
              <h4 className='mb-1 font-medium'>Geo Fencing</h4>
              <p className='text-muted-foreground text-sm'>
                Allow or block access based on geographic location. Supports country-level restrictions.
              </p>
            </div>
            <div>
              <h4 className='mb-1 font-medium'>Time Restriction</h4>
              <p className='text-muted-foreground text-sm'>
                Limit operations to specific time windows. Useful for enforcing business hours or maintenance windows.
              </p>
            </div>
            <div>
              <h4 className='mb-1 font-medium'>Rate Limit</h4>
              <p className='text-muted-foreground text-sm'>
                Control request rates to prevent abuse. Configure limits per user, IP, or endpoint.
              </p>
            </div>
            <div>
              <h4 className='mb-1 font-medium'>MFA Enforcement</h4>
              <p className='text-muted-foreground text-sm'>
                Require multi-factor authentication for sensitive operations. Configurable per operation type.
              </p>
            </div>
            <div>
              <h4 className='mb-1 font-medium'>Password Policy</h4>
              <p className='text-muted-foreground text-sm'>
                Define password requirements including length, complexity, and rotation schedules.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <SecurityPolicyCreateDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
      />
    </div>
  )
}
