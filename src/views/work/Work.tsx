import React, {useRef} from 'react';
import {motion, Variants, useInView} from 'framer-motion';
import SectionTitle from '@/components/SectionTitle';
import {ProjectCardProps} from '@/components/cards/types';
import ProjectCard from '@/components/cards/ProjectCard';
import {useTranslation} from '@/hooks/useTranslation';

const titleVariants: Variants = {
  offscreen: {
    y: -50,
    opacity: 0,
    transition: {
      y: {stiffness: 1000},
    },
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      y: {stiffness: 1000, velocity: -100},
    },
  },
};

const Work = () => {
  const {t} = useTranslation();
  const ref = useRef(null);
  const istitleInView = useInView(ref, {margin: '-100px'});

  const listProject: Array<ProjectCardProps> = t.work.projects.map((project, index) => ({
    direction: (index % 2 === 0 ? 'right' : 'left') as 'left' | 'right',
    title: project.title,
    subTitle: project.subtitle,
    image: index === 0 ? '/mangam.webp' : index === 1 ? '/soup.webp' : '/nft.webp',
    descriptions: project.descriptions,
    technologies: project.technologies,
    revert: index % 2 === 1,
    imageFit: false,
  }));
  return (
    <motion.section id='work' className='py-[50px] w-full max-w-[900px]'>
      <SectionTitle
        title={t.work.title}
        orderNumber="before:content-['03.']"
        animate={istitleInView ? 'onscreen' : 'offscreen'}
        variants={titleVariants}
        ref={ref}
      />
      <motion.div className='mt-[10px] space-y-[50px]'>
        {listProject.map((project: ProjectCardProps, index: number) => {
          return <ProjectCard key={index} {...project} />;
        })}
      </motion.div>
    </motion.section>
  );
};

export default Work;
