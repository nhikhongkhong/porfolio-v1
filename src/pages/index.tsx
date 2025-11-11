import {motion} from 'framer-motion';
import Hero from '@/views/hero';
import About from '@/views/about';
import Experience from '@/views/experience';
import Work from '@/views/work';
import Contact from '@/views/contact';

export default function Home() {
  return (
    <>
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
