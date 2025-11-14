/**
 * Proposal Create Dialog Component
 * Form dialog for creating new governance proposals
 */

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateProposal } from '../hooks'
import { ProposalType } from '@/core/entities/governance.entity'
import { Loader2 } from 'lucide-react'

interface ProposalCreateDialogProps {
  children?: React.ReactNode
}

export function ProposalCreateDialog({ children }: ProposalCreateDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    currency: '',
    title: '',
    description: '',
    proposal_type: ProposalType.General,
    voting_starts_at: '',
    voting_ends_at: '',
    quorum_required: '50',
  })

  const createProposal = useCreateProposal()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createProposal.mutate(formData, {
      onSuccess: () => {
        setOpen(false)
        setFormData({
          currency: '',
          title: '',
          description: '',
          proposal_type: ProposalType.General,
          voting_starts_at: '',
          voting_ends_at: '',
          quorum_required: '50',
        })
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button>Create Proposal</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Governance Proposal</DialogTitle>
            <DialogDescription>
              Create a new proposal for community voting
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                placeholder="ETH, BTC, etc."
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Proposal title"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed description of the proposal"
                rows={5}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Proposal Type</Label>
              <Select
                value={formData.proposal_type}
                onValueChange={(value) =>
                  setFormData({ ...formData, proposal_type: value as ProposalType })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ProposalType.General}>General</SelectItem>
                  <SelectItem value={ProposalType.ParameterChange}>
                    Parameter Change
                  </SelectItem>
                  <SelectItem value={ProposalType.TreasurySpend}>Treasury Spend</SelectItem>
                  <SelectItem value={ProposalType.Upgrade}>Upgrade</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="voting_starts_at">Voting Starts</Label>
                <Input
                  id="voting_starts_at"
                  type="datetime-local"
                  value={formData.voting_starts_at}
                  onChange={(e) =>
                    setFormData({ ...formData, voting_starts_at: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="voting_ends_at">Voting Ends</Label>
                <Input
                  id="voting_ends_at"
                  type="datetime-local"
                  value={formData.voting_ends_at}
                  onChange={(e) =>
                    setFormData({ ...formData, voting_ends_at: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="quorum">Quorum Required (%)</Label>
              <Input
                id="quorum"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.quorum_required}
                onChange={(e) =>
                  setFormData({ ...formData, quorum_required: e.target.value })
                }
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createProposal.isPending}>
              {createProposal.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Proposal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
