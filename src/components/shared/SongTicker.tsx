import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { TickerSong } from '@/types';

interface SongTickerProps {
  songs: TickerSong[];
  speed?: number; // pixels per second, default 50
  className?: string;
  locale?: string; // for i18n aria-labels
}

// Aria labels by locale
const ariaLabels: Record<string, { region: string; marquee: string }> = {
  fr: {
    region: 'Liste de chansons populaires',
    marquee: 'Titres de chansons en défilement',
  },
  en: {
    region: 'List of popular songs',
    marquee: 'Scrolling song titles',
  },
  es: {
    region: 'Lista de canciones populares',
    marquee: 'Títulos de canciones en desplazamiento',
  },
};

/**
 * SongTicker - Infinite horizontal scrolling ticker displaying song titles
 *
 * Features:
 * - CSS animation for smooth, GPU-accelerated scrolling
 * - Pause on hover
 * - prefers-reduced-motion support (static scrollable list)
 * - aria-live for screen readers
 *
 * @example
 * <SongTicker client:visible songs={tickerSongs} />
 */
export function SongTicker({
  songs,
  speed = 50,
  className,
  locale = 'fr',
}: SongTickerProps): JSX.Element | null {
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent): void => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Guard: return null if no songs
  if (songs.length === 0) {
    return null;
  }

  // Get localized aria labels (fallback to French)
  const labels = ariaLabels[locale] || ariaLabels.fr;

  // Duplicate songs for seamless infinite loop effect
  const duplicatedSongs = [...songs, ...songs];

  // Calculate animation duration based on content width and speed
  // Approximate width per item: ~250px (title + artist + gap)
  const itemWidth = 250;
  const totalWidth = songs.length * itemWidth;
  const duration = totalWidth / speed;

  // Reduced motion fallback: static scrollable list
  if (prefersReducedMotion) {
    return (
      <div
        role="region"
        aria-label={labels.region}
        className={cn('overflow-x-auto', className)}
      >
        <div className="flex gap-8 whitespace-nowrap px-4">
          {songs.map((song, index) => (
            <span
              key={`${song.title}-${index}`}
              className="text-sm text-white/80"
            >
              {song.title} — {song.artist}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Animated ticker with pause on hover/focus/touch
  return (
    <div
      role="marquee"
      aria-live="polite"
      aria-label={labels.marquee}
      tabIndex={0}
      className={cn('overflow-hidden', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{
          animation: `ticker ${duration}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {duplicatedSongs.map((song, index) => (
          <span
            key={`${song.title}-${index}`}
            className="text-sm text-white/80"
          >
            {song.title} — {song.artist}
          </span>
        ))}
      </div>
    </div>
  );
}
