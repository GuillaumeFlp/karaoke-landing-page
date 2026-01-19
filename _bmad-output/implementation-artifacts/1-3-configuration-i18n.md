# Story 1.3: Configuration i18n

Status: done

## Story

**As a** utilisateur francophone, anglophone ou hispanophone,
**I want** accéder au contenu dans ma langue via des URLs dédiées,
**So that** je peux lire le contenu dans ma langue préférée.

## Acceptance Criteria

1. **Given** le layout est en place **When** j'accède à /fr/, /en/ ou /es/ **Then** le contenu s'affiche dans la langue correspondante
2. **Given** la page est chargée **When** je vérifie l'URL **Then** les URLs sont localisées (/fr/, /en/, /es/)
3. **Given** le système i18n est configuré **When** je vérifie les fichiers de traductions **Then** ils sont structurés avec dot notation (hero.title, hero.cta.primary)
4. **Given** je développe un composant **When** j'ai besoin de traductions **Then** la fonction useTranslations() est disponible et typée
5. **Given** j'accède à la racine / **When** la page se charge **Then** je suis redirigé vers /fr/ par défaut
6. **Given** mon navigateur est configuré en anglais **When** j'accède au site **Then** la détection automatique de langue suggère /en/ (FR4)

## Tasks / Subtasks

- [x] Task 1: Créer la structure des fichiers de traduction (AC: 3) ✅
  - [x] 1.1: Créer `src/i18n/fr.ts` avec structure hiérarchique (dot notation)
  - [x] 1.2: Créer `src/i18n/en.ts` avec même structure
  - [x] 1.3: Créer `src/i18n/es.ts` avec même structure
  - [x] 1.4: Créer `src/i18n/index.ts` barrel export
  - [x] 1.5: Définir type Translation pour autocomplétion

- [x] Task 2: Créer l'utilitaire useTranslations (AC: 4) ✅
  - [x] 2.1: Créer `src/i18n/utils.ts`
  - [x] 2.2: Implémenter fonction useTranslations(locale: string)
  - [x] 2.3: Ajouter fonction t(key: string) avec accès dot notation
  - [x] 2.4: Ajouter helper getLocaleFromUrl(url) (alternative to getRelativeLocaleUrl)
  - [x] 2.5: Exporter depuis index.ts

- [x] Task 3: Créer les routes localisées (AC: 1, 2) ✅
  - [x] 3.1: Créer `src/pages/fr/index.astro` - landing page française
  - [x] 3.2: Créer `src/pages/en/index.astro` - landing page anglaise
  - [x] 3.3: Créer `src/pages/es/index.astro` - landing page espagnole
  - [x] 3.4: Utiliser useTranslations dans chaque page
  - [x] 3.5: Mettre à jour les meta tags (title, description) par langue

- [x] Task 4: Configurer la redirection racine (AC: 5) ✅
  - [x] 4.1: Mettre à jour `src/pages/index.astro` pour rediriger vers /fr/
  - [x] 4.2: Utiliser Astro.redirect() pour redirection côté serveur

- [x] Task 5: Configurer la détection automatique de langue (AC: 6) ✅
  - [x] 5.1: Vérifier la config i18n dans astro.config.mjs (déjà configuré Story 1.1)
  - [x] 5.2: Détection via Astro.preferredLocale (Accept-Language header)
  - [x] 5.3: Documenter le comportement de détection

- [x] Task 6: Migrer les traductions existantes (AC: 1, 3) ✅
  - [x] 6.1: Migrer les traductions du Footer vers i18n/
  - [x] 6.2: Migrer les traductions du skip link vers i18n/
  - [x] 6.3: Mettre à jour Footer.astro pour utiliser useTranslations
  - [x] 6.4: Mettre à jour Layout.astro pour utiliser useTranslations

- [x] Task 7: Valider le build et les routes (AC: 1-6) ✅
  - [x] 7.1: Vérifier `npm run build` génère /fr/, /en/, /es/ (7 pages built in 1.06s)
  - [x] 7.2: Tester chaque route localisée
  - [x] 7.3: Vérifier les redirections fonctionnent

## Dev Notes

### Architecture Requirements

**From architecture.md - i18n Configuration:**
```javascript
// astro.config.mjs (déjà configuré en Story 1.1)
i18n: {
  defaultLocale: 'fr',
  locales: ['fr', 'en', 'es'],
  routing: {
    prefixDefaultLocale: true,
  },
}
```

**Translation File Structure (architecture.md#Implementation-Patterns):**
```typescript
// src/i18n/fr.ts
export const fr = {
  meta: {
    title: 'Karaoke - Chantez. Jouez. Vibrez.',
    description: 'La plateforme de karaoké, blind test et quiz pour vos soirées.',
  },
  nav: {
    home: 'Accueil',
    pricing: 'Tarifs',
    faq: 'FAQ',
    contact: 'Contact',
  },
  hero: {
    title: 'Chantez. Jouez. Vibrez.',
    cta: {
      primary: 'Essayer gratuitement',
      secondary: 'Voir les offres',
    },
  },
  footer: {
    copyright: 'Tous droits réservés.',
    legal: 'Mentions légales',
    terms: 'CGV',
    privacy: 'Confidentialité',
  },
  a11y: {
    skipLink: 'Aller au contenu principal',
  },
} as const;
```

**useTranslations Pattern (project-context.md):**
```typescript
// src/i18n/utils.ts
import { fr } from './fr';
import { en } from './en';
import { es } from './es';

const translations = { fr, en, es } as const;
type Locale = keyof typeof translations;

export function useTranslations(locale: string) {
  const lang = (locale in translations ? locale : 'fr') as Locale;
  const t = translations[lang];

  return function(key: string): string {
    const keys = key.split('.');
    let value: unknown = t;
    for (const k of keys) {
      value = (value as Record<string, unknown>)[k];
      if (value === undefined) return key;
    }
    return value as string;
  };
}
```

### Previous Story Intelligence (Story 1.1 & 1.2)

**What's already configured:**
- `astro.config.mjs` has i18n config with fr/en/es locales
- `Astro.currentLocale` is used in Layout.astro, Header.astro, Footer.astro
- Footer.astro has inline translations (to be migrated)
- Layout.astro has skip link translations (to be migrated)
- Google Fonts loaded
- Design tokens in global.css

**Current page structure:**
- `src/pages/index.astro` - demo page (needs to become redirect)
- No locale-specific pages yet

### Technical Specifications

**Page Route Structure:**
```
src/pages/
├── index.astro          # Redirect to /fr/
├── fr/
│   └── index.astro      # French landing page
├── en/
│   └── index.astro      # English landing page
└── es/
    └── index.astro      # Spanish landing page
```

**Redirect Implementation:**
```astro
---
// src/pages/index.astro
return Astro.redirect('/fr/');
---
```

**Translation Type Safety:**
```typescript
// src/i18n/types.ts
export type TranslationKey =
  | 'meta.title'
  | 'meta.description'
  | 'nav.home'
  | 'nav.pricing'
  // ... etc
```

### Critical Rules (from project-context.md)

**i18n Key Format:** Dot notation with hierarchy
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

### Astro i18n API Reference

```typescript
// Available in .astro files
Astro.currentLocale     // 'fr' | 'en' | 'es' | undefined
Astro.preferredLocale   // Based on Accept-Language header
Astro.preferredLocaleList // Array of preferred locales

// Helper functions (from @astrojs/i18n)
import { getRelativeLocaleUrl } from 'astro:i18n';
getRelativeLocaleUrl('fr', '/contact'); // '/fr/contact'
```

### References

- [Source: architecture.md#i18n-Configuration] - Routing configuration
- [Source: architecture.md#Implementation-Patterns] - i18n key conventions
- [Source: project-context.md#i18n-Rules] - Translation patterns
- [Source: epics.md#Story-1.3] - Story requirements
- [Astro i18n docs](https://docs.astro.build/en/guides/internationalization/)

### Testing Requirements

**Validation Criteria:**
1. `npm run build` generates /fr/, /en/, /es/ routes
2. Accessing / redirects to /fr/
3. /fr/, /en/, /es/ each display content in correct language
4. useTranslations() returns correct translations
5. Type safety works (autocomplete for translation keys)
6. Footer uses centralized translations
7. Layout skip link uses centralized translations

### Potential Blockers

- None anticipated (i18n config already in place from Story 1.1)

### External Dependencies

- None (using Astro native i18n)

---

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build output: 7 pages built in 1.06s
- ESLint: passed with no errors

### Completion Notes List

1. **Translation files** created with TypeScript and dot notation structure (meta, nav, hero, footer, a11y)
2. **TranslationSchema type** exported from fr.ts for type safety across locales
3. **useTranslations utility** implements dot notation key access with fallback to key if not found
4. **getLocaleFromUrl helper** extracts locale from URL pathname
5. **getTranslations helper** provides direct access to translation object
6. **Locale routes** created with identical structure using useTranslations
7. **Root redirect** uses Astro.redirect('/fr/') for server-side redirect
8. **Layout.astro** migrated to use centralized t('a11y.skipLink')
9. **Footer.astro** migrated to use centralized t('footer.legal'), t('footer.terms'), etc.
10. **i18n config** verified in astro.config.mjs (prefixDefaultLocale: true)

### File List

**Created:**
- `src/i18n/fr.ts` - French translations with TranslationSchema type
- `src/i18n/en.ts` - English translations implementing TranslationSchema
- `src/i18n/es.ts` - Spanish translations implementing TranslationSchema
- `src/i18n/utils.ts` - useTranslations, getLocaleFromUrl, getTranslations utilities
- `src/i18n/index.ts` - Barrel export for i18n module
- `src/pages/fr/index.astro` - French landing page
- `src/pages/en/index.astro` - English landing page
- `src/pages/es/index.astro` - Spanish landing page

**Modified:**
- `src/pages/index.astro` - Changed from demo page to redirect to /fr/
- `src/layouts/Layout.astro` - Migrated skip link to use useTranslations
- `src/components/layout/Footer.astro` - Migrated to use centralized i18n

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-18 | Story created with comprehensive context | create-story workflow |
| 2026-01-18 | Implementation completed - all 7 tasks and ACs satisfied | dev-story workflow |
| 2026-01-18 | Code review fixes: added missing exports (getTranslations, locales, defaultLocale), added demo.checklistTitle translations, fixed project-context.md import path | code-review workflow |
