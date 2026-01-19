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
} as const;
