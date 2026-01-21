/**
 * English translations
 * Structure uses dot notation for hierarchical access
 */
import type { TranslationSchema } from './fr';

export const en: TranslationSchema = {
  meta: {
    title: 'Karaoke - Sing. Play. Vibe.',
    description:
      'The karaoke, blind test and quiz platform for your parties.',
  },
  nav: {
    home: 'Home',
    hero: 'Home',
    features: 'Features',
    pricing: 'Pricing',
    faq: 'FAQ',
    contact: 'Contact',
    catalogue: 'Catalogue',
  },
  hero: {
    title: 'Sing. Play. Vibe.',
    subtitle:
      'The all-in-one platform for your karaoke nights, blind tests and music quizzes.',
    cta: {
      primary: 'Try for free',
      secondary: 'See offers',
    },
  },
  footer: {
    copyright: 'All rights reserved.',
    legal: 'Legal Notice',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
  },
  a11y: {
    skipLink: 'Skip to main content',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    languageSwitch: 'Change language',
  },
  demo: {
    checklistTitle: 'Setup Checklist',
  },
  languages: {
    fr: 'Français',
    en: 'English',
    es: 'Español',
  },
  proposition: {
    title: 'More than karaoke',
    subtitle:
      'A complete entertainment platform for all your events. Karaoke, Blind Test, Quiz: three experiences, one application.',
    modes: {
      karaoke: {
        title: 'Karaoke',
        description:
          'Thousands of songs to sing solo or in groups. Synchronized lyrics, real-time scoring.',
      },
      blindtest: {
        title: 'Blind Test',
        description:
          'Test your music knowledge with friends. Dozens of themed playlists.',
      },
      quiz: {
        title: 'Music Quiz',
        description:
          'Various questions about artists, lyrics and music history.',
      },
    },
  },
  ctaFinal: {
    title: 'Ready to host your next party?',
    subtitle:
      'Join thousands of users who transform their events into unforgettable moments.',
    button: 'Try for free',
    noCard: 'No credit card required • Cancel anytime',
  },
} as const;
