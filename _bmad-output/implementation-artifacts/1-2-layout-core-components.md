# Story 1.2: Layout Core Components

Status: done

## Story

**As a** utilisateur,
**I want** une page avec un header, un contenu principal et un footer,
**So that** je peux naviguer sur une structure claire et cohérente.

## Acceptance Criteria

1. **Given** le projet Astro est configuré **When** j'accède à la page d'accueil **Then** le Layout.astro principal est appliqué avec les meta tags, fonts et styles globaux
2. **Given** le layout est appliqué **When** je regarde le header **Then** le Header.astro affiche un logo et un espace réservé pour la navigation future
3. **Given** le layout est appliqué **When** je regarde le footer **Then** le Footer.astro affiche les liens légaux (Mentions légales, CGV, Politique de confidentialité) et un espace pour les réseaux sociaux
4. **Given** le contenu est rendu **When** je regarde les sections **Then** le Container.astro centre le contenu avec max-width et padding responsive
5. **Given** les sections sont structurées **When** je regarde chaque section **Then** le SectionWrapper.astro permet d'envelopper avec variantes de fond (default, muted, primary, gradient)
6. **Given** je suis sur n'importe quel device **When** je redimensionne la fenêtre **Then** la structure est responsive (mobile/tablet/desktop) avec breakpoints sm/md/lg/xl
7. **Given** j'utilise un lecteur d'écran **When** je navigue **Then** le skip link "Aller au contenu principal" est présent et fonctionnel (UX14)

## Tasks / Subtasks

- [x] Task 1: Créer le composant Header.astro (AC: 2) ✅
  - [x] 1.1: Créer `src/components/layout/Header.astro` avec structure de base
  - [x] 1.2: Ajouter logo placeholder (texte "Karaoke" avec font-display)
  - [x] 1.3: Ajouter espace `<nav>` pour la navigation future (vide pour l'instant)
  - [x] 1.4: Appliquer styles sticky avec z-index 50, backdrop-blur
  - [x] 1.5: Rendre responsive (logo + menu button mobile, navigation desktop)

- [x] Task 2: Créer le composant Footer.astro (AC: 3) ✅
  - [x] 2.1: Créer `src/components/layout/Footer.astro` avec structure sémantique
  - [x] 2.2: Ajouter section liens légaux (Mentions légales, CGV, Confidentialité)
  - [x] 2.3: Ajouter placeholder pour les réseaux sociaux
  - [x] 2.4: Ajouter copyright dynamique avec année courante
  - [x] 2.5: Rendre responsive (stack vertical mobile, horizontal desktop)
  - [x] 2.6: Ajouter traductions i18n pour fr/en/es

- [x] Task 3: Créer le composant Container.astro (AC: 4) ✅
  - [x] 3.1: Créer `src/components/layout/Container.astro`
  - [x] 3.2: Implémenter max-width: default (6xl/1152px), narrow (3xl/768px), wide (7xl/1280px)
  - [x] 3.3: Ajouter prop `size` pour variantes (default, narrow, wide)
  - [x] 3.4: Centrer horizontalement avec mx-auto et padding responsive

- [x] Task 4: Créer le composant SectionWrapper.astro (AC: 5) ✅
  - [x] 4.1: Créer `src/components/layout/SectionWrapper.astro`
  - [x] 4.2: Implémenter variantes de fond: default, muted, primary, gradient
  - [x] 4.3: Ajouter padding vertical responsive (py-16 mobile, py-24 desktop)
  - [x] 4.4: Supporter prop `id` pour les anchor links

- [x] Task 5: Mettre à jour Layout.astro (AC: 1, 7) ✅
  - [x] 5.1: Intégrer Header.astro dans le layout
  - [x] 5.2: Intégrer Footer.astro dans le layout
  - [x] 5.3: Vérifier le skip link pointe vers `#main-content`
  - [x] 5.4: Ajouter `id="main-content"` sur le `<main>` avec flex-1
  - [x] 5.5: Vérifier les meta tags et fonts sont chargés
  - [x] 5.6: Ajouter flex min-h-screen sur body pour footer en bas

- [x] Task 6: Créer le barrel export (AC: 1-5) ✅
  - [x] 6.1: Créer `src/components/layout/index.ts` avec exports
  - [x] 6.2: Exporter types ContainerProps et SectionWrapperProps

- [x] Task 7: Valider la structure responsive (AC: 6) ✅
  - [x] 7.1: Tester sur viewport mobile (< 640px)
  - [x] 7.2: Tester sur viewport tablet (640px - 1024px)
  - [x] 7.3: Tester sur viewport desktop (> 1024px)
  - [x] 7.4: Vérifier `npm run build` passe sans erreur (1 page built in 945ms)

## Dev Notes

### Architecture Requirements

**From architecture.md:**
- Composants layout dans `src/components/layout/`
- Utiliser Tailwind CSS 4 avec les tokens définis dans `global.css`
- Structure sémantique HTML5 (`<header>`, `<main>`, `<footer>`, `<nav>`)
- Responsive avec approche mobile-first

**Component Organization (from architecture.md#Project-Structure):**
```
src/components/
├── layout/               # Layout components
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Container.astro
│   └── index.ts
```

### Previous Story Intelligence (Story 1.1)

**What was implemented:**
- `src/layouts/Layout.astro` avec:
  - Google Fonts (Inter, Plus Jakarta Sans)
  - Meta tags viewport avec `viewport-fit=cover`
  - Skip link i18n (fr/en/es)
  - Import de `global.css`
  - Support `Astro.currentLocale`

**Design Tokens disponibles (global.css):**
- Couleurs: primary-*, secondary-*, accent-*, muted-*
- Background: bg-background, bg-card, bg-muted-50
- Fonts: font-sans (Inter), font-display (Plus Jakarta Sans)
- Shadows: shadow-sm, shadow-md, shadow-lg
- Radius: radius-sm, radius-md, radius-lg, radius-xl

**Code review fixes appliqués:**
- i18n config dans `astro.config.mjs` (fr/en/es)
- Accordion keyframes ajoutés
- React hooks ESLint plugin installé

### Technical Specifications

**Header.astro structure:**
```astro
---
const currentLocale = Astro.currentLocale || 'fr';
---

<header class="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div class="container flex h-16 items-center justify-between">
    <a href={`/${currentLocale}/`} class="font-display text-xl font-bold text-primary-600">
      Karaoke
    </a>
    <nav class="hidden md:flex items-center gap-6">
      <!-- Navigation links will be added in Story 1.4 -->
    </nav>
  </div>
</header>
```

**Footer.astro structure:**
```astro
---
const currentLocale = Astro.currentLocale || 'fr';
const currentYear = new Date().getFullYear();
---

<footer class="border-t border-border bg-muted-50">
  <div class="container py-8 md:py-12">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-sm text-muted-500">
        © {currentYear} Karaoke. Tous droits réservés.
      </p>
      <nav class="flex gap-4 text-sm text-muted-500">
        <a href={`/${currentLocale}/mentions-legales`} class="hover:text-foreground">Mentions légales</a>
        <a href={`/${currentLocale}/cgv`} class="hover:text-foreground">CGV</a>
        <a href={`/${currentLocale}/confidentialite`} class="hover:text-foreground">Confidentialité</a>
      </nav>
    </div>
  </div>
</footer>
```

**Container.astro pattern:**
```astro
---
interface Props {
  size?: 'default' | 'narrow' | 'wide';
  class?: string;
}

const { size = 'default', class: className } = Astro.props;

const sizeClasses = {
  narrow: 'max-w-3xl',    // 768px
  default: 'max-w-6xl',   // 1152px
  wide: 'max-w-7xl',      // 1280px
};
---

<div class:list={[
  'mx-auto w-full px-4 sm:px-6 lg:px-8',
  sizeClasses[size],
  className
]}>
  <slot />
</div>
```

**SectionWrapper.astro pattern:**
```astro
---
interface Props {
  variant?: 'default' | 'muted' | 'primary' | 'gradient';
  id?: string;
  class?: string;
}

const { variant = 'default', id, class: className } = Astro.props;

const variantClasses = {
  default: '',
  muted: 'bg-muted-50',
  primary: 'bg-primary-50',
  gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50',
};
---

<section
  id={id}
  class:list={[
    'py-16 md:py-24',
    variantClasses[variant],
    className
  ]}
>
  <slot />
</section>
```

### Critical Rules (from project-context.md)

**DO:**
- Utiliser les classes Tailwind avec les tokens définis
- Utiliser `class:list` pour les classes conditionnelles Astro
- Utiliser `Astro.currentLocale` pour les URLs i18n
- Structurer avec HTML5 sémantique

**DON'T:**
- Ne pas hardcoder les couleurs (utiliser les tokens)
- Ne pas utiliser de CSS inline
- Ne pas oublier les états hover/focus pour les liens

### Responsive Breakpoints (from architecture.md)

| Breakpoint | Prefix | Min-width |
|------------|--------|-----------|
| Mobile | (default) | 0px |
| Small | sm: | 640px |
| Medium | md: | 768px |
| Large | lg: | 1024px |
| XL | xl: | 1280px |
| 2XL | 2xl: | 1536px |

### Accessibility Requirements (NFR16-NFR22, UX14)

- Skip link fonctionnel vers `#main-content`
- Contrastes WCAG AA (déjà configurés dans tokens)
- Focus visible sur tous les liens
- Structure sémantique (`<header>`, `<main>`, `<footer>`, `<nav>`)

### References

- [Source: architecture.md#Project-Structure] - Component organization
- [Source: architecture.md#Implementation-Patterns] - Naming conventions
- [Source: epics.md#Story-1.2] - Story requirements and ACs
- [Source: ux-design-specification.md] - UX patterns and responsive approach
- [Source: prd.md#Accessibility] - WCAG AA requirements

### Testing Requirements

**Validation Criteria:**
1. `npm run build` completes without errors
2. Header sticky behavior works on scroll
3. Footer links are visible and hoverable
4. Container centers content correctly
5. SectionWrapper variants display correct backgrounds
6. Responsive layout adapts at breakpoints
7. Skip link navigates to main content

**No automated tests required** - visual validation is sufficient for layout components.

### Potential Blockers

- None anticipated (tous les prérequis sont en place depuis Story 1.1)

### External Dependencies

- None (composants Astro statiques)

---

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build output: 1 page built in 945ms
- Minor CSS warning about 'file' property (non-critical, from Tailwind utility classes)

### Completion Notes List

1. **Header.astro** created with sticky positioning, backdrop-blur effect, logo with font-display, mobile menu button placeholder, and responsive layout
2. **Footer.astro** created with i18n translations (fr/en/es), legal links, copyright with dynamic year, and responsive flex layout
3. **Container.astro** created with size variants (narrow: max-w-3xl, default: max-w-6xl, wide: max-w-7xl) and responsive padding
4. **SectionWrapper.astro** created with background variants (default, muted, primary, gradient) and responsive padding (py-16 mobile, py-24 desktop)
5. **Layout.astro** updated to integrate Header and Footer, added flex min-h-screen for sticky footer, and main with id="main-content" and flex-1
6. **index.ts** barrel export created with type definitions for component props
7. **index.astro** page updated to demonstrate all layout components with different variants
8. All components use semantic HTML5 elements and ARIA labels for accessibility
9. Focus states added to all interactive elements
10. Build validation passed successfully

### File List

**Created:**
- `src/components/layout/Header.astro` - Sticky header with logo and navigation placeholder
- `src/components/layout/Footer.astro` - Footer with legal links and i18n support
- `src/components/layout/Container.astro` - Responsive container with size variants
- `src/components/layout/SectionWrapper.astro` - Section wrapper with background variants
- `src/components/layout/index.ts` - Barrel export with type definitions

**Modified:**
- `src/layouts/Layout.astro` - Integrated Header and Footer, added flex layout
- `src/pages/index.astro` - Updated to demonstrate layout components

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-18 | Story created with comprehensive context from architecture and previous story | create-story workflow |
| 2026-01-18 | Implementation completed - all 7 tasks and ACs satisfied | dev-story workflow |
| 2026-01-18 | Code review fixes: footer focus-visible, removed dead mobile button, Container type safety, main tabindex, removed empty div, cleaned index.ts | code-review workflow |
