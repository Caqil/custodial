/**
 * Organization Filters Component
 * Filter bar for searching organizations
 */

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface OrganizationFiltersProps {
  search: string
  onSearchChange: (search: string) => void
}

/**
 * Filter controls for organization table
 */
export function OrganizationFilters({
  search,
  onSearchChange,
}: OrganizationFiltersProps) {
  return (
    <div className='flex gap-4'>
      <div className='relative flex-1 max-w-md'>
        <Search className='text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2' />
        <Input
          placeholder='Search organizations...'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className='pl-9'
        />
      </div>
    </div>
  )
}
