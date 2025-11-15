/**
 * Sessions Page
 * Management of active sessions, IP whitelist, and geo restrictions
 */
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GeoRestrictionTable } from '../components/geo-restriction-table'
import { IPWhitelistTable } from '../components/ip-whitelist-table'
import { SessionList } from '../components/session-list'

/**
 * Sessions management page component
 */
export function SessionsPage() {
  return (
    <div className='container mx-auto space-y-8 py-8'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Sessions & Access Control</h1>
        <p className='text-muted-foreground'>
          Monitor active sessions and manage access control policies
        </p>
      </div>

      <Tabs defaultValue='sessions' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='sessions'>Active Sessions</TabsTrigger>
          <TabsTrigger value='ip-whitelist'>IP Whitelist</TabsTrigger>
          <TabsTrigger value='geo-restrictions'>Geo Restrictions</TabsTrigger>
        </TabsList>

        <TabsContent value='sessions' className='space-y-4'>
          <SessionList />
        </TabsContent>

        <TabsContent value='ip-whitelist' className='space-y-4'>
          <IPWhitelistTable />
        </TabsContent>

        <TabsContent value='geo-restrictions' className='space-y-4'>
          <GeoRestrictionTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
