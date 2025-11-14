/**
 * Delegation Detail Component
 * Displays detailed information about a delegation
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { GovernanceDelegation } from '@/core/entities/governance.entity'
import { DelegationStatus } from '@/core/entities/governance.entity'
import { format } from 'date-fns'

interface DelegationDetailProps {
  delegation: GovernanceDelegation
}

export function DelegationDetail({ delegation }: DelegationDetailProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Delegation Details</CardTitle>
            <CardDescription>ID: {delegation.id}</CardDescription>
          </div>
          <Badge
            variant={
              delegation.status === DelegationStatus.Active ? 'default' : 'secondary'
            }
            className={
              delegation.status === DelegationStatus.Active ? 'bg-green-600' : ''
            }
          >
            {delegation.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/* Wallets */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Delegator Wallet</div>
              <div className="mt-1 font-mono text-sm">{delegation.delegator_wallet_id}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Delegate Wallet</div>
              <div className="mt-1 font-mono text-sm">{delegation.delegate_wallet_id}</div>
            </div>
          </div>

          {/* Weight */}
          <div>
            <div className="text-sm font-medium text-muted-foreground">Voting Weight</div>
            <div className="mt-1 text-2xl font-bold">
              {new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 6,
              }).format(parseFloat(delegation.weight))}
            </div>
          </div>

          {/* Timestamps */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Created At</div>
              <div className="mt-1">{format(new Date(delegation.created_at), 'PPpp')}</div>
            </div>
            {delegation.revoked_at && (
              <div>
                <div className="text-sm font-medium text-muted-foreground">Revoked At</div>
                <div className="mt-1">{format(new Date(delegation.revoked_at), 'PPpp')}</div>
              </div>
            )}
          </div>

          {delegation.status === DelegationStatus.Active && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
              <div className="font-medium text-green-900 dark:text-green-100">
                This delegation is currently active
              </div>
            </div>
          )}

          {delegation.status === DelegationStatus.Revoked && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950">
              <div className="font-medium text-gray-900 dark:text-gray-100">
                This delegation has been revoked
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
