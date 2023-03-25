import React, {useRef} from 'react';
import {ProjectCardProps} from './types';
import {motion, useInView, Variants} from 'framer-motion';
import Image from 'next/image';
import clsx from 'clsx';

const variants: Variants = {
  offscreen: {
    x: '-100%',
    opacity: 0,
    transition: {
      x: {stiffness: 1000},
      opacity: {duration: 1000},
    },
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      x: {stiffness: 1000, velocity: -100},
      opacity: {duration: 1000},
    },
  },
};

const ProjectCard = (props: ProjectCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {margin: '-100px 0px 0px'});
  const {title, subTitle, descriptions, technologies, revert, image, imageFit} = props;
  return (
    <motion.div
      className='bg-secondaryBg p-[20px] md:p-0 rounded shadow-lg md:shadow-none md:bg-transparent grid grid-cols-12 group relative'
      ref={ref}
      animate={isInView ? 'onscreen' : 'offscreen'}
      variants={variants}
    >
      <motion.div
        className={clsx({
          'col-span-12 row-start-1 z-20 flex flex-col justify-center bg-transparent': true,
          'md:col-start-5 md:col-end-12 md:items-end': revert,
          'md:col-start-1 md:col-end-7 md:items-start': !revert,
        })}
      >
        <motion.span className='text-sm md:text-base text-primary'>{subTitle}</motion.span>
        <motion.h3 className='text-lg md:text-2xl text-white mb-[20px]'>{title}</motion.h3>
        <motion.div className='md:bg-secondaryBg rounded md:shadow-lg md:p-[20px] space-y-[10px] mb-[20px]'>
          {descriptions.map((des: string, index: number) => {
            return (
              <motion.p
                className={clsx({
                  'text-lightSlate text-sm md:text-base': true,
                  'md:text-right': revert,
                  'md:text-left': !revert,
                })}
                key={index}
              >
                {des}
              </motion.p>
            );
          })}
        </motion.div>
        <motion.div className='flex flex-wrap gap-[20px]'>
          {technologies.map((des: string, index: number) => {
            return (
              <motion.p
                className={clsx({
                  'text-white text-xs md:text-sm hover:text-primary ease-in-out duration-150 hover:scale-105': true,
                  'md:text-right': revert,
                  'md:text-left': !revert,
                })}
                key={index}
              >
                {des}
              </motion.p>
            );
          })}
        </motion.div>
      </motion.div>
      <motion.div
        className={clsx({
          'hidden md:block row-start-1 col-span-12 z-10': true,
          'md:col-start-5 md:col-end-12': !revert,
          'md:col-start-1 md:col-end-7 ': revert,
        })}
      >
        <motion.div className='relative w-full h-[350px] rounded'>
          <Image
            className={clsx({
              'rounded duration-300 ease-linear opacity-30 group-hover:opacity-100  group-hover:grayscale-0 grayscale': true,
              'object-fit': imageFit,
              'object-contain': !imageFit,
            })}
            src={image}
            alt={title}
            fill
          />
        </motion.div>
      </motion.div>
      <Image className='rounded grayscale opacity-10 md:hidden object-cover shadow-xl blur-sm' src={image} alt={title} fill />
    </motion.div>
  );
};

export default ProjectCard;
