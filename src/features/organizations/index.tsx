/**
 * Organization Management Page
 * Main page for viewing and managing organizations
 */

import { useState, useMemo } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
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

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        {/* Page Header */}
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Organization Management
            </h2>
            <p className='text-muted-foreground'>
              View organization statistics and metrics
            </p>
          </div>
        </div>

        {/* Filters */}
        <OrganizationFilters search={search} onSearchChange={setSearch} />

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

        {/* Organization Table */}
        <OrganizationTable
          data={filteredOrganizations}
          isLoading={isLoading}
          onViewStats={handleViewStats}
        />
      </Main>

      {/* Stats Drawer */}
      <OrganizationStatsDrawer
        organization={selectedOrganization}
        open={statsDrawerOpen}
        onOpenChange={setStatsDrawerOpen}
      />
    </>
  )
}
