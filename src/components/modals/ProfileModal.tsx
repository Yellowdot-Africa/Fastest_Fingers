import React, { useState, useEffect } from 'react';
import TextInput from "../common/TextInput";
import { useAuth } from '../../context/AuthContext';
import { saveUserProfile } from '../../api/apiService';
import { UserProfile } from '../../types';
import FFButton from "../common/FFButton";

interface ProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isVisible, onClose }) => {
  const { token, msisdn, profile, setProfile } = useAuth();
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    // Update nickname from profile whenever profile changes
    if (profile?.nickname) {
      setNickname(profile.nickname);
    }
  }, [profile]);

  const [loading, setLoading] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const handleSave = async () => {
    setLoading(true);
    setConfirmText('Confirming...');
    try {
      const updatedProfile: UserProfile = {
        msisdn,
        nickname,
        avatar: profile?.avatar || 1,
        bank: profile?.bank || '',
        accountNumber: profile?.accountNumber || '',
        accountName: profile?.accountName || ''
      };

      const response = await saveUserProfile(updatedProfile, token);
      if (response && response.statusCode === '999') {
        setConfirmText('Confirmed');
        setProfile(updatedProfile);
        setTimeout(() => {
          setConfirmText('');
          onClose();
        }, 3000);
      } else {
        setConfirmText('Failed to save profile.');
      }
    } catch (error) {
      setConfirmText('Failed to save profile.');
      console.error('Error saving user profile:', error);
    }
    setLoading(false);
  };

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
        <TextInput id="phoneNumber" type="text" label="Phone Number" value={msisdn} readOnly />
        <TextInput id="nickname" type="text" label="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <FFButton text="Submit" onClick={handleSave} disabled={loading} />
        {confirmText && <p className="text-teal text-center">{confirmText}</p>}
      </form>
    </div>
  );
};

export default ProfileModal;
