import React, {useRef} from 'react';
import {motion, Variants, useInView} from 'framer-motion';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import Contact from '../contact';
import {useTranslation} from '@/hooks/useTranslation';

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
  const {t} = useTranslation();

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
          {t.hero.greeting}
        </motion.p>
        <motion.h1 variants={childVariant} className='text-white text-3xl md:text-5xl'>
          {t.hero.name}
        </motion.h1>
        <motion.h2 variants={childVariant} className='text-slate text-3xl md:text-5xl'>
          {t.hero.title}
        </motion.h2>
        <motion.p variants={childVariant} className='text-slate text-sm md:text-base'>
          {t.hero.description}
        </motion.p>
        <motion.p variants={childVariant} className='text-slate'>
          {t.hero.cta}
        </motion.p>
        <motion.div variants={childVariant}>
          <PrimaryButton href='#about' title={t.hero.button} textClassName='w-[200px]' />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
