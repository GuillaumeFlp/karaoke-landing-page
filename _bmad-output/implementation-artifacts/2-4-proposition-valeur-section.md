# Story 2.4: Proposition de Valeur Section

Status: done

## Story

**As a** visiteur,
**I want** comprendre que c'est plus qu'un simple karaoké,
**So that** je perçois la valeur complète de la plateforme.

## Acceptance Criteria

1. **Given** je scroll après le Hero **When** j'arrive sur la section Proposition **Then** les 3 modes sont présentés visuellement (Karaoké, Blind Test, Quiz)
2. **Given** je regarde les 3 modes **When** j'observe chaque carte **Then** chaque mode a une icône distinctive et un titre clair
3. **Given** je lis le contenu **When** je comprends le message **Then** le message "plateforme multi-jeux, pas juste karaoké" est communiqué
4. **Given** je suis sur la section **When** je regarde le layout **Then** la section utilise le SectionWrapper avec fond approprié (variant="muted")
5. **Given** je suis sur mobile **When** je regarde le layout **Then** les 3 cartes sont stackées verticalement
6. **Given** je suis sur desktop **When** je regarde le layout **Then** les 3 cartes sont affichées en 3 colonnes côte à côte
7. **Given** je suis sur une version FR/EN/ES **When** je lis le contenu **Then** le titre de section, les noms des modes et les descriptions sont traduits

## Tasks / Subtasks

- [x] Task 1: Ajouter les traductions i18n pour la section (AC: 7)
  - [x] 1.1: Ajouter les clés `proposition.title`, `proposition.subtitle` dans fr.ts
  - [x] 1.2: Ajouter les clés `proposition.modes.karaoke.{title,description,icon}` dans fr.ts
  - [x] 1.3: Ajouter les clés `proposition.modes.blindtest.{title,description,icon}` dans fr.ts
  - [x] 1.4: Ajouter les clés `proposition.modes.quiz.{title,description,icon}` dans fr.ts
  - [x] 1.5: Dupliquer les traductions dans en.ts avec traductions anglaises
  - [x] 1.6: Dupliquer les traductions dans es.ts avec traductions espagnoles

- [x] Task 2: Créer le composant ModeCard.astro (AC: 2)
  - [x] 2.1: Créer `src/components/shared/ModeCard.astro` avec props: icon, title, description
  - [x] 2.2: Utiliser classes Tailwind équivalentes (bg-white rounded-xl shadow)
  - [x] 2.3: Icônes SVG inline (size 48px, couleur primary-500, aria-hidden="true")
  - [x] 2.4: Le titre en font-semibold text-xl, description en text-muted-foreground
  - [x] 2.5: Hover effect subtil (shadow-lg on hover, transition-shadow duration-300)

- [x] Task 3: Créer le composant PropositionSection.astro (AC: 1, 3, 4, 5, 6)
  - [x] 3.1: Créer `src/components/sections/PropositionSection.astro`
  - [x] 3.2: Utiliser SectionWrapper avec variant="muted" et id="features"
  - [x] 3.3: Utiliser Container pour centrer le contenu
  - [x] 3.4: Ajouter titre H2 `t('proposition.title')` centré
  - [x] 3.5: Ajouter sous-titre `t('proposition.subtitle')` avec message "multi-jeux"
  - [x] 3.6: Créer grille responsive: `grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8`
  - [x] 3.7: Instancier 3 ModeCard avec les données traduites (karaoke, blindtest, quiz)

- [x] Task 4: Choisir et intégrer les icônes (AC: 2)
  - [x] 4.1: Icône Karaoké: Microphone SVG (lucide-style)
  - [x] 4.2: Icône Blind Test: Headphones SVG (lucide-style)
  - [x] 4.3: Icône Quiz: HelpCircle SVG (lucide-style)
  - [x] 4.4: SVG inline choisi pour zero-JS pattern

- [x] Task 5: Intégrer PropositionSection dans les pages index (AC: 1, 4, 5, 6)
  - [x] 5.1: Importer PropositionSection dans `src/pages/fr/index.astro`
  - [x] 5.2: Placer PropositionSection après HeroSection (section id="features")
  - [x] 5.3: Répéter pour `src/pages/en/index.astro`
  - [x] 5.4: Répéter pour `src/pages/es/index.astro`
  - [x] 5.5: Anchor link #features fonctionne depuis la navigation ✓

- [x] Task 6: Valider build et fonctionnalité (AC: 1-7)
  - [x] 6.1: `npm run build` réussi (7 pages, 739ms)
  - [x] 6.2: Layout responsive vérifié (grid-cols-1 mobile, md:grid-cols-3 desktop)
  - [x] 6.3: Traductions FR/EN/ES vérifiées dans le HTML output
  - [x] 6.4: Icônes SVG affichées correctement avec aria-hidden="true"
  - [x] 6.5: Cartes non-interactives (pas de focus states requis)

## Dev Notes

### Architecture Requirements

**From architecture.md - Proposition de Valeur:**
```
FR10: Présentation des 3 modes (Karaoké, Blind Test, Quiz)
FR11: Message "plateforme multi-jeux, pas juste karaoké"
```

**From architecture.md - Component Organization:**
```
src/components/sections/PropositionSection.astro  # Section landing
src/components/shared/ModeCard.astro              # Carte mode réutilisable (ou inline)
```

**From architecture.md - SectionWrapper:**
```
variant: 'default' | 'muted' | 'primary' | 'gradient'
→ Utiliser 'muted' pour différencier du Hero (qui a fond sombre)
```

### Previous Epic Intelligence (Stories 2.1-2.3)

**Patterns établis à réutiliser:**

1. **SectionWrapper usage (from Landing structure):**
```astro
<SectionWrapper variant="muted" id="features">
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
<h2>{t('proposition.title')}</h2>
```

3. **Container usage:**
```astro
import Container from '@/components/layout/Container.astro';
<Container>
  <div class="max-w-6xl mx-auto">...</div>
</Container>
```

4. **Responsive grid pattern (from planned architecture):**
```css
grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8
```

### Technical Specifications

**PropositionSection Component Structure:**
```astro
---
/**
 * PropositionSection - Présente les 3 modes de la plateforme
 * Karaoké, Blind Test, Quiz
 */
import SectionWrapper from '@/components/layout/SectionWrapper.astro';
import Container from '@/components/layout/Container.astro';
import ModeCard from '@/components/shared/ModeCard.astro';
import { useTranslations } from '@/i18n';

const currentLocale = Astro.currentLocale || 'fr';
const t = useTranslations(currentLocale);

const modes = [
  {
    icon: 'karaoke', // ou inline SVG
    title: t('proposition.modes.karaoke.title'),
    description: t('proposition.modes.karaoke.description'),
  },
  {
    icon: 'blindtest',
    title: t('proposition.modes.blindtest.title'),
    description: t('proposition.modes.blindtest.description'),
  },
  {
    icon: 'quiz',
    title: t('proposition.modes.quiz.title'),
    description: t('proposition.modes.quiz.description'),
  },
];
---

<SectionWrapper variant="muted" id="features">
  <Container>
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        {t('proposition.title')}
      </h2>
      <p class="text-lg text-muted-600 max-w-2xl mx-auto">
        {t('proposition.subtitle')}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {modes.map((mode) => (
        <ModeCard
          icon={mode.icon}
          title={mode.title}
          description={mode.description}
        />
      ))}
    </div>
  </Container>
</SectionWrapper>
```

**ModeCard Component Structure:**
```astro
---
/**
 * ModeCard - Carte présentant un mode de jeu
 */
interface Props {
  icon: 'karaoke' | 'blindtest' | 'quiz';
  title: string;
  description: string;
  class?: string;
}

const { icon, title, description, class: className } = Astro.props;

// Mapping icône → SVG inline (ou Lucide component)
const iconMap = {
  karaoke: 'Microphone',
  blindtest: 'Headphones',
  quiz: 'HelpCircle',
};
---

<div class:list={[
  'bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300',
  'flex flex-col items-center text-center',
  className
]}>
  <!-- Icon placeholder - implement with Lucide or SVG -->
  <div class="w-16 h-16 mb-4 flex items-center justify-center text-primary-500">
    <!-- SVG icon here -->
  </div>

  <h3 class="text-xl font-semibold mb-2">{title}</h3>
  <p class="text-muted-600">{description}</p>
</div>
```

**Translation Structure (fr.ts example):**
```typescript
proposition: {
  title: 'Plus qu'un karaoké',
  subtitle: 'Une plateforme d'animation complète pour tous vos événements. Karaoké, Blind Test, Quiz : trois expériences, une seule application.',
  modes: {
    karaoke: {
      title: 'Karaoké',
      description: 'Des milliers de titres pour chanter seul ou en groupe. Paroles synchronisées, scoring en temps réel.',
    },
    blindtest: {
      title: 'Blind Test',
      description: 'Testez vos connaissances musicales avec vos amis. Des dizaines de playlists thématiques.',
    },
    quiz: {
      title: 'Quiz Musical',
      description: 'Questions variées sur les artistes, les paroles et l'histoire de la musique.',
    },
  },
},
```

### Critical Rules (from architecture.md & project-context.md)

**DO:**
- Utiliser `.astro` pour PropositionSection et ModeCard (pas d'interactivité)
- Utiliser SectionWrapper avec variant="muted" pour différencier du Hero sombre
- Utiliser Container pour le centrage et les marges responsive
- Les icônes doivent être accessibles (aria-hidden="true" si décoratives)
- Suivre le naming convention PascalCase pour les composants
- Utiliser les design tokens Tailwind existants (primary-500, muted-600, etc.)

**DON'T:**
- Ne PAS utiliser React (.tsx) pour ces composants (pas d'état/interactivité)
- Ne PAS hardcoder le texte (utiliser i18n)
- Ne PAS utiliser un carousel ou slider pour les modes
- Ne PAS ajouter de liens/CTAs dans cette section (c'est informatif)
- Ne PAS utiliser d'animations complexes (seulement hover subtil)

### Accessibility Requirements

**Semantic Structure:**
- H2 pour le titre de section (hiérarchie après H1 Hero)
- Structure claire: section > heading + grid > cards

**Visual Accessibility:**
- Icônes décoratives avec aria-hidden="true"
- Contraste texte suffisant (text-muted-600 sur bg-white)
- Focus visible si les cartes deviennent interactives (future story)

### Icon Options

**Option A - Lucide React (si déjà installé):**
```tsx
import { Mic2, Headphones, HelpCircle } from 'lucide-react';
// Nécessite client:load ou client:visible
```

**Option B - SVG inline (recommandé pour zero JS):**
```astro
<!-- Mic SVG -->
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
  <line x1="12" x2="12" y1="19" y2="22"/>
</svg>
```

**Option C - @astrojs/icon package:**
```bash
npx astro add icon
```
```astro
import { Icon } from 'astro-icon/components';
<Icon name="lucide:mic" size={48} />
```

**Recommandation:** Option B (SVG inline) pour maintenir le zero-JS pattern établi.

### Performance Considerations

**Zero JavaScript:**
- PropositionSection et ModeCard sont pure Astro/HTML
- Pas de client directive nécessaire
- Icônes SVG inline = pas de JS supplémentaire

**CSS:**
- Utiliser les classes Tailwind existantes
- Hover effects avec CSS transitions (pas de JS)
- Grid responsive natif CSS

### Project Structure Notes

**Files to create:**
- `src/components/sections/PropositionSection.astro`
- `src/components/shared/ModeCard.astro` (optionnel, peut être inline dans PropositionSection)

**Files to modify:**
- `src/i18n/fr.ts` - Ajouter clés proposition.*
- `src/i18n/en.ts` - Ajouter clés proposition.*
- `src/i18n/es.ts` - Ajouter clés proposition.*
- `src/pages/fr/index.astro` - Intégrer PropositionSection
- `src/pages/en/index.astro` - Intégrer PropositionSection
- `src/pages/es/index.astro` - Intégrer PropositionSection

### Testing Requirements

**Validation Criteria:**
1. 3 modes affichés (Karaoké, Blind Test, Quiz)
2. Chaque mode a icône + titre + description
3. Layout responsive vérifié (mobile stack, desktop 3 cols)
4. Traductions correctes en FR/EN/ES
5. Section a id="features" pour anchor link
6. SectionWrapper variant="muted" appliqué
7. `npm run build` réussit
8. Accessibilité: icônes décoratives aria-hidden

### Potential Blockers

- **Icônes:** Décider entre SVG inline, Lucide ou @astrojs/icon. Recommandation: SVG inline pour simplicité et performance.
- **Container existant:** Vérifier que Container.astro applique bien max-w et padding.

### External Dependencies

- Aucune nouvelle dépendance requise si SVG inline
- Si @astrojs/icon choisi, nécessite installation

### References

- [Source: architecture.md#Proposition-de-Valeur] - FR10, FR11 specs
- [Source: architecture.md#Component-Organization] - sections/ folder structure
- [Source: ux-design-specification.md#Core-User-Experience] - "Show, Don't Tell" principle
- [Source: epics.md#Story-2.4] - Story requirements and ACs
- [Source: SectionWrapper.astro] - Variants available (default, muted, primary, gradient)

---

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build output: 7 pages built in 739ms
- No additional JS bundle size (pure Astro/HTML components with SVG inline)
- Zero client directives used (zero-JS pattern maintained)

### Completion Notes List

1. **Traductions i18n ajoutées** - Clés proposition.* ajoutées dans fr.ts, en.ts, es.ts
2. **ModeCard.astro créé** - Composant réutilisable avec icônes SVG inline
3. **PropositionSection.astro créé** - Section utilisant SectionWrapper variant="muted"
4. **Icônes SVG inline** - Microphone, Headphones, HelpCircle (lucide-style) pour zero-JS
5. **Integration complète** - Section intégrée dans fr/en/es index pages
6. **Layout responsive** - grid-cols-1 mobile, md:grid-cols-3 desktop vérifié
7. **Accessibilité** - aria-hidden="true" sur icônes décoratives

### File List

**Created:**
- `src/components/shared/ModeCard.astro` - Carte mode réutilisable avec icônes SVG
- `src/components/sections/PropositionSection.astro` - Section proposition de valeur

**Modified:**
- `src/i18n/fr.ts` - Ajout clés proposition.*
- `src/i18n/en.ts` - Ajout clés proposition.*
- `src/i18n/es.ts` - Ajout clés proposition.*
- `src/pages/fr/index.astro` - Import et intégration PropositionSection
- `src/pages/en/index.astro` - Import et intégration PropositionSection
- `src/pages/es/index.astro` - Import et intégration PropositionSection
- `src/styles/global.css` - Ajout token `--color-muted-foreground` (code review fix)

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-19 | Story created with comprehensive context from Epic 2, architecture, and UX specs | create-story workflow |
| 2026-01-19 | Implementation completed - all 6 tasks done. Used SVG inline for zero-JS pattern. Section with 3 mode cards integrated in all language pages. | dev-story workflow |
| 2026-01-20 | Code review completed. Fixed HIGH severity issue: added missing `--color-muted-foreground` design token to global.css. | code-review workflow |
