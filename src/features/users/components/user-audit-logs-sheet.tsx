/**
 * User Audit Logs Sheet Component
 * Side sheet showing audit log history for a specific user
 */

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserAuditLogs } from '../hooks'
import { formatDate } from '@/lib/utils'
import type { User } from '@/core/entities/user.entity'

interface UserAuditLogsSheetProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Sheet component for displaying user audit logs
 */
export function UserAuditLogsSheet({
  user,
  open,
  onOpenChange,
}: UserAuditLogsSheetProps) {
  const { data, isLoading } = useUserAuditLogs(user?.id ?? null, { limit: 50 }, open)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='sm:max-w-xl'>
        <SheetHeader>
          <SheetTitle>Audit Logs</SheetTitle>
          <SheetDescription>
            Activity history for {user?.email}
          </SheetDescription>
        </SheetHeader>

        <div className='mt-6'>
          {isLoading ? (
            <div className='space-y-3'>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className='h-24 w-full' />
              ))}
            </div>
          ) : data && data.logs.length > 0 ? (
            <div className='space-y-3'>
              {data.logs.map((log) => (
                <div key={log.id} className='rounded-lg border p-4'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center gap-2'>
                        <p className='font-medium'>{log.action}</p>
                        <Badge
                          variant={
                            log.result === 'success'
                              ? 'default'
                              : log.result === 'failure'
                                ? 'destructive'
                                : 'secondary'
                          }
                          className='text-xs'
                        >
                          {log.result}
                        </Badge>
                      </div>
                      <p className='text-muted-foreground text-sm'>
                        {log.resource_type}
                        {log.resource_id && (
                          <span className='ml-1'>
                            ({log.resource_id.slice(0, 8)}...)
                          </span>
                        )}
                      </p>
                      {log.ip_address && (
                        <p className='text-muted-foreground text-xs'>
                          IP: {log.ip_address}
                        </p>
                      )}
                      <p className='text-muted-foreground text-xs'>
                        {formatDate(log.created_at)}
                      </p>
                    </div>
                  </div>

                  {log.changes && Object.keys(log.changes).length > 0 && (
                    <div className='bg-muted mt-3 rounded p-2'>
                      <p className='text-muted-foreground mb-1 text-xs font-medium'>
                        Changes:
                      </p>
                      <pre className='text-xs overflow-x-auto'>
                        {JSON.stringify(log.changes, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className='text-muted-foreground py-8 text-center'>
              <p>No audit logs found for this user</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
