# Weave CV

A modern resume builder application built with Nuxt 3, Vue 3, and Supabase.

## Features

- 🎨 10 Professional Templates
- 📄 PDF Export
- 🎨 Customizable Design (colors, fonts, layouts)
- ☁️ Cloud Storage

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- Supabase account

### Installation

1. Clone and install dependencies:

```bash
git clone https://github.com/javadag/weave-cv.git
cd weave-cv
pnpm install
```

2. Create `.env` file:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_PROJECT_REF=
```

3. Start development server:

```bash
pnpm dev
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm update-types` - Update Supabase database types

## Tech Stack

- Nuxt 4, Vue 3, TypeScript
- Supabase (Database & Auth)
- Tailwind CSS, Nuxt UI
- TipTap, Pinia, Puppeteer, Zod

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.
