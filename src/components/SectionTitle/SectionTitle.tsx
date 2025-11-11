import clsx from 'clsx';
import React from 'react';
import {ForwardRefComponent, HTMLMotionProps, motion} from 'framer-motion';
import {SectionTitleProps} from './types';

export const SectionTitle = React.forwardRef<any, SectionTitleProps>((props, ref) => {
  const {orderNumber, title, textClassName, ...rest} = props;
  return (
    <motion.div className={clsx('mb-[40px] ', textClassName)} {...rest} ref={ref}>
      <motion.h2
        className={clsx(
          'block relative items-end text-xl leading-[48px] md:text-3xl text-white',
          'before:text-base md:before:text-lg before:text-primary before:mr-[10px] w-full',
          "after:content-[''] after:h-[1px] after:w-full md:after:w-[300px] after:bg-lightestNavy after:absolute after:top-1/2 after:ml-[20px]",
          orderNumber,
        )}
      >
        {title}
      </motion.h2>
    </motion.div>
  );
});

SectionTitle.displayName = 'SectionTitle';
export default SectionTitle;
