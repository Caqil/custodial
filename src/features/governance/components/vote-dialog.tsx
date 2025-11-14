/**
 * Vote Dialog Component
 * Form dialog for casting votes on proposals
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useVote } from '../hooks'
import { VoteType } from '@/core/entities/governance.entity'
import { Loader2 } from 'lucide-react'

interface VoteDialogProps {
  proposalId: string
  proposalTitle: string
  children?: React.ReactNode
}

export function VoteDialog({ proposalId, proposalTitle, children }: VoteDialogProps) {
  const [open, setOpen] = useState(false)
  const [voteType, setVoteType] = useState<VoteType>(VoteType.For)
  const [walletId, setWalletId] = useState('')

  const vote = useVote()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    vote.mutate(
      {
        proposalId,
        proposal_id: proposalId,
        wallet_id: walletId,
        vote_type: voteType,
      },
      {
        onSuccess: () => {
          setOpen(false)
          setWalletId('')
          setVoteType(VoteType.For)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button>Cast Vote</Button>}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Cast Vote</DialogTitle>
            <DialogDescription>
              Vote on: {proposalTitle}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="wallet">Wallet ID</Label>
              <Input
                id="wallet"
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
                placeholder="Enter wallet ID"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Vote</Label>
              <RadioGroup value={voteType} onValueChange={(v) => setVoteType(v as VoteType)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={VoteType.For} id="for" />
                  <Label htmlFor="for" className="cursor-pointer font-normal">
                    <span className="font-medium text-green-600">For</span> - Support this
                    proposal
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={VoteType.Against} id="against" />
                  <Label htmlFor="against" className="cursor-pointer font-normal">
                    <span className="font-medium text-red-600">Against</span> - Oppose this
                    proposal
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={VoteType.Abstain} id="abstain" />
                  <Label htmlFor="abstain" className="cursor-pointer font-normal">
                    <span className="font-medium text-gray-600">Abstain</span> - No preference
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={vote.isPending}>
              {vote.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Vote
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
