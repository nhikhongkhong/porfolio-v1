import SectionTitle from '@/components/SectionTitle';
import React, {useRef} from 'react';
import {motion, Variants, useInView} from 'framer-motion';
import Image from 'next/image';
import {useRouter} from 'next/router';

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
  const listTechnologies = [
    'JavaScript (ES6+)',
    'TypeScript',
    'Web3',
    'React',
    'NextJs',
    'Node.js',
    'Php-Laravel',
    'Tailwind Css',
    'Framer Motion',
  ];
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
      <SectionTitle title='About Me' orderNumber="before:content-['01.']" />
      <motion.div className='md:flex gap-[30px] w-full items-start'>
        <motion.div className='text-slate flex-1 text-justify text-sm md:text-base'>
          <motion.p className='mb-[20px]' variants={childVariant}>
            {`Hello there! My name is Vu Thanh Long and I enjoy build things and learn new stuffs. I studied in  HEDSPI -  Back Khoa University and hold a bachelor's degree in Computer Science from Murdic
            University. I am a fast learner, enthusiastic, creative, and a team player. Currently residing in Ha Noi, Vietnam.`}
          </motion.p>
          <motion.p className='mb-[20px]' variants={childVariant}>
            {`Outside of my
            professional interests, I have a passion for e-sports, Chinese chess, reading books, and am a big fan of wuxia novels.`}
          </motion.p>
          <motion.p className='mb-[20px]' variants={childVariant}>
            {`I believe
            that my versatile interests, combined with my academic background and personal attributes, allow me to approach challenges with
            a unique perspective and continually strive for excellence in everything I do.`}
          </motion.p>
          <motion.p
            variants={childVariant}
            className='mb-[20px]'
          >{`Here are a few technologies I’ve been working with recently:`}</motion.p>
          <motion.ul variants={sectionVariants} className='gap-2 grid-cols-2 grid md:grid-cols-3 text-xs md:text-sm mb-[40px] md:mb-0'>
            {listTechnologies.map((tech: any, index: number) => {
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
              src='/portrage.jpg'
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
