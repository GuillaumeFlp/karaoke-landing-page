/**
 * Language Switcher component with accessible dropdown
 * Preserves scroll position when changing language (FR43)
 * Uses ARIA listbox pattern for accessibility
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/i18n';

interface LanguageSwitcherProps {
  currentLocale: string;
  locales: string[];
  currentPath: string;
  languageSwitchLabel: string;
}

export function LanguageSwitcher({
  currentLocale,
  locales,
  currentPath,
  languageSwitchLabel,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const t = useTranslations(currentLocale);

  // Restore scroll position on mount (FR43)
  useEffect(() => {
    const scrollY = sessionStorage.getItem('scrollY');
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY, 10));
      sessionStorage.removeItem('scrollY');
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus management when dropdown opens/closes
  useEffect(() => {
    if (isOpen && locales.length > 0) {
      // Find current locale index and focus it
      const currentIndex = locales.indexOf(currentLocale);
      const indexToFocus = currentIndex >= 0 ? currentIndex : 0;
      setFocusedIndex(indexToFocus);
      optionRefs.current[indexToFocus]?.focus();
    } else if (!isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen, locales, currentLocale]);

  // Save scroll position and navigate to new locale (FR43)
  // Defined BEFORE handleOptionKeyDown to avoid hoisting issues
  const handleLanguageChange = useCallback(
    (targetLocale: string) => {
      if (targetLocale === currentLocale) {
        setIsOpen(false);
        return;
      }

      // Save scroll position before navigation
      sessionStorage.setItem('scrollY', String(window.scrollY));

      // Build the new URL with the target locale
      // Remove existing locale prefix and add new one
      const pathWithoutLocale = currentPath.replace(/^\/(fr|en|es)/, '') || '/';
      const newUrl = `/${targetLocale}${pathWithoutLocale}`;

      window.location.href = newUrl;
    },
    [currentLocale, currentPath]
  );

  // Handle keyboard navigation on trigger button
  const handleButtonKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          setIsOpen(false);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          setIsOpen(!isOpen);
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          }
          break;
      }
    },
    [isOpen]
  );

  // Handle keyboard navigation on dropdown options
  const handleOptionKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          buttonRef.current?.focus();
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleLanguageChange(locales[index]);
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (index < locales.length - 1) {
            setFocusedIndex(index + 1);
            optionRefs.current[index + 1]?.focus();
          } else {
            // Wrap to first option
            setFocusedIndex(0);
            optionRefs.current[0]?.focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (index > 0) {
            setFocusedIndex(index - 1);
            optionRefs.current[index - 1]?.focus();
          } else {
            // Wrap to last option
            setFocusedIndex(locales.length - 1);
            optionRefs.current[locales.length - 1]?.focus();
          }
          break;
        case 'Tab':
          // Trap focus within dropdown - prevent Tab from leaving
          e.preventDefault();
          if (e.shiftKey) {
            // Shift+Tab: go to previous or wrap to last
            if (index > 0) {
              setFocusedIndex(index - 1);
              optionRefs.current[index - 1]?.focus();
            } else {
              setFocusedIndex(locales.length - 1);
              optionRefs.current[locales.length - 1]?.focus();
            }
          } else {
            // Tab: go to next or wrap to first
            if (index < locales.length - 1) {
              setFocusedIndex(index + 1);
              optionRefs.current[index + 1]?.focus();
            } else {
              setFocusedIndex(0);
              optionRefs.current[0]?.focus();
            }
          }
          break;
        case 'Home':
          e.preventDefault();
          setFocusedIndex(0);
          optionRefs.current[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          setFocusedIndex(locales.length - 1);
          optionRefs.current[locales.length - 1]?.focus();
          break;
      }
    },
    [locales, handleLanguageChange]
  );

  // Get language name from translations
  const getLanguageName = (locale: string): string => {
    const key = `languages.${locale}` as const;
    return t(key) || locale.toUpperCase();
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleButtonKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={languageSwitchLabel}
        className={cn(
          'flex h-10 min-w-[44px] items-center gap-1 rounded-md px-3',
          'text-sm font-medium text-muted-600 transition-colors',
          'hover:bg-muted-100 hover:text-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        )}
      >
        <span>{currentLocale.toUpperCase()}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          role="listbox"
          aria-label={languageSwitchLabel}
          aria-activedescendant={focusedIndex >= 0 ? `lang-option-${locales[focusedIndex]}` : undefined}
          className={cn(
            'absolute right-0 z-50 mt-1 min-w-[140px]',
            'rounded-md border border-border bg-background shadow-lg'
          )}
        >
          {locales.map((locale, index) => (
            <li
              key={locale}
              id={`lang-option-${locale}`}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              role="option"
              tabIndex={0}
              aria-selected={locale === currentLocale}
              onClick={() => handleLanguageChange(locale)}
              onKeyDown={(e) => handleOptionKeyDown(e, index)}
              className={cn(
                'flex h-11 cursor-pointer items-center px-4 text-sm transition-colors',
                'hover:bg-muted-100',
                'focus:outline-none focus:bg-muted-100',
                locale === currentLocale
                  ? 'bg-muted-100 font-medium text-foreground'
                  : 'text-muted-600'
              )}
            >
              {getLanguageName(locale)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;
