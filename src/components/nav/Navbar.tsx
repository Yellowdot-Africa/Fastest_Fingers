import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import navData from './navData';
import ProfileModal from '../modals/ProfileModal';
import ProfileIcon from '../common/ProfileIcon';

const Navbar: React.FC = () => {
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const location = useLocation();

  const toggleProfileModal = () => {
    setProfileModalVisible(!isProfileModalVisible);
  };

  return (
    <nav className="flex justify-between items-center font-inria bg-white shadow pt-4 pb-2 px-16 lg:px-24">
      <img src="/images/FFlogo.svg" alt="Logo" className="h-5" />
      <div className='flex gap-28 lg:gap-40 text-ffgray text-xs font-bold'>
        <div className='flex items-center gap-10'>
          {navData.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink 
                key={item.to}
                to={item.to}
                className="flex flex-col items-center h-full justify-between"
              >
                <item.icon active={isActive} className='' />
                <p className={isActive ? 'text-teal' : ''}>{item.label}</p>
              </NavLink>
            );
          })}
        </div>
        <div className="flex flex-col items-center justify-between cursor-pointer" onClick={toggleProfileModal}>
          <ProfileIcon className=' h-6' />
          <span>Profile</span>
        </div>
      </div>
      <ProfileModal isVisible={isProfileModalVisible} onClose={toggleProfileModal} />
    </nav>
  );
};

export default Navbar;
