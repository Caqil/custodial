/**
 * Vote List Component
 * Displays paginated list of votes
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
import { useVotes } from '../hooks'
import { VoteType } from '@/core/entities/governance.entity'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'

interface VoteListProps {
  proposalId?: string
  walletId?: string
}

export function VoteList({ proposalId, walletId }: VoteListProps) {
  const [offset, setOffset] = useState(0)
  const [limit] = useState(10)

  const { data, isLoading, error } = useVotes({
    offset,
    limit,
    proposal_id: proposalId,
    wallet_id: walletId,
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
        Error loading votes: {error.message}
      </div>
    )
  }

  if (!data || data.votes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <p>No votes found</p>
      </div>
    )
  }

  const getVoteBadge = (voteType: VoteType) => {
    const variants = {
      [VoteType.For]: { variant: 'default' as const, label: 'For', className: 'bg-green-600' },
      [VoteType.Against]: { variant: 'destructive' as const, label: 'Against', className: '' },
      [VoteType.Abstain]: { variant: 'secondary' as const, label: 'Abstain', className: '' },
    }
    const { variant, label, className } = variants[voteType]
    return <Badge variant={variant} className={className}>{label}</Badge>
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Wallet ID</TableHead>
              <TableHead>Vote</TableHead>
              <TableHead>Vote Weight</TableHead>
              <TableHead>Delegated From</TableHead>
              <TableHead>Voted At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.votes.map((vote) => (
              <TableRow key={vote.id}>
                <TableCell className="font-mono text-sm">
                  {vote.wallet_id.substring(0, 12)}...
                </TableCell>
                <TableCell>{getVoteBadge(vote.vote_type)}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('en-US', {
                    maximumFractionDigits: 6,
                  }).format(parseFloat(vote.vote_weight))}
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {vote.delegated_from
                    ? `${vote.delegated_from.substring(0, 12)}...`
                    : '-'}
                </TableCell>
                <TableCell>{format(new Date(vote.voted_at), 'PPp')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {offset + 1} to {Math.min(offset + limit, data.total)} of {data.total} votes
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
