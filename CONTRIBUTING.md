# Contributing to Weave CV

## Getting Started

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit using conventional commits: `git commit -m "feat: add new feature"`
5. Push and open a Pull Request

## Development Setup

```bash
git clone https://github.com/javadag/weave-cv.git
cd weave-cv
pnpm install

# Create .env file
SUPABASE_URL=
SUPABASE_KEY=
SUPABASE_PROJECT_REF=

pnpm dev
```

## Code Standards

- Use TypeScript for all new code
- Use Composition API with `<script setup>`
- Use conventional commits (`feat:`, `fix:`, `docs:`, etc.)

## Pull Requests

- Keep PRs focused and reasonably sized
- Ensure code follows project standards
- Update documentation if needed
- All PRs require review before merging

Thank you for contributing! 🎉
