/**
 * Delegations Page
 * Delegation management with list and details
 */

import { useParams } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { DelegationList } from '../components/delegation-list'
import { DelegationDetail } from '../components/delegation-detail'
import { DelegateDialog } from '../components/delegate-dialog'
import { useDelegation } from '../hooks'
import { Loader2, ArrowLeft } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

export function DelegationsPage() {
  const params = useParams({ strict: false })
  const navigate = useNavigate()
  const delegationId = params.id as string | undefined

  const { data: delegation, isLoading } = useDelegation(delegationId)

  if (delegationId) {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )
    }

    if (!delegation) {
      return (
        <div className="space-y-6">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: '/governance/delegations' })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Delegations
          </Button>
          <div className="rounded-lg border border-destructive p-4 text-destructive">
            Delegation not found
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/governance/delegations' })}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Delegations
        </Button>

        {/* Delegation Details */}
        <DelegationDetail delegation={delegation} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Voting Delegations</h1>
          <p className="text-muted-foreground">
            Manage voting power delegations
          </p>
        </div>
        <DelegateDialog>
          <Button>Delegate Voting Power</Button>
        </DelegateDialog>
      </div>

      {/* Delegation List */}
      <DelegationList />
    </div>
  )
}
