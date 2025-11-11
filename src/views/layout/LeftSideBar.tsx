import React from 'react';
import {motion} from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';
import {socialLinks} from '@/utils/socialInfo';

const LeftSideBar = () => {
  return (
    <motion.div initial={'closed'} animate={'open'} className='w-[40px] fixed bottom-0 left-[20px] z-10 hidden md:block'>
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
        {socialLinks.map((item, index) => {
          return (
            <motion.li
              className='last:mb-[20px] p-[10px]'
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
            >
              <Link href={item.href} target='_blank' rel='noopener noreferrer'>
                <item.icon size={24} className='hover:scale-100 hover:-translate-y-[2px] ease-in-out duration-300 hover:fill-primary' />
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.div>
  );
};

export default LeftSideBar;
