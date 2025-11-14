/**
 * Security Policy List Component
 * Table displaying all security policies
 */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useSecurityPolicies } from '../hooks'
import { PolicyType } from '@/core/entities/security.entity'
import { formatDistanceToNow } from 'date-fns'
import { CheckCircle, XCircle, Shield, Globe, Clock, Zap, Lock, Key } from 'lucide-react'

interface SecurityPolicyListProps {
  onCreatePolicy?: () => void
}

const policyIcons = {
  [PolicyType.IPWhitelist]: Globe,
  [PolicyType.GeoFencing]: Globe,
  [PolicyType.TimeRestriction]: Clock,
  [PolicyType.RateLimit]: Zap,
  [PolicyType.MFAEnforcement]: Lock,
  [PolicyType.PasswordPolicy]: Key,
}

/**
 * Component for displaying security policies
 */
export function SecurityPolicyList({ onCreatePolicy }: SecurityPolicyListProps) {
  const { data: policies, isLoading } = useSecurityPolicies()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-48' />
        </CardHeader>
        <CardContent>
          <Skeleton className='h-64 w-full' />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>Security Policies</CardTitle>
            <CardDescription>Organization security policies and configurations</CardDescription>
          </div>
          {onCreatePolicy && (
            <Button onClick={onCreatePolicy}>
              <Shield className='mr-2 h-4 w-4' />
              Create Policy
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Policy Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {policies && policies.length > 0 ? (
              policies.map((policy) => {
                const Icon = policyIcons[policy.policy_type] || Shield
                return (
                  <TableRow key={policy.id}>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Icon className='h-4 w-4 text-muted-foreground' />
                        <span className='font-medium'>
                          {policy.policy_type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {policy.enforced ? (
                        <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
                          <CheckCircle className='mr-1 h-3 w-3' />
                          Enforced
                        </Badge>
                      ) : (
                        <Badge variant='outline' className='border-gray-500 bg-gray-50 text-gray-700'>
                          <XCircle className='mr-1 h-3 w-3' />
                          Not Enforced
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className='font-mono text-xs'>
                      {policy.organization_id.slice(0, 8)}...
                    </TableCell>
                    <TableCell className='text-muted-foreground text-sm'>
                      {formatDistanceToNow(new Date(policy.created_at), { addSuffix: true })}
                    </TableCell>
                    <TableCell className='text-muted-foreground text-sm'>
                      {formatDistanceToNow(new Date(policy.updated_at), { addSuffix: true })}
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className='h-24 text-center'>
                  No security policies found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
