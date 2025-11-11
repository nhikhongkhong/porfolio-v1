import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import Providers from '@/providers';
import Layout from '@/views/layout';
import Head from 'next/head';
import {Inter} from 'next/font/google';
import {type ReactElement, useState, useEffect} from 'react';
import {SITE_URL, getFullUrl} from '@/utils/constants';
import {useLanguageStore} from '@/stores/language';
import {getTranslations, DEFAULT_LANGUAGE} from '@/i18n';
import {ScrollProgress} from '@/components/ScrollProgress';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

export default function App({Component, pageProps}: AppProps): ReactElement {
  const [mounted, setMounted] = useState(false);
  const language = useLanguageStore(state => state.language);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use default language during SSR, actual language after mount
  const translations = getTranslations(mounted ? language : DEFAULT_LANGUAGE);

  return (
    <div className={inter.variable}>
      <Head>
        <title>{translations.meta.title}</title>
        <meta name='description' content={translations.meta.description} />
        <link rel='shortcut icon' href='/logo.webp' />
        <meta name='author' content='Vu Thanh Long' />
        <meta name='keywords' content={translations.meta.keywords} />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta property='og:title' content={translations.meta.title} />
        <meta property='og:description' content={translations.meta.ogDescription} />
        <meta property='og:image' content={getFullUrl('/logo.webp')} />
        <meta property='og:url' content={SITE_URL} />
        <meta property='og:site_name' content='Vu Thanh Long Portfolio' />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={translations.meta.title} />
        <meta name='twitter:description' content={translations.meta.ogDescription} />
        <meta name='twitter:image' content={getFullUrl('/logo.webp')} />

        {/* Theme & Icons */}
        <meta name='theme-color' content='#000000' />
        <link rel='icon' type='image/png' href='/logo.webp' />
        <link rel='apple-touch-icon' href='/logo.webp' />

        {/* Canonical URL */}
        <link rel='canonical' href={SITE_URL} />
      </Head>
      <ScrollProgress />
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </div>
  );
}
