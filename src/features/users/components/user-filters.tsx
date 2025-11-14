/**
 * User Filters Component
 * Filter bar for searching and filtering users
 */

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UserStatus, UserRole } from '@/core/entities/user.entity'
import type { UserFilters } from '../types'

interface UserFiltersProps {
  filters: UserFilters
  onFiltersChange: (filters: UserFilters) => void
}

/**
 * Filter controls for user table
 */
export function UserFilters({ filters, onFiltersChange }: UserFiltersProps) {
  return (
    <div className='flex flex-wrap gap-4'>
      {/* Search Input */}
      <div className='relative flex-1 min-w-[200px]'>
        <Search className='text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2' />
        <Input
          placeholder='Search by email...'
          value={filters.search ?? ''}
          onChange={(e) =>
            onFiltersChange({ ...filters, search: e.target.value })
          }
          className='pl-9'
        />
      </div>

      {/* Status Filter */}
      <Select
        value={filters.status ?? 'all'}
        onValueChange={(value) =>
          onFiltersChange({
            ...filters,
            status: value === 'all' ? undefined : value,
          })
        }
      >
        <SelectTrigger className='w-[150px]'>
          <SelectValue placeholder='Status' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Status</SelectItem>
          <SelectItem value={UserStatus.Active}>Active</SelectItem>
          <SelectItem value={UserStatus.Inactive}>Inactive</SelectItem>
          <SelectItem value={UserStatus.Suspended}>Suspended</SelectItem>
          <SelectItem value={UserStatus.Locked}>Locked</SelectItem>
        </SelectContent>
      </Select>

      {/* Role Filter */}
      <Select
        value={filters.role ?? 'all'}
        onValueChange={(value) =>
          onFiltersChange({
            ...filters,
            role: value === 'all' ? undefined : value,
          })
        }
      >
        <SelectTrigger className='w-[150px]'>
          <SelectValue placeholder='Role' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Roles</SelectItem>
          <SelectItem value={UserRole.Admin}>Admin</SelectItem>
          <SelectItem value={UserRole.User}>User</SelectItem>
          <SelectItem value={UserRole.Organization}>Organization</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
