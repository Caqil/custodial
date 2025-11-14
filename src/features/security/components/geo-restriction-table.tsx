/**
 * Geo Restriction Table Component
 * Table displaying geographic access restrictions
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
import { useGeoRestrictions } from '../hooks'
import { formatDistanceToNow } from 'date-fns'
import { CheckCircle, XCircle, MapPin, Shield, ShieldAlert } from 'lucide-react'

/**
 * Component for displaying geo restrictions
 */
export function GeoRestrictionTable() {
  const { data: restrictions, isLoading } = useGeoRestrictions()

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
          <MapPin className='h-5 w-5' />
          Geographic Restrictions
        </CardTitle>
        <CardDescription>Country-based access controls</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Restriction Type</TableHead>
              <TableHead>Countries</TableHead>
              <TableHead>Applies To</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {restrictions && restrictions.length > 0 ? (
              restrictions.map((restriction) => (
                <TableRow key={restriction.id}>
                  <TableCell>
                    {restriction.restriction_type === 'allow_list' ? (
                      <Badge variant='outline' className='border-green-500 bg-green-50 text-green-700'>
                        <Shield className='mr-1 h-3 w-3' />
                        Allow List
                      </Badge>
                    ) : (
                      <Badge variant='outline' className='border-red-500 bg-red-50 text-red-700'>
                        <ShieldAlert className='mr-1 h-3 w-3' />
                        Block List
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-wrap gap-1'>
                      {restriction.country_codes.slice(0, 5).map((code) => (
                        <Badge key={code} variant='outline' className='font-mono text-xs'>
                          {code}
                        </Badge>
                      ))}
                      {restriction.country_codes.length > 5 && (
                        <Badge variant='outline' className='text-xs'>
                          +{restriction.country_codes.length - 5} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline'>
                      {restriction.applies_to === 'all'
                        ? 'All Operations'
                        : restriction.applies_to.charAt(0).toUpperCase() +
                          restriction.applies_to.slice(1).replace(/_/g, ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className='font-mono text-xs'>
                    {restriction.organization_id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>
                    {restriction.is_active ? (
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
                    {formatDistanceToNow(new Date(restriction.created_at), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className='h-24 text-center'>
                  No geo restrictions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
