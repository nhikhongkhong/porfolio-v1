import React from 'react';
import {motion} from 'framer-motion';
import {TabContentProps} from './types';

const TabContent = (props: TabContentProps) => {
  const {title, subTitle, listInfo, show} = props;
  return (
    <motion.div initial={'closed'} animate={show ? 'open' : 'closed'}>
      <motion.div
        variants={{
          open: {
            opacity: 1,
            y: 0,
          },
          closed: {
            opacity: 0,
            y: -50,
          },
        }}
        transition={{y: {stiffness: 1000, velocity: -100}}}
      >
        <motion.h3 className='text-base md:text-lg text-white mb-[5px]'>{title}</motion.h3>
        <motion.p className='text-xs md:text-xs text-lightSlate mb-[20px] text-left'>{subTitle}</motion.p>
      </motion.div>
      <motion.ul
        variants={{
          open: {
            transition: {staggerChildren: 0.07, delayChildren: 0.4},
            opacity: 1,
            y: 0,
          },
          closed: {
            transition: {staggerChildren: 0.05, staggerDirection: -1},
            opacity: 0,
            y: -50,
          },
        }}
      >
        {listInfo.map((info: string, index: number) => {
          return (
            <motion.li
              key={index}
              variants={{
                open: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    y: {stiffness: 1000, velocity: -100},
                  },
                },
                closed: {
                  y: -50,
                  opacity: 0,
                  transition: {
                    y: {stiffness: 1000},
                  },
                },
              }}
              className="before:content-['▹'] before:text-primary before:absolute before:-left-[20px] before:mr-[5px] list-outside text-slate relative ml-[20px] text-sm md:text-base"
            >
              {info}
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.div>
  );
};

export default TabContent;
