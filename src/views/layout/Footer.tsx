import React, {useMemo} from 'react';
import {motion, Variants} from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';
import {socialLinks} from '@/utils/socialInfo';
import {useTranslation} from '@/hooks/useTranslation';

const Footer = () => {
  const {t} = useTranslation();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const footerVariants: Variants = {
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
  };

  const listVariants: Variants = {
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
  };

  return (
    <motion.footer
      initial={'closed'}
      animate={'open'}
      className='flex flex-col items-center justify-center min-h-[70px]'
      role='contentinfo'
      aria-label='Site footer'
    >
      <motion.ul className={clsx('flex md:hidden items-center text-lightSlate mb-[10px]')} variants={listVariants}>
        {socialLinks.map((item, index) => {
          const IconComponent = item.icon;

          return (
            <motion.li className='p-[10px]' key={index} variants={footerVariants}>
              <Link href={item.href} target='_blank' rel='noopener noreferrer'>
                <IconComponent size={24} className='hover:scale-100 hover:-translate-y-[2px] ease-in-out duration-300 hover:fill-primary' />
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
      <motion.p
        className='mb-[10px]  hover:text-primary hover:translate-y-[20px] ease-in-out duration-300 text-slate text-xs'
        variants={footerVariants}
        whileHover={{transform: 'translateY(-5px)'}}
      >
        {t.footer.copyright} © {currentYear}
      </motion.p>
      <motion.p
        className='mb-[20px] hover:text-primary hover:translate-y-[20px] ease-in-out duration-300 text-slate text-xs'
        variants={footerVariants}
        whileHover={{transform: 'translateY(-5px)'}}
      >
        {t.footer.inspiration}
      </motion.p>
    </motion.footer>
  );
};

const FooterMemo = React.memo(Footer);

export default FooterMemo;
