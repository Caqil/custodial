import { SearchIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSearch } from '@/context/search-provider'
import { Button } from './ui/button'

type SearchProps = {
  className?: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
}

export function Search({
  className = '',
  placeholder = 'Search',
}: SearchProps) {
  const { setOpen } = useSearch()
  return (
    <Button
      variant='outline'
      className={cn(
        'group relative h-8 w-full justify-start text-sm font-normal text-muted-foreground shadow-none',
        className
      )}
      onClick={() => setOpen(true)}
    >
      <SearchIcon className='mr-2 h-4 w-4 shrink-0 opacity-50' />
      <span className='inline-block flex-1 text-left'>{placeholder}</span>
      <kbd className='pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
        <span className='text-xs'>⌘</span>K
      </kbd>
    </Button>
  )
}
