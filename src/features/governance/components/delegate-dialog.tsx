/**
 * Delegate Dialog Component
 * Form dialog for delegating voting power
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
import { useDelegate } from '../hooks'
import { Loader2 } from 'lucide-react'

interface DelegateDialogProps {
  children?: React.ReactNode
}

export function DelegateDialog({ children }: DelegateDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    delegator_wallet_id: '',
    delegate_wallet_id: '',
    weight: '',
  })

  const delegate = useDelegate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    delegate.mutate(formData, {
      onSuccess: () => {
        setOpen(false)
        setFormData({
          delegator_wallet_id: '',
          delegate_wallet_id: '',
          weight: '',
        })
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button>Delegate Voting Power</Button>}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Delegate Voting Power</DialogTitle>
            <DialogDescription>
              Delegate your voting power to another wallet
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="delegator">Your Wallet ID (Delegator)</Label>
              <Input
                id="delegator"
                value={formData.delegator_wallet_id}
                onChange={(e) =>
                  setFormData({ ...formData, delegator_wallet_id: e.target.value })
                }
                placeholder="Your wallet ID"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="delegate">Delegate To (Wallet ID)</Label>
              <Input
                id="delegate"
                value={formData.delegate_wallet_id}
                onChange={(e) =>
                  setFormData({ ...formData, delegate_wallet_id: e.target.value })
                }
                placeholder="Delegate's wallet ID"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="weight">Voting Weight to Delegate</Label>
              <Input
                id="weight"
                type="number"
                min="0"
                step="0.000001"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="0.00"
                required
              />
              <p className="text-xs text-muted-foreground">
                The amount of voting power to delegate
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={delegate.isPending}>
              {delegate.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delegate
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
