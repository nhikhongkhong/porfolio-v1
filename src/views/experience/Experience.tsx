import SectionTitle from '@/components/SectionTitle';
import React, {useRef} from 'react';
import {motion, Variants, useInView} from 'framer-motion';
import TabList from '@/components/TabList';
import {TabItem} from '@/components/TabList/types';

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
  const ref = useRef(null);
  const isInView = useInView(ref, {margin: '-100px 0px 0px -100px'});

  const timeline: Array<TabItem> = [
    {
      title: 'Vinox Co.,Ltd',
      content: {
        title: 'Full-Stack Developer',
        subTitle: 'Apr 2021 – Present',
        listInfo: [
          'Coordinating with other teams (BA, Devops, development team) to improve the quality of products.',
          'Design new code base to reduce the cost and enhance the flexibility for adaptation based on express, nextjs, tailwind, graphql.',
          'Coding, bug fixing and code reviewing...',
          'Supporting team members.',
        ],
      },
    },
    {
      title: 'Viettel Group',
      content: {
        title: 'Back-End Developer & Software Developer',
        subTitle: 'Mar 2020 – Apr 2021',
        listInfo: [
          'Reconstructing software architecture.',
          'Project scheduling.',
          'System designing.',
          'Coordinating with other teams to improve the quality of products.',
          'Coding, bug fixing and code reviewing...',
        ],
      },
    },
    {
      title: 'Murdoch University',
      content: {
        title: 'Student Major In Computer Science - BIS',
        subTitle: 'Sep 2018 - Mar 2020',
        listInfo: ['Bachelor in Business Information System (BIS) and Computer Science  ( Academic certification )'],
      },
    },
    {
      title: 'Back Khoa University',
      content: {
        title: 'Student Major In Computer Science',
        subTitle: 'Sep 2011 - Sep 2016',
        listInfo: ['Majoring in Information System - HEDSPI Program'],
      },
    },
  ];

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
      <SectionTitle title='My Working Experience' orderNumber="before:content-['02.']" />
      <TabList data={timeline} />
    </motion.section>
  );
};

const BackKhoaContent = () => {
  return <motion.div></motion.div>;
};

export default Experience;
