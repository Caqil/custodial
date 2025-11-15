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
        <div className='container mx-auto py-8'>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      )
    }

    if (!delegation) {
      return (
        <div className='container mx-auto space-y-8 py-8'>
          <Button
            variant="ghost"
            onClick={() => navigate({ to: '/governance/delegations' })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Delegations
          </Button>
          <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
            <h3 className='font-semibold text-red-900'>Delegation not found</h3>
            <p className='text-sm text-red-700'>
              The requested delegation could not be found
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className='container mx-auto space-y-8 py-8'>
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
    <div className='container mx-auto space-y-8 py-8'>
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
