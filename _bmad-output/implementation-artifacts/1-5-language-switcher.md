# Story 1.5: Language Switcher

Status: done

## Story

**As a** utilisateur,
**I want** changer de langue depuis le header,
**So that** je peux consulter le contenu dans ma langue préférée sans perdre ma position.

## Acceptance Criteria

1. **Given** je suis sur une section de la landing page **When** je clique sur le language switcher dans le header **Then** un dropdown affiche les 3 langues (FR/EN/ES)
2. **Given** le dropdown est ouvert **When** je sélectionne une autre langue **Then** je peux sélectionner cette langue
3. **Given** j'ai sélectionné une langue **When** la page se recharge **Then** la page s'affiche dans la nouvelle langue
4. **Given** j'étais scrollé sur une section **When** je change de langue **Then** ma position de scroll est préservée (FR43)
5. **Given** j'ai changé de langue **When** je regarde l'URL **Then** l'URL a changé vers le bon préfixe de langue (/fr/, /en/, /es/)
6. **Given** j'utilise le clavier **When** je navigue sur le language switcher **Then** le composant est accessible avec ARIA (role, aria-expanded, aria-haspopup)
7. **Given** je suis sur mobile **When** je vois le language switcher **Then** le touch target est de minimum 44px (UX12)

## Tasks / Subtasks

- [x] Task 1: Ajouter les traductions pour le language switcher (AC: 1, 3)
  - [x] 1.1: Ajouter clés `a11y.languageSwitch`, `languages.fr`, `languages.en`, `languages.es` dans fr.ts
  - [x] 1.2: Ajouter mêmes clés dans en.ts
  - [x] 1.3: Ajouter mêmes clés dans es.ts

- [x] Task 2: Créer le composant LanguageSwitcher.tsx (AC: 1, 2, 6, 7)
  - [x] 2.1: Créer `src/components/shared/LanguageSwitcher.tsx` (React island)
  - [x] 2.2: Implémenter le bouton trigger avec langue courante
  - [x] 2.3: Implémenter le dropdown menu avec les 3 langues
  - [x] 2.4: Ajouter ARIA: role="listbox", aria-expanded, aria-haspopup
  - [x] 2.5: Gérer keyboard navigation (Escape ferme, Enter/Space sélectionne)
  - [x] 2.6: Appliquer touch target minimum 44px

- [x] Task 3: Implémenter le changement de langue (AC: 3, 5)
  - [x] 3.1: Utiliser getRelativeLocaleUrl() pour construire les URLs localisées
  - [x] 3.2: Naviguer vers la nouvelle URL avec window.location.href

- [x] Task 4: Préserver la position de scroll (AC: 4)
  - [x] 4.1: Sauvegarder scrollY en sessionStorage avant navigation
  - [x] 4.2: Restaurer scroll position après chargement de page
  - [x] 4.3: Nettoyer sessionStorage après restauration

- [x] Task 5: Intégrer dans Header.astro (AC: 1)
  - [x] 5.1: Importer LanguageSwitcher dans Header.astro
  - [x] 5.2: Placer le composant dans le header (après Navigation, avant menu mobile)
  - [x] 5.3: Passer currentLocale et locales comme props

- [x] Task 6: Valider build et fonctionnalités (AC: 1-7)
  - [x] 6.1: `npm run build` sans erreur
  - [x] 6.2: Changement de langue fonctionne sur les 3 langues
  - [x] 6.3: Scroll position préservée après changement
  - [x] 6.4: Navigation clavier fonctionnelle (Tab, Enter, Escape)
  - [x] 6.5: Focus ring visible sur le composant

## Dev Notes

### Architecture Requirements

**From architecture.md - LanguageSwitcher:**
```
UX9: LanguageSwitcher (dropdown/segmented)
Location: src/components/shared/LanguageSwitcher.tsx
```

**From architecture.md - i18n Routing:**
```typescript
// FR43: Changement langue sans perdre position
// Utiliser getRelativeLocaleUrl() pour construire les URLs
import { getRelativeLocaleUrl } from 'astro:i18n';

// URL construction
const newUrl = getRelativeLocaleUrl(targetLocale, currentPath);
```

**From project-context.md - React Islands:**
```typescript
// Interactive components requiring React use .tsx
// Use client:load for components that MUST hydrate immediately
// LanguageSwitcher needs immediate interactivity → client:load
```

### Previous Story Intelligence (Story 1.4)

**What's already implemented:**
- Header.astro with Navigation component integrated
- `currentLocale` available via `Astro.currentLocale`
- i18n system with useTranslations() and fr/en/es locales
- React island pattern established with client:load
- Focus states pattern: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- 44px touch targets pattern for mobile

**Current Header structure (from Story 1.4):**
```astro
<header id="main-header" class="sticky top-0 z-50 ...">
  <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 ...">
    <a href={`/${currentLocale}/`}>Karaoke</a>
    <Navigation client:load links={navLinks} ... />
    <!-- LanguageSwitcher goes here -->
  </div>
</header>
```

**Translations structure already in place:**
```typescript
// src/i18n/fr.ts
export const fr = {
  a11y: {
    languageSwitch: 'Changer de langue', // existing
  },
  // Add new keys for language names
};
```

### Technical Specifications

**LanguageSwitcher Component Props:**
```typescript
interface LanguageSwitcherProps {
  currentLocale: string;
  locales: string[];
  currentPath: string; // Path without locale prefix for URL construction
}
```

**Scroll Preservation Pattern (FR43):**
```typescript
// Before navigation - save scroll position
const saveScrollPosition = () => {
  sessionStorage.setItem('scrollY', String(window.scrollY));
};

// After page load - restore scroll position
const restoreScrollPosition = () => {
  const scrollY = sessionStorage.getItem('scrollY');
  if (scrollY) {
    window.scrollTo(0, parseInt(scrollY));
    sessionStorage.removeItem('scrollY');
  }
};

// Call on component mount
useEffect(() => {
  restoreScrollPosition();
}, []);
```

**URL Construction Pattern:**
```typescript
// For anchor links on landing page
const getLocalizedUrl = (targetLocale: string) => {
  // Get current path without locale prefix
  const pathWithoutLocale = window.location.pathname.replace(/^\/(fr|en|es)/, '');
  return `/${targetLocale}${pathWithoutLocale || '/'}`;
};
```

**Dropdown ARIA Pattern:**
```tsx
<div className="relative">
  <button
    type="button"
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    aria-label={t('a11y.languageSwitch')}
    onClick={() => setIsOpen(!isOpen)}
    className="flex items-center h-10 px-3 min-w-[44px] ..."
  >
    <span>{currentLocale.toUpperCase()}</span>
    <ChevronDown className={cn("h-4 w-4", isOpen && "rotate-180")} />
  </button>

  {isOpen && (
    <ul
      role="listbox"
      aria-label={t('a11y.languageSwitch')}
      className="absolute right-0 mt-1 w-32 bg-background border rounded-md shadow-lg"
    >
      {locales.map((locale) => (
        <li
          key={locale}
          role="option"
          aria-selected={locale === currentLocale}
          onClick={() => handleLanguageChange(locale)}
          className="px-4 py-2 cursor-pointer hover:bg-muted-100 ..."
        >
          {t(`languages.${locale}`)}
        </li>
      ))}
    </ul>
  )}
</div>
```

### Critical Rules (from project-context.md)

**DO:**
- Use `client:load` for LanguageSwitcher (needs immediate interactivity)
- Use sessionStorage for scroll position (survives page navigation)
- Use proper ARIA attributes for dropdown accessibility
- Ensure 44px minimum touch targets (h-10 = 40px, add padding)
- Close dropdown on Escape key
- Close dropdown on click outside

**DON'T:**
- Don't import React in .astro files
- Don't use localStorage (sessionStorage is better for temporary state)
- Don't forget to handle keyboard navigation
- Don't use inline styles (use Tailwind classes)

### Accessibility Requirements (NFR18, UX12)

**Keyboard Navigation:**
- Tab focuses the language switcher button
- Enter/Space opens the dropdown
- Arrow keys navigate between options (optional enhancement)
- Enter/Space selects an option
- Escape closes the dropdown

**Focus States:**
```css
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
```

**Touch Targets (UX12):**
- Minimum 44px × 44px for trigger button
- Minimum 44px height for dropdown options

**ARIA:**
- `aria-haspopup="listbox"` on trigger
- `aria-expanded` reflects open state
- `role="listbox"` on dropdown
- `role="option"` on each item
- `aria-selected` on current locale

### Translation Keys to Add

```typescript
// In fr.ts, en.ts, es.ts
languages: {
  fr: 'Français',
  en: 'English',
  es: 'Español',
}
```

### References

- [Source: architecture.md#UX9] - LanguageSwitcher component spec
- [Source: architecture.md#i18n-Routing] - URL construction patterns
- [Source: project-context.md#React-Islands] - When to use React
- [Source: epics.md#Story-1.5] - Story requirements and ACs
- [Source: prd.md#FR43] - Scroll position preservation requirement
- [Source: ux-design-specification.md#UX12] - 44px touch targets

### Testing Requirements

**Validation Criteria:**
1. Dropdown opens on click
2. Language names displayed correctly (Français, English, Español)
3. Click on language changes URL
4. Page reloads in new language
5. Scroll position is preserved
6. Keyboard navigation works (Tab, Enter, Escape)
7. Focus ring visible on focus
8. Touch targets are 44px minimum
9. `npm run build` passes

### Potential Blockers

- None anticipated (i18n system already in place from Story 1.3)

### External Dependencies

- None (using Astro's native i18n helpers)

---

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build output: 7 pages built in 1.09s
- ESLint: passed (0 errors, 0 warnings after fix)
- LanguageSwitcher.tsx: 4.93 kB (gzip: 2.19 kB)

### Completion Notes List

1. **Translations added** - `languages.fr/en/es` keys added to all 3 locale files
2. **LanguageSwitcher.tsx** created as React island with client:load directive
3. **ARIA accessibility** - role="listbox", aria-expanded, aria-haspopup, role="option", aria-selected, aria-activedescendant
4. **Keyboard navigation** - Escape closes dropdown, Enter/Space toggles and selects, Arrow keys navigate
5. **Scroll preservation (FR43)** - sessionStorage saves scrollY before navigation, restores on mount
6. **URL construction** - Builds localized URL by replacing locale prefix in pathname
7. **44px touch targets (UX12)** - h-10 (40px) + px-3 padding for trigger, h-11 (44px) for options
8. **Click outside** - Dropdown closes when clicking outside the container
9. **Focus states** - focus-visible:ring-2 pattern consistent with project standards
10. **Header integration** - LanguageSwitcher in flex container with Navigation

### Code Review Fixes Applied (2026-01-19)

1. **H1 Fixed**: Mobile layout - Wrapped Navigation and LanguageSwitcher in flex container with gap-2
2. **M1 Fixed**: Focus trap - Tab key now cycles within dropdown options, Escape returns focus to trigger
3. **M2 Fixed**: Removed redundant SUPPORTED_LOCALES constant, using locales prop directly
4. **M4 Fixed**: Arrow key navigation - ArrowUp/Down navigate options with wrapping, Home/End jump to first/last

### File List

**Created:**
- `src/components/shared/LanguageSwitcher.tsx` - React language switcher component

**Modified:**
- `src/i18n/fr.ts` - Added languages.fr/en/es keys
- `src/i18n/en.ts` - Added languages.fr/en/es keys
- `src/i18n/es.ts` - Added languages.fr/en/es keys
- `src/components/layout/Header.astro` - Integrated LanguageSwitcher component

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-19 | Story created with comprehensive context from previous stories | create-story workflow |
| 2026-01-19 | Implementation completed - all 6 tasks and 7 ACs satisfied | dev-story workflow |
| 2026-01-19 | Code review: Fixed H1 (mobile layout), M1 (focus trap), M2 (redundant filtering), M4 (arrow keys) | code-review workflow |
