# Custodial Wallet Admin Panel

Admin panel for the Custodial Wallet system, built with clean architecture principles. Manages users, organizations, wallets, transactions, and provides comprehensive analytics and reporting capabilities.

## Project Status

✅ **Clean Architecture Setup Complete** - November 14, 2024

This project has been restructured to follow clean architecture principles with strict separation of concerns across Core, Infrastructure, and Presentation layers.

## Documentation

- **[Setup Summary](./SETUP_SUMMARY.md)** - Complete overview of setup and changes
- **[Architecture Guide](./ARCHITECTURE.md)** - Clean architecture documentation
- **[Backend API Docs](../ADMIN_PANEL_DOCUMENTATION.md)** - Full API documentation
- **[API Quick Reference](../ADMIN_API_QUICK_REFERENCE.md)** - Quick endpoint reference

## Features

### Current Features
- User Management (list, details, status updates, password reset, delete)
- Dashboard Analytics
- Settings Management
- Light/dark mode
- Responsive design
- Accessible UI components
- Global search command
- RTL support

### Upcoming Features (Roadmap)
- Organizations Management
- Transaction Reports (with CSV export)
- Balance Reports
- Staking Reports
- Governance Reports
- Analytics Dashboard (volume, AUC, TVL, user growth)
- Audit Logs Viewer
- System Health Monitoring

<details>
<summary>Customized Components (click to expand)</summary>

This project uses Shadcn UI components, but some have been slightly modified for better RTL (Right-to-Left) support and other improvements. These customized components differ from the original Shadcn UI versions.

If you want to update components using the Shadcn CLI (e.g., `npx shadcn@latest add <component>`), it's generally safe for non-customized components. For the listed customized ones, you may need to manually merge changes to preserve the project's modifications and avoid overwriting RTL support or other updates.

> If you don't require RTL support, you can safely update the 'RTL Updated Components' via the Shadcn CLI, as these changes are primarily for RTL compatibility. The 'Modified Components' may have other customizations to consider.

### Modified Components

- scroll-area
- sonner
- separator

### RTL Updated Components

- alert-dialog
- calendar
- command
- dialog
- dropdown-menu
- select
- table
- sheet
- sidebar
- switch

**Notes:**

- **Modified Components**: These have general updates, potentially including RTL adjustments.
- **RTL Updated Components**: These have specific changes for RTL language support (e.g., layout, positioning).
- For implementation details, check the source files in `src/components/ui/`.
- All other Shadcn UI components in the project are standard and can be safely updated via the CLI.

</details>

## Tech Stack

**UI:** [ShadcnUI](https://ui.shadcn.com) (TailwindCSS + RadixUI)

**Build Tool:** [Vite](https://vitejs.dev/)

**Routing:** [TanStack Router](https://tanstack.com/router/latest)

**Type Checking:** [TypeScript](https://www.typescriptlang.org/)

**Linting/Formatting:** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

**Icons:** [Lucide Icons](https://lucide.dev/icons/), [Tabler Icons](https://tabler.io/icons) (Brand icons only)

**Authentication:** Custom JWT-based auth (admin role validation)

**State Management:** [Zustand](https://zustand.docs.pmnd.rs/) + [TanStack Query](https://tanstack.com/query/latest)

**HTTP Client:** [Axios](https://axios-http.com/) with interceptors

## Run Locally

### Prerequisites
- Node.js 18+ and npm/pnpm
- Backend API running (see parent directory)

### Setup

1. Install dependencies

```bash
npm install
```

2. Configure environment

```bash
cp .env.example .env
# Update VITE_API_BASE_URL if backend is not on localhost:8080
```

3. Start development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

### Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_APP_NAME=Custodial Wallet Admin
```

## Architecture

This project follows Clean Architecture principles with strict separation of concerns:

```
src/
├── core/                    # Business logic & domain models
│   ├── entities/           # Domain models (TypeScript interfaces)
│   ├── repositories/       # Repository interfaces
│   └── use-cases/          # Business logic (to be implemented)
├── infrastructure/         # External implementations
│   └── api/               # API client & repository implementations
├── features/              # UI features & components
└── routes/                # TanStack Router routes
```

### Key Design Patterns
- Repository Pattern - Abstracts data access
- Dependency Inversion - Core layer has no external dependencies
- Clean Architecture - Clear layer boundaries
- Type Safety - Strict TypeScript, no `any` types

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.

## Usage Example

### Using Repositories with React Query

```typescript
import { useQuery } from '@tanstack/react-query'
import { userRepository } from '@/infrastructure/api'

function UserList() {
  const { data, isLoading } = useQuery({
    queryKey: ['users', { offset: 0, limit: 50 }],
    queryFn: () => userRepository.list({ offset: 0, limit: 50 }),
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {data?.users.map(user => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  )
}
```

## Contributing

This project uses strict TypeScript and follows clean architecture principles. When contributing:

1. Follow the existing architecture patterns
2. Use TypeScript strict mode (no `any` types)
3. Add JSDoc comments to interfaces
4. Write unit tests for new repositories
5. Update documentation as needed

## Credits

UI Template: [Shadcn Admin](https://github.com/satnaing/shadcn-admin) by [@satnaing](https://github.com/satnaing)

## License

Licensed under the [MIT License](https://choosealicense.com/licenses/mit/)
