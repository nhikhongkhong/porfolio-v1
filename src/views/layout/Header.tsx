import React, {useMemo, useCallback, useState, useEffect} from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {motion, AnimatePresence, type Variants} from 'framer-motion';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import {HamburgerButton} from '@/components/buttons';
import {useLayoutStore} from '@/stores/layout';
import {useRouter} from 'next/router';
import {navigationItems, RESUME_PDF_PATH} from '@/utils/navigation';
import {Logo} from '@/components/Logo';
import {useTranslation} from '@/hooks/useTranslation';
import {LanguageSwitcher} from '@/components/LanguageSwitcher';

// Animation variants
const menuItemVariants: Variants = {
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
};

const menuListVariants: Variants = {
  open: {
    transition: {staggerChildren: 0.07, delayChildren: 0.2},
  },
  closed: {
    transition: {staggerChildren: 0.05, staggerDirection: -1},
  },
};

const sidebarVariants: Variants = {
  open: {transform: 'translateX(0)'},
  closed: {transform: 'translateX(100%)'},
};

const Header = (): React.ReactElement => {
  const openSidebar = useLayoutStore(state => state.openSidebar);
  const toggleSidebar = useLayoutStore(state => state.toggleSidebar);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentPath = useMemo(() => {
    if (!isMounted || !router.isReady) {
      return '';
    }
    return router.asPath.replace(/^[#/]+/, '');
  }, [router.asPath, router.isReady, isMounted]);

  const handleToggleSidebar = useCallback(() => {
    toggleSidebar();
  }, [toggleSidebar]);

  const handleNavClick = useCallback(() => {
    if (openSidebar) {
      toggleSidebar();
    }
  }, [openSidebar, toggleSidebar]);

  return (
    <header className='fixed w-full top-0 h-[100px] bg-transparent backdrop-blur-sm flex items-center px-6 md:px-10 z-50' role='banner'>
      {/* Left: Logo */}
      <div className='flex-shrink-0'>
        <Logo />
      </div>

      {/* Center: Navigation */}
      <nav className='flex-1 flex justify-center' aria-label='Main navigation'>
        <ul className='hidden md:flex text-secondaryText text-sm items-center gap-8'>
          {navigationItems.map(nav => {
            const isActive = isMounted && currentPath === nav.href;
            return (
              <li key={nav.id}>
                <Link
                  href={`#${nav.href}`}
                  className={clsx('flex items-center gap-1.5 hover:text-primary transition-colors', {'text-primary': isActive})}
                  scroll={false}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className='text-primary'>{nav.number}.</span>
                  {t.get(nav.translationKey)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Right: Resume Button and Language Switcher */}
      <div className='flex-shrink-0 flex items-center gap-4'>
        {/* Desktop: Resume and Language Switcher */}
        <div className='hidden md:flex items-center gap-4'>
          <PrimaryButton title={t.common.resume} href={RESUME_PDF_PATH} newTab={true} />
          <LanguageSwitcher />
        </div>

        {/* Mobile: Hamburger Menu */}
        <motion.div className='flex md:hidden' initial={false} animate={openSidebar ? 'open' : 'closed'}>
          <HamburgerButton clicked={openSidebar} onClick={handleToggleSidebar} />
          <AnimatePresence>
            {openSidebar && (
              <motion.div
                className='w-[80vw] h-screen z-20 fixed top-0 right-0 bg-secondaryBg'
                variants={sidebarVariants}
                transition={{duration: 0.175}}
                initial='closed'
                animate='open'
                exit='closed'
              >
                <motion.ul
                  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-secondaryText text-sm items-center space-y-8'
                  variants={menuListVariants}
                >
                  {navigationItems.map(nav => (
                    <motion.li key={nav.id} variants={menuItemVariants}>
                      <Link
                        href={`#${nav.href}`}
                        className='flex flex-col items-center gap-1.5 hover:text-primary transition-colors'
                        onClick={handleNavClick}
                      >
                        <span className='text-primary'>{nav.number}.</span>
                        {t.get(nav.translationKey)}
                      </Link>
                    </motion.li>
                  ))}

                  {/* Divider */}
                  <motion.li variants={menuItemVariants} className='w-full flex justify-center py-4'>
                    <div className='w-24 h-px bg-lightSlate/30' />
                  </motion.li>

                  <motion.li variants={menuItemVariants} className='flex justify-center'>
                    <PrimaryButton title={t.common.resume} href={RESUME_PDF_PATH} newTab={true} />
                  </motion.li>
                  <motion.li variants={menuItemVariants} className='flex justify-center'>
                    <LanguageSwitcher />
                  </motion.li>
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
};

const MemoizedHeader = React.memo(Header);
MemoizedHeader.displayName = 'Header';

export default MemoizedHeader;
