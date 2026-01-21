# Story 2.3: Hero CTAs

Status: done

## Story

**As a** visiteur,
**I want** voir des boutons d'action clairs dans le Hero,
**So that** je peux essayer gratuitement ou voir les offres.

## Acceptance Criteria

1. **Given** je suis dans la section Hero **When** je regarde les CTAs **Then** le CTA primaire "Essayer gratuitement" est visible et prominent
2. **Given** je suis dans la section Hero **When** je regarde les CTAs **Then** le CTA secondaire "Voir les offres" est visible en style secondaire
3. **Given** je clique sur le CTA primaire **When** la redirection s'effectue **Then** je suis redirigé vers l'app SPA externe (FR34)
4. **Given** je clique sur le CTA secondaire **When** le scroll s'effectue **Then** la page scrolle vers la section Pricing
5. **Given** je regarde les boutons **When** je mesure les dimensions **Then** les boutons ont des touch targets de minimum 44px
6. **Given** je navigue au clavier **When** je focus les CTAs **Then** les focus states sont visibles pour l'accessibilité
7. **Given** je suis sur une version FR/EN/ES **When** je lis les CTAs **Then** les textes des CTAs sont traduits selon la langue

## Tasks / Subtasks

- [x] Task 1: Créer le composant HeroCTA.astro (AC: 1, 2, 5, 6)
  - [x] 1.1: Créer `src/components/sections/HeroCTA.astro` avec deux boutons
  - [x] 1.2: Utiliser les classes Tailwind équivalentes à Button variant="default" (asChild ne fonctionne pas dans Astro non-hydraté)
  - [x] 1.3: Utiliser les classes Tailwind équivalentes à Button variant="outline" pour le CTA secondaire
  - [x] 1.4: Appliquer size="xl" pour garantir touch targets minimum 44px (h-14 = 56px)
  - [x] 1.5: Ajouter les classes focus-visible pour accessibility

- [x] Task 2: Implémenter le CTA primaire - Essayer gratuitement (AC: 1, 3, 7)
  - [x] 2.1: Créer un lien `<a>` vers l'app SPA externe (URL placeholder: https://app.example.com)
  - [x] 2.2: Utiliser le texte traduit via `t('hero.cta.primary')`
  - [x] 2.3: Ajouter attribut `target="_blank"` et `rel="noopener noreferrer"` pour externe
  - [x] 2.4: S'assurer que le style "primary" est prominent (bg-primary-500)

- [x] Task 3: Implémenter le CTA secondaire - Voir les offres (AC: 2, 4, 7)
  - [x] 3.1: Créer un lien `<a href="#pricing">` pour anchor scroll vers la section Pricing
  - [x] 3.2: Utiliser le texte traduit via `t('hero.cta.secondary')`
  - [x] 3.3: Appliquer le style "outline" customisé pour dark background (border-white/50, bg-transparent)
  - [x] 3.4: Ajouter scroll-padding-top: 5rem dans global.css pour l'offset du header

- [x] Task 4: Intégrer HeroCTA dans HeroSection (AC: 1, 2)
  - [x] 4.1: Importer HeroCTA dans les pages index (fr/en/es)
  - [x] 4.2: Placer HeroCTA dans le slot de HeroSection après le sous-titre
  - [x] 4.3: S'assurer de la disposition responsive (flex-col mobile, flex-row sm+)

- [x] Task 5: Valider l'accessibilité (AC: 5, 6)
  - [x] 5.1: Vérifier que les touch targets sont >= 44px (h-14 = 56px ✓)
  - [x] 5.2: Vérifier le contraste texte sur boutons (white on primary-500 ✓, white on transparent ✓)
  - [x] 5.3: Tester la navigation clavier (Tab → Enter via liens natifs ✓)
  - [x] 5.4: Vérifier les focus rings visibles (focus-visible:ring-2 ✓)

- [x] Task 6: Valider build et fonctionnalité (AC: 1-7)
  - [x] 6.1: `npm run build` sans erreur (7 pages built in 671ms)
  - [x] 6.2: CTA primaire → href externe configuré avec target="_blank"
  - [x] 6.3: CTA secondaire → href="#pricing" avec smooth scroll CSS
  - [x] 6.4: Textes traduits en FR/EN/ES vérifiés dans HTML output
  - [x] 6.5: Layout responsive: flex-col (mobile) → flex-row (sm+)

## Dev Notes

### Architecture Requirements

**From architecture.md - Hero Section:**
```
FR8: CTA primaire "Essayer gratuitement" → redirect app
FR9: CTA secondaire "Voir les offres" → scroll pricing
FR34: Redirection vers app SPA existante
UX12: Touch targets minimum 44px
UX15: Focus ring 2px sur tous les interactifs
```

**From architecture.md - Component Location:**
```
src/components/sections/HeroCTA.astro  # .astro car pas d'interactivité complexe
```

**From ux-design-specification.md - CTA Design:**
```
CTA principal: Visible sans scroll (above fold), répété en bas
"Get started free" pattern (Notion-style) → Conversion sans friction
Sticky header compact → CTA accessible partout
```

### Previous Epic Intelligence (Stories 2.1, 2.2)

**Patterns établis à réutiliser:**

1. **HeroSection slot pattern:**
```astro
<!-- In HeroSection.astro - existing slot for CTAs -->
<div class="flex flex-wrap items-center justify-center gap-4">
  <slot />
</div>
```

2. **Translation pattern:**
```astro
---
import { useTranslations } from '@/i18n';
const currentLocale = Astro.currentLocale || 'fr';
const t = useTranslations(currentLocale);
---
<span>{t('hero.cta.primary')}</span>
```

3. **Existing translations (fr.ts):**
```typescript
hero: {
  cta: {
    primary: 'Essayer gratuitement',
    secondary: 'Voir les offres',
  },
},
```

4. **Button component usage:**
```tsx
import { Button } from '@/components/ui/button';

// Primary CTA
<Button variant="default" size="xl">
  {t('hero.cta.primary')}
</Button>

// Secondary CTA
<Button variant="outline" size="xl">
  {t('hero.cta.secondary')}
</Button>
```

5. **Focus states pattern (Button component):**
```css
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
```

### Technical Specifications

**HeroCTA Component Structure:**
```astro
---
/**
 * HeroCTA component - Call-to-action buttons for the Hero section
 * Primary CTA: External redirect to SPA app
 * Secondary CTA: Smooth scroll to pricing section
 */
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/i18n';

interface Props {
  primaryUrl?: string;
  class?: string;
}

const {
  primaryUrl = 'https://app.example.com', // TODO: Replace with actual app URL
  class: className
} = Astro.props;

const currentLocale = Astro.currentLocale || 'fr';
const t = useTranslations(currentLocale);
---

<div class:list={['flex flex-col items-center gap-4 sm:flex-row sm:justify-center', className]}>
  {/* Primary CTA - External App Redirect */}
  <Button
    variant="default"
    size="xl"
    asChild
    className="w-full sm:w-auto"
  >
    <a
      href={primaryUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {t('hero.cta.primary')}
    </a>
  </Button>

  {/* Secondary CTA - Scroll to Pricing */}
  <Button
    variant="outline"
    size="xl"
    asChild
    className="w-full border-white/50 text-white hover:bg-white/10 hover:text-white sm:w-auto"
  >
    <a href="#pricing">
      {t('hero.cta.secondary')}
    </a>
  </Button>
</div>
```

**Button Sizes Reference (from button.tsx):**
```typescript
size: {
  default: 'h-10 px-4 py-2',      // 40px height
  sm: 'h-9 rounded-md px-3',       // 36px height
  lg: 'h-12 rounded-md px-8',      // 48px height - meets 44px minimum
  xl: 'h-14 rounded-lg px-10',     // 56px height - exceeds 44px minimum
  icon: 'h-10 w-10',
}
```

**Integration in HeroSection:**
```astro
---
// src/pages/fr/index.astro (or en/es)
import HeroCTA from '@/components/sections/HeroCTA.astro';
---

<HeroSection>
  <HeroCTA primaryUrl="https://app.example.com" />
</HeroSection>
```

**OR direct integration without separate component:**
```astro
<!-- In HeroSection.astro - replace existing slot usage -->
<HeroSection>
  <a
    href="https://app.example.com"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex h-14 items-center justify-center rounded-lg bg-primary-500 px-10 text-lg font-medium text-white shadow transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  >
    {t('hero.cta.primary')}
  </a>
  <a
    href="#pricing"
    class="inline-flex h-14 items-center justify-center rounded-lg border border-white/50 bg-transparent px-10 text-lg font-medium text-white shadow transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  >
    {t('hero.cta.secondary')}
  </a>
</HeroSection>
```

### Critical Rules (from architecture.md & project-context.md)

**DO:**
- Use `.astro` extension (HeroCTA has no complex interactivity)
- Use Button shadcn/ui component with `asChild` prop for `<a>` links
- Use size="xl" (h-14 = 56px) to exceed 44px touch target minimum
- Use `target="_blank"` with `rel="noopener noreferrer"` for external links
- Use anchor link `#pricing` for smooth scroll to pricing section
- Use i18n translations for CTA text (`t('hero.cta.primary')`)
- Ensure white text on Hero background has sufficient contrast
- Stack vertically on mobile, horizontal on desktop

**DON'T:**
- DON'T use React (.tsx) for this component (no state/interactivity needed)
- DON'T use client directive (zero JS preferred for CTAs)
- DON'T use size="default" or "sm" (too small for touch targets)
- DON'T hardcode CTA text (use i18n translations)
- DON'T forget `rel="noopener noreferrer"` for security
- DON'T use inline styles except for Hero-specific overrides

### Accessibility Requirements

**Touch Targets:**
- Minimum 44x44px for touch accessibility (WCAG 2.5.5)
- Button size="xl" provides h-14 (56px) height
- Full width on mobile ensures horizontal touch target

**Focus States:**
- Button component includes focus-visible ring by default
- Ring must be visible on dark Hero background
- May need to adjust ring-offset color for visibility

**Keyboard Navigation:**
- Buttons are focusable via Tab key
- Enter/Space activates the button/link
- Focus order: Primary CTA → Secondary CTA

**Screen Readers:**
- Links have meaningful text (CTA labels)
- External link should indicate opens in new tab (optional aria-label)

### Smooth Scroll Configuration

The smooth scroll behavior is already configured in CSS (from Epic 1):
```css
/* In global.css or html element */
html {
  scroll-behavior: smooth;
}
```

The offset for the sticky header (80px) is handled by CSS:
```css
/* Scroll padding for sticky header */
html {
  scroll-padding-top: 5rem; /* 80px */
}
```

**Verify in global.css that scroll-padding-top is set.**

### External App URL

**Placeholder URL:** `https://app.example.com`

This should be replaced with the actual SPA app URL. Consider:
- Using environment variable: `PUBLIC_APP_URL`
- Or hardcoding if URL is stable

**astro.config.mjs consideration:**
```javascript
// If using env variable
import { defineConfig } from 'astro/config';

export default defineConfig({
  // ...
  vite: {
    define: {
      'import.meta.env.PUBLIC_APP_URL': JSON.stringify(process.env.PUBLIC_APP_URL || 'https://app.example.com')
    }
  }
});
```

### Performance Considerations

**Zero JavaScript:**
- HeroCTA is pure Astro/HTML - no client-side JS
- Button component is only used for styling (asChild renders `<a>`)
- Smooth scroll uses CSS `scroll-behavior: smooth`

**Bundle Impact:**
- No additional JS bundle size
- Button styles are already in the CSS (from shadcn/ui setup)

### Project Structure Notes

**Option A - Separate HeroCTA Component:**
- Create: `src/components/sections/HeroCTA.astro`
- Use: via slot in HeroSection

**Option B - Direct Integration:**
- Modify: `src/components/sections/HeroSection.astro` directly
- Add CTAs inside the existing flex container

**Recommended: Option A** - Keeps HeroSection cleaner and follows the pattern established (slot for CTAs mentioned in Story 2.1 notes).

**Files to create:**
- `src/components/sections/HeroCTA.astro` - CTA buttons component

**Files to modify:**
- `src/pages/fr/index.astro` - Add HeroCTA to HeroSection slot
- `src/pages/en/index.astro` - Add HeroCTA to HeroSection slot
- `src/pages/es/index.astro` - Add HeroCTA to HeroSection slot

### Testing Requirements

**Validation Criteria:**
1. CTA primaire "Essayer gratuitement" visible and styled as primary button
2. CTA secondaire "Voir les offres" visible and styled as outline/secondary button
3. Click CTA primaire → opens external app URL in new tab
4. Click CTA secondaire → smooth scrolls to #pricing section
5. Touch targets >= 44px (h-14 = 56px height)
6. Focus states visible when tabbing through CTAs
7. Text translates correctly for FR/EN/ES
8. Layout: stacked vertically on mobile, horizontal on desktop
9. `npm run build` passes
10. Visual contrast sufficient on dark Hero background

### Potential Blockers

- **Pricing section not yet implemented:** The anchor scroll `#pricing` may not work until Story 4.3 (Pricing Section) is implemented. For now, ensure the link is correct - it will work once the section exists.
- **App URL unknown:** Placeholder URL used until actual SPA app URL is provided by Guillaume.

### External Dependencies

- shadcn/ui Button component (already installed)
- Existing i18n translations (already exist in fr.ts/en.ts/es.ts)

### References

- [Source: architecture.md#Hero-Section] - FR8, FR9, FR34 specs
- [Source: architecture.md#Component-Organization] - sections/ folder
- [Source: ux-design-specification.md#CTA-Design] - CTA patterns
- [Source: epics.md#Story-2.3] - Story requirements and ACs
- [Source: button.tsx] - Button variants and sizes

---

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build output: 7 pages built in 671ms
- ESLint: passed (0 errors, 0 warnings)
- No additional JS bundle size (pure Astro/HTML component)

### Completion Notes List

1. **HeroCTA.astro created** - Pure Astro component using Tailwind classes directly (asChild pattern doesn't work in non-hydrated Astro)
2. **Primary CTA implemented** - External link with target="_blank" and rel="noopener noreferrer" for security
3. **Secondary CTA implemented** - Anchor link to #pricing with customized outline style for dark background
4. **scroll-padding-top added** - 5rem (80px) offset in global.css for sticky header smooth scroll
5. **Touch targets validated** - h-14 (56px) exceeds minimum 44px requirement
6. **Focus states validated** - focus-visible:ring-2 applied for keyboard accessibility
7. **i18n verified** - FR: "Essayer gratuitement" / "Voir les offres", EN: "Try for free" / "See offers", ES: "Probar gratis" / "Ver ofertas"
8. **Responsive layout** - flex-col on mobile, flex-row on sm+ breakpoint
9. **Integration complete** - HeroCTA added to fr/en/es index pages via HeroSection slot
10. **Code Review Fix M2** - Added localized sr-only span for external link accessibility (FR/EN/ES)
11. **Code Review Fix M3** - Changed focus ring from ring-ring to ring-white with ring-offset-black/50 for visibility on dark background

### File List

**Created:**
- `src/components/sections/HeroCTA.astro` - CTA buttons component with i18n support

**Modified:**
- `src/styles/global.css` - Added scroll-padding-top: 5rem for sticky header offset
- `src/pages/fr/index.astro` - Added HeroCTA import and integration
- `src/pages/en/index.astro` - Added HeroCTA import and integration
- `src/pages/es/index.astro` - Added HeroCTA import and integration

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-19 | Story created with comprehensive context from Stories 2.1, 2.2 and architecture specs | create-story workflow |
| 2026-01-19 | Implementation completed - all 6 tasks done. Used Tailwind classes directly instead of Button asChild (Astro limitation). Added scroll-padding-top for smooth scroll offset. | dev-story workflow |
| 2026-01-19 | Code review fixes applied - M2: Added localized sr-only text for external link accessibility, M3: Changed focus ring to ring-white for visibility on dark background | code-review workflow |
