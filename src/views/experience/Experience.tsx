import SectionTitle from '@/components/SectionTitle';
import React, {useRef} from 'react';
import {motion, Variants, useInView} from 'framer-motion';
import TabList from '@/components/TabList';
import {TabItem} from '@/components/TabList/types';
import {useTranslation} from '@/hooks/useTranslation';

const sectionVariants: Variants = {
  offscreen: {
    transition: {staggerChildren: 0.05, staggerDirection: -1},
    opacity: 0,
    y: -50,
  },
  onscreen: {
    transition: {staggerChildren: 0.07, delayChildren: 0.5},
    opacity: 1,
    y: 0,
  },
};

const Experience = () => {
  const {t} = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, {margin: '-100px 0px 0px -100px'});

  const timeline: Array<TabItem> = t.experience.jobs.map(job => ({
    title: job.company,
    content: {
      title: job.position,
      subTitle: job.period,
      listInfo: job.responsibilities,
    },
  }));

  return (
    <motion.section
      id='experience'
      className='py-[50px] w-full max-w-[700px]'
      transition={{duration: 1}}
      initial='offscreen'
      animate={isInView ? 'onscreen' : 'offscreen'}
      variants={sectionVariants}
      ref={ref}
    >
      <SectionTitle title={t.experience.title} orderNumber="before:content-['02.']" />
      <TabList data={timeline} />
    </motion.section>
  );
};

const BackKhoaContent = () => {
  return <motion.div></motion.div>;
};

export default Experience;
