import React, {useRef} from 'react';
import {motion, Variants, useInView} from 'framer-motion';
import SectionTitle from '@/components/SectionTitle';
import {ProjectCardProps} from '@/components/cards/types';
import ProjectCard from '@/components/cards/ProjectCard';

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
  const ref = useRef(null);
  const istitleInView = useInView(ref, {margin: '-100px'});
  const listProject: Array<ProjectCardProps> = [
    {
      title: 'MangaM',
      subTitle: 'Vinox Co.,Ltd - Full-stack Developer',
      image: '/mangam.png',
      descriptions: [
        `A web-based system that allows the artists can publish their arts quickly, easily and at no cost.

`,
        `The aim of this project was created solely to make meaningful and entertaining manga available for everyone regardless of their situations and locations.`,
      ],
      technologies: ['Next JS', 'Tailwind Css', 'Redux', 'Adonis', 'Mysql Redis'],
    },
    {
      title: 'Soup Finance',
      subTitle: 'Vinox Co.,Ltd - FE Web3 Developer',
      image: '/soup.jpg',
      descriptions: [
        'Soup Finance is a decentralised cross-chain money market for the metaverse economy. Supply crypto-assets to earn interest, and borrow assets for low interest subsidised loans with $SOUP rewards.',
      ],
      technologies: ['NextJs', 'Tailwind Css', 'Web3', 'Framer Motion'],
    },
    {
      title: 'NFT Market',
      subTitle: 'Vinox Co.,Ltd - FE Web3 Developer',
      image: '/nft.png',
      descriptions: [
        ' A Nft market for trading items from MetaSea - The Amazing Adventure is a multiplayer building game where anyone can buy and own rare items, collect ancient sea monsters and meet new friends.',
      ],
      technologies: ['Web3 ', 'NextJs', 'Tailwind Css', 'Telegraf', 'MongoDb'],
    },
  ];
  return (
    <motion.section id='work' className='py-[50px] w-full max-w-[900px]'>
      <SectionTitle
        title={`Something I've build`}
        orderNumber="before:content-['03.']"
        animate={istitleInView ? 'onscreen' : 'offscreen'}
        variants={titleVariants}
        ref={ref}
      />
      <motion.div className='mt-[10px] space-y-[50px]'>
        {listProject.map((project: ProjectCardProps, index: number) => {
          return <ProjectCard key={index} {...project} revert={index % 2 === 1} />;
        })}
      </motion.div>
    </motion.section>
  );
};

export default Work;
