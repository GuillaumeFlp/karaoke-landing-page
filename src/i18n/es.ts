/**
 * Spanish translations
 * Structure uses dot notation for hierarchical access
 */
import type { TranslationSchema } from './fr';

export const es: TranslationSchema = {
  meta: {
    title: 'Karaoke - Canta. Juega. Vibra.',
    description:
      'La plataforma de karaoke, blind test y quiz para tus fiestas.',
  },
  nav: {
    home: 'Inicio',
    hero: 'Inicio',
    features: 'Funcionalidades',
    pricing: 'Precios',
    faq: 'FAQ',
    contact: 'Contacto',
    catalogue: 'Catálogo',
  },
  hero: {
    title: 'Canta. Juega. Vibra.',
    subtitle:
      'La plataforma todo en uno para tus noches de karaoke, blind tests y quizzes musicales.',
    cta: {
      primary: 'Probar gratis',
      secondary: 'Ver ofertas',
    },
  },
  footer: {
    copyright: 'Todos los derechos reservados.',
    legal: 'Aviso legal',
    terms: 'Términos de servicio',
    privacy: 'Política de privacidad',
  },
  a11y: {
    skipLink: 'Ir al contenido principal',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    languageSwitch: 'Cambiar idioma',
  },
  demo: {
    checklistTitle: 'Lista de configuración',
  },
  languages: {
    fr: 'Français',
    en: 'English',
    es: 'Español',
  },
  proposition: {
    title: 'Más que un karaoke',
    subtitle:
      'Una plataforma de entretenimiento completa para todos tus eventos. Karaoke, Blind Test, Quiz: tres experiencias, una sola aplicación.',
    modes: {
      karaoke: {
        title: 'Karaoke',
        description:
          'Miles de canciones para cantar solo o en grupo. Letras sincronizadas, puntuación en tiempo real.',
      },
      blindtest: {
        title: 'Blind Test',
        description:
          'Pon a prueba tus conocimientos musicales con tus amigos. Decenas de playlists temáticas.',
      },
      quiz: {
        title: 'Quiz Musical',
        description:
          'Preguntas variadas sobre artistas, letras e historia de la música.',
      },
    },
  },
  ctaFinal: {
    title: '¿Listo para animar tu próxima fiesta?',
    subtitle:
      'Únete a miles de usuarios que transforman sus eventos en momentos inolvidables.',
    button: 'Probar gratis',
    noCard: 'Sin tarjeta de crédito • Cancela cuando quieras',
  },
} as const;
