import React from 'react';
import {motion} from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';

import {FaFacebook} from 'react-icons/fa';
import {TfiLinkedin} from 'react-icons/tfi';
import {MdOutlineSendToMobile} from 'react-icons/md';
import {BsTelegram, BsGithub} from 'react-icons/bs';

const Footer = () => {
  const listItems = [
    {icon: BsGithub, href: 'https://github.com/nhikhongkhong'},
    {icon: FaFacebook, href: 'https://www.facebook.com/R0llr0yPhAnT0m'},
    {icon: TfiLinkedin, href: 'https://www.linkedin.com/feed/'},
    {icon: MdOutlineSendToMobile, href: 'tel:+84978389208'},
    {icon: BsTelegram, href: 'https://www.t.me/nhikhongkhong'},
  ];
  return (
    <motion.footer initial={'closed'} animate={'open'} className='flex flex-col items-center justify-center min-h-[70px]'>
      <motion.ul
        className={clsx('flex md:hidden items-center text-lightSlate mb-[10px]')}
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
              className='p-[10px]'
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
      <motion.p
        className='mb-[10px]  hover:text-primary hover:translate-y-[20px] ease-in-out duration-300 text-slate text-xs'
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
        whileHover={{transform: 'translateY(-5px)'}}
      >
        A product by Long Wu © {new Date().getFullYear()}
      </motion.p>
      <motion.p
        className='mb-[20px] hover:text-primary hover:translate-y-[20px] ease-in-out duration-300 text-slate text-xs'
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
        whileHover={{transform: 'translateY(-5px)'}}
      >
        Thank you Brittany Chiang for inspiration
      </motion.p>
    </motion.footer>
  );
};

export default Footer;
