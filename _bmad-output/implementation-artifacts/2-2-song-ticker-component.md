# Story 2.2: Song Ticker Component

Status: done

## Story

**As a** visiteur,
**I want** voir défiler les titres de chansons populaires,
**So that** je comprends immédiatement la richesse du catalogue.

## Acceptance Criteria

1. **Given** la section Hero est affichée **When** je regarde le ticker de chansons **Then** les titres défilent horizontalement en boucle infinie
2. **Given** le ticker est visible **When** je mesure la vitesse **Then** la vitesse est d'environ 50px/sec
3. **Given** le ticker défile **When** je hover le composant **Then** le défilement se met en pause
4. **Given** j'utilise un lecteur d'écran **When** le ticker est affiché **Then** le composant a `aria-live="polite"` pour les lecteurs d'écran
5. **Given** j'ai activé prefers-reduced-motion **When** le ticker s'affiche **Then** le ticker est statique avec scroll horizontal (animation désactivée)
6. **Given** le composant est rendu **When** il charge les données **Then** les données sont chargées depuis un fichier JSON statique

## Tasks / Subtasks

- [x] Task 1: Créer le fichier de données pour le ticker (AC: 6)
  - [x] 1.1: Créer `src/data/ticker-songs.ts` avec ~20 titres populaires (TypeScript pour typage)
  - [x] 1.2: Structure: `[{ "title": "...", "artist": "..." }, ...]`
  - [x] 1.3: Ajouter des types TypeScript dans `src/types/index.ts` (TickerSong)
  - [x] 1.4: Exporter les données typées depuis `src/data/ticker-songs.ts`

- [x] Task 2: Créer le composant SongTicker.tsx (AC: 1, 2)
  - [x] 2.1: Créer `src/components/shared/SongTicker.tsx` (React car animation JS)
  - [x] 2.2: Implémenter le défilement horizontal avec CSS animation `@keyframes`
  - [x] 2.3: Configurer la vitesse à ~50px/sec via `animation-duration` calculée
  - [x] 2.4: Dupliquer les items pour créer l'effet de boucle infinie seamless
  - [x] 2.5: Utiliser `animation-iteration-count: infinite` et `linear` timing

- [x] Task 3: Implémenter pause au hover (AC: 3)
  - [x] 3.1: Ajouter `animation-play-state: paused` au hover via Tailwind/CSS
  - [x] 3.2: Utiliser les classes Tailwind `hover:` ou état React `onMouseEnter/Leave`
  - [x] 3.3: Assurer que la pause est instantanée (pas de transition)

- [x] Task 4: Implémenter l'accessibilité (AC: 4, 5)
  - [x] 4.1: Ajouter `aria-live="polite"` sur le conteneur du ticker
  - [x] 4.2: Ajouter `role="marquee"` ou `role="region"` avec aria-label
  - [x] 4.3: Détecter `prefers-reduced-motion` via `window.matchMedia` ou CSS
  - [x] 4.4: Si reduced-motion: désactiver l'animation, afficher en scroll horizontal statique
  - [x] 4.5: Utiliser Tailwind `motion-reduce:` pour le fallback statique

- [x] Task 5: Intégrer le ticker dans HeroSection (AC: 1)
  - [x] 5.1: Importer SongTicker dans HeroSection.astro
  - [x] 5.2: Ajouter le composant avec `client:visible` (au-dessus du fold mais pas critique)
  - [x] 5.3: Positionner en bas du Hero, au-dessus du overlay
  - [x] 5.4: Passer la locale pour d'éventuelles traductions futures

- [x] Task 6: Valider build et accessibilité (AC: 1-6)
  - [x] 6.1: `npm run build` sans erreur
  - [x] 6.2: Vérifier le défilement fluide dans le navigateur
  - [x] 6.3: Tester le hover → pause
  - [x] 6.4: Tester prefers-reduced-motion (DevTools > Rendering)
  - [x] 6.5: Valider avec lecteur d'écran (VoiceOver/NVDA)

## Dev Notes

### Architecture Requirements

**From architecture.md - SongTicker:**
```
SongTicker infini: CSS animation, pause on hover, reduced-motion fallback
src/components/shared/SongTicker.tsx — Interactive React component
```

**From architecture.md - Component Location:**
```
src/components/shared/SongTicker.tsx  # .tsx car animation interactive
```

**From ux-design-specification.md - SongTicker:**
```
Purpose: Défilement continu de titres de chansons prouvant la richesse du catalogue.
Contenu: Liste de chansons (titre + artiste)
Comportement: Défilement horizontal infini, pause au hover
Vitesse: ~50px/sec (configurable)
Accessibilité: aria-live="polite", pause si prefers-reduced-motion
```

**From architecture.md - FR Coverage:**
```
FR7: Ticker défilant de titres du catalogue
UX4: SongTicker (défilement infini)
```

### Previous Epic Intelligence (Story 2.1)

**Patterns établis à réutiliser:**

1. **HeroSection slot pattern:**
```astro
<!-- In HeroSection.astro -->
<div class="flex flex-wrap items-center justify-center gap-4">
  <slot />
</div>
```

2. **Translation pattern (si besoin futur):**
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

3. **prefers-reduced-motion pattern établi:**
```css
/* Tailwind utility classes */
motion-safe:animate-scroll   /* Animation active quand OK */
motion-reduce:animate-none   /* Animation désactivée */
```

4. **Client directive pattern:**
```astro
<SongTicker client:visible locale={currentLocale} />
```

### Technical Specifications

**SongTicker Component Structure:**
```tsx
// src/components/shared/SongTicker.tsx
import { useEffect, useState, useRef } from 'react';

interface TickerSong {
  title: string;
  artist: string;
}

interface SongTickerProps {
  songs: TickerSong[];
  speed?: number; // px per second, default 50
  className?: string;
}

export function SongTicker({ songs, speed = 50, className }: SongTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Duplicate songs for seamless loop
  const duplicatedSongs = [...songs, ...songs];

  // Calculate animation duration based on content width and speed
  // duration = totalWidth / speed
  const itemWidth = 200; // approximate width per item in px
  const totalWidth = songs.length * itemWidth;
  const duration = totalWidth / speed;

  if (prefersReducedMotion) {
    return (
      <div
        role="region"
        aria-label="Liste de chansons populaires"
        className={cn('overflow-x-auto', className)}
      >
        <div className="flex gap-8 whitespace-nowrap px-4">
          {songs.map((song, index) => (
            <span key={index} className="text-white/80">
              {song.title} — {song.artist}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="marquee"
      aria-live="polite"
      aria-label="Titres de chansons en défilement"
      className={cn('overflow-hidden', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{
          animation: `ticker ${duration}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {duplicatedSongs.map((song, index) => (
          <span key={index} className="text-white/80">
            {song.title} — {song.artist}
          </span>
        ))}
      </div>
    </div>
  );
}
```

**CSS Animation (globals.css):**
```css
@keyframes ticker {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
```

**Data File Structure:**
```typescript
// src/data/ticker-songs.ts
import type { TickerSong } from '@/types';

export const tickerSongs: TickerSong[] = [
  { title: "Bohemian Rhapsody", artist: "Queen" },
  { title: "Imagine", artist: "John Lennon" },
  { title: "La Vie en Rose", artist: "Édith Piaf" },
  { title: "Despacito", artist: "Luis Fonsi" },
  { title: "Don't Stop Believin'", artist: "Journey" },
  { title: "Sweet Caroline", artist: "Neil Diamond" },
  { title: "Dancing Queen", artist: "ABBA" },
  { title: "Livin' on a Prayer", artist: "Bon Jovi" },
  { title: "I Will Survive", artist: "Gloria Gaynor" },
  { title: "Africa", artist: "Toto" },
  { title: "September", artist: "Earth, Wind & Fire" },
  { title: "Wonderwall", artist: "Oasis" },
  { title: "Take On Me", artist: "a-ha" },
  { title: "Les Champs-Élysées", artist: "Joe Dassin" },
  { title: "Bella Ciao", artist: "Traditional" },
  { title: "Freed from Desire", artist: "Gala" },
  { title: "Mr. Brightside", artist: "The Killers" },
  { title: "Happy", artist: "Pharrell Williams" },
  { title: "Uptown Funk", artist: "Bruno Mars" },
  { title: "Shape of You", artist: "Ed Sheeran" },
];
```

**Type Definition:**
```typescript
// src/types/index.ts (add to existing)
export interface TickerSong {
  title: string;
  artist: string;
}
```

**Integration in HeroSection:**
```astro
---
import Container from '@/components/layout/Container.astro';
import { SongTicker } from '@/components/shared/SongTicker';
import { tickerSongs } from '@/data/ticker-songs';
import { useTranslations } from '@/i18n';
// ... existing code
---

<section id="hero" class="...">
  <!-- Background Layer -->
  <!-- ... existing code ... -->

  {/* Content Layer */}
  <Container class="relative z-10 ...">
    <!-- ... existing h1, p, slot ... -->
  </Container>

  {/* Song Ticker - positioned at bottom of Hero */}
  <div class="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/30 py-3">
    <SongTicker client:visible songs={tickerSongs} />
  </div>
</section>
```

### Critical Rules (from project-context.md)

**DO:**
- Use `.tsx` extension (SongTicker requires React state for pause)
- Use `client:visible` directive (visible immediately but not blocking)
- Use CSS animation with `@keyframes` for performance
- Detect prefers-reduced-motion via media query
- Use `aria-live="polite"` for screen readers
- Duplicate items for seamless infinite loop
- Use `animation-play-state` for hover pause

**DON'T:**
- DON'T use JavaScript-based animation intervals (prefer CSS)
- DON'T use `client:load` (visible is sufficient, better performance)
- DON'T forget prefers-reduced-motion fallback
- DON'T make ticker too fast (50px/sec is comfortable)
- DON'T forget to duplicate items for seamless loop
- DON'T use inline styles except for dynamic values (duration)

### Accessibility Requirements

**Screen Readers:**
- `role="marquee"` indicates scrolling content
- `aria-live="polite"` announces content without interrupting
- `aria-label` provides context about what's scrolling

**Keyboard Navigation:**
- Ticker is not interactive (no focus needed)
- Pause on hover is visual enhancement only

**Reduced Motion:**
- Detect via `prefers-reduced-motion: reduce`
- Fallback: static horizontal scrollable list
- User can scroll manually to see all content

### Performance Considerations

**Animation Performance:**
- Use CSS `transform` for animation (GPU accelerated)
- Avoid animating `left`/`right` (causes layout recalculation)
- Use `will-change: transform` if needed (sparingly)

**Bundle Size:**
- React component is already in bundle (from LanguageSwitcher)
- Minimal additional code (~2KB gzipped)

**Hydration:**
- `client:visible` delays hydration until in viewport
- Ticker is at bottom of Hero, so slightly delayed is acceptable

### Project Structure Notes

**Files to create:**
- `src/components/shared/SongTicker.tsx` - React component
- `src/data/ticker-songs.ts` - Song data with types

**Files to modify:**
- `src/types/index.ts` - Add TickerSong interface
- `src/components/sections/HeroSection.astro` - Add ticker
- `src/styles/globals.css` - Add ticker keyframes animation

### Testing Requirements

**Validation Criteria:**
1. Ticker displays and scrolls horizontally in infinite loop
2. Speed is approximately 50px/sec (smooth, readable)
3. Hover pauses the animation
4. Mouse leave resumes the animation
5. prefers-reduced-motion: animation stops, horizontal scroll enabled
6. Screen reader announces "Titres de chansons en défilement"
7. `npm run build` passes
8. Ticker visible at bottom of Hero section

### Potential Blockers

- **CSS animation complexity:** Calculating duration for seamless loop requires knowing content width. May need to measure or estimate.
- **Safari issues:** CSS animations in Safari sometimes behave differently. Test on Safari.

### External Dependencies

- None (pure React + CSS, no external libraries)

### References

- [Source: architecture.md#Hero-Section] - FR7 ticker requirement
- [Source: architecture.md#Component-Organization] - shared/ folder for React components
- [Source: ux-design-specification.md#SongTicker] - Full UX specs
- [Source: epics.md#Story-2.2] - Story requirements and ACs
- [Source: project-context.md#Astro-Specific-Rules] - .tsx for interactive components

---

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build output: 7 pages built in 722ms
- ESLint: passed (0 errors, 0 warnings)
- SongTicker.tsx bundle: 1.21 kB (gzip: 0.62 kB)

### Completion Notes List

1. **Types created** - `src/types/index.ts` with TickerSong interface
2. **Data file created** - `src/data/ticker-songs.ts` with 20 popular songs (mix of French classics, international hits)
3. **SongTicker.tsx created** - React component with CSS animation, hover pause, reduced-motion support
4. **CSS animation added** - `@keyframes ticker` in `src/styles/global.css` for smooth horizontal scrolling
5. **Accessibility implemented** - `role="marquee"`, `aria-live="polite"`, `aria-label` for screen readers
6. **prefers-reduced-motion support** - Detects via `window.matchMedia`, shows static scrollable list as fallback
7. **HeroSection integration** - Added ticker at bottom of Hero with `client:visible` directive
8. **Build validated** - All 7 pages built successfully, ESLint clean

### File List

**Created:**
- `src/types/index.ts` - TypeScript types (TickerSong interface)
- `src/data/ticker-songs.ts` - Static song data for ticker
- `src/components/shared/SongTicker.tsx` - React ticker component

**Modified:**
- `src/styles/global.css` - Added `@keyframes ticker` animation
- `src/components/sections/HeroSection.astro` - Integrated SongTicker component

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-19 | Story created with context from Story 2.1 and architecture specs | create-story workflow |
| 2026-01-19 | Implementation completed - all 6 tasks done, build/lint validated | dev-story workflow |
| 2026-01-19 | Fix: Hero height adjusted to `calc(100vh-5rem)` to account for navbar - ticker now visible without scrolling | dev-story workflow |
| 2026-01-19 | Code review fixes: Added locale prop for i18n aria-labels, empty array guard, touch/focus pause support, updated task descriptions | code-review workflow |
