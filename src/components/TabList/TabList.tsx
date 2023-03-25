import React, {useState} from 'react';
import {TabItem, TabListProps} from './types';
import {motion, AnimatePresence, Variants} from 'framer-motion';
import clsx from 'clsx';
import TabContent from './TabContent';

const leftChildVariant: Variants = {
  offscreen: {
    x: -100,
    opacity: 0,
    transition: {
      x: {stiffness: 1000},
    },
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      x: {stiffness: 1000, velocity: -100},
    },
  },
};
const rightChildVariant: Variants = {
  offscreen: {
    x: 100,
    opacity: 0,
    transition: {
      x: {stiffness: 1000},
    },
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      x: {stiffness: 1000, velocity: -100},
    },
  },
};

const TabList = (props: TabListProps) => {
  const {data} = props;
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  return (
    <motion.div className='md:flex gap-[40px]'>
      <motion.ul className='border-l border-lightestNavy h-fit relative mb-[20px] md:mb-0' variants={leftChildVariant}>
        {data.map((item: TabItem, index: number) => {
          const {title} = item;
          return (
            <motion.li
              className={clsx({
                'text-sm md:text-base text-lightSlate hover:bg-primary/10 py-3 px-5 hover:text-primary cursor-pointer': true,
                'text-primary': activeTabIndex === index,
              })}
              key={index}
              onClick={() => {
                setActiveTabIndex(index);
              }}
            >
              {title}
            </motion.li>
          );
        })}
        <motion.div
          className='absolute w-[2px] bg-primary'
          //   style={{height: `${100 / data.length}%`, top: `${(activeTabIndex * 100) / data.length}%`, transition: 'linear 0.2s'}}
          initial={{height: `${100 / data.length}%`, top: 0}}
          animate={{top: `${(activeTabIndex * 100) / data.length}%`}}
          transition={{duration: 0.2, easing: 'linear'}}
        ></motion.div>
      </motion.ul>
      <motion.div className='py-[10px] flex-1 h-[261px]' variants={rightChildVariant}>
        {data.map((item: TabItem, index: number) => {
          const show = activeTabIndex === index;
          return <AnimatePresence key={index}>{show && <TabContent {...item.content} show={show} />}</AnimatePresence>;
        })}
      </motion.div>
    </motion.div>
  );
};

export default TabList;
