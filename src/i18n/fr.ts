/**
 * French translations
 * Structure uses dot notation for hierarchical access
 */
export const fr = {
  meta: {
    title: 'Karaoke - Chantez. Jouez. Vibrez.',
    description:
      'La plateforme de karaoké, blind test et quiz pour vos soirées.',
  },
  nav: {
    home: 'Accueil',
    hero: 'Accueil',
    features: 'Fonctionnalités',
    pricing: 'Tarifs',
    faq: 'FAQ',
    contact: 'Contact',
    catalogue: 'Catalogue',
  },
  hero: {
    title: 'Chantez. Jouez. Vibrez.',
    subtitle:
      'La plateforme tout-en-un pour vos soirées karaoké, blind tests et quiz musicaux.',
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
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
    languageSwitch: 'Changer de langue',
  },
  demo: {
    checklistTitle: 'Checklist de configuration',
  },
  languages: {
    fr: 'Français',
    en: 'English',
    es: 'Español',
  },
} as const;

export type TranslationSchema = typeof fr;
