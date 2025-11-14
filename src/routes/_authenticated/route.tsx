/**
 * Protected Route Layout
 * Ensures user is authenticated and has admin role before accessing routes
 */

import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { useAuthStore } from '@/stores/auth-store'

/**
 * Check if user is authenticated with admin role
 */
function checkAuth() {
  const { auth } = useAuthStore.getState()

  // Check if user is authenticated
  if (!auth.isAuthenticated()) {
    throw redirect({
      to: '/sign-in',
      search: {
        redirect: window.location.pathname,
      },
    })
  }

  // Check if user has admin role
  if (!auth.isAdmin()) {
    // User is authenticated but not an admin
    // In a real app, you might redirect to a 403 Forbidden page
    // For now, we'll redirect to sign-in with an error
    throw redirect({
      to: '/sign-in',
      search: {
        error: 'admin_required',
      },
    })
  }
}

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    checkAuth()
  },
  component: AuthenticatedLayout,
})
