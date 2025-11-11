import SectionTitle from '@/components/SectionTitle';
import React, {useRef} from 'react';
import {motion, useInView, Variants} from 'framer-motion';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import AnimatedTyping from '@/components/AnimatedTyping';
import {BsFillArrowUpCircleFill} from 'react-icons/bs';
import clsx from 'clsx';
import Link from 'next/link';
import {useTranslation} from '@/hooks/useTranslation';

const variants: Variants = {
  offscreen: {
    x: '-100%',
    opacity: 0,
    transition: {
      x: {stiffness: 1000},
    },
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      x: {stiffness: 1000, velocity: -1000},
    },
  },
};

const Contact = () => {
  const {t} = useTranslation();
  const ref = useRef(null);
  const istitleInView = useInView(ref, {margin: '-100px 0px 0px'});

  return (
    <>
      <motion.section
        id='contact'
        className='py-[50px] w-full max-w-[700px]'
        animate={istitleInView ? 'onscreen' : 'offscreen'}
        variants={variants}
        ref={ref}
      >
        <SectionTitle title={t.contact.title} orderNumber="before:content-['04.']" />
        <motion.p className='text-sm md:text-base text-slate mb-[40px]'>{t.contact.description}</motion.p>
        <motion.div className='flex justify-center gap-[20px] mb-[40px]'>
          <PrimaryButton title={t.contact.dropMessage} href='mailto:wutianron@gmail.com' />
          <PrimaryButton title={t.contact.giveCall} href='tel:+84978389208' />
        </motion.div>
        <AnimatedTyping textClassName='text-lg md:text-2xl text-white text-center h-[100px]' content={[t.contact.thankYou]} />
      </motion.section>
      <button
        className={clsx('text-white fixed bottom-10 right-10 md:bottom-20 md:right-20 animate-bounce duration-200 ease-linear', {
          'opacity-0': !istitleInView,
          'opacity-1': istitleInView,
        })}
      >
        <Link href='/' scroll={true}>
          <BsFillArrowUpCircleFill size={40} />
        </Link>
      </button>
    </>
  );
};

export default Contact;
