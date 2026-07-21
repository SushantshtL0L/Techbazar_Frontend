# TechBazar — Frontend

TechBazar is Nepal's premier marketplace for new PCs, used laptops, and refurbished computers. This repository contains the Next.js frontend application.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State**: React Context (Auth, Cart, Wishlist, Theme)
- **HTTP Client**: Axios
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: React Icons

## Getting Started

### Prerequisites
- Node.js v18+
- Backend API running at `http://localhost:5050`

### Setup

```bash
# Install dependencies
npm install
```

### Running the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
app/
├── (auth)/          # Login, Register pages
├── (public)/        # Public-facing pages (Home, Products, Checkout)
│   ├── page.tsx     # Homepage
│   ├── products/    # Product listing & detail
│   ├── used-phones/ # Used Laptops page
│   ├── redmi/       # Dell Laptops brand page
│   ├── samsung/     # HP Laptops brand page
│   ├── checkout/    # Checkout flow
│   └── blogs/       # Blog listing & detail
├── dashboard/       # Authenticated user dashboard
├── admin/           # Admin panel
└── profile/         # User profile management

context/             # Auth, Cart, Wishlist, Theme providers
lib/                 # API helper functions
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, categories, featured listings |
| `/products` | Product listing with filters |
| `/products/:id` | Product detail page |
| `/used-phones` | Used laptops listing |
| `/redmi` | Dell laptops brand page |
| `/samsung` | HP laptops brand page |
| `/checkout` | Checkout flow |
| `/dashboard` | User dashboard |
| `/admin` | Admin panel |
| `/blogs` | Blog posts |
| `/login` | Login page |
| `/register` | Register page |

## Running Tests

```bash
npm run test
```

## License

Private — TechBazar &copy; 2024
