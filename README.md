# Irish Bills Explorer

A modern React application for browsing and managing Irish legislation bills. Built with Next.js, TypeScript, and Material-UI, featuring advanced table functionality, skeleton loading, and favourites management.

## 🌟 Features

- **📊 Interactive Bills Table**: Browse Irish legislation with pagination and filtering
- **⭐ Favourites System**: Save and manage your favourite bills during your session
- **🔍 Advanced Filtering**: Filter bills by source (Government, Private, Public)
- **📱 Responsive Design**: Optimized for desktop and mobile devices
- **⚡ Skeleton Loading**: Professional loading states with instant feedback
- **🎨 Material Design**: Clean, modern UI using Material-UI components

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd capaciteam-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
capaciteam-test/
├── app/                         # Next.js App Router
│   ├── api/bills/               # API routes for bill data
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                  # React components
│   ├── BillTable.tsx            # Main tabs & filter layout wrapper
│   ├── BillTableWithData.tsx    # Data-fetching wrapper for API integration
│   ├── BillTableCore.tsx        # Unified table component (headers, body, pagination)
│   ├── BillTableRow.tsx         # Individual table row renderer
│   ├── BillTableSkeleton.tsx    # Loading skeleton for table rows
│   ├── BillModal.tsx            # Bill details modal (English/Gaeilge tabs)
│   ├── Filter.tsx               # Bill source filtering dropdown
│   ├── FavouriteBillsTab.tsx    # Favourites tab content manager
│   └── ThemeRegistry.tsx        # MUI theme provider with SSR support
├── contexts/                    # React Context providers
│   └── FavouritesContext.tsx    # Favourites state management
├── hooks/                       # Custom React hooks
│   ├── useBills.ts              # Data fetching hook
│   └── useFavourites.ts         # Favourites management hook
├── types/                       # TypeScript type definitions
│   └── bill.ts                  # Bill-related types
├── utils/                       # Utility functions
│   └── api.ts                   # API helper functions
├── __tests__/                   # Test files
├── public/                      # Static assets
├── jest.config.js               # Jest testing configuration
├── jest.setup.ts                # Jest setup file
├── tsconfig.json                # TypeScript configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies and scripts
└── eslint.config.mjs            # ESLint configuration
```

## 🔧 Key Components

### BillTableCore ⭐ 
**Unified table component** - the heart of the table system:
- **Single source of truth** for column styling (`COLUMN_STYLES`, `ROW_COLUMN_STYLES`)
- Handles table headers, body, pagination, and modal interactions
- **Centralized responsive design** - mobile/desktop column width management
- Reusable across different contexts (main bills, favourites)
- **DRY principle** - eliminates styling duplication

### BillTable
Main presentation component for displaying bills data with:
- Pagination controls
- Favourites integration
- Skeleton loading states
- Responsive column layout

### FavouritesContext
Manages global favourites state by integrating with the useFavourites hook:
- Wraps the useFavourites hook for global state
- Stores full Bill objects for easy access
- Session-based storage
- Real-time updates across components

### useBills Hook
Custom hook for data fetching:
- API integration
- Loading states
- Error handling
- URL parameter synchronization

### useFavourites Hook
Core favourites logic hook:
- Lightweight favourites state management
- ID-based storage for performance
- Add/remove favourites functionality
- Used by FavouritesContext for global state

### useFavouritesContext
Context accessor for global favourites state:
- Provides enhanced favourites functionality
- Must be used within FavouritesProvider
- Integrates hook logic with full Bill storage

## 🎨 UI Features

### Skeleton Loading
Professional loading states that:
- Match exact table dimensions
- Show during all data fetching
- Provide instant user feedback
- Maintain layout stability

### Responsive Design
- Adaptive column widths
- Mobile-optimized layout
- Touch-friendly interactions
- Consistent spacing

## 🔌 API Integration

The app integrates with the Oireachtas API:
- **Endpoint**: `https://api.oireachtas.ie/v1/legislation`
- **Features**: Pagination, filtering, real-time data
- **Caching**: Client-side request optimization

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

## 🏗️ Build

### Build for production
```bash
npm run build
npm start
```

## 🛠️ Development

### Adding New Features
1. Create components in `/components`
2. Add types in `/types`
3. Update tests in `/__tests__`
4. Follow existing patterns for consistency

### Code Style
- TypeScript for type safety
- Material-UI for consistent design
- Functional components with hooks
- Custom hooks for reusable logic

## 🔗 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/)
- [Oireachtas API Documentation](https://api.oireachtas.ie/)
