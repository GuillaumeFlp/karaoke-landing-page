---
project_name: 'karaoke-landing-page'
user_name: 'Guillaume'
date: '2026-01-18'
sections_completed: ['technology_stack', 'astro_rules', 'typescript_rules', 'component_rules', 'i18n_rules', 'form_rules', 'critical_rules']
existing_patterns_found: 22
source_document: '_bmad-output/planning-artifacts/architecture.md'
status: 'complete'
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

| Technology | Version | Purpose |
|------------|---------|---------|
| **Astro** | 5.x | Framework SSG |
| **TypeScript** | 5.x | Language (strict mode) |
| **Tailwind CSS** | 4.x | Styling |
| **shadcn/ui** | Latest | UI components |
| **React** | 19.x | Interactive islands |
| **Node.js** | 20+ LTS | Runtime |
| **Fuse.js** | Latest | Client-side search |
| **vanilla-cookieconsent** | Latest | GDPR compliance |

**Version Constraints:**

- Node.js 20+ required for Astro 5
- React 19 required for shadcn/ui latest
- Tailwind 4 uses new CSS-first configuration

---

## Critical Implementation Rules

### Astro-Specific Rules

**Client Directives:**

- Use `client:load` for components that MUST hydrate immediately (forms, search)
- Use `client:visible` for below-fold interactive components
- Use `client:idle` for non-critical interactivity
- NEVER use `client:only` unless absolutely necessary (breaks SSG)

**Component File Types:**

- `.astro` for static content, layout, sections (SSG, zero JS)
- `.tsx` for interactive components requiring React (hydrates to JS)
- NEVER mix - one component = one responsibility

**Frontmatter Rules:**

- All data fetching in frontmatter (build-time)
- Props typing with `Astro.props` interface
- NO async operations outside frontmatter

**i18n Routing:**

- Pages in `/pages/{locale}/` (fr, en, es)
- Use `Astro.currentLocale` for current language
- Use `getRelativeLocaleUrl()` for locale-aware links

---

### TypeScript Rules

**Strict Mode Enforcement:**

- `strict: true` in tsconfig.json - NO exceptions
- NO `any` type - use `unknown` if type is truly unknown
- All function parameters and returns MUST be typed
- Prefer interfaces over types for object shapes

**Import Conventions:**

- Use path aliases: `@/components/`, `@/lib/`, `@/i18n/`
- Group imports: external → internal → relative
- NO default exports for utilities (named exports only)
- Components MAY use default exports

**Type Location:**

- Shared types in `src/types/`
- Component-specific types co-located in component file
- Export all shared types from `src/types/index.ts`

---

### Component & Styling Rules

**File Naming:**

| Type | Convention | Example |
|------|------------|---------|
| Astro Components | PascalCase | `HeroSection.astro` |
| React Components | PascalCase | `CatalogueSearch.tsx` |
| Utilities | kebab-case | `get-locale.ts` |
| Data files | kebab-case | `catalogue-data.json` |

**Tailwind Class Order (enforced by Prettier):**

Position → Display → Sizing → Spacing → Typography → Colors → Effects

```tsx
// ✅ Correct
<div className="relative flex w-full px-4 text-lg text-white bg-primary-500 rounded-lg">

// ❌ Wrong (random order)
<div className="bg-primary-500 flex px-4 relative text-lg w-full">
```

**shadcn/ui Usage:**

- Copy components to `src/components/ui/`
- Customize via Tailwind classes, NOT component internals
- Use `cn()` utility for conditional classes

---

### i18n Rules

**Key Format:** Dot notation with hierarchy

```typescript
// ✅ Correct
hero.title
hero.cta.primary
pricing.plans.soiree.name

// ❌ Wrong
hero_title
heroCtaPrimary
HERO_CTA_PRIMARY
```

**Translation Files:**

- One file per locale: `fr.ts`, `en.ts`, `es.ts`
- Same structure across all locales
- Export as typed object for autocomplete

**Usage in Components:**

```astro
---
// In .astro frontmatter
import { useTranslations } from '@/i18n';
const t = useTranslations(Astro.currentLocale);
---

<h1>{t('hero.title')}</h1>
```

```tsx
// In .tsx (React) - receive locale as prop
interface Props {
  locale: string;
}

export function Component({ locale }: Props) {
  const t = useTranslations(locale);
  return <h1>{t('hero.title')}</h1>;
}
```

---

### Form Handling Rules

**State Management:** Always use FormStatus enum

```typescript
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormState {
  status: FormStatus;
  error: string | null;
}

// ✅ Correct
const [formState, setFormState] = useState<FormState>({
  status: 'idle',
  error: null
});

// ❌ Wrong
const [isLoading, setIsLoading] = useState(false);
```

**Error Handling Pattern:**

```typescript
async function handleSubmit(data: FormData) {
  setFormState({ status: 'submitting', error: null });

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error('Request failed');

    setFormState({ status: 'success', error: null });
  } catch (e) {
    setFormState({
      status: 'error',
      error: e instanceof Error ? e.message : 'Unknown error'
    });
  }
}
```

**Form Requirements:**

- POST to backend API endpoints (`/api/newsletter`, `/api/contact`)
- Include honeypot field for spam prevention
- Show success/error states clearly with appropriate UI

---

### Critical Don't-Miss Rules

**Performance:**

- NEVER import React in `.astro` files (breaks zero-JS benefit)
- NEVER use `client:load` for static content
- Images MUST use WebP/AVIF format
- Video MUST be < 2MB with poster image fallback
- Use `loading="lazy"` for below-fold images

**Accessibility (WCAG AA):**

- ALL interactive elements MUST have visible focus states (2px ring)
- ALL images MUST have alt text (or `aria-hidden="true"` if decorative)
- Form inputs MUST have associated `<label>` elements
- Use semantic HTML (`nav`, `main`, `section`, `article`, `aside`)
- Buttons MUST have accessible names
- Support `prefers-reduced-motion` media query

**SEO:**

- EVERY page MUST have unique `<title>` and `<meta name="description">`
- Structured data (JSON-LD) for Organization, Product, FAQ in Layout
- hreflang tags for all locales (fr, en, es)
- Sitemap generated at build time
- Canonical URLs on all pages

**Security:**

- NO secrets in client-side code
- Environment variables via `import.meta.env.PUBLIC_*` for client, `import.meta.env.*` for server
- CookieConsent MUST be configured BEFORE GA4 loads
- Form data validated server-side (backend API responsibility)
- HTTPS enforced (Vercel default)

**Anti-Patterns to AVOID:**

| Don't | Do Instead |
|-------|------------|
| ❌ Using `any` type | ✅ Use proper types or `unknown` |
| ❌ Inline styles | ✅ Use Tailwind classes |
| ❌ Direct DOM manipulation | ✅ Use React state/refs |
| ❌ Hardcoded text | ✅ Use i18n translations |
| ❌ Non-responsive components | ✅ Mobile-first with breakpoints |
| ❌ Missing loading states | ✅ FormStatus enum pattern |
| ❌ Boolean loading state | ✅ Status enum ('idle'|'submitting'|'success'|'error') |
| ❌ Random Tailwind class order | ✅ Logical order (Prettier enforces) |

---

## Project Structure Reference

```
src/
├── components/
│   ├── ui/           # shadcn/ui (Button, Card, Input, Accordion)
│   ├── sections/     # Landing sections (.astro)
│   ├── layout/       # Header, Footer, Container (.astro)
│   └── shared/       # Interactive React (.tsx)
├── pages/
│   ├── fr/           # French routes
│   ├── en/           # English routes
│   └── es/           # Spanish routes
├── i18n/             # Translations (fr.ts, en.ts, es.ts)
├── data/             # Static data (catalogue, testimonials, pricing)
├── lib/              # Utilities (analytics, cookie-consent, cn)
├── types/            # TypeScript types
├── layouts/          # Layout.astro
└── styles/           # globals.css (Tailwind)
```

---

## Quick Reference

**Start new component:**

1. Decide: Static (`.astro`) or Interactive (`.tsx`)?
2. Place in correct folder (`sections/`, `shared/`, `ui/`)
3. Use PascalCase filename
4. Add i18n support from start
5. Mobile-first responsive design

**Add new translation:**

1. Add key in `fr.ts` first (default locale)
2. Copy structure to `en.ts` and `es.ts`
3. Use dot notation: `section.element.variant`

**Create form:**

1. Use FormStatus enum for state
2. Add honeypot field
3. POST to backend API
4. Handle all states (idle, submitting, success, error)
5. Add accessible labels and error messages

---

_Generated from architecture.md on 2026-01-18_

