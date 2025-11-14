/**
 * User Authentication Form
 * Sign-in form with JWT authentication via API
 */

import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Loader2, LogIn } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import apiClient from '@/infrastructure/api/client'
import { API_ENDPOINTS } from '@/infrastructure/api/endpoints'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Please enter your password'),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

/**
 * Login response from API
 * Matches backend UserUseCase.Login response
 */
interface LoginResponse {
  access_token: string
  refresh_token: string
  user: {
    id: string
    email: string
    organization_name: string
    status: string
    mfa_enabled: boolean
  }
  requires_mfa: boolean
}

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Call login API endpoint
      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.auth.login,
        {
          email: data.email,
          password: data.password,
        }
      )

      console.log('Login response:', response.data)

      // Handle wrapped response structure
      // Backend may return: { success: true, data: { access_token, ... } }
      // or directly: { access_token, ... }
      const responseData = response.data.data || response.data
      const { access_token, user, requires_mfa } = responseData

      // Validate response
      if (!access_token) {
        console.error('No access_token in response:', response.data)
        toast.error('Invalid server response: missing access token')
        setIsLoading(false)
        return
      }

      // Check if MFA is required
      if (requires_mfa) {
        toast.error('MFA is required. Please contact your administrator.')
        setIsLoading(false)
        return
      }

      console.log('Access token received:', access_token.substring(0, 20) + '...')

      // Store token in auth store (will decode and extract role automatically)
      auth.setAccessToken(access_token)

      // Verify user has admin role (decoded from JWT)
      if (!auth.isAdmin()) {
        toast.error('Access denied. Admin role required.')
        auth.reset()
        setIsLoading(false)
        return
      }

      toast.success(`Welcome back, ${user.email}!`)

      // Redirect to dashboard or stored location
      const targetPath = redirectTo || '/'
      navigate({ to: targetPath, replace: true })
    } catch (error: any) {
      console.error('Login error:', error)

      // Handle specific error messages
      if (error.response?.status === 401) {
        toast.error('Invalid email or password')
      } else if (error.response?.status === 403) {
        toast.error('Access forbidden. Admin role required.')
      } else if (error.response?.data?.error) {
        toast.error(error.response.data.error)
      } else {
        toast.error('Login failed. Please try again.')
      }

      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='admin@example.com'
                  type='email'
                  autoComplete='email'
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder='Enter your password'
                  autoComplete='current-password'
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <Link
                to='/forgot-password'
                className='text-muted-foreground absolute end-0 -top-0.5 text-sm font-medium hover:opacity-75'
              >
                Forgot password?
              </Link>
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={isLoading} type='submit'>
          {isLoading ? <Loader2 className='animate-spin' /> : <LogIn />}
          Sign in
        </Button>
      </form>
    </Form>
  )
}
