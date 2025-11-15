import { Link } from '@tanstack/react-router'
import { BadgeCheck, Bell, CreditCard, LogOut, User } from 'lucide-react'
import useDialogState from '@/hooks/use-dialog-state'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { SignOutDialog } from '@/components/sign-out-dialog'

type HeaderUserNavProps = {
  user: {
    name: string
    email: string
    avatar: string
  }
}

export function HeaderUserNav({ user }: HeaderUserNavProps) {
  const [open, setOpen] = useDialogState()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative h-9 w-9 rounded-full'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className='bg-primary text-primary-foreground'>
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end'>
          <DropdownMenuLabel>
            <div className='flex items-center gap-2'>
              <Avatar className='h-9 w-9'>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className='bg-primary text-primary-foreground'>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col space-y-0.5'>
                <p className='text-sm font-semibold'>{user.name}</p>
                <p className='text-xs text-muted-foreground'>{user.email}</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to='/settings/account'>
                <User className='mr-2 h-4 w-4' />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to='/settings'>
                <BadgeCheck className='mr-2 h-4 w-4' />
                <span>Account Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to='/settings/notifications'>
                <Bell className='mr-2 h-4 w-4' />
                <span>Notifications</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)} className='text-red-600 focus:text-red-600'>
            <LogOut className='mr-2 h-4 w-4' />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SignOutDialog open={!!open} onOpenChange={setOpen} />
    </>
  )
}
