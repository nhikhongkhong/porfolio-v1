interface ProjectCardProps {
  title: string;
  subTitle: string;
  descriptions: Array<string>;
  technologies: Array<string>;
  image: string;
  revert?: boolean;
  imageFit?: boolean;
  direction: 'left' | 'right';
}

export type {ProjectCardProps};
