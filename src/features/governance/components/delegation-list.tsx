/**
 * Delegation List Component
 * Displays paginated list of delegations
 */

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useDelegations } from '../hooks'
import { DelegationStatus } from '@/core/entities/governance.entity'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

export function DelegationList() {
  const navigate = useNavigate()
  const [offset, setOffset] = useState(0)
  const [limit] = useState(10)

  const { data, isLoading, error } = useDelegations({
    offset,
    limit,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive p-4 text-destructive">
        Error loading delegations: {error.message}
      </div>
    )
  }

  if (!data || data.delegations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <p>No delegations found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Delegator</TableHead>
              <TableHead>Delegate</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Revoked</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.delegations.map((delegation) => (
              <TableRow
                key={delegation.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() =>
                  navigate({
                    to: '/governance/delegations/$id',
                    params: { id: delegation.id },
                  })
                }
              >
                <TableCell className="font-mono text-sm">
                  {delegation.delegator_wallet_id.substring(0, 12)}...
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {delegation.delegate_wallet_id.substring(0, 12)}...
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat('en-US', {
                    maximumFractionDigits: 6,
                  }).format(parseFloat(delegation.weight))}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      delegation.status === DelegationStatus.Active
                        ? 'default'
                        : 'secondary'
                    }
                    className={
                      delegation.status === DelegationStatus.Active
                        ? 'bg-green-600'
                        : ''
                    }
                  >
                    {delegation.status}
                  </Badge>
                </TableCell>
                <TableCell>{format(new Date(delegation.created_at), 'PP')}</TableCell>
                <TableCell>
                  {delegation.revoked_at
                    ? format(new Date(delegation.revoked_at), 'PP')
                    : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {offset + 1} to {Math.min(offset + limit, data.total)} of {data.total}{' '}
          delegations
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setOffset(Math.max(0, offset - limit))}
            disabled={offset === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setOffset(offset + limit)}
            disabled={offset + limit >= data.total}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
