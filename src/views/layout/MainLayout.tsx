import React, {useState} from 'react';
import Footer from './Footer';
import Header from './Header';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import PageLoading from '@/views/loading';
import {StreamerView} from '@/components/StreamerView';

const MainLayout = ({children}: {children?: React.ReactNode}) => {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div className='bg-primaryBg w-screen min-h-screen flex flex-col relative'>
      <StreamerView />
      {loading && (
        <PageLoading
          stopLoading={() => {
            setLoading(false);
          }}
        />
      )}
      <Header />
      <LeftSideBar />
      <RightSideBar />
      <main className='flex-1 px-[25px] md:px-[40px] w-full flex justify-center'>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
