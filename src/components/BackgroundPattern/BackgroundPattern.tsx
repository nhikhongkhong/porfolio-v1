import React, {useMemo} from 'react';
import {motion} from 'framer-motion';

const BackgroundPattern = (): React.ReactElement => {
  // Go board configuration - 13x13 grid (smaller for better visibility)
  const GRID_SIZE = 13;
  const CELL_SIZE = 50; // pixels in viewBox units
  const BOARD_PADDING = 50; // padding around the board in viewBox units

  // Calculate star points (hoshi) positions for a 13x13 board
  // Star points are at: 3-3, 3-9, 9-3, 9-9, and center (6-6)
  const starPoints = useMemo(() => {
    const positions = [
      {row: 3, col: 3},
      {row: 3, col: 9},
      {row: 9, col: 3},
      {row: 9, col: 9},
      {row: 6, col: 6}, // Center (Tengen)
    ];
    return positions.map(pos => ({
      x: BOARD_PADDING + pos.col * CELL_SIZE,
      y: BOARD_PADDING + pos.row * CELL_SIZE,
    }));
  }, []);

  return (
    <div className='fixed inset-0 z-0 overflow-hidden pointer-events-none'>
      {/* Go Board Grid */}
      <svg
        className='absolute inset-0 w-full h-full opacity-[0.25]'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 800 800'
        preserveAspectRatio='xMidYMid meet'
      >
        <defs>
          {/* Subtle texture pattern */}
          <pattern id='woodTexture' width='4' height='4' patternUnits='userSpaceOnUse'>
            <rect width='4' height='4' fill='rgba(100, 255, 218, 0.02)' />
            <circle cx='2' cy='2' r='0.5' fill='rgba(100, 255, 218, 0.03)' />
          </pattern>

          {/* Blur filter for glow effect */}
          <filter id='glowBlur'>
            <feGaussianBlur stdDeviation='4' />
          </filter>
        </defs>

        {/* Background with texture */}
        <rect width='100%' height='100%' fill='url(#woodTexture)' />

        {/* Go board grid lines */}
        <g className='text-primary/40'>
          {/* Vertical lines */}
          {Array.from({length: GRID_SIZE}).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={BOARD_PADDING + i * CELL_SIZE}
              y1={BOARD_PADDING}
              x2={BOARD_PADDING + i * CELL_SIZE}
              y2={BOARD_PADDING + (GRID_SIZE - 1) * CELL_SIZE}
              stroke='currentColor'
              strokeWidth='1.5'
              vectorEffect='non-scaling-stroke'
            />
          ))}

          {/* Horizontal lines */}
          {Array.from({length: GRID_SIZE}).map((_, i) => (
            <line
              key={`h-${i}`}
              x1={BOARD_PADDING}
              y1={BOARD_PADDING + i * CELL_SIZE}
              x2={BOARD_PADDING + (GRID_SIZE - 1) * CELL_SIZE}
              y2={BOARD_PADDING + i * CELL_SIZE}
              stroke='currentColor'
              strokeWidth='1.5'
              vectorEffect='non-scaling-stroke'
            />
          ))}
        </g>

        {/* Subtle animated glow at star points */}
        {starPoints.map((point, index) => (
          <motion.circle
            key={`glow-${index}`}
            cx={point.x}
            cy={point.y}
            r='10'
            fill='currentColor'
            className='text-primary/10'
            filter='url(#glowBlur)'
            animate={{
              r: [10, 15, 10],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{
              duration: 3 + index * 0.4,
              repeat: Infinity,
              delay: index * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Star points (hoshi) */}
        {starPoints.map((point, index) => (
          <motion.circle
            key={`star-${index}`}
            cx={point.x}
            cy={point.y}
            r='4'
            fill='currentColor'
            className='text-primary/50'
            initial={{opacity: 0.4, scale: 0.9}}
            animate={{
              opacity: [0.4, 0.6, 0.4],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 4 + index * 0.5,
              repeat: Infinity,
              delay: index * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default BackgroundPattern;
