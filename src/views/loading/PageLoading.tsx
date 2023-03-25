import React from 'react';
import {PageLoadingProps} from './types';

const PageLoading = (props: PageLoadingProps) => {
  const {stopLoading} = props;
  React.useEffect(() => {
    if (!stopLoading) return;
    const stopTimeout = setTimeout(() => {
      stopLoading();
    }, 3500);
    return () => {
      clearTimeout(stopTimeout);
    };
  }, [stopLoading]);

  return (
    <div className='w-screen h-sceen fixed top-0 left-0 bottom-0 z-[100] bg-black flex justify-center items-center'>
      <svg
        width='459'
        height='473'
        viewBox='0 0 459 473'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='md:block hidden loading-svg'
      >
        <path
          d='M60.2949 138.845L229 41.1994L397.705 138.845V334.155L229 431.801L60.2949 334.155V138.845Z'
          stroke='#64FFDA'
          strokeWidth='9'
          className='loading-path'
        />
        <path
          d='M179.034 334L139.261 188.545H157.159L187.557 307.011H188.977L219.943 188.545H239.83L270.795 307.011H272.216L302.614 188.545H320.511L280.739 334H262.557L230.455 218.091H229.318L197.216 334H179.034Z'
          fill='#64FFDA'
          className='loading-word'
        />
      </svg>
      <svg
        width='200'
        height='216'
        viewBox='0 0 200 216'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='block md:hidden loading-svg'
      >
        <path d='M100 8L186.603 58V158L100 208L13.3975 158V58L100 8Z' stroke='#64FFDA' strokeWidth='9' className='loading-path' />
        <path
          d='M75.017 156L55.1307 83.2727H64.0795L79.2784 142.506H79.9886L95.4716 83.2727H105.415L120.898 142.506H121.608L136.807 83.2727H145.756L125.869 156H116.778L100.727 98.0455H100.159L84.108 156H75.017Z'
          fill='#64FFDA'
          className='loading-word'
        />
      </svg>
    </div>
  );
};

export default PageLoading;
