import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

const Logo = ({className = ''}: LogoProps): React.ReactElement => {
  return (
    <Link href='/' className={`hover:opacity-80 transition-opacity ${className}`} aria-label='Home'>
      <svg
        width='40'
        height='45'
        viewBox='0 0 40 45'
        className='fill-none hover:fill-[#64FFDA]/10 transition-colors'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        aria-label='Logo'
      >
        <path
          d='M15.5227 29L12.3409 17.3636H13.7727L16.2045 26.8409H16.3182L18.7955 17.3636H20.3864L22.8636 26.8409H22.9773L25.4091 17.3636H26.8409L23.6591 29H22.2045L19.6364 19.7273H19.5455L16.9773 29H15.5227Z'
          fill='#64FFDA'
        />
        <path d='M20 2L38.1865 12.5V33.5L20 44L1.81347 33.5V12.5L20 2Z' stroke='#64FFDA' strokeWidth='2' />
      </svg>
    </Link>
  );
};

export default Logo;
