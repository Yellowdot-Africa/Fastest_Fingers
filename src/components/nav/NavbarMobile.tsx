import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import navData from './navData';
import ProfileModal from '../modals/ProfileModal';
import ProfileIcon from '../common/ProfileIcon';


const NavbarMobile: React.FC = () => {
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const location = useLocation();

  const toggleProfileModal = () => {
    setProfileModalVisible(!isProfileModalVisible);
  };

  return (
    <div className="md:hidden">
      <nav className="flex justify-between items-center bg-white pt-16 px-4">
        <img src="/images/FFlogo.svg" alt="Logo" className=" h-5" />
        <div className="flex items-center text-black cursor-pointer" onClick={toggleProfileModal}>
        <ProfileIcon className=' h-6 w-6' />
        </div>
      </nav>
      <nav className="fixed overflow-hidden bottom-0 w-full flex items-center justify-evenly bg-[#F9F9F9] z-50 py-6">
      {navData.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink 
                key={item.to}
                to={item.to}
                className="block "
              >
                <item.icon active={isActive} className='' />
              </NavLink>
            );
          })}
      </nav>
      <ProfileModal isVisible={isProfileModalVisible} onClose={toggleProfileModal} />
    </div>
  );
};

export default NavbarMobile;
