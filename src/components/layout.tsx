import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './nav/Navbar';
import NavbarMobile from './nav/NavbarMobile';

const Layout: React.FC = () => {
  return (
    <div className='font-inria text-ffgray relative'>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="block md:hidden">
        <NavbarMobile />
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
