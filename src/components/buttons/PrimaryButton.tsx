import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import {PrimaryButtonProps} from './types';

const PrimaryButton = (props: PrimaryButtonProps) => {
  const {title, href, onClick, textClassName, newTab} = props;

  return (
    <button
      className={clsx(
        `rounded-[5px] border-primary border hover:bg-primary/10 text-primary text-sm py-[0.5rem] px-[1rem] hover:scale-110 ease-in-out duration-200`,
        'relative group overflow-hidden hover:text-primaryBg',
        textClassName,
      )}
      onClick={onClick}
    >
      {href ? (
        <Link locale={false} target={newTab ? '_blank' : '_self'} rel='noopener noreferrer' href={href} scroll={false} className='w-full'>
          {' '}
          {title}
        </Link>
      ) : (
        title
      )}
      <div className='bubble left-0 delay-0 bg-primary' />
      <div className='bubble left-1/4 delay-100 bg-primary ' />
      <div className='bubble left-2/4 delay-200 bg-primary' />
      <div className='bubble left-3/4 delay-300 bg-primary' />
    </button>
  );
};

export default PrimaryButton;
