import React from 'react';
import {motion} from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';

import {FaFacebook} from 'react-icons/fa';
import {TfiLinkedin} from 'react-icons/tfi';
import {MdOutlineSendToMobile} from 'react-icons/md';
import {BsTelegram, BsGithub} from 'react-icons/bs';

const LeftSideBar = () => {
  const listItems = [
    {icon: BsGithub, href: 'https://github.com/nhikhongkhong'},
    {icon: FaFacebook, href: 'https://www.facebook.com/R0llr0yPhAnT0m'},
    {icon: TfiLinkedin, href: 'https://www.linkedin.com/feed/'},
    {icon: MdOutlineSendToMobile, href: 'tel:+84978389208'},
    {icon: BsTelegram, href: 'https://www.t.me/nhikhongkhong'},
  ];

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
        {listItems.map((item: any, index: number) => {
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
