import {HTMLMotionProps} from 'framer-motion';

interface SectionTitleProps extends HTMLMotionProps<'div'> {
  orderNumber: string;
  title: string;
  textClassName?: string;
}

export type {SectionTitleProps};
