import React from 'react';
import FFButton from "../common/FFButton";
import TextInput from "../common/TextInput";

interface ProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed max-sm:w-full top-16 right-0 md:right-24 z-50 bg-[#F9F9F9] p-10 rounded-[20px] shadow-custom">
      <button onClick={onClose} className="absolute top-10 font-light right-16 text-2xl">×</button>
      <div>
        <div className="flex flex-col items-center">
          <img src="/icons/profile-icon.svg" alt="Profile" className="h-8" />
          <span>Profile</span>
        </div>
        <p>Please fill the form below to complete profile</p>
      </div>
      <form action="">
        <TextInput id="firstName" type="text" label="First name" />
        <TextInput id="lastName" type="text" label="Last name" />
        <TextInput id="email" type="email" label="Email" />
        <TextInput id="nickName" type="text" label="Nick name" />
        <FFButton text="Submit" disabled={true} />
      </form>
    </div>
  );
};

export default ProfileModal;
