# Story 2.5: CTA Final Section

Status: done

## Story

**As a** visiteur ayant scrollé la page,
**I want** avoir un dernier appel à l'action clair,
**So that** je peux convertir après avoir consulté tout le contenu.

## Acceptance Criteria

1. **Given** j'ai scrollé jusqu'en bas de la landing page **When** j'arrive à la section CTA finale **Then** un CTA "Essayer gratuitement" est visible
2. **Given** je regarde la section CTA finale **When** je lis le contenu **Then** le message "sans carte bancaire" est affiché près du CTA
3. **Given** je regarde la section CTA finale **When** j'observe le design **Then** le fond est en couleur primaire (gradient) pour attirer l'attention
4. **Given** je clique sur le CTA "Essayer gratuitement" **When** l'action s'exécute **Then** je suis redirigé vers l'app SPA freemium
5. **Given** je suis sur une version FR/EN/ES **When** je lis la section CTA finale **Then** le texte est traduit dans ma langue

## Tasks / Subtasks

- [x] Task 1: Ajouter les traductions i18n pour la section (AC: 5)
  - [x] 1.1: Ajouter les clés `ctaFinal.title`, `ctaFinal.subtitle`, `ctaFinal.button`, `ctaFinal.noCard` dans fr.ts
  - [x] 1.2: Dupliquer les traductions dans en.ts avec traductions anglaises
  - [x] 1.3: Dupliquer les traductions dans es.ts avec traductions espagnoles

- [x] Task 2: Créer le composant CTAFinalSection.astro (AC: 1, 2, 3)
  - [x] 2.1: Créer `src/components/sections/CTAFinalSection.astro`
  - [x] 2.2: Utiliser SectionWrapper avec variant="gradient" pour le fond
  - [x] 2.3: Ajouter titre accrocheur centré (H2)
  - [x] 2.4: Ajouter sous-titre/message de valeur
  - [x] 2.5: Ajouter mention "Sans carte bancaire" visible près du CTA
  - [x] 2.6: Utiliser Container pour centrer le contenu

- [x] Task 3: Implémenter le CTA button (AC: 1, 4)
  - [x] 3.1: Utiliser les classes button établies dans HeroCTA (buttonBase + sizeXl)
  - [x] 3.2: Lien vers app SPA externe (target="_blank", rel="noopener noreferrer")
  - [x] 3.3: Touch target minimum 44px (h-14 = 56px)
  - [x] 3.4: Focus states visibles (ring-2 ring-offset-2)
  - [x] 3.5: Screen reader text pour lien externe

- [x] Task 4: Intégrer CTAFinalSection dans les pages index (AC: 1, 3, 5)
  - [x] 4.1: Importer CTAFinalSection dans `src/pages/fr/index.astro`
  - [x] 4.2: Placer CTAFinalSection avant le Footer (après les sections existantes)
  - [x] 4.3: Répéter pour `src/pages/en/index.astro`
  - [x] 4.4: Répéter pour `src/pages/es/index.astro`

- [x] Task 5: Valider build et fonctionnalité (AC: 1-5)
  - [x] 5.1: `npm run build` réussi (7 pages, 693ms)
  - [x] 5.2: Traductions FR/EN/ES vérifiées dans le HTML output
  - [x] 5.3: Lien externe fonctionne correctement (target="_blank" rel="noopener noreferrer")
  - [x] 5.4: Focus states accessibles vérifiés (ring-2 ring-primary-700 ring-offset-2)

## Dev Notes

### Architecture Requirements

**From architecture.md - Conversion:**
```
FR32: CTA final en bas de page
FR33: Clic CTA → app freemium
FR34: Redirection vers app SPA existante
```

**From architecture.md - SectionWrapper:**
```
variant: 'default' | 'muted' | 'primary' | 'gradient'
→ Utiliser 'gradient' pour attirer l'attention (bg-gradient-to-br from-primary-50 to-secondary-50)
```

**From architecture.md - Component Organization:**
```
src/components/sections/CTAFinalSection.astro  # Section CTA finale
```

### Previous Story Intelligence (Story 2.4)

**Patterns établis à réutiliser:**

1. **SectionWrapper usage:**
```astro
<SectionWrapper variant="gradient">
  <Container>
    <!-- Content -->
  </Container>
</SectionWrapper>
```

2. **Translation pattern:**
```astro
---
import { useTranslations } from '@/i18n';
const currentLocale = Astro.currentLocale || 'fr';
const t = useTranslations(currentLocale);
---
<h2>{t('ctaFinal.title')}</h2>
```

3. **Button styling from HeroCTA.astro:**
```astro
// Button base classes (from buttonVariants)
const buttonBase = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2';

// Size xl classes (h-14 = 56px, exceeds 44px touch target)
const sizeXl = 'h-14 px-10 text-lg';

// Primary variant classes
const primaryClasses = `${buttonBase} ${sizeXl} bg-primary-500 text-white shadow hover:bg-primary-600`;
```

### Technical Specifications

**CTAFinalSection Component Structure:**
```astro
---
/**
 * CTAFinalSection - Final call-to-action before footer
 * Gradient background to attract attention
 * Links to external SPA app
 */
import SectionWrapper from '@/components/layout/SectionWrapper.astro';
import Container from '@/components/layout/Container.astro';
import { useTranslations } from '@/i18n';

interface Props {
  appUrl?: string;
  class?: string;
}

const {
  appUrl = 'https://app.example.com', // TODO: Replace with actual app URL
  class: className,
} = Astro.props;

const currentLocale = Astro.currentLocale || 'fr';
const t = useTranslations(currentLocale);

// Button classes (reuse pattern from HeroCTA)
const buttonBase = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2';
const sizeXl = 'h-14 px-10 text-lg';
const primaryClasses = `${buttonBase} ${sizeXl} bg-primary-500 text-white shadow-lg hover:bg-primary-600`;
---

<SectionWrapper variant="gradient" class={className}>
  <Container>
    <div class="text-center py-8">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        {t('ctaFinal.title')}
      </h2>
      <p class="text-lg text-muted-700 max-w-2xl mx-auto mb-8">
        {t('ctaFinal.subtitle')}
      </p>

      <a
        href={appUrl}
        target="_blank"
        rel="noopener noreferrer"
        class={primaryClasses}
      >
        {t('ctaFinal.button')}
        <span class="sr-only">
          {currentLocale === 'fr' ? '(ouvre dans un nouvel onglet)' :
           currentLocale === 'es' ? '(abre en una nueva pestaña)' :
           '(opens in a new tab)'}
        </span>
      </a>

      <p class="mt-4 text-sm text-muted-600">
        {t('ctaFinal.noCard')}
      </p>
    </div>
  </Container>
</SectionWrapper>
```

**Translation Structure (fr.ts example):**
```typescript
ctaFinal: {
  title: 'Prêt à animer votre prochaine soirée ?',
  subtitle: 'Rejoignez des milliers d\'utilisateurs qui transforment leurs événements en moments inoubliables.',
  button: 'Essayer gratuitement',
  noCard: 'Sans carte bancaire • Annulez quand vous voulez',
},
```

**Translation Structure (en.ts):**
```typescript
ctaFinal: {
  title: 'Ready to host your next party?',
  subtitle: 'Join thousands of users who transform their events into unforgettable moments.',
  button: 'Try for free',
  noCard: 'No credit card required • Cancel anytime',
},
```

**Translation Structure (es.ts):**
```typescript
ctaFinal: {
  title: '¿Listo para animar tu próxima fiesta?',
  subtitle: 'Únete a miles de usuarios que transforman sus eventos en momentos inolvidables.',
  button: 'Probar gratis',
  noCard: 'Sin tarjeta de crédito • Cancela cuando quieras',
},
```

### Critical Rules (from architecture.md & project-context.md)

**DO:**
- Utiliser `.astro` pour CTAFinalSection (pas d'interactivité)
- Utiliser SectionWrapper avec variant="gradient" pour différencier visuellement
- Utiliser Container pour le centrage et les marges responsive
- Réutiliser les classes button de HeroCTA pour la cohérence
- Ajouter `target="_blank"` et `rel="noopener noreferrer"` pour les liens externes
- Ajouter screen reader text pour indiquer que le lien ouvre un nouvel onglet
- Suivre le naming convention PascalCase pour les composants
- Utiliser les design tokens Tailwind existants (primary-500, muted-600, etc.)

**DON'T:**
- Ne PAS utiliser React (.tsx) pour ce composant (pas d'état/interactivité)
- Ne PAS hardcoder le texte (utiliser i18n)
- Ne PAS oublier le message "sans carte bancaire"
- Ne PAS utiliser d'animations complexes
- Ne PAS oublier les focus states pour l'accessibilité

### Accessibility Requirements

**Semantic Structure:**
- H2 pour le titre de section (hiérarchie cohérente)
- Structure claire: section > heading + content + cta

**Link Accessibility:**
- Screen reader text pour indiquer lien externe
- Focus visible sur le CTA button (ring-2 ring-offset-2)
- Touch target minimum 44px (h-14 = 56px)

**Contrast:**
- Text sur fond gradient doit avoir contraste suffisant
- Utiliser text-muted-700 (pas text-muted-500) pour readability sur fond clair

### Performance Considerations

**Zero JavaScript:**
- CTAFinalSection est pure Astro/HTML
- Pas de client directive nécessaire
- Lien externe simple sans JavaScript

**CSS:**
- Utiliser les classes Tailwind existantes
- Gradient via bg-gradient-to-br (CSS natif)

### Project Structure Notes

**Files to create:**
- `src/components/sections/CTAFinalSection.astro`

**Files to modify:**
- `src/i18n/fr.ts` - Ajouter clés ctaFinal.*
- `src/i18n/en.ts` - Ajouter clés ctaFinal.*
- `src/i18n/es.ts` - Ajouter clés ctaFinal.*
- `src/pages/fr/index.astro` - Intégrer CTAFinalSection
- `src/pages/en/index.astro` - Intégrer CTAFinalSection
- `src/pages/es/index.astro` - Intégrer CTAFinalSection

### Testing Requirements

**Validation Criteria:**
1. CTA "Essayer gratuitement" visible et cliquable
2. Message "Sans carte bancaire" présent près du CTA
3. Fond gradient appliqué (from-primary-50 to-secondary-50)
4. Lien ouvre l'app SPA dans un nouvel onglet
5. Traductions correctes en FR/EN/ES
6. Focus states visibles pour l'accessibilité
7. `npm run build` réussit
8. Touch target >= 44px vérifié

### Potential Blockers

- **URL de l'app SPA:** Actuellement placeholder "https://app.example.com". À confirmer avec le client ou utiliser variable d'environnement.

### External Dependencies

- Aucune nouvelle dépendance requise

### References

- [Source: architecture.md#Conversion] - FR32, FR33, FR34 specs
- [Source: architecture.md#Component-Organization] - sections/ folder structure
- [Source: ux-design-specification.md#Core-User-Experience] - "Show, Don't Tell" principle
- [Source: epics.md#Story-2.5] - Story requirements and ACs
- [Source: SectionWrapper.astro] - Variants available (default, muted, primary, gradient)
- [Source: HeroCTA.astro] - Button styling patterns and accessibility patterns

---

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build output: 7 pages built in 693ms
- No additional JS bundle size (pure Astro/HTML component)
- Zero client directives used (zero-JS pattern maintained)

### Completion Notes List

1. **Traductions i18n ajoutées** - Clés ctaFinal.* ajoutées dans fr.ts, en.ts, es.ts
2. **CTAFinalSection.astro créé** - Section avec SectionWrapper variant="gradient"
3. **CTA button implémenté** - Réutilisation patterns HeroCTA, focus states visibles
4. **Accessibilité** - Screen reader text pour lien externe, touch target 56px (h-14)
5. **Integration complète** - Section intégrée dans fr/en/es index pages
6. **Build validé** - 7 pages, 693ms, traductions vérifiées

### File List

**Created:**
- `src/components/sections/CTAFinalSection.astro` - Section CTA finale avec gradient

**Modified:**
- `src/i18n/fr.ts` - Ajout clés ctaFinal.*
- `src/i18n/en.ts` - Ajout clés ctaFinal.*
- `src/i18n/es.ts` - Ajout clés ctaFinal.*
- `src/pages/fr/index.astro` - Import et intégration CTAFinalSection
- `src/pages/en/index.astro` - Import et intégration CTAFinalSection
- `src/pages/es/index.astro` - Import et intégration CTAFinalSection

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-20 | Story created with comprehensive context from Epic 2, architecture, and UX specs | create-story workflow |
| 2026-01-20 | Implementation completed - all 5 tasks done. CTAFinalSection with gradient background, i18n, and accessibility features integrated in all language pages. | dev-story workflow |
| 2026-01-20 | Code review completed - Fixed 3 issues: (1) text-muted-700 consistency, (2) env variable for app URL, (3) added id="cta" for navigation anchors. Build verified. | code-review workflow |

