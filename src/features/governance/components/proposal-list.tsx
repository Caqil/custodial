/**
 * Proposal List Component
 * Displays paginated list of governance proposals with filters
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ProposalStatusBadge } from './proposal-status-badge'
import { ProposalTypeBadge } from './proposal-type-badge'
import { useProposals } from '../hooks'
import { ProposalStatus, ProposalType } from '@/core/entities/governance.entity'
import { format } from 'date-fns'
import { useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'

export function ProposalList() {
  const navigate = useNavigate()
  const [offset, setOffset] = useState(0)
  const [limit] = useState(10)
  const [status, setStatus] = useState<ProposalStatus | undefined>()
  const [proposalType, setProposalType] = useState<ProposalType | undefined>()
  const [currency, setCurrency] = useState<string>('')

  const { data, isLoading, error } = useProposals({
    offset,
    limit,
    status,
    proposal_type: proposalType,
    currency: currency || undefined,
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
        Error loading proposals: {error.message}
      </div>
    )
  }

  if (!data || data.proposals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <p>No proposals found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4">
        <Select value={status || ''} onValueChange={(v) => setStatus(v as ProposalStatus || undefined)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All statuses</SelectItem>
            <SelectItem value={ProposalStatus.Draft}>Draft</SelectItem>
            <SelectItem value={ProposalStatus.Active}>Active</SelectItem>
            <SelectItem value={ProposalStatus.Passed}>Passed</SelectItem>
            <SelectItem value={ProposalStatus.Rejected}>Rejected</SelectItem>
            <SelectItem value={ProposalStatus.Executed}>Executed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={proposalType || ''} onValueChange={(v) => setProposalType(v as ProposalType || undefined)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All types</SelectItem>
            <SelectItem value={ProposalType.General}>General</SelectItem>
            <SelectItem value={ProposalType.ParameterChange}>Parameter Change</SelectItem>
            <SelectItem value={ProposalType.TreasurySpend}>Treasury Spend</SelectItem>
            <SelectItem value={ProposalType.Upgrade}>Upgrade</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Filter by currency..."
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-[200px]"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Voting Ends</TableHead>
              <TableHead>Total Votes</TableHead>
              <TableHead>Quorum</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.proposals.map((proposal) => (
              <TableRow
                key={proposal.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() =>
                  navigate({ to: '/governance/proposals/$id', params: { id: proposal.id } })
                }
              >
                <TableCell className="font-medium">{proposal.title}</TableCell>
                <TableCell>
                  <ProposalTypeBadge type={proposal.proposal_type} />
                </TableCell>
                <TableCell>
                  <ProposalStatusBadge status={proposal.status} />
                </TableCell>
                <TableCell className="font-mono text-sm">{proposal.currency}</TableCell>
                <TableCell>{format(new Date(proposal.voting_ends_at), 'PPp')}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('en-US', {
                    maximumFractionDigits: 2,
                  }).format(parseFloat(proposal.total_votes))}
                </TableCell>
                <TableCell>{parseFloat(proposal.quorum_required).toFixed(1)}%</TableCell>
                <TableCell>{format(new Date(proposal.created_at), 'PP')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {offset + 1} to {Math.min(offset + limit, data.total)} of {data.total} proposals
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
