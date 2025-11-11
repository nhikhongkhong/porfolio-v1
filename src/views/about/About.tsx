import SectionTitle from '@/components/SectionTitle';
import React, {useRef} from 'react';
import {motion, Variants, useInView} from 'framer-motion';
import Image from 'next/image';
import {useTranslation} from '@/hooks/useTranslation';

const sectionVariants: Variants = {
  offscreen: {
    transition: {staggerChildren: 0.05, staggerDirection: -1},
    opacity: 0,
    y: -50,
  },
  onscreen: {
    transition: {staggerChildren: 0.07, delayChildren: 0.5},
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

const About = () => {
  const {t} = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, {margin: '-100px 0px -100px 0px'});

  return (
    <motion.section
      ref={ref}
      id='about'
      className='py-[50px] w-full max-w-[900px]'
      transition={{duration: 1}}
      initial='offscreen'
      animate={isInView ? 'onscreen' : 'offscreen'}
      variants={sectionVariants}
      //   whileInView='onscreen'
      //   viewport={{once: false, amount: 0.8}}
    >
      <SectionTitle title={t.about.title} orderNumber="before:content-['01.']" />
      <motion.div className='md:flex gap-[30px] w-full items-start'>
        <motion.div className='text-slate flex-1 text-justify text-sm md:text-base'>
          <motion.p className='mb-[20px]' variants={childVariant}>
            {t.about.paragraph1}
          </motion.p>
          <motion.p className='mb-[20px]' variants={childVariant}>
            {t.about.paragraph2}
          </motion.p>
          <motion.p className='mb-[20px]' variants={childVariant}>
            {t.about.paragraph3}
          </motion.p>
          <motion.p variants={childVariant} className='mb-[20px]'>
            {t.about.technologiesTitle}
          </motion.p>
          <motion.ul variants={sectionVariants} className='gap-2 grid-cols-2 grid md:grid-cols-3 text-xs md:text-sm mb-[40px] md:mb-0'>
            {t.about.technologies.map((tech: string, index: number) => {
              return (
                <motion.li
                  variants={childVariant}
                  className="before:content-['▹'] before:text-primary before:mr-[5px] first:col-span-2 md:first:col-span-1"
                  key={index}
                >
                  {tech}
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>
        <motion.div className='group relative w-fit mx-auto' variants={childVariant} transition={{duration: 1}}>
          <motion.div className='w-[256px] h-[384px] relative overflow-hidden rounded-lg mx-auto group-hover:-translate-y-[5px] duration-500 ease-in-out z-20'>
            <Image
              src='/portrage.webp'
              alt='portrage'
              fill
              className='rounded-lg group-hover:scale-110 duration-500 ease-in-out grayscale group-hover:grayscale-0 shadow-lg'
            />
          </motion.div>
          <motion.div
            className='w-[256px] z-10 h-[384px] absolute border border-primary rounded-lg top-[30px] -right-[20px] group-hover:top-[10px] group-hover:-right-[20px] duration-500 ease-in-out'
            // initial={{opacity: 0}}
            // animate={{
            //   opacity: 1,
            // }}
            // transition={{duration: 0.2, delay: 0.6, easing: 'easeInOut'}}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;
