import React, {useMemo} from 'react';
import {motion} from 'framer-motion';
import clsx from 'clsx';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

const SectionWrapper = ({children, id, className}: SectionWrapperProps): React.ReactElement => {
  // Generate random shapes for each section
  const shapes = useMemo(() => {
    const shapeTypes = ['circle', 'square', 'triangle', 'blob'];
    return Array.from({length: 3}).map((_, i) => ({
      id: i,
      type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      size: 60 + Math.random() * 80,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: 0.03 + Math.random() * 0.05,
      rotation: Math.random() * 360,
    }));
  }, []);

  const getShapeElement = (shape: (typeof shapes)[0]) => {
    const baseClasses = 'absolute pointer-events-none';
    const style = {
      left: `${shape.left}%`,
      top: `${shape.top}%`,
      opacity: shape.opacity,
      transform: `rotate(${shape.rotation}deg)`,
    };

    switch (shape.type) {
      case 'circle':
        return (
          <motion.div
            key={shape.id}
            className={clsx(baseClasses, 'rounded-full bg-primary')}
            style={{
              ...style,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [shape.opacity, shape.opacity * 1.5, shape.opacity],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      case 'square':
        return (
          <motion.div
            key={shape.id}
            className={clsx(baseClasses, 'bg-primary')}
            style={{
              ...style,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
            }}
            animate={{
              rotate: [shape.rotation, shape.rotation + 90, shape.rotation],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      case 'triangle':
        return (
          <motion.div
            key={shape.id}
            className={clsx(baseClasses)}
            style={{
              ...style,
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid rgba(100, 255, 218, ${shape.opacity})`,
            }}
            animate={{
              rotate: [shape.rotation, shape.rotation + 120, shape.rotation],
            }}
            transition={{
              duration: 6 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      case 'blob':
        return (
          <motion.div
            key={shape.id}
            className={clsx(baseClasses, 'bg-primary rounded-full')}
            style={{
              ...style,
              width: `${shape.size}px`,
              height: `${shape.size * 0.7}px`,
              borderRadius: '50% 40% 60% 30%',
            }}
            animate={{
              borderRadius: ['50% 40% 60% 30%', '30% 60% 40% 50%', '50% 40% 60% 30%'],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.section
      id={id}
      className={clsx(
        'relative py-[50px] md:py-[80px] px-[25px] md:px-[40px]',
        'bg-secondaryBg/30 backdrop-blur-sm',
        'border border-primary/10 rounded-lg',
        'shadow-lg shadow-primary/5',
        'mb-[40px]',
        className,
      )}
    >
      {/* Decorative shapes */}
      <div className='absolute inset-0 overflow-hidden rounded-lg pointer-events-none'>{shapes.map(shape => getShapeElement(shape))}</div>

      {/* Content wrapper with relative positioning */}
      <div className='relative z-10'>{children}</div>
    </motion.section>
  );
};

export default SectionWrapper;
