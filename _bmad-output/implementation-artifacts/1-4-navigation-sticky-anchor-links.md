# Story 1.4: Navigation Sticky avec Anchor Links

Status: done

## Story

**As a** utilisateur,
**I want** un menu de navigation fixe avec des liens vers les sections,
**So that** je peux naviguer rapidement entre les sections de la page.

## Acceptance Criteria

1. **Given** je suis sur la landing page **When** je scroll la page **Then** le header reste visible en position sticky
2. **Given** je scroll la page **When** je dépasse le seuil (50px) **Then** le header devient compact avec une ombre
3. **Given** le header est affiché **When** je regarde les anchor links **Then** les liens #hero, #pricing, #faq, #contact sont présents
4. **Given** je clique sur un anchor link **When** le scroll s'exécute **Then** la page scrolle smoothly vers la section
5. **Given** le scroll atteint une section **When** je regarde le header **Then** l'offset de scroll compense la hauteur du header (80px)
6. **Given** je suis sur une section **When** je regarde la navigation **Then** le lien actif est visuellement différencié
7. **Given** j'utilise le clavier **When** je navigue **Then** je peux Tab entre les liens et Entrer pour naviguer (NFR18)
8. **Given** un lien a le focus **When** je regarde **Then** le focus state est visible (UX15)

## Tasks / Subtasks

- [x] Task 1: Ajouter les traductions de navigation (AC: 3) ✅
  - [x] 1.1: Ajouter clés `nav.hero`, `nav.features`, `nav.pricing`, `nav.faq`, `nav.contact` dans fr.ts
  - [x] 1.2: Ajouter mêmes clés dans en.ts
  - [x] 1.3: Ajouter mêmes clés dans es.ts

- [x] Task 2: Implémenter les anchor links dans Header (AC: 3, 7, 8) ✅
  - [x] 2.1: Importer useTranslations dans Header.astro
  - [x] 2.2: Créer tableau de liens avec href et clé de traduction
  - [x] 2.3: Générer les liens dans la nav desktop
  - [x] 2.4: Appliquer styles hover et focus-visible

- [x] Task 3: Créer le composant client pour scroll et active state (AC: 4, 5, 6) ✅
  - [x] 3.1: Créer `src/components/shared/Navigation.tsx` (React island)
  - [x] 3.2: Implémenter smooth scroll avec offset de 64px (h-16 header)
  - [x] 3.3: Implémenter IntersectionObserver pour active state
  - [x] 3.4: Passer les liens traduits via props depuis Header.astro

- [x] Task 4: Ajouter le comportement de header compact (AC: 1, 2) ✅
  - [x] 4.1: Ajouter script scroll dans Header.astro
  - [x] 4.2: Event listener scroll avec threshold 50px
  - [x] 4.3: Appliquer shadow-md quand scrollé (progressive enhancement)

- [x] Task 5: Créer le menu mobile (AC: 3, 7, 8) ✅
  - [x] 5.1: Ajouter bouton hamburger avec icône
  - [x] 5.2: Créer panel mobile avec animation slide-down
  - [x] 5.3: Fermer menu après clic sur lien
  - [x] 5.4: Gérer focus trap pour accessibilité (Escape key close)

- [x] Task 6: Ajouter IDs aux sections des pages localisées (AC: 4, 5) ✅
  - [x] 6.1: Ajouter id="hero" à la SectionWrapper Hero (déjà existant)
  - [x] 6.2: Ajouter id="features" à la SectionWrapper features (déjà existant)
  - [x] 6.3: Préparer placeholders pour sections futures (#pricing, #faq, #contact)

- [x] Task 7: Valider build et navigation (AC: 1-8) ✅
  - [x] 7.1: `npm run build` sans erreur
  - [x] 7.2: Navigation clavier fonctionnelle (Tab, Enter, Escape)
  - [x] 7.3: Smooth scroll implémenté avec offset 64px (h-16)
  - [x] 7.4: Active state via IntersectionObserver

## Dev Notes

### Architecture Requirements

**From architecture.md - Navigation Pattern:**
```typescript
// Smooth scroll avec offset pour header sticky (80px)
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80; // Header height
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};
```

**From project-context.md - React Islands:**
```typescript
// Interactive components requiring React use .tsx
// Use client:load for components that MUST hydrate immediately
// Use client:visible for below-fold interactive components
```

### Previous Story Intelligence (Story 1.1, 1.2, 1.3)

**What's already implemented:**
- Header.astro with sticky positioning and backdrop-blur
- Navigation placeholder (`<nav class="hidden md:flex">`)
- i18n system with useTranslations() and fr/en/es locales
- Pages at /fr/, /en/, /es/ with Hero and Features sections
- Section IDs: #hero, #features already exist

**Current Header structure:**
```astro
<header class="sticky top-0 z-50 ... backdrop-blur ...">
  <div class="mx-auto flex h-16 max-w-7xl ...">
    <a href="/${currentLocale}/">Karaoke</a>
    <nav class="hidden md:flex"><!-- placeholder --></nav>
  </div>
</header>
```

### Technical Specifications

**Navigation Links Structure:**
```typescript
const navLinks = [
  { href: '#hero', labelKey: 'nav.hero' },
  { href: '#features', labelKey: 'nav.features' },
  { href: '#pricing', labelKey: 'nav.pricing' },
  { href: '#faq', labelKey: 'nav.faq' },
  { href: '#contact', labelKey: 'nav.contact' },
];
```

**IntersectionObserver for Active State:**
```typescript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    { rootMargin: '-80px 0px -50% 0px' }
  );

  sections.forEach((id) => {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  });

  return () => observer.disconnect();
}, []);
```

**Header Scroll State:**
```typescript
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Critical Rules (from project-context.md)

**DO:**
- Use `client:load` for Navigation component (needs immediate interactivity)
- Use IntersectionObserver for performance (not scroll events for active state)
- Add `scroll-behavior: smooth` to html OR use JS smooth scroll
- Ensure 44px minimum touch targets for mobile

**DON'T:**
- Don't import React in .astro files
- Don't use scroll event listeners for active link detection (use IntersectionObserver)
- Don't forget focus states on all interactive elements

### Accessibility Requirements (NFR18, UX15)

**Keyboard Navigation:**
- Tab navigates between links
- Enter/Space activates link
- Escape closes mobile menu

**Focus States:**
- `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`

**ARIA:**
- `aria-current="page"` on active link
- `aria-expanded` on mobile menu button
- `aria-controls` linking button to menu panel

### Translation Keys to Add

```typescript
// In fr.ts, en.ts, es.ts
nav: {
  home: '...',        // existing
  hero: 'Accueil',    // new - for anchor
  features: 'Fonctionnalités',
  pricing: 'Tarifs',  // existing
  faq: 'FAQ',         // existing
  contact: 'Contact', // existing
}
```

### References

- [Source: architecture.md#Navigation] - Scroll and sticky patterns
- [Source: project-context.md#React-Islands] - When to use React
- [Source: epics.md#Story-1.4] - Story requirements and ACs
- [Source: ux-design-specification.md] - 44px touch targets, focus states

### Testing Requirements

**Validation Criteria:**
1. Header stays sticky on scroll
2. Shadow appears after 50px scroll
3. Clicking anchor scrolls smoothly to section
4. Active link updates as you scroll
5. Keyboard navigation works (Tab, Enter)
6. Focus ring visible on focus
7. Mobile menu opens/closes
8. `npm run build` passes

### Potential Blockers

- None anticipated (foundation components in place from Story 1.1-1.3)

### External Dependencies

- None (using native IntersectionObserver and scroll APIs)

---

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build output: 3 pages built in 1.01s (after cleanup)
- ESLint: passed
- Navigation.tsx: 3.27 kB (gzip: 1.25 kB) - optimized after code review

### Completion Notes List

1. **Navigation.tsx** created as React island with client:load directive
2. **IntersectionObserver** used for performance-friendly active link detection
3. **Smooth scroll** implemented with 64px header offset (h-16 = 64px)
4. **Mobile menu** with hamburger icon, slide-down panel, and Escape key close
5. **Header scroll shadow** via Astro script for progressive enhancement
6. **Translations** added for nav.hero and nav.features in all 3 locales
7. **Section placeholders** added for #pricing, #faq, #contact
8. **Accessibility**: aria-current, aria-expanded, aria-controls, focus-visible states
9. **44px touch targets** for mobile menu button

### Code Review Fixes Applied (2026-01-19)

1. **H1 Fixed**: Header height mismatch - HEADER_HEIGHT changed from 80 to 64 to match h-16 (64px)
2. **M1 Fixed**: Removed dead isScrolled state from Navigation.tsx (scroll shadow handled by Astro script only)
3. **M2 Fixed**: Removed unused locale prop from Navigation component interface and Header.astro
4. **M3 Deferred**: CLAUDE.md files in pages/ - These are auto-generated by claude-mem, requires system config change

### File List

**Created:**
- `src/components/shared/Navigation.tsx` - React navigation component with smooth scroll and active state

**Modified:**
- `src/components/layout/Header.astro` - Integrated Navigation component, added scroll shadow script
- `src/i18n/fr.ts` - Added nav.hero, nav.features translations
- `src/i18n/en.ts` - Added nav.hero, nav.features translations
- `src/i18n/es.ts` - Added nav.hero, nav.features translations
- `src/pages/fr/index.astro` - Added placeholder sections (#pricing, #faq, #contact)
- `src/pages/en/index.astro` - Added placeholder sections (#pricing, #faq, #contact)
- `src/pages/es/index.astro` - Added placeholder sections (#pricing, #faq, #contact)

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-18 | Story created with comprehensive context | create-story workflow |
| 2026-01-18 | Implementation completed - all 7 tasks and ACs satisfied | dev-story workflow |
| 2026-01-19 | Code review: Fixed header height mismatch (80→64px), removed dead code, cleaned up unused props | code-review workflow |
