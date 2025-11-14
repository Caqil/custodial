/**
 * IP Whitelist Table Component
 * Table displaying IP whitelist entries
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
import { Skeleton } from '@/components/ui/skeleton'
import { useIPWhitelist } from '../hooks'
import { formatDistanceToNow } from 'date-fns'
import { CheckCircle, XCircle, Globe } from 'lucide-react'

/**
 * Component for displaying IP whitelist entries
 */
export function IPWhitelistTable() {
  const { data: entries, isLoading } = useIPWhitelist()

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
        <CardTitle className='flex items-center gap-2'>
          <Globe className='h-5 w-5' />
          IP Whitelist
        </CardTitle>
        <CardDescription>Allowed IP addresses and ranges</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IP Address / Range</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Scope</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Expires</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries && entries.length > 0 ? (
              entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className='font-mono text-sm'>
                    {entry.ip_range || entry.ip_address}
                  </TableCell>
                  <TableCell>
                    {entry.description || <span className='text-muted-foreground'>No description</span>}
                  </TableCell>
                  <TableCell>
                    {entry.organization_id ? (
                      <Badge variant='outline'>Organization</Badge>
                    ) : entry.user_id ? (
                      <Badge variant='outline'>User</Badge>
                    ) : (
                      <Badge variant='outline'>Global</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {entry.is_active ? (
                      <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
                        <CheckCircle className='mr-1 h-3 w-3' />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant='outline' className='border-gray-500 bg-gray-50 text-gray-700'>
                        <XCircle className='mr-1 h-3 w-3' />
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className='text-muted-foreground text-sm'>
                    {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                  </TableCell>
                  <TableCell className='text-muted-foreground text-sm'>
                    {entry.expires_at
                      ? formatDistanceToNow(new Date(entry.expires_at), { addSuffix: true })
                      : 'Never'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className='h-24 text-center'>
                  No IP whitelist entries found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
