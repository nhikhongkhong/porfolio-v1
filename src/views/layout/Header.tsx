import React, {useMemo} from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {motion, AnimatePresence, useCycle} from 'framer-motion';

import PrimaryButton from '@/components/buttons/PrimaryButton';
import {HamburgerButton} from '@/components/buttons';
import {useLayoutStore} from '@/stores/layout';
import {useRouter} from 'next/router';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const Header = () => {
  const openSidebar = useLayoutStore(state => state.openSidebar);
  const toggleSidebar = useLayoutStore(state => state.toggleSidebar);

  const router = useRouter();
  const routerHas = useMemo(() => router.asPath.slice(2), [router]);

  const handleAction = {
    toggleSidebar: () => {
      toggleSidebar();
    },
  };

  const listNav = [
    {
      content: '01',
      href: 'about',
      text: 'About',
    },
    {
      content: '02',
      href: 'experience',
      text: 'Experience',
    },
    {
      content: '03',
      href: 'work',
      text: 'Work',
    },
    {
      content: '04',
      href: 'contact',
      text: 'Contact',
    },
  ];

  return (
    <header className='fixed w-full top-0 h-[100px] bg-transparent backdrop-blur-sm flex items-center justify-between px-[25px] md:px-[40px] z-50'>
      <div className=''>
        <svg
          width='40'
          height='45'
          viewBox='0 0 40 45'
          className='fill-none hover:fill-[#64FFDA]/10'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M15.5227 29L12.3409 17.3636H13.7727L16.2045 26.8409H16.3182L18.7955 17.3636H20.3864L22.8636 26.8409H22.9773L25.4091 17.3636H26.8409L23.6591 29H22.2045L19.6364 19.7273H19.5455L16.9773 29H15.5227Z'
            fill='#64FFDA'
          />
          <path d='M20 2L38.1865 12.5V33.5L20 44L1.81347 33.5V12.5L20 2Z' stroke='#64FFDA' strokeWidth='2' />
        </svg>
      </div>
      <nav className=''>
        <ul className='hidden md:flex text-secondaryText text-sm items-center gap-8'>
          {listNav.map((nav: any, index: number) => {
            const active = routerHas === nav.href;
            return (
              <li key={index}>
                <Link
                  href={`#${nav.href}`}
                  className={clsx(`flex items-center gap-[5px] hover:text-primary`, {'text-primary': active})}
                  scroll={false}
                >
                  <span className='text-primary'>{nav.content}.</span>
                  {nav.text}
                </Link>
              </li>
            );
          })}
          <PrimaryButton title='Resume' href='/Vu-Thanh-Long.pdf' newTab={true} />
        </ul>

        <motion.div className='flex md:hidden' initial={false} animate={openSidebar ? 'open' : 'closed'} custom='100%'>
          <HamburgerButton clicked={openSidebar} onClick={handleAction.toggleSidebar} />
          <motion.div
            className={clsx({'w-[80vw] h-[100vh] z-20 fixed top-0 right-0 bg-secondaryBg ': true}, {'': openSidebar}, {'': !openSidebar})}
            variants={{open: {transform: 'translateX(0)'}, closed: {transform: 'translateX(100%)'}}}
            transition={{duration: 0.175}}
          >
            <motion.ul
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-secondaryText text-sm items-center space-y-8'
              variants={{
                open: {
                  transition: {staggerChildren: 0.07, delayChildren: 0.2},
                },
                closed: {
                  transition: {staggerChildren: 0.05, staggerDirection: -1},
                },
              }}
            >
              {listNav.map((nav: any, index: number) => {
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
                        y: 50,
                        opacity: 0,
                        transition: {
                          y: {stiffness: 1000},
                        },
                      },
                    }}
                  >
                    <Link href={`#${nav.href}`} className={clsx(`flex flex-col items-center gap-[5px] hover:text-primary`)}>
                      <span className='text-primary'>{nav.content}.</span>
                      {nav.text}
                    </Link>
                  </motion.li>
                );
              })}
              <motion.li
                variants={{
                  open: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      y: {stiffness: 1000, velocity: -100},
                    },
                  },
                  closed: {
                    y: 50,
                    opacity: 0,
                    transition: {
                      y: {stiffness: 1000},
                    },
                  },
                }}
              >
                <PrimaryButton title='Resume' href='/Vu-Thanh-Long.pdf' newTab={true} />
              </motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>
      </nav>
    </header>
  );
};

export default Header;
