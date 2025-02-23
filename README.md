# Next.js + Sanity + Prisma Project

## Prerequisites

- Node.js 20.x
- Yarn (npm and other package managers are not supported)
- PostgreSQL
- Git

## Getting Started

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd <project-directory>

# Install dependencies (must use yarn)
yarn install
```

### 2. Environment Setup

```bash
# Copy the example env file
cp .env.example .env.local

# Update .env.local with your values:
# - DATABASE_URL
# - NEXT_PUBLIC_SANITY_PROJECT_ID
# - NEXT_PUBLIC_SANITY_DATASET
# - SANITY_API_TOKEN
```

### 3. Database Setup

```bash
# Create the database
createdb next_sanity_dev

# Generate Prisma client
yarn prisma:generate

# Run migrations
yarn prisma:migrate

# Seed the database
yarn prisma:seed
```

### 4. Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Workflow

### Git Hooks and Code Quality

This project uses pre-commit hooks to ensure code quality. They are automatically installed when running `yarn install`.

The pre-commit hooks will:

- Format your code with Prettier
- Run ESLint fixes

If hooks aren't running:

```bash
# Make hooks executable
chmod ug+x .husky/*

# Manually run format and lint
yarn format
yarn lint
```

### Commit Messages

We use conventional commits. Your commit message should follow this format:

```
<type>(<scope>): <description>
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

Example:

```
feat(auth): add user authentication
```

### Available Scripts

```bash
# Development
yarn dev                  # Start development server
yarn build               # Build for production
yarn start               # Start production server

# Code Quality
yarn format             # Format code with Prettier
yarn lint               # Run ESLint
yarn typecheck         # Run TypeScript checks

# Database
yarn prisma:generate    # Generate Prisma client
yarn prisma:migrate    # Run database migrations
yarn prisma:seed       # Seed the database

# Sanity CMS
yarn seed:sanity       # Seed Sanity content
```

### Important URLs

- Main site: [http://localhost:3000](http://localhost:3000)
- Sanity Studio: [http://localhost:3000/admin](http://localhost:3000/admin)

## Deployment

The project is set up to deploy on Vercel. Required environment variables:

```bash
# Database
DATABASE_URL=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
```

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Sanity](https://www.sanity.io/) - Headless CMS
- [Prisma](https://www.prisma.io/) - Database ORM
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [Husky](https://typicode.github.io/husky/) - Git hooks

## Notes

- Use `yarn` for all package management commands
- Do not use `npm` or `pnpm` as it will break the lock file
- Always run `yarn typecheck` before committing to ensure type safety
