import SectionTitle from '@/components/SectionTitle';
import React, {useRef} from 'react';
import {motion, useInView, Variants} from 'framer-motion';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import AnimatedTyping from '@/components/AnimatedTyping';
import {BsFillArrowUpCircleFill} from 'react-icons/bs';
import clsx from 'clsx';
import Link from 'next/link';

const variants: Variants = {
  offscreen: {
    x: '100%',
    opacity: 0,
    transition: {
      x: {stiffness: 1000},
    },
  },
  onscreen: {
    y: '0%',
    opacity: 1,
    transition: {
      x: {stiffness: 10000, velocity: 10000},
    },
  },
};

const Contact = () => {
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
        <SectionTitle title={`What's Next`} orderNumber="before:content-['04.']" />
        <motion.p className='text-sm md:text-base text-slate mb-[40px]'>{`I'm really appriciate your time to make it so far. Although I’m not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!`}</motion.p>
        <motion.div className='flex justify-center gap-[20px] mb-[40px]'>
          <PrimaryButton title='Drop A Message' href='mailto:wutianron@gmail.com' />
          <PrimaryButton title='Give Me A Call' href='tel:+84978389208' />
        </motion.div>
        <AnimatedTyping
          textClassName='text-lg md:text-2xl text-white text-center h-[100px]'
          content={['Thank you, and I wish you a happy day.']}
        />
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
