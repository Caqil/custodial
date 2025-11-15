import {
  LayoutDashboard,
  Monitor,
  Bell,
  Palette,
  Settings,
  Wrench,
  UserCog,
  Users,
  Building2,
  FileText,
  BarChart3,
  Shield,
  HelpCircle,
  Wallet,
  ArrowRightLeft,
  Link2,
  TrendingUp,
  Vote,
  Key,
  ShieldCheck,
  UserCircle,
  ChartPie,
  CircleDollarSign,
  Activity,
  AlertTriangle,
  Radio,
  CheckSquare,
  Package,
  Network,
  Download,
  Upload,
  Layers,
  Target,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Admin',
    email: 'admin@custodial-wallet.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Custodial Wallet Admin',
      logo: Wallet,
      plan: 'Admin Panel',
    },
  ],
  navGroups: [
    {
      title: 'Overview',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'Wallet Management',
      items: [
        {
          title: 'Wallets',
          icon: Wallet,
          items: [
            {
              title: 'All Wallets',
              url: '/wallets',
              icon: Wallet,
            },
            {
              title: 'Wallet Analytics',
              url: '/wallets/analytics',
              icon: ChartPie,
            },
          ],
        },
      ],
    },
    {
      title: 'Transactions & Blockchain',
      items: [
        {
          title: 'Transactions',
          icon: ArrowRightLeft,
          items: [
            {
              title: 'All Transactions',
              url: '/transactions',
              icon: ArrowRightLeft,
            },
            {
              title: 'Batches',
              url: '/transactions/batches',
              icon: Package,
            },
            {
              title: 'Approvals',
              url: '/transactions/approvals',
              icon: CheckSquare,
            },
          ],
        },
        {
          title: 'Blockchain',
          icon: Link2,
          items: [
            {
              title: 'Networks',
              url: '/blockchain',
              icon: Network,
            },
            {
              title: 'Deposits',
              url: '/blockchain/deposits',
              icon: Download,
            },
            {
              title: 'Withdrawals',
              url: '/blockchain/withdrawals',
              icon: Upload,
            },
          ],
        },
      ],
    },
    {
      title: 'Security & Staking',
      items: [
        {
          title: 'Security',
          icon: Shield,
          items: [
            {
              title: 'MPC Keys',
              url: '/security/mpc-keys',
              icon: Key,
            },
            {
              title: 'Policies',
              url: '/security/policies',
              icon: ShieldCheck,
            },
            {
              title: 'Sessions',
              url: '/security/sessions',
              icon: UserCircle,
            },
          ],
        },
        {
          title: 'Staking',
          icon: TrendingUp,
          items: [
            {
              title: 'Pools',
              url: '/staking/pools',
              icon: Layers,
            },
            {
              title: 'Positions',
              url: '/staking/positions',
              icon: Target,
            },
          ],
        },
      ],
    },
    {
      title: 'Governance',
      items: [
        {
          title: 'Governance',
          icon: Vote,
          items: [
            {
              title: 'Proposals',
              url: '/governance/proposals',
              icon: FileText,
            },
            {
              title: 'Delegations',
              url: '/governance/delegations',
              icon: Users,
            },
          ],
        },
      ],
    },
    {
      title: 'Users & Organizations',
      items: [
        {
          title: 'Users',
          url: '/users',
          icon: Users,
        },
        {
          title: 'Organizations',
          url: '/organizations',
          icon: Building2,
        },
      ],
    },
    {
      title: 'Compliance',
      items: [
        {
          title: 'Compliance',
          icon: ShieldCheck,
          items: [
            {
              title: 'Dashboard',
              url: '/compliance',
              icon: LayoutDashboard,
            },
            {
              title: 'KYC Management',
              url: '/compliance/kyc',
              icon: UserCircle,
            },
            {
              title: 'GDPR Requests',
              url: '/compliance/gdpr',
              icon: Shield,
            },
            {
              title: 'SAR/CTR Reports',
              url: '/compliance/sar-ctr',
              icon: FileText,
            },
          ],
        },
      ],
    },
    {
      title: 'Analytics & Insights',
      items: [
        {
          title: 'Analytics',
          icon: BarChart3,
          items: [
            {
              title: 'Dashboard',
              url: '/analytics',
              icon: LayoutDashboard,
            },
            {
              title: 'Financial',
              url: '/analytics/financial',
              icon: CircleDollarSign,
            },
            {
              title: 'User Behavior',
              url: '/analytics/users',
              icon: Activity,
            },
            {
              title: 'Performance',
              url: '/analytics/performance',
              icon: TrendingUp,
            },
            {
              title: 'Risk',
              url: '/analytics/risk',
              icon: AlertTriangle,
            },
            {
              title: 'Real-Time',
              url: '/analytics/real-time',
              icon: Radio,
            },
          ],
        },
        {
          title: 'Audit Logs',
          url: '/audit-logs',
          icon: FileText,
        },
      ],
    },
    {
      title: 'Configuration',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
