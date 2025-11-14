/**
 * User Management Feature Types
 * Component-specific types and constants
 */

import type { User } from '@/core/entities/user.entity'

/**
 * User table filters state
 */
export interface UserFilters {
  search?: string
  status?: string
  role?: string
  dateFrom?: Date
  dateTo?: Date
}

/**
 * User table row selection state
 */
export interface UserTableSelection {
  selectedIds: Set<string>
  selectedUsers: User[]
}
