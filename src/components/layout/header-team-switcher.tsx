import * as React from 'react'
import { ChevronsUpDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

type HeaderTeamSwitcherProps = {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}

export function HeaderTeamSwitcher({ teams }: HeaderTeamSwitcherProps) {
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-9 gap-2 px-2'>
          <div className='bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md'>
            <activeTeam.logo className='size-4' />
          </div>
          <div className='flex flex-col items-start'>
            <span className='text-sm font-semibold leading-none'>
              {activeTeam.name}
            </span>
            <span className='text-xs text-muted-foreground leading-none mt-0.5'>
              {activeTeam.plan}
            </span>
          </div>
          <ChevronsUpDown className='ml-1 h-4 w-4 text-muted-foreground' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='start'>
        {teams.map((team, index) => (
          <DropdownMenuItem
            key={team.name}
            onClick={() => setActiveTeam(team)}
            className='gap-2'
          >
            <div className='bg-primary/10 flex size-8 items-center justify-center rounded-md'>
              <team.logo className='size-4' />
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-medium'>{team.name}</span>
              <span className='text-xs text-muted-foreground'>
                {team.plan}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
