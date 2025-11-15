/**
 * Organization Management Page
 * Main page for viewing and managing organizations
 */

import { useState, useMemo } from 'react'
import { OrganizationTable } from './components/organization-table'
import { OrganizationFilters } from './components/organization-filters'
import { OrganizationStatsDrawer } from './components/organization-stats-drawer'
import { useOrganizations } from './hooks'
import type { Organization } from '@/core/entities/organization.entity'

/**
 * Main organizations management page component
 */
export function Organizations() {
  const [search, setSearch] = useState('')
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null)
  const [statsDrawerOpen, setStatsDrawerOpen] = useState(false)

  // Fetch organizations
  const { data, isLoading } = useOrganizations({ limit: 100 })

  // Filter organizations client-side
  const filteredOrganizations = useMemo(() => {
    if (!data?.organizations) return []

    if (!search) return data.organizations

    const searchLower = search.toLowerCase()
    return data.organizations.filter(
      (org) =>
        org.name.toLowerCase().includes(searchLower) ||
        org.email.toLowerCase().includes(searchLower)
    )
  }, [data?.organizations, search])

  const handleViewStats = (organization: Organization) => {
    setSelectedOrganization(organization)
    setStatsDrawerOpen(true)
  }

  if (!data && !isLoading) {
    return (
      <div className='container mx-auto py-8'>
        <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
          <h3 className='font-semibold text-red-900'>Error loading organizations</h3>
          <p className='text-sm text-red-700'>
            Unable to load organizations. Please try again.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto space-y-8 py-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Organization Management
          </h1>
          <p className='text-muted-foreground'>
            View organization statistics and metrics
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {data && (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          <div className='rounded-lg border p-4'>
            <p className='text-muted-foreground text-sm font-medium'>
              Total Organizations
            </p>
            <p className='text-2xl font-bold'>{data.total}</p>
          </div>
          <div className='rounded-lg border p-4'>
            <p className='text-muted-foreground text-sm font-medium'>
              Active
            </p>
            <p className='text-2xl font-bold text-green-600'>
              {data.organizations.filter((o) => o.status === 'active').length}
            </p>
          </div>
          <div className='rounded-lg border p-4'>
            <p className='text-muted-foreground text-sm font-medium'>
              Filtered Results
            </p>
            <p className='text-2xl font-bold'>{filteredOrganizations.length}</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <OrganizationFilters search={search} onSearchChange={setSearch} />

      {/* Organization Table */}
      <OrganizationTable
        data={filteredOrganizations}
        isLoading={isLoading}
        onViewStats={handleViewStats}
      />

      {/* Pagination Info */}
      {data && (
        <div className='text-muted-foreground flex items-center justify-between text-sm'>
          <div>
            Showing {filteredOrganizations.length} of {data.total} organizations
          </div>
        </div>
      )}

      {/* Stats Drawer */}
      <OrganizationStatsDrawer
        organization={selectedOrganization}
        open={statsDrawerOpen}
        onOpenChange={setStatsDrawerOpen}
      />
    </div>
  )
}
