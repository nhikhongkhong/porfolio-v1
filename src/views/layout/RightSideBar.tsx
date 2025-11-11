import React from 'react';
import {motion} from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';
import {contactEmail} from '@/utils/socialInfo';

const RightSideBar = () => {
  return (
    <motion.div initial={'closed'} animate={'open'} className='w-[40px] fixed bottom-0 right-[20px] z-10 hidden md:block'>
      <motion.ul
        className={clsx(
          'w-full flex flex-col items-center text-lightSlate',
          "after:content-[''] after:h-[90px] after:w-[1px] after:bg-lightSlate",
        )}
        variants={{
          open: {
            transition: {staggerChildren: 0.07, delayChildren: 0.2},
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
        <motion.p
          className='last:mb-[20px] p-[10px] hover:text-primary hover:translate-y-[20px] ease-in-out duration-300 cursor-pointer'
          variants={{
            open: {
              y: 0,
              opacity: 1,
              writingMode: 'vertical-rl',
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
          whileHover={{transform: 'translateY(-5px)'}}
        >
          <Link href={`mailto:${contactEmail}`} target='_blank' rel='noopener noreferrer'>
            {contactEmail}
          </Link>
        </motion.p>
      </motion.ul>
    </motion.div>
  );
};

export default RightSideBar;
