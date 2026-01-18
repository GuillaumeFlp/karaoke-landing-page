# Story 1.1: Project Setup Astro 5

Status: done

## Story

**As a** développeur,
**I want** un projet Astro 5 configuré avec Tailwind CSS 4 et shadcn/ui,
**So that** je peux commencer le développement avec une base solide et un déploiement fonctionnel.

## Acceptance Criteria

1. **Given** aucun projet n'existe **When** j'exécute la commande d'initialisation Astro 5 **Then** le projet est créé avec la structure de base ✅
2. **Given** le projet est initialisé **When** je vérifie tsconfig.json **Then** TypeScript 5 est configuré en mode strict (`strict: true`) ✅
3. **Given** le projet est initialisé **When** je vérifie les dépendances **Then** Tailwind CSS 4 est installé et fonctionnel avec `globals.css` ✅
4. **Given** Tailwind est configuré **When** je vérifie les composants **Then** shadcn/ui est initialisé avec Button, Card, Input, Accordion dans `src/components/ui/` ✅
5. **Given** shadcn/ui est installé **When** je vérifie tailwind.config.mjs **Then** les design tokens (couleurs primary, fonts) sont configurés ✅
6. **Given** tout est configuré **When** j'exécute `npm run build` **Then** le projet se build sans erreur ✅
7. **Given** le build réussit **When** je push vers le repo **Then** le déploiement Vercel est fonctionnel avec preview deployments ⏳ (requires user action for git/Vercel setup)

## Tasks / Subtasks

- [x] Task 1: Initialiser le projet Astro 5 (AC: 1)
  - [x] 1.1: Exécuter `npm create astro@latest` avec template basics
  - [x] 1.2: Vérifier la structure de base créée (src/, public/, package.json, astro.config.mjs)
  - [x] 1.3: Ajouter React et Tailwind via `npx astro add react tailwind`

- [x] Task 2: Configurer TypeScript strict mode (AC: 2)
  - [x] 2.1: Vérifié tsconfig.json extends `astro/tsconfigs/strict`
  - [x] 2.2: Ajouté les path aliases (@/components/, @/lib/, @/i18n/, etc.)
  - [x] 2.3: Créé src/env.d.ts avec les types d'environnement

- [x] Task 3: Configurer Tailwind CSS 4 (AC: 3)
  - [x] 3.1: Tailwind CSS 4.1.18 installé via @tailwindcss/vite
  - [x] 3.2: Créé src/styles/global.css avec @import "tailwindcss" et @theme
  - [x] 3.3: Configuré design tokens via CSS-first approach (@theme directive)

- [x] Task 4: Installer et configurer shadcn/ui (AC: 4, 5)
  - [x] 4.1: Installé dépendances shadcn/ui manuellement (clsx, tailwind-merge, cva, radix-ui)
  - [x] 4.2: Créé composants: Button, Card, Input, Accordion
  - [x] 4.3: Composants placés dans src/components/ui/
  - [x] 4.4: Créé src/lib/utils.ts avec fonction cn()

- [x] Task 5: Configurer les design tokens (AC: 5)
  - [x] 5.1: Défini palette de couleurs (primary, secondary, accent, muted) dans global.css
  - [x] 5.2: Configuré fonts (Inter, Plus Jakarta Sans)
  - [x] 5.3: Configuré variables CSS pour radius, shadows, animations

- [x] Task 6: Créer les fichiers de configuration (AC: 6)
  - [x] 6.1: Créé .env.example avec variables documentées
  - [x] 6.2: Créé .prettierrc avec plugins Astro et Tailwind
  - [x] 6.3: Créé eslint.config.js pour Astro + TypeScript (ESLint 9 flat config)
  - [x] 6.4: Mis à jour .gitignore avec .env.local

- [x] Task 7: Valider le build et préparer Vercel (AC: 6, 7)
  - [x] 7.1: `npm run build` exécuté avec succès (2 pages built in 1.11s)
  - [x] 7.2: Créé vercel.json avec configuration Astro
  - [ ] 7.3: Initialiser le repo git et push vers GitHub (requires user action)
  - [ ] 7.4: Connecter à Vercel et vérifier le déploiement preview (requires user action)

## Dev Notes

### Architecture Requirements

**Framework & Stack (from architecture.md):**
- **Astro 5** avec template "one" (shadcn/ui intégré)
- **TypeScript 5** en mode strict obligatoire
- **Tailwind CSS 4** avec plugin Prettier pour l'ordre des classes
- **React 19** pour les islands interactifs (shadcn/ui)
- **Node.js 20+** LTS requis

**Initialization Command:**
```bash
npm create astro@latest karaoke-landing -- --template one
cd karaoke-landing
npm install
```

### Project Structure Notes

**Structure cible après cette story:**
```
karaoke-landing/
├── README.md
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── .env.example
├── .gitignore
├── .prettierrc
├── .eslintrc.cjs
├── vercel.json
│
├── public/
│   └── favicon.svg
│
└── src/
    ├── env.d.ts
    ├── components/
    │   └── ui/
    │       ├── Button.tsx
    │       ├── Card.tsx
    │       ├── Input.tsx
    │       ├── Accordion.tsx
    │       └── index.ts
    ├── lib/
    │   └── utils.ts          # cn() function
    ├── styles/
    │   └── globals.css
    └── pages/
        └── index.astro       # Placeholder
```

### Technical Specifications

**tsconfig.json required settings:**
```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/i18n/*": ["./src/i18n/*"]
    }
  }
}
```

**tailwind.config.mjs design tokens:**
```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          // ... full scale
        },
        secondary: { /* ... */ },
        accent: { /* ... */ },
        muted: { /* ... */ }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif']
      }
    }
  }
}
```

**Environment variables (.env.example):**
```
# Catalogue API
CATALOGUE_API_URL=https://api.example.com/catalogue

# Backend API
BACKEND_API_URL=https://api.example.com

# Analytics
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

### Critical Rules (from project-context.md)

**DO:**
- Use `strict: true` in TypeScript - NO exceptions
- Use path aliases: `@/components/`, `@/lib/`
- Use PascalCase for component files
- Install Prettier plugin for Tailwind class ordering

**DON'T:**
- Never use `any` type
- Never skip TypeScript strict mode
- Never hardcode colors (use Tailwind tokens)

### Dependencies to Install

**Core (included in template one):**
- astro@^5.0.0
- typescript@^5.0.0
- @astrojs/tailwind
- @astrojs/react
- tailwindcss@^4.0.0
- react@^19.0.0
- react-dom@^19.0.0

**shadcn/ui (after init):**
- class-variance-authority
- clsx
- tailwind-merge
- lucide-react (icons)
- @radix-ui/react-accordion
- @radix-ui/react-slot

**Dev dependencies:**
- prettier
- prettier-plugin-tailwindcss
- eslint
- @typescript-eslint/parser
- eslint-plugin-astro

### References

- [Source: architecture.md#Starter-Template-Evaluation] - Astro 5 selection rationale
- [Source: architecture.md#Implementation-Patterns] - Naming conventions
- [Source: architecture.md#Project-Structure] - Complete directory structure
- [Source: project-context.md#Critical-Implementation-Rules] - TypeScript and Astro rules
- [Source: prd.md#Technical-Requirements] - Browser support and performance targets

### Testing Requirements

**Validation Criteria:**
1. `npm run build` completes without errors
2. `npm run dev` starts dev server successfully
3. TypeScript compilation succeeds with no errors
4. shadcn/ui components render correctly
5. Tailwind classes apply correctly
6. Vercel deployment preview works

**No automated tests required for this story** - project setup validation is manual.

### Potential Blockers

- Node.js version < 20 installed locally
- npm registry issues
- Vercel account not configured
- GitHub repo not created

### External Dependencies

- npm registry (npmjs.com)
- Vercel platform (vercel.com)
- GitHub (github.com)

---

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build output: 2 pages built in 1.11s
- Minor CSS warning about 'file' property (non-critical, from Tailwind utility classes)

### Completion Notes List

1. **Astro 5.16.11** initialized with basics template, then React and Tailwind added via `astro add`
2. **TypeScript** strict mode enabled via `astro/tsconfigs/strict` extension
3. **Tailwind CSS 4.1.18** configured using CSS-first approach with `@theme` directive
4. **shadcn/ui** components created manually (Button, Card, Input, Accordion) following the official patterns
5. **Design tokens** implemented in `global.css` using CSS custom properties within `@theme`
6. **ESLint 9** configured with flat config format (`eslint.config.js`)
7. **Prettier** configured with Astro and Tailwind plugins
8. **Build validation** passed - output directory: `dist/`
9. **Git/Vercel setup** pending user action (requires credentials)

### File List

**Created:**
- `package.json` - Updated with project name and scripts
- `tsconfig.json` - Updated with path aliases
- `astro.config.mjs` - Configured with React and Tailwind
- `src/env.d.ts` - Environment variable types
- `src/styles/global.css` - Tailwind config with design tokens
- `src/lib/utils.ts` - cn() utility function
- `src/components/ui/Button.tsx` - Button component
- `src/components/ui/Card.tsx` - Card component
- `src/components/ui/Input.tsx` - Input component
- `src/components/ui/Accordion.tsx` - Accordion component
- `src/components/ui/index.ts` - Barrel export
- `src/layouts/Layout.astro` - Updated with global.css import
- `src/pages/index.astro` - Updated with test content
- `.env.example` - Environment variables template
- `.prettierrc` - Prettier configuration
- `eslint.config.js` - ESLint flat config
- `vercel.json` - Vercel deployment config

**Modified:**
- `.gitignore` - Added .env.local

**Directories Created:**
- `src/lib/`
- `src/components/ui/`
- `src/components/sections/`
- `src/components/layout/`
- `src/components/shared/`
- `src/i18n/`
- `src/types/`
- `src/data/`

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-18 | Story created with comprehensive context | create-story workflow |
| 2026-01-18 | Implementation completed - all ACs satisfied except git/Vercel (user action) | dev-story workflow |
| 2026-01-18 | Code review fixes applied: accordion keyframes, i18n config, fonts, semantic HTML, viewport meta, React hooks ESLint, .prettierignore | code-review workflow |
