import clsx from 'clsx';
import React, {useState} from 'react';
import {motion} from 'framer-motion';

import {HamburgerButtonProps} from './types';

const HamburgerButton = (props: HamburgerButtonProps) => {
  const {textClassName, onClick, clicked} = props;
  const handleOnclick = () => {
    onClick && onClick();
  };
  return (
    <motion.button
      className={clsx('p-[15px] flex items-center border-0 transition-all duration-150 ease-linear z-30', textClassName)}
      onClick={handleOnclick}
    >
      <motion.div className={clsx(' relative inline-block w-[36px] h-[24px]')}>
        <motion.div
          className={clsx('h-[3px] bg-primary absolute top-[0] right-0')}
          variants={{
            closed: {width: 36, transform: 'translateY(0) rotate(0deg) ', transformOrigin: 'center'},
            open: {
              width: 30,
              top: '50%',
              transform: 'translateY(-50%) rotate(45deg) ',
              transformOrigin: 'center',
            },
          }}
          transition={{duration: 0.2}}
        />
        <motion.div
          className={clsx('h-[3px] bg-primary w-[30px] absolute top-1/2 -translate-y-1/2 right-0')}
          variants={{
            closed: {opacity: 1},
            open: {opacity: 0},
          }}
          transition={{duration: 0.2}}
        />

        <motion.div
          className={clsx('h-[3px] bg-primary w-[24px] absolute bottom-[0] right-0')}
          variants={{
            closed: {width: 24, transform: 'translateY(0) rotate(0deg)', transformOrigin: 'center'},
            open: {
              width: 30,
              top: '50%',
              transform: 'translateY(-50%) rotate(-45deg)',
              transformOrigin: 'center',
            },
          }}
          transition={{duration: 0.2}}
        />
      </motion.div>
    </motion.button>
  );
};

export default HamburgerButton;
