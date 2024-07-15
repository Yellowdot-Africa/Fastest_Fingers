import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './nav/Navbar';
import NavbarMobile from './nav/NavbarMobile';

const Layout: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className='font-inria text-ffgray relative'>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="block md:hidden">
        <NavbarMobile isPlaying={isPlaying} />
      </div>
      <Outlet context={{ isPlaying, setIsPlaying }} />
    </div>
  );
}

export default Layout;
