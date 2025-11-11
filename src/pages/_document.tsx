import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name='theme-color' content='#000000' />
        <link rel='icon' type='image/png' href='/logo.webp' />
        <link rel='apple-touch-icon' href='/logo.webp' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
