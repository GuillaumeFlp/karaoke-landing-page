---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
  - '_bmad-output/analysis/brainstorming-session-2026-01-17.md'
workflowType: 'architecture'
project_name: 'karaoke-landing-page'
user_name: 'Guillaume'
date: '2026-01-18'
lastStep: 8
status: 'complete'
completedAt: '2026-01-18'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

---

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

62 exigences fonctionnelles couvrant 12 domaines. Les complexités architecturales majeures sont :

| Domaine | FRs | Complexité |
|---------|-----|------------|
| Navigation & Structure | FR1-FR4 | Faible |
| Hero Section | FR5-FR9 | Moyenne |
| Proposition de Valeur | FR10-FR11 | Faible |
| Catalogue Preview | FR12-FR21 | **Élevée** |
| Social Proof | FR22-FR24 | Faible |
| Pricing | FR25-FR28 | Faible |
| FAQ | FR29-FR31 | Faible |
| Conversion | FR32-FR34 | Faible |
| Newsletter | FR35-FR38 | Moyenne |
| Internationalisation | FR39-FR47 | **Élevée** |
| Contact & RDV | FR48-FR62 | Moyenne |

**Points de complexité architecturale :**
- **Catalogue Preview (FR12-FR21)** : Recherche temps réel avec filtres multiples, nécessite intégration API avec fallback statique
- **Internationalisation (FR39-FR47)** : 3 langues (FR/EN/ES) avec URLs localisées, SEO multi-langue, hreflang

**Non-Functional Requirements:**

| NFR | Cible | Impact Architectural |
|-----|-------|---------------------|
| Performance | LCP < 2.5s, PageSpeed Mobile > 90, TTI < 3s | SSG obligatoire, optimisation assets |
| SEO | Top 10 en 3 mois | Structured data (Organization, Product, FAQ), sitemap multi-langue |
| Accessibilité | WCAG AA | Contraste 4.5:1, navigation clavier, ARIA |
| Sécurité | HTTPS TLS 1.2+, GDPR | Consentement cookies, newsletter opt-in |
| Browser Support | Chrome/Firefox/Safari/Edge (2 dernières) | Pas de polyfills IE11 |

**Scale & Complexity:**

- **Primary domain:** Web Frontend (Landing Page MPA)
- **Complexity level:** Low-Medium
- **Estimated architectural components:** 12-15 (6 custom + shadcn/ui base)
- **Pages MVP:** 2 (Landing + Contact) × 3 langues = 6 routes

### Technical Constraints & Dependencies

| Dependency | Type | Criticality | Fallback |
|------------|------|-------------|----------|
| App SPA existante | External redirect | Critical | N/A (externe) |
| API Catalogue | REST read-only | High | Données statiques JSON |
| Calendly/Cal.com | Embed iframe | Medium | Formulaire contact seul |
| Email marketing API | Integration | Medium | Stockage local + export |
| GA4 + Search Console | Analytics | Medium | N/A |

### Cross-Cutting Concerns Identified

| Concern | Components Affected | Strategy |
|---------|---------------------|----------|
| **Internationalization (i18n)** | All content, routing, SEO | Framework i18n natif, URLs localisées /fr/, /en/, /es/ |
| **SEO Optimization** | All pages | SSG, semantic HTML, structured data JSON-LD |
| **Accessibility (a11y)** | All interactive components | shadcn/ui WCAG AA, audit Lighthouse ≥ 90 |
| **Performance** | Hero, Catalogue, Images | Lazy loading, WebP/AVIF, critical CSS inline |
| **Analytics** | All CTAs, forms | GA4 event tracking, conversion goals |

### UX-Driven Architectural Requirements

**From UX Design Specification:**

| UX Decision | Architectural Implication |
|-------------|---------------------------|
| Direction "Playful Balance" | Light mode default, CSS variables for theming |
| Tailwind + shadcn/ui | Copy-paste components, tree-shaking CSS |
| Mobile-first | Responsive breakpoints sm/md/lg/xl/2xl |
| SongTicker infini | CSS animation, pause on hover, reduced-motion fallback |
| CatalogueSearch instant | API integration, 200ms debounce, skeleton loading |
| 4 personas × 4 temps conversion | Multiple CTA placements, flexible scroll paths |

**Custom Components Required (6):**

1. `SongTicker` — Infinite horizontal scroll animation
2. `CatalogueSearch` — Autocomplete with combobox ARIA
3. `TestimonialCard` — Visual segment badge
4. `PricingCard` — Recommended offer highlight
5. `SectionWrapper` — Reusable container with variants
6. `LanguageSwitcher` — Dropdown/segmented control

---

## Starter Template Evaluation

### Primary Technology Domain

Web Frontend Static/SSG — Landing page multi-langue optimisée SEO et performance

### Starter Options Considered

| Option | Description | Évaluation |
|--------|-------------|------------|
| Next.js 16 + shadcn/ui | Framework React full-featured | Bon mais surdimensionné |
| **Astro 5 + shadcn/ui** | Framework content-first | **Optimal** |
| HTML statique | Sans framework | Insuffisant (i18n, composants) |

### Selected Starter: Astro 5

**Rationale for Selection:**

| Critère | Justification |
|---------|---------------|
| i18n natif | Routing multi-langue intégré, aligné avec FR39-FR47 |
| Performance | Zero JS par défaut = Core Web Vitals excellents (LCP < 2.5s) |
| shadcn/ui | Disponible via template ONE |
| Complexité | Minimale pour scope landing page |
| SEO | PageSpeed 100 out of the box |

**Initialization Command:**

```bash
npm create astro@latest karaoke-landing -- --template one
cd karaoke-landing
npm install
```

### Architectural Decisions Provided by Starter

**Language & Runtime:**

| Aspect | Choix |
|--------|-------|
| Language | TypeScript 5 (strict mode) |
| Runtime | Node.js 20+ LTS |
| Build | Vite |

**Styling Solution:**

| Aspect | Choix |
|--------|-------|
| CSS Framework | Tailwind CSS 4 |
| Components | shadcn/ui (React islands) |
| Design Tokens | CSS custom properties |

**Build & Output:**

| Aspect | Choix |
|--------|-------|
| Build Tool | Vite |
| Output | Static HTML/CSS/JS |
| Optimization | Automatic asset optimization |

**i18n Configuration:**

| Aspect | Choix |
|--------|-------|
| Routing | Native Astro i18n |
| URL Structure | /fr/, /en/, /es/ |
| Default Locale | fr (France marché principal) |

**Code Organization:**

```
src/
├── pages/
│   ├── fr/           # Routes françaises
│   ├── en/           # Routes anglaises
│   └── es/           # Routes espagnoles
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── sections/     # Landing sections
│   └── layout/       # Header, Footer
├── layouts/
│   └── Layout.astro  # Layout principal
├── i18n/
│   ├── ui.ts         # Traductions UI
│   └── utils.ts      # Helpers i18n
└── styles/
    └── globals.css   # Tailwind + custom
```

**Development Experience:**

| Feature | Support |
|---------|---------|
| Hot Reload | Instantané (Vite) |
| TypeScript | Full autocompletion |
| Linting | ESLint + Prettier |
| Testing | Vitest ready |

**Note:** L'initialisation du projet avec ce starter sera la première story d'implémentation.

---

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**

- API Catalogue strategy → Build-time fetch + client search
- i18n routing configuration → Astro native /fr/, /en/, /es/
- Hosting platform → Vercel

**Important Decisions (Shape Architecture):**

- Form handling → Backend SPA API
- Analytics → GA4 with consent mode
- GDPR compliance → CookieConsent library

**Deferred Decisions (Post-MVP):**

- API proxy migration (si catalogue > 10k titres)
- A/B testing infrastructure
- Advanced caching strategies
- Marketing cookies integration

### Integrations & APIs

| Integration | Decision | Implementation |
|-------------|----------|----------------|
| **API Catalogue** | Build-time fetch + client-side search | Fetch au build → JSON statique → Fuse.js search |
| **Newsletter** | POST vers backend SPA existant | Formulaire → API `/api/newsletter` |
| **Formulaires Contact** | POST vers backend SPA existant | Formulaire → API `/api/contact` |
| **Calendly/Cal.com** | Embed iframe | Widget standard, pas de custom |

**Catalogue Search Implementation:**

```typescript
// Build-time: fetch catalogue data
// src/data/catalogue.ts
export async function getCatalogueData() {
  const response = await fetch(process.env.CATALOGUE_API_URL);
  return response.json();
}

// Client-side: Fuse.js search
// src/components/CatalogueSearch.tsx
import Fuse from 'fuse.js';

const fuse = new Fuse(catalogueData, {
  keys: ['title', 'artist'],
  threshold: 0.3,
});
```

**API Endpoints Required (Backend SPA):**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/newsletter` | POST | Newsletter subscription |
| `/api/contact` | POST | Contact form submission |
| `/api/callback` | POST | Callback request |

### Analytics & Tracking

| Aspect | Decision | Configuration |
|--------|----------|---------------|
| **Primary Analytics** | Google Analytics 4 | gtag.js avec consent mode |
| **Search Console** | Google Search Console | Verification via DNS/meta tag |
| **Event Tracking** | GA4 Events | CTA clicks, form submissions, scroll depth |

**Events à Tracker:**

| Event | Trigger | Parameters |
|-------|---------|------------|
| `cta_click` | Clic CTA principal | `cta_location`, `cta_text` |
| `search_catalogue` | Recherche catalogue | `search_term`, `results_count` |
| `form_submit` | Soumission formulaire | `form_type` (newsletter/contact) |
| `pricing_view` | Scroll to pricing | `visible_plan` |
| `language_switch` | Changement langue | `from_locale`, `to_locale` |

### Infrastructure & Deployment

| Aspect | Decision | Details |
|--------|----------|---------|
| **Hosting** | Vercel | Free tier, edge CDN, preview deploys |
| **CI/CD** | Vercel Git Integration | Push to main → auto deploy |
| **Preview** | Vercel Preview Deployments | PR → preview URL auto |
| **Domain** | Custom domain via Vercel | DNS configuration |

**Vercel Configuration:**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

**Environment Variables:**

| Variable | Purpose | Where |
|----------|---------|-------|
| `CATALOGUE_API_URL` | API catalogue endpoint | Vercel env |
| `BACKEND_API_URL` | Backend SPA base URL | Vercel env |
| `GA_MEASUREMENT_ID` | Google Analytics ID | Vercel env |

### Security & GDPR

| Aspect | Decision | Implementation |
|--------|----------|----------------|
| **Cookie Consent** | CookieConsent by Orestbida | Bannière GDPR-compliant |
| **HTTPS** | Vercel default | TLS 1.3 automatique |
| **Form Security** | Honeypot + rate limiting | Anti-spam sans CAPTCHA visible |

**Cookie Categories:**

| Category | Cookies | Consent Required |
|----------|---------|------------------|
| **Necessary** | Language preference | Non |
| **Analytics** | GA4 (_ga, _gid) | Oui |
| **Marketing** | None (MVP) | N/A |

**CookieConsent Configuration:**

```javascript
CookieConsent.run({
  categories: {
    necessary: { enabled: true, readOnly: true },
    analytics: {}
  },
  language: {
    default: 'fr',
    translations: { fr, en, es }
  },
  guiOptions: {
    consentModal: { layout: 'box' }
  }
});
```

### Decision Impact Analysis

**Implementation Sequence:**

1. Project init (Astro 5 + shadcn/ui)
2. i18n configuration (3 locales)
3. Layout & base components
4. Catalogue data integration (build-time)
5. CookieConsent + GA4 setup
6. Form integrations (backend API)
7. Vercel deployment

**Cross-Component Dependencies:**

| Source | Depends On | Reason |
|--------|------------|--------|
| All Pages | i18n Config | Routing and translations |
| CatalogueSearch | Catalogue Data | Search functionality |
| SongTicker | Catalogue Data | Display song list |
| GA4 | CookieConsent | Consent-gated tracking |
| Newsletter Form | Backend API | Data submission |
| Contact Form | Backend API | Data submission |

---

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Addressed:** 10 areas where AI agents could make different choices

### Naming Patterns

#### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Astro Components | PascalCase | `HeroSection.astro` |
| React Components | PascalCase | `CatalogueSearch.tsx` |
| Utility files | kebab-case | `get-locale.ts` |
| Page files | kebab-case | `index.astro`, `contact.astro` |
| Config files | kebab-case | `astro.config.mjs` |
| Data files | kebab-case | `catalogue-data.json` |

#### i18n Key Conventions

**Format:** Dot notation with hierarchical structure

```typescript
// ✅ Correct
{
  hero: {
    title: "Chantez. Jouez. Vibrez.",
    cta: {
      primary: "Essayer gratuitement",
      secondary: "Voir les offres"
    }
  },
  pricing: {
    plans: {
      soiree: { name: "Soirée", price: "5€" }
    }
  }
}

// ❌ Incorrect
{
  hero_title: "...",
  heroCtaPrimary: "...",
  HERO_CTA_PRIMARY: "..."
}
```

#### Code Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Variables | camelCase | `const userId = ...` |
| Functions | camelCase | `function getUserData()` |
| Constants | SCREAMING_SNAKE | `const API_BASE_URL = ...` |
| Types/Interfaces | PascalCase | `interface UserData` |
| Enums | PascalCase | `enum FormStatus` |
| React Hooks | camelCase with use | `useLocale()` |

### Structure Patterns

#### Component Organization

```
src/components/
├── ui/                    # shadcn/ui base components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── Accordion.tsx
├── sections/              # Landing page sections
│   ├── HeroSection.astro
│   ├── PricingSection.astro
│   ├── FAQSection.astro
│   └── CatalogueSection.astro
├── layout/                # Layout components
│   ├── Header.astro
│   ├── Footer.astro
│   └── Container.astro
└── shared/                # Shared interactive components
    ├── LanguageSwitcher.tsx
    ├── CatalogueSearch.tsx
    ├── SongTicker.tsx
    └── NewsletterForm.tsx
```

#### Test Organization

**Convention:** Co-located tests

```
src/components/shared/
├── CatalogueSearch.tsx
├── CatalogueSearch.test.tsx    # Test next to component
└── CatalogueSearch.stories.tsx # Story if Storybook (optional)
```

#### Page Organization

```
src/pages/
├── fr/
│   ├── index.astro        # Landing FR
│   └── contact.astro      # Contact FR
├── en/
│   ├── index.astro        # Landing EN
│   └── contact.astro      # Contact EN
└── es/
    ├── index.astro        # Landing ES
    └── contact.astro      # Contact ES
```

### Format Patterns

#### Tailwind Class Order

**Convention:** Logical ordering with Prettier plugin enforcement

```bash
npm install -D prettier-plugin-tailwindcss
```

**Order:** Position → Display → Sizing → Spacing → Typography → Colors → Effects

```tsx
// ✅ Correct order
<button className="
  relative
  flex items-center
  w-full h-12
  px-6 py-3
  text-lg font-bold
  text-white bg-primary-500
  rounded-lg shadow-md hover:bg-primary-600
">
```

#### Data Format Conventions

| Aspect | Convention | Example |
|--------|------------|---------|
| JSON fields | camelCase | `{ songTitle, artistName }` |
| API responses | camelCase | `{ data: {...}, error: null }` |
| Dates | ISO 8601 string | `"2026-01-18T15:30:00Z"` |
| Booleans | true/false | `{ isActive: true }` |
| Null handling | Explicit null | `{ value: null }` not `{}` |

### Process Patterns

#### Form State Management

**Convention:** Status enum for comprehensive state handling

```typescript
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormState {
  status: FormStatus;
  error: string | null;
}

const [formState, setFormState] = useState<FormState>({
  status: 'idle',
  error: null
});
```

#### Error Handling Pattern

```typescript
async function handleSubmit(data: FormData) {
  setFormState({ status: 'submitting', error: null });

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi');
    }

    setFormState({ status: 'success', error: null });
  } catch (error) {
    setFormState({
      status: 'error',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
}
```

#### Loading UI Pattern

```tsx
{formState.status === 'submitting' && <Spinner />}
{formState.status === 'success' && <SuccessMessage />}
{formState.status === 'error' && <ErrorMessage message={formState.error} />}
```

### Enforcement Guidelines

**All AI Agents MUST:**

1. Follow file naming conventions (PascalCase for components, kebab-case for utilities)
2. Use dot notation for i18n keys with hierarchical structure
3. Place components in correct directory based on type (ui/sections/layout/shared)
4. Use FormStatus enum pattern for form state management
5. Order Tailwind classes logically (enforced by Prettier plugin)
6. Use camelCase for all TypeScript/JavaScript code
7. Co-locate tests with their components

**Pattern Verification:**

| Check | Tool | When |
|-------|------|------|
| File naming | ESLint rule | Pre-commit |
| Tailwind order | Prettier plugin | On save |
| TypeScript naming | ESLint rule | Pre-commit |
| i18n key format | Type checking | Build time |

---

## Project Structure & Boundaries

### Complete Project Directory Structure

```
karaoke-landing/
├── README.md
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── .env.example
├── .env.local                    # (gitignored)
├── .gitignore
├── .prettierrc
├── .eslintrc.cjs
│
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml               # (generated at build)
│   ├── images/
│   │   ├── hero-video-poster.webp
│   │   ├── testimonials/
│   │   │   ├── marc.webp
│   │   │   ├── sophie.webp
│   │   │   └── lucas.webp
│   │   └── logos/
│   │       └── clients/          # Logos établissements
│   └── videos/
│       └── hero-loop.mp4         # Vidéo Hero (< 2MB)
│
├── src/
│   ├── env.d.ts                  # Type declarations Astro
│   │
│   ├── i18n/
│   │   ├── index.ts              # Export principal
│   │   ├── utils.ts              # Helpers (useTranslations, getLocale)
│   │   ├── fr.ts                 # Traductions françaises
│   │   ├── en.ts                 # Traductions anglaises
│   │   └── es.ts                 # Traductions espagnoles
│   │
│   ├── data/
│   │   ├── catalogue.ts          # Fetch build-time catalogue
│   │   ├── catalogue.json        # (generated at build)
│   │   ├── testimonials.ts       # Données témoignages
│   │   ├── pricing.ts            # Données pricing
│   │   └── faq.ts                # Données FAQ
│   │
│   ├── lib/
│   │   ├── analytics.ts          # GA4 helpers
│   │   ├── cookie-consent.ts     # CookieConsent setup
│   │   └── utils.ts              # cn() et utilitaires
│   │
│   ├── types/
│   │   ├── index.ts              # Export types
│   │   ├── catalogue.ts          # Types catalogue (Song, Artist)
│   │   ├── forms.ts              # Types formulaires (FormStatus)
│   │   └── i18n.ts               # Types traductions
│   │
│   ├── styles/
│   │   └── globals.css           # Tailwind imports + custom CSS
│   │
│   ├── layouts/
│   │   └── Layout.astro          # Layout principal avec Head, Analytics
│   │
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Accordion.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── index.ts          # Barrel export
│   │   │
│   │   ├── sections/             # Landing page sections
│   │   │   ├── HeroSection.astro
│   │   │   ├── PropositionSection.astro
│   │   │   ├── HowItWorksSection.astro
│   │   │   ├── CatalogueSection.astro
│   │   │   ├── TestimonialsSection.astro
│   │   │   ├── PricingSection.astro
│   │   │   ├── FAQSection.astro
│   │   │   ├── CTASection.astro
│   │   │   ├── ContactSection.astro
│   │   │   └── index.ts          # Barrel export
│   │   │
│   │   ├── layout/               # Layout components
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Container.astro
│   │   │   └── index.ts
│   │   │
│   │   └── shared/               # Interactive React components
│   │       ├── LanguageSwitcher.tsx
│   │       ├── CatalogueSearch.tsx
│   │       ├── SongTicker.tsx
│   │       ├── PricingCard.tsx
│   │       ├── TestimonialCard.tsx
│   │       ├── NewsletterForm.tsx
│   │       ├── ContactForm.tsx
│   │       ├── CookieBanner.tsx
│   │       └── index.ts
│   │
│   └── pages/
│       ├── fr/
│       │   ├── index.astro       # Landing page FR
│       │   └── contact.astro     # Contact FR
│       ├── en/
│       │   ├── index.astro       # Landing EN
│       │   └── contact.astro     # Contact EN
│       ├── es/
│       │   ├── index.astro       # Landing ES
│       │   └── contact.astro     # Contact ES
│       └── index.astro           # Redirect → /fr/
│
└── tests/                        # (optionnel MVP)
    └── components/
        └── CatalogueSearch.test.tsx
```

### Architectural Boundaries

#### API Boundaries (External)

| Boundary | Direction | Format | When |
|----------|-----------|--------|------|
| API Catalogue | Build-time fetch → JSON | REST → JSON | npm run build |
| Backend SPA | Client → POST | JSON body | Runtime |
| Calendly | Embed iframe | Widget | Runtime |
| GA4 | Client → gtag | Events | Runtime (consent) |

#### Component Boundaries (Internal)

| Source | Target | Communication |
|--------|--------|---------------|
| Pages `.astro` | Sections `.astro` | Astro props |
| Sections `.astro` | Shared `.tsx` | `client:load` directive |
| Shared `.tsx` | UI `.tsx` | React props |
| Forms `.tsx` | Backend API | fetch() POST |
| All components | i18n | `useTranslations()` hook |

#### Data Flow

```
BUILD TIME:
  API Catalogue ──fetch──> src/data/catalogue.ts ──> catalogue.json

RUNTIME (Client):
  User Input ──> CatalogueSearch ──Fuse.js──> Results Display
  Form Submit ──> NewsletterForm ──POST──> Backend API
  CTA Click ──> GA4 Event ──> Analytics (if consent)
  Cookie Accept ──> CookieConsent ──> Enable GA4
```

### Requirements to Structure Mapping

#### FR Categories → Files

| FR | Description | File(s) |
|----|-------------|---------|
| FR1-FR4 | Navigation & i18n | `layout/Header.astro`, `shared/LanguageSwitcher.tsx` |
| FR5-FR9 | Hero Section | `sections/HeroSection.astro`, `shared/SongTicker.tsx` |
| FR10-FR11 | Proposition | `sections/PropositionSection.astro` |
| FR12-FR21 | Catalogue Preview | `sections/CatalogueSection.astro`, `shared/CatalogueSearch.tsx`, `data/catalogue.ts` |
| FR22-FR24 | Social Proof | `sections/TestimonialsSection.astro`, `shared/TestimonialCard.tsx` |
| FR25-FR28 | Pricing | `sections/PricingSection.astro`, `shared/PricingCard.tsx` |
| FR29-FR31 | FAQ | `sections/FAQSection.astro`, `ui/Accordion.tsx` |
| FR32-FR34 | Conversion | `sections/CTASection.astro` |
| FR35-FR38 | Newsletter | `shared/NewsletterForm.tsx` |
| FR39-FR47 | i18n & SEO | `i18n/*.ts`, `layouts/Layout.astro`, `astro.config.mjs` |
| FR48-FR62 | Contact | `pages/*/contact.astro`, `shared/ContactForm.tsx` |

#### Cross-Cutting Concerns

| Concern | Files |
|---------|-------|
| i18n | `src/i18n/`, `astro.config.mjs` |
| Analytics | `src/lib/analytics.ts`, `layouts/Layout.astro` |
| GDPR/Cookies | `src/lib/cookie-consent.ts`, `shared/CookieBanner.tsx` |
| SEO | `layouts/Layout.astro` (meta, hreflang, structured data) |
| Styling | `src/styles/globals.css`, `tailwind.config.mjs` |

### Integration Points

#### Internal Communication

| Pattern | Usage |
|---------|-------|
| Astro Props | Section components receive translated content |
| React Props | UI components receive data and callbacks |
| Client Directives | `client:load` for interactive components |
| CSS Variables | Design tokens shared via Tailwind config |

#### External Integrations

| Service | Integration Point | Configuration |
|---------|-------------------|---------------|
| Catalogue API | `src/data/catalogue.ts` | `CATALOGUE_API_URL` env var |
| Backend API | `shared/*Form.tsx` | `BACKEND_API_URL` env var |
| GA4 | `src/lib/analytics.ts` | `GA_MEASUREMENT_ID` env var |
| Calendly | Inline embed in ContactSection | Widget script |

### File Organization Patterns

#### Configuration Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config: i18n, integrations, output |
| `tailwind.config.mjs` | Design tokens, theme extension |
| `tsconfig.json` | TypeScript strict mode, path aliases |
| `.env.example` | Environment variables template |
| `.prettierrc` | Code formatting + Tailwind plugin |
| `.eslintrc.cjs` | Linting rules |

#### Source Organization

| Directory | Purpose | File Types |
|-----------|---------|------------|
| `src/components/ui/` | shadcn/ui base | `.tsx` |
| `src/components/sections/` | Landing sections | `.astro` |
| `src/components/layout/` | Layout structure | `.astro` |
| `src/components/shared/` | Interactive React | `.tsx` |
| `src/i18n/` | Translations | `.ts` |
| `src/data/` | Static data | `.ts`, `.json` |
| `src/lib/` | Utilities | `.ts` |
| `src/types/` | TypeScript types | `.ts` |

#### Asset Organization

| Directory | Content | Format |
|-----------|---------|--------|
| `public/images/` | Static images | `.webp`, `.svg` |
| `public/videos/` | Hero video | `.mp4` (< 2MB) |
| `public/` | Root assets | `favicon.svg`, `robots.txt` |

---

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**

All technology choices are compatible and well-integrated:

| Decision A | Decision B | Compatibility |
|------------|------------|---------------|
| Astro 5 | Tailwind CSS 4 | ✅ Native integration |
| Astro 5 | TypeScript 5 | ✅ Built-in support |
| shadcn/ui | React islands | ✅ Client directive |
| Vercel | Astro static | ✅ Optimized deployment |
| Fuse.js | Build-time JSON | ✅ Client-side search |

**Pattern Consistency:**

Implementation patterns fully support architectural decisions:

- Naming conventions align with Astro/React ecosystem standards
- FormStatus enum pattern works with TypeScript strict mode
- Tailwind ordering enforced automatically by Prettier plugin
- i18n dot notation enables type-safe translations

**Structure Alignment:**

Project structure enables all architectural decisions:

- `/pages/*/` supports native Astro i18n routing
- `/components/shared/` enables React islands for interactivity
- `/data/` supports build-time data fetching pattern
- Clear separation between static (Astro) and interactive (React)

### Requirements Coverage Validation ✅

**Functional Requirements Coverage: 62/62 (100%)**

| Category | FRs | Architectural Support |
|----------|-----|----------------------|
| Navigation | FR1-FR4 | Header + LanguageSwitcher |
| Hero | FR5-FR9 | HeroSection + SongTicker |
| Proposition | FR10-FR11 | PropositionSection |
| Catalogue | FR12-FR21 | CatalogueSearch + Fuse.js |
| Social Proof | FR22-FR24 | TestimonialsSection |
| Pricing | FR25-FR28 | PricingSection + PricingCard |
| FAQ | FR29-FR31 | FAQSection + Accordion |
| Conversion | FR32-FR34 | CTASection + redirects |
| Newsletter | FR35-FR38 | NewsletterForm + Backend API |
| i18n | FR39-FR47 | Astro i18n + hreflang |
| Contact | FR48-FR62 | ContactPage + ContactForm |

**Non-Functional Requirements Coverage:**

| NFR | Target | Architectural Support |
|-----|--------|----------------------|
| Performance | LCP < 2.5s | Astro SSG, zero JS default |
| PageSpeed | > 90 mobile | Tailwind purge, lazy loading |
| SEO | Structured data | Layout.astro meta + JSON-LD |
| Accessibility | WCAG AA | shadcn/ui + ARIA patterns |
| GDPR | Consent | CookieConsent + consent mode |
| Security | HTTPS | Vercel TLS 1.3 default |

### Implementation Readiness Validation ✅

**Decision Completeness:**

- [x] All critical decisions documented with verified versions
- [x] Technology stack fully specified with rationale
- [x] Integration patterns defined with code examples
- [x] Environment variables documented

**Structure Completeness:**

- [x] Complete directory structure with 40+ files/directories
- [x] All components mapped to requirements
- [x] Integration points clearly specified
- [x] Build-time vs runtime data flow documented

**Pattern Completeness:**

- [x] Naming conventions cover files, code, and i18n
- [x] Form state management pattern with TypeScript types
- [x] Error handling pattern with status enum
- [x] Tailwind class ordering enforced automatically

### Gap Analysis Results

**Critical Gaps:** None ✅

**Important Gaps (Non-blocking):**

| Gap | Impact | Recommendation |
|-----|--------|----------------|
| Tests optional MVP | Low (2 pages) | Add in V2 if needed |
| No Storybook | Component docs | Optional, add if team grows |

**Nice-to-Have Gaps:**

| Gap | Value |
|-----|-------|
| E2E tests (Playwright) | User journey validation |
| Husky pre-commit | Automatic enforcement |
| Lighthouse CI | Continuous performance monitoring |

### Architecture Completeness Checklist

**✅ Requirements Analysis**

- [x] Project context thoroughly analyzed (62 FRs, 4 personas)
- [x] Scale and complexity assessed (Low-Medium)
- [x] Technical constraints identified (API Catalogue, Backend SPA)
- [x] Cross-cutting concerns mapped (i18n, SEO, a11y, analytics)

**✅ Architectural Decisions**

- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**✅ Implementation Patterns**

- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**✅ Project Structure**

- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** ✅ READY FOR IMPLEMENTATION

**Confidence Level:** HIGH

**Key Strengths:**

1. Zero-JavaScript default ensures excellent Core Web Vitals
2. Native i18n routing simplifies multi-language SEO
3. shadcn/ui provides accessible, customizable components
4. Clear separation between Astro (static) and React (interactive)
5. Build-time data fetching eliminates runtime API dependencies

**Areas for Future Enhancement:**

1. Add E2E tests after MVP validation
2. Consider Storybook if component library grows
3. Implement Lighthouse CI for performance regression detection

### Implementation Handoff

**AI Agent Guidelines:**

1. Follow all architectural decisions exactly as documented
2. Use implementation patterns consistently across all components
3. Respect project structure and component boundaries
4. Use FormStatus enum for all form state management
5. Apply Tailwind class ordering (Prettier plugin enforces)
6. Use dot notation for all i18n keys

**First Implementation Priority:**

```bash
npm create astro@latest karaoke-landing -- --template one
cd karaoke-landing
npm install
```

**Then configure:**

1. `astro.config.mjs` with i18n routing (fr/en/es)
2. `tailwind.config.mjs` with design tokens from UX spec
3. Environment variables in `.env.local`
4. Install dependencies: `fuse.js`, `vanilla-cookieconsent`

---

## Architecture Completion Summary

### Workflow Completion

| Metric | Value |
|--------|-------|
| **Status** | ✅ COMPLETED |
| **Total Steps** | 8 |
| **Date Completed** | 2026-01-18 |
| **Document Location** | `_bmad-output/planning-artifacts/architecture.md` |

### Final Architecture Deliverables

**Complete Architecture Document:**

- All architectural decisions documented with specific versions
- Implementation patterns ensuring AI agent consistency
- Complete project structure with all files and directories
- Requirements to architecture mapping
- Validation confirming coherence and completeness

**Implementation Ready Foundation:**

| Metric | Count |
|--------|-------|
| Architectural decisions | 15+ |
| Implementation patterns | 10 |
| Components specified | 20+ |
| Requirements supported | 62/62 (100%) |

**AI Agent Implementation Guide:**

- Technology stack with verified versions (Astro 5, Tailwind 4, shadcn/ui)
- Consistency rules that prevent implementation conflicts
- Project structure with clear boundaries
- Integration patterns and communication standards

### Development Sequence

1. **Initialize project** using documented starter template
2. **Configure i18n** routing (fr/en/es) in astro.config.mjs
3. **Set up design tokens** in tailwind.config.mjs from UX spec
4. **Install dependencies** (fuse.js, vanilla-cookieconsent)
5. **Implement core layout** (Header, Footer, Layout)
6. **Build sections** following component organization
7. **Add interactivity** with React islands (CatalogueSearch, forms)
8. **Configure analytics** (GA4 + CookieConsent)
9. **Deploy to Vercel** with environment variables

### Quality Assurance Summary

**✅ Architecture Coherence**
- All decisions work together without conflicts
- Technology choices are compatible and verified
- Patterns support the architectural decisions
- Structure aligns with all choices

**✅ Requirements Coverage**
- All 62 functional requirements supported
- All non-functional requirements addressed
- Cross-cutting concerns handled (i18n, SEO, a11y, analytics)
- Integration points defined

**✅ Implementation Readiness**
- Decisions are specific and actionable
- Patterns prevent agent conflicts
- Structure is complete and unambiguous
- Code examples provided for clarity

---

**Architecture Status:** ✅ READY FOR IMPLEMENTATION

**Next Phase:** Create Epics & Stories → Sprint Planning → Development

