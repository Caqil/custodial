/**
 * Sessions Page
 * Management of active sessions, IP whitelist, and geo restrictions
 */

import { SessionList } from '../components/session-list'
import { IPWhitelistTable } from '../components/ip-whitelist-table'
import { GeoRestrictionTable } from '../components/geo-restriction-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

/**
 * Sessions management page component
 */
export function SessionsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Sessions & Access Control</h1>
        <p className='text-muted-foreground mt-2'>
          Monitor active sessions and manage access control policies
        </p>
      </div>

      <Tabs defaultValue='sessions' className='space-y-6'>
        <TabsList>
          <TabsTrigger value='sessions'>Active Sessions</TabsTrigger>
          <TabsTrigger value='ip-whitelist'>IP Whitelist</TabsTrigger>
          <TabsTrigger value='geo-restrictions'>Geo Restrictions</TabsTrigger>
        </TabsList>

        <TabsContent value='sessions' className='space-y-6'>
          <SessionList />
        </TabsContent>

        <TabsContent value='ip-whitelist' className='space-y-6'>
          <IPWhitelistTable />
        </TabsContent>

        <TabsContent value='geo-restrictions' className='space-y-6'>
          <GeoRestrictionTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
