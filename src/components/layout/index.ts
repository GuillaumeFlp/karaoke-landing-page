/**
 * Layout components type definitions
 *
 * Usage in .astro files:
 * import Header from '@/components/layout/Header.astro';
 * import Footer from '@/components/layout/Footer.astro';
 * import Container from '@/components/layout/Container.astro';
 * import SectionWrapper from '@/components/layout/SectionWrapper.astro';
 */

// Type definitions for component props
export type ContainerSize = 'narrow' | 'default' | 'wide';
export type SectionVariant = 'default' | 'muted' | 'primary' | 'gradient';

export interface ContainerProps {
  size?: ContainerSize;
  class?: string;
}

export interface SectionWrapperProps {
  variant?: SectionVariant;
  id?: string;
  class?: string;
}
