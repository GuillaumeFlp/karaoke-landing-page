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
  proposition: {
    title: 'Plus qu\'un karaoké',
    subtitle:
      'Une plateforme d\'animation complète pour tous vos événements. Karaoké, Blind Test, Quiz : trois expériences, une seule application.',
    modes: {
      karaoke: {
        title: 'Karaoké',
        description:
          'Des milliers de titres pour chanter seul ou en groupe. Paroles synchronisées, scoring en temps réel.',
      },
      blindtest: {
        title: 'Blind Test',
        description:
          'Testez vos connaissances musicales avec vos amis. Des dizaines de playlists thématiques.',
      },
      quiz: {
        title: 'Quiz Musical',
        description:
          'Questions variées sur les artistes, les paroles et l\'histoire de la musique.',
      },
    },
  },
  ctaFinal: {
    title: 'Prêt à animer votre prochaine soirée ?',
    subtitle:
      'Rejoignez des milliers d\'utilisateurs qui transforment leurs événements en moments inoubliables.',
    button: 'Essayer gratuitement',
    noCard: 'Sans carte bancaire • Annulez quand vous voulez',
  },
} as const;

export type TranslationSchema = typeof fr;
