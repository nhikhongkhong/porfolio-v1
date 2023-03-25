import React, {useRef} from 'react';
import {motion, Variants, useInView} from 'framer-motion';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import Contact from '../contact';

const sectionVariants: Variants = {
  offscreen: {
    transition: {staggerChildren: 0.1, staggerDirection: -1},
    opacity: 0,
    y: -100,
  },
  onscreen: {
    transition: {staggerChildren: 0.1, delayChildren: 0},
    opacity: 1,
    y: 0,
  },
};

const childVariant: Variants = {
  offscreen: {
    y: -50,
    opacity: 0,
    transition: {
      y: {stiffness: 1000},
    },
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      y: {stiffness: 1000, velocity: -100},
    },
  },
};

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {margin: '-100px'});
  return (
    <motion.section id='hero' className='h-screen flex flex-col justify-center'>
      <motion.div
        ref={ref}
        initial='offscreen'
        //   whileInView='onscreen'
        animate={!isInView ? 'offscreen' : 'onscreen'}
        //   viewport={{once: false, amount: 0.8}}
        transition={{duration: 0.8}}
        variants={sectionVariants}
        className='space-y-[20px]'
      >
        <motion.p variants={childVariant} className='text-sm md:text-base text-primary'>
          Hi, my name is
        </motion.p>
        <motion.h1 variants={childVariant} className='text-white text-3xl md:text-5xl'>
          Vu Thanh Long.
        </motion.h1>
        <motion.h2 variants={childVariant} className='text-slate text-3xl md:text-5xl'>{`I'm a full-stack developer!`}</motion.h2>
        <motion.p variants={childVariant} className='text-slate text-sm md:text-base'>
          {`About 5+ years of experience in software development with in-depth knowledge of modern front-end web framework. Skilled in React Js and Typescript, Web3, Ether.js, Next Js, NodeJs, CSS/SCSS including Tailwind CSS, Bootstrap, Ant Design, ...`}
        </motion.p>
        <motion.p variants={childVariant} className='text-slate'>
          Want to know more about me ?
        </motion.p>
        <motion.div variants={childVariant}>
          <PrimaryButton href='#about' title='Take a tour' textClassName='w-[200px]' />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
