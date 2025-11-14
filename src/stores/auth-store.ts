import { create } from 'zustand'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

const ACCESS_TOKEN = 'custodial_admin_token'

/**
 * JWT Token Claims Structure
 * Based on backend JWT implementation in pkg/jwt/jwt.go
 */
interface JWTClaims {
  user_id: string // User ID (UUID) - custom claim
  email: string // User email - custom claim
  organization_id?: string // Organization ID (UUID) - custom claim
  role: string // User role (should be "admin" for admin panel)
  token_type: string // Token type ("access" or "refresh")
  sub: string // Subject (User ID) - standard claim
  exp: number // Expiration timestamp - standard claim
  iat: number // Issued at timestamp - standard claim
  iss?: string // Issuer - standard claim
  jti?: string // JWT ID - standard claim
}

/**
 * Admin user information extracted from JWT
 */
interface AdminUser {
  id: string
  role: string
  isAdmin: boolean
  expiresAt: number
}

/**
 * Authentication state interface
 */
interface AuthState {
  auth: {
    user: AdminUser | null
    setUser: (user: AdminUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
    isAuthenticated: () => boolean
    isAdmin: () => boolean
  }
}

/**
 * Decode JWT token to extract user information
 * @param token - JWT token string
 * @returns Decoded admin user or null if invalid
 */
function decodeJWT(token: string): AdminUser | null {
  try {
    // Validate token exists and is a string
    if (!token || typeof token !== 'string') {
      console.error('Invalid token: token is not a string', { token, type: typeof token })
      return null
    }

    // Split token and get payload
    const parts = token.split('.')
    if (parts.length !== 3) {
      console.warn('Invalid JWT format: expected 3 parts, got', parts.length)
      return null
    }

    // Decode base64 payload (handle URL-safe base64)
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(atob(base64))
    const claims = payload as JWTClaims

    // Validate required fields (check both custom and standard claims)
    const userId = claims.user_id || claims.sub
    if (!userId || !claims.role || !claims.exp) {
      console.warn('Missing required JWT claims', { userId, role: claims.role, exp: claims.exp })
      return null
    }

    // Validate token type (should be "access" for login)
    if (claims.token_type && claims.token_type !== 'access') {
      console.warn('Invalid token type:', claims.token_type)
      return null
    }

    // Check if token is expired
    const now = Math.floor(Date.now() / 1000)
    if (claims.exp < now) {
      console.warn('Token has expired')
      return null
    }

    // Check if user has admin role
    const isAdmin = claims.role === 'admin'

    if (!isAdmin) {
      console.warn('User does not have admin role:', claims.role)
    }

    return {
      id: userId,
      role: claims.role,
      isAdmin,
      expiresAt: claims.exp,
    }
  } catch (error) {
    console.error('Failed to decode JWT:', error)
    return null
  }
}

/**
 * Zustand store for authentication state
 */
export const useAuthStore = create<AuthState>()((set, get) => {
  const cookieState = getCookie(ACCESS_TOKEN)
  const initToken = cookieState ? JSON.parse(cookieState) : ''
  const initUser = initToken ? decodeJWT(initToken) : null

  return {
    auth: {
      user: initUser,
      setUser: (user) =>
        set((state) => ({ ...state, auth: { ...state.auth, user } })),
      accessToken: initToken,
      setAccessToken: (accessToken) =>
        set((state) => {
          console.log('Setting access token:', typeof accessToken, accessToken?.substring?.(0, 20))

          if (!accessToken || typeof accessToken !== 'string') {
            console.error('Invalid access token provided:', accessToken)
            return state
          }

          setCookie(ACCESS_TOKEN, JSON.stringify(accessToken))
          const user = decodeJWT(accessToken)

          if (!user) {
            console.error('Failed to decode user from token')
          }

          return { ...state, auth: { ...state.auth, accessToken, user } }
        }),
      resetAccessToken: () =>
        set((state) => {
          removeCookie(ACCESS_TOKEN)
          return { ...state, auth: { ...state.auth, accessToken: '', user: null } }
        }),
      reset: () =>
        set((state) => {
          removeCookie(ACCESS_TOKEN)
          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: '' },
          }
        }),
      isAuthenticated: () => {
        const { accessToken, user } = get().auth
        if (!accessToken || !user) return false

        // Check if token is expired
        const now = Math.floor(Date.now() / 1000)
        return user.expiresAt > now
      },
      isAdmin: () => {
        const { user } = get().auth
        return user?.isAdmin ?? false
      },
    },
  }
})
