import Head from 'next/head';
import Image from 'next/image';
import {Inter} from 'next/font/google';
import {motion} from 'framer-motion';
import styles from '@/styles/Home.module.css';
import Hero from '@/views/hero';
import About from '@/views/about';
import Experience from '@/views/experience';
import Work from '@/views/work';
import Contact from '@/views/contact';

const inter = Inter({subsets: ['latin']});

export default function Home() {
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
      <motion.div className='max-w-[1000px] w-full flex flex-col items-center'>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Contact />
      </motion.div>
    </>
  );
}
