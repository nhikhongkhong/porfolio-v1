import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';

const ScrollProgress = (): React.ReactElement => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const updateScrollProgress = (): void => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Calculate scroll progress percentage
      const totalScrollableHeight = documentHeight - windowHeight;
      const progress = totalScrollableHeight > 0 ? (scrollTop / totalScrollableHeight) * 100 : 0;

      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    // Initial calculation
    updateScrollProgress();

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress, {passive: true});
    window.addEventListener('resize', updateScrollProgress, {passive: true});

    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  return (
    <div className='fixed top-0 left-0 right-0 h-1 z-[100] bg-transparent pointer-events-none'>
      <motion.div
        className='h-full bg-gradient-to-r from-primary via-primary to-primary/80 shadow-[0_0_10px_rgba(100,255,218,0.5),0_0_20px_rgba(100,255,218,0.3)]'
        initial={{width: 0}}
        animate={{width: `${scrollProgress}%`}}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 30,
          mass: 0.5,
        }}
      />
    </div>
  );
};

export default ScrollProgress;
