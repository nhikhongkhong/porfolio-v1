/**
 * Application constants and environment variables
 * All environment variables must be prefixed with NEXT_PUBLIC_ to be accessible in the browser
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vuthanhlong.vercel.app';
export const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'vuthanhlong.vercel.app';

/**
 * Get full URL for a given path
 * @param path - Path to append to site URL (should start with /)
 * @returns Full URL
 */
export const getFullUrl = (path: string): string => {
  const baseUrl = SITE_URL.replace(/\/$/, ''); // Remove trailing slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};
