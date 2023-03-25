import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import Providers from '@/providers';
import Layout from '@/views/layout';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>Vu Thanh Long - Full Stack Developer</title>
        <meta
          name='description'
          content='Vu Thanh Long - Full Stack Developer - About 5+ years of experience in software development with in-depth knowledge of modern front-end web framework. Skilled in React Js and Typescript, Web3, Ether.js, Next Js, NodeJs, CSS/SCSS including Tailwind CSS, Bootstrap, Ant Design, ...'
        />
        <link rel='shortcut icon' href='/logo.png' />
      </Head>
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </>
  );
}
