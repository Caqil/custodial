/**
 * User Management Page
 * Main page for managing users with table, filters, and actions
 */

import { useState, useMemo } from 'react'
import { FileDown } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { Button } from '@/components/ui/button'
import { UserTable } from './components/user-table'
import { UserFilters } from './components/user-filters'
import { UserDetailDrawer } from './components/user-detail-drawer'
import { UserStatusUpdateDialog } from './components/user-status-update-dialog'
import { UserResetPasswordDialog } from './components/user-reset-password-dialog'
import { UserDeleteDialog } from './components/user-delete-dialog'
import { UserAuditLogsSheet } from './components/user-audit-logs-sheet'
import { useUsers } from './hooks'
import type { User } from '@/core/entities/user.entity'
import type { UserFilters as UserFiltersType } from './types'

/**
 * Main users management page component
 */
export function Users() {
  console.log('🔄 Users component mounted')

  // State for filters
  const [filters, setFilters] = useState<UserFiltersType>({})

  // State for pagination
  const [page, setPage] = useState(0)
  const limit = 20

  // Fetch users with pagination
  const { data, isLoading, error } = useUsers({
    offset: page * limit,
    limit,
  })

  // Log errors for debugging
  if (error) {
    console.error('❌ Error loading users:', error)
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    })
  }

  // Log successful data load
  if (data) {
    console.log('✅ Users loaded:', {
      count: data.users?.length || 0,
      total: data.total,
      hasData: !!data.users,
    })
  }

  // Filter users client-side based on filters
  const filteredUsers = useMemo(() => {
    if (!data?.users) return []

    return data.users.filter((user) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesEmail = user.email.toLowerCase().includes(searchLower)
        const matchesOrg = user.organization_name
          ?.toLowerCase()
          .includes(searchLower)
        if (!matchesEmail && !matchesOrg) return false
      }

      // Status filter
      if (filters.status && user.status !== filters.status) return false

      // Role filter
      if (filters.role && user.role !== filters.role) return false

      return true
    })
  }, [data?.users, filters])

  // Dialog states
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false)
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [auditLogsSheetOpen, setAuditLogsSheetOpen] = useState(false)

  // Action handlers
  const handleViewDetails = (user: User) => {
    setSelectedUser(user)
    setDetailDrawerOpen(true)
  }

  const handleUpdateStatus = (user: User) => {
    setSelectedUser(user)
    setStatusDialogOpen(true)
  }

  const handleResetPassword = (user: User) => {
    setSelectedUser(user)
    setResetPasswordDialogOpen(true)
  }

  const handleDelete = (user: User) => {
    setSelectedUser(user)
    setDeleteDialogOpen(true)
  }

  const handleViewAuditLogs = (user: User) => {
    setSelectedUser(user)
    setAuditLogsSheetOpen(true)
  }

  const handleExport = () => {
    // Create CSV content
    const headers = ['Email', 'Status', 'Role', 'MFA Enabled', 'Organization', 'Created At']
    const rows = filteredUsers.map((user) => [
      user.email,
      user.status,
      user.role,
      user.mfa_enabled ? 'Yes' : 'No',
      user.organization_name || '',
      user.created_at,
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
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
            <h2 className='text-2xl font-bold tracking-tight'>User Management</h2>
            <p className='text-muted-foreground'>
              Manage users, roles, and permissions
            </p>
          </div>
          <Button onClick={handleExport} variant='outline'>
            <FileDown className='mr-2 h-4 w-4' />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <UserFilters filters={filters} onFiltersChange={setFilters} />

        {/* Stats Cards */}
        {data && (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <div className='rounded-lg border p-4'>
              <p className='text-muted-foreground text-sm font-medium'>Total Users</p>
              <p className='text-2xl font-bold'>{data.total}</p>
            </div>
            <div className='rounded-lg border p-4'>
              <p className='text-muted-foreground text-sm font-medium'>Active</p>
              <p className='text-2xl font-bold text-green-600'>
                {data.users.filter((u) => u.status === 'active').length}
              </p>
            </div>
            <div className='rounded-lg border p-4'>
              <p className='text-muted-foreground text-sm font-medium'>Suspended</p>
              <p className='text-2xl font-bold text-orange-600'>
                {data.users.filter((u) => u.status === 'suspended').length}
              </p>
            </div>
            <div className='rounded-lg border p-4'>
              <p className='text-muted-foreground text-sm font-medium'>MFA Enabled</p>
              <p className='text-2xl font-bold'>
                {data.users.filter((u) => u.mfa_enabled).length}
              </p>
            </div>
          </div>
        )}

        {/* User Table */}
        <UserTable
          data={filteredUsers}
          isLoading={isLoading}
          onViewDetails={handleViewDetails}
          onUpdateStatus={handleUpdateStatus}
          onResetPassword={handleResetPassword}
          onDelete={handleDelete}
        />
      </Main>

      {/* Dialogs and Drawers */}
      <UserDetailDrawer
        user={selectedUser}
        open={detailDrawerOpen}
        onOpenChange={setDetailDrawerOpen}
      />
      <UserStatusUpdateDialog
        user={selectedUser}
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
      />
      <UserResetPasswordDialog
        user={selectedUser}
        open={resetPasswordDialogOpen}
        onOpenChange={setResetPasswordDialogOpen}
      />
      <UserDeleteDialog
        user={selectedUser}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
      <UserAuditLogsSheet
        user={selectedUser}
        open={auditLogsSheetOpen}
        onOpenChange={setAuditLogsSheetOpen}
      />
    </>
  )
}
