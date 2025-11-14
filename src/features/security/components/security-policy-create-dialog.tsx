/**
 * Security Policy Create Dialog Component
 * Dialog for creating new security policies
 */

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useCreateSecurityPolicy } from '../hooks'
import { PolicyType } from '@/core/entities/security.entity'

interface SecurityPolicyCreateDialogProps {
  open: boolean
  onClose: () => void
}

/**
 * Dialog for creating new security policies
 */
export function SecurityPolicyCreateDialog({ open, onClose }: SecurityPolicyCreateDialogProps) {
  const [organizationId, setOrganizationId] = useState('')
  const [policyType, setPolicyType] = useState<PolicyType | ''>('')
  const [enforced, setEnforced] = useState(true)
  const [config, setConfig] = useState('{}')

  const createPolicy = useCreateSecurityPolicy()

  const handleCreate = async () => {
    if (!organizationId || !policyType) return

    let parsedConfig: Record<string, unknown>
    try {
      parsedConfig = JSON.parse(config)
    } catch (error) {
      parsedConfig = {}
    }

    await createPolicy.mutateAsync({
      organization_id: organizationId,
      policy_type: policyType,
      config: parsedConfig,
      enforced,
    })

    // Reset form
    setOrganizationId('')
    setPolicyType('')
    setEnforced(true)
    setConfig('{}')
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Create Security Policy</DialogTitle>
          <DialogDescription>
            Configure a new security policy for the organization
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='organization-id'>Organization ID</Label>
            <Input
              id='organization-id'
              placeholder='Enter organization ID'
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='policy-type'>Policy Type</Label>
            <Select value={policyType} onValueChange={(value) => setPolicyType(value as PolicyType)}>
              <SelectTrigger>
                <SelectValue placeholder='Select policy type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PolicyType.IPWhitelist}>IP Whitelist</SelectItem>
                <SelectItem value={PolicyType.GeoFencing}>Geo Fencing</SelectItem>
                <SelectItem value={PolicyType.TimeRestriction}>Time Restriction</SelectItem>
                <SelectItem value={PolicyType.RateLimit}>Rate Limit</SelectItem>
                <SelectItem value={PolicyType.MFAEnforcement}>MFA Enforcement</SelectItem>
                <SelectItem value={PolicyType.PasswordPolicy}>Password Policy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='config'>Policy Configuration (JSON)</Label>
            <textarea
              id='config'
              className='border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[100px] w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              placeholder='{"key": "value"}'
              value={config}
              onChange={(e) => setConfig(e.target.value)}
            />
            <p className='text-muted-foreground text-xs'>
              Enter policy configuration as JSON object
            </p>
          </div>

          <div className='flex items-center space-x-2'>
            <Switch
              id='enforced'
              checked={enforced}
              onCheckedChange={setEnforced}
            />
            <Label htmlFor='enforced'>Enforce this policy</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={createPolicy.isPending || !organizationId || !policyType}
          >
            {createPolicy.isPending ? 'Creating...' : 'Create Policy'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
