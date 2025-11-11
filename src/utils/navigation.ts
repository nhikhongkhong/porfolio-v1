/**
 * Navigation items configuration
 */

export interface NavigationItem {
  id: string;
  number: string;
  href: string;
  translationKey: string; // Key for translation instead of static label
}

/**
 * Main navigation items structure
 * Labels are now fetched from translations
 */
export const navigationItems: NavigationItem[] = [
  {
    id: 'about',
    number: '01',
    href: 'about',
    translationKey: 'navigation.about',
  },
  {
    id: 'experience',
    number: '02',
    href: 'experience',
    translationKey: 'navigation.experience',
  },
  {
    id: 'work',
    number: '03',
    href: 'work',
    translationKey: 'navigation.work',
  },
  {
    id: 'contact',
    number: '04',
    href: 'contact',
    translationKey: 'navigation.contact',
  },
];

/**
 * Resume PDF path
 */
export const RESUME_PDF_PATH = '/Vu-Thanh-Long.pdf';
