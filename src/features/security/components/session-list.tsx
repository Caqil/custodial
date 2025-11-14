/**
 * Session List Component
 * Table displaying active user sessions
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useSessions } from '../hooks'
import type { Session } from '@/core/entities/security.entity'
import { formatDistanceToNow } from 'date-fns'
import { Monitor, Smartphone, Tablet, Globe, LogOut } from 'lucide-react'
import { SessionTerminateDialog } from './session-terminate-dialog'

interface SessionListProps {
  userId?: string
}

/**
 * Component for displaying active sessions
 */
export function SessionList({ userId }: SessionListProps) {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const { data, isLoading } = useSessions({ user_id: userId })

  const getDeviceIcon = (userAgent: string) => {
    const ua = userAgent.toLowerCase()
    if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
      return Smartphone
    }
    if (ua.includes('tablet') || ua.includes('ipad')) {
      return Tablet
    }
    return Monitor
  }

  const getDeviceType = (userAgent: string) => {
    const ua = userAgent.toLowerCase()
    if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
      return 'Mobile'
    }
    if (ua.includes('tablet') || ua.includes('ipad')) {
      return 'Tablet'
    }
    return 'Desktop'
  }

  const getBrowserInfo = (userAgent: string) => {
    const ua = userAgent.toLowerCase()
    if (ua.includes('chrome')) return 'Chrome'
    if (ua.includes('firefox')) return 'Firefox'
    if (ua.includes('safari')) return 'Safari'
    if (ua.includes('edge')) return 'Edge'
    return 'Unknown'
  }

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

  const sessions = data?.sessions || []

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Monitor and manage active user sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Browser</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.length > 0 ? (
                sessions.map((session) => {
                  const DeviceIcon = getDeviceIcon(session.user_agent)
                  const deviceType = getDeviceType(session.user_agent)
                  const browser = getBrowserInfo(session.user_agent)
                  const isExpiringSoon = new Date(session.expires_at).getTime() - new Date().getTime() < 3600000 // 1 hour

                  return (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <DeviceIcon className='h-4 w-4 text-muted-foreground' />
                          <span className='font-medium'>{deviceType}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <Globe className='h-4 w-4 text-muted-foreground' />
                          {session.device_info?.location ? (
                            <span className='text-sm'>{session.device_info.location as string}</span>
                          ) : (
                            <span className='text-muted-foreground text-sm'>Unknown</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className='font-mono text-xs'>
                        {session.ip_address}
                      </TableCell>
                      <TableCell>
                        <Badge variant='outline'>{browser}</Badge>
                      </TableCell>
                      <TableCell className='text-muted-foreground text-sm'>
                        {formatDistanceToNow(new Date(session.last_activity), { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant='outline'
                          className={
                            isExpiringSoon
                              ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                              : 'border-green-500 bg-green-50 text-green-700'
                          }
                        >
                          {formatDistanceToNow(new Date(session.expires_at), { addSuffix: true })}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => setSelectedSession(session)}
                        >
                          <LogOut className='h-4 w-4' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className='h-24 text-center'>
                    No active sessions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <SessionTerminateDialog
        session={selectedSession}
        open={!!selectedSession}
        onClose={() => setSelectedSession(null)}
      />
    </>
  )
}
