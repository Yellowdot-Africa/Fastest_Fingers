import React, { useState, useEffect } from 'react';
import TextInput from '../components/common/TextInput';
import { useAuth } from '../context/AuthContext';
// import { getUserProfile, saveUserProfile } from '../api/apiService';
import { UserProfile } from '../types';
import ErrorModal from '../components/modals/ErrorModal';
import { saveUserProfile } from '../api/apiService';

interface BankInfo {
    accountName: string;
    accountNumber: string;
    bank: string;
}

interface SubscriptionEntry {
    id: number;
    plan: string;
    date: string;
}

  const Settings: React.FC = () => {
    const { token, msisdn, profile, setProfile } = useAuth();
    // console.log(msisdn)
    const [openSection, setOpenSection] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmText, setConfirmText] = useState(' ');
    const [error, setError] = useState<string>('');
    const [bankInfo, setBankInfo] = useState<BankInfo>({
        accountName: '',
        accountNumber: '',
        bank: ''
    });
    useEffect(() => {
      if (profile) {
          setBankInfo({
              accountName: profile.accountName,
              accountNumber: profile.accountNumber,
              bank: profile.bank
          });
      }
  }, [profile]);

    const subscriptionData: SubscriptionEntry[] = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        plan: "N20/Day",
        date: "02/07/2024"
    }));
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 10;
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = subscriptionData.slice(indexOfFirstEntry, indexOfLastEntry);
    const totalPages = Math.ceil(subscriptionData.length / entriesPerPage);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBankInfo({ ...bankInfo, [e.target.name]: e.target.value });
  };
  const saveBankInfo = async () => {
    setLoading(true);
    setConfirmText('confirming...');
    // To Ensure the profile is defined and contains the current data to be saved.
    const updatedProfile: UserProfile = {
      msisdn,
      nickname: profile?.nickname || 'player123',
      avatar: profile?.avatar || 1,
      bank: bankInfo.bank,
      accountNumber: bankInfo.accountNumber,
      accountName: bankInfo.accountName
    };

    try {
        const response = await saveUserProfile(updatedProfile, token);
        if (response && response.statusCode === '999') {
            setConfirmText('confirmed');
            setTimeout(() => {
                setConfirmText('');
                setIsEditing(false);
            }, 1000);
            setProfile(updatedProfile);
        } else {
            setError('Bank details could not be saved.');
        }
    } catch (error) {
        setError('Bank details could not be saved.');
        console.error('Error saving user profile:', error);
    }
    setLoading(false);
  };
    const closeErrorModal = () => {
        setError('');
    };

  return (
    <div>
      <div className="md:hidden flex flex-col items-center my-4">
        <img src="icons/settings-icon.svg" alt="leaderboaed" className="h-5" />
        <h1 className="text-lg">Setting</h1>
      </div>
      <div className="max-w-3xl md:mx-auto py-6 pb-40 rounded-lg bg-[#F9F9F9] shadow-custom my-8 md:my-16 mx-4">
        <div className="mb-4 md:w-3/5 mx-auto">
          <button
            className="w-full flex justify-between items-center p-4 bg-[#F9F9F9] rounded-md border-b text-ffgray/80"
            onClick={() => toggleSection('bankInfo')}
          >
            <div className='flex items-center gap-2'>
              <img src="/icons/ph_bank-bold.svg" alt='bank info' />
              <span className="font-bold">Bank Information</span>
            </div>
            <span className='text-teal'>{openSection === 'bankInfo' ? '▲' : '▼'}</span>
          </button>
          {openSection === 'bankInfo' && (
            <div className="p-4 bg-[#F9F9F9] max-md:shadow-custom flex flex-col">
              {isEditing ? (
                <>
                  <TextInput
                    name="accountName"
                    id="accountName"
                    type="text"
                    label="Account Name"
                    value={bankInfo.accountName}
                    placeholder="Enter your account name"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    name="accountNumber"
                    id="accountNumber"
                    type="text"
                    label="Account Number"
                    value={bankInfo.accountNumber}
                    placeholder="Enter your account number"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    name="bank"
                    id="bank"
                    type="text"
                    label="Bank Name"
                    placeholder="Select bank"
                    value={bankInfo.bank}
                    onChange={handleInputChange}
                  />
                  <p className='text-ffgray/70 text-xs'>{confirmText}</p>
                  <button className="text-teal font-bold text-right" onClick={saveBankInfo} disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  {error && <p className='text-red-500 text-xs mt-2'>{error}</p>}
                </>
              ) : (
                <>
                  <div className='ml-6 space-y-6 text-ffgray/60'>
                    <div><p className='mb-2'>Account Name:</p> <span>{bankInfo.accountName}</span></div>
                    <div><p className='mb-2'>Account Number:</p> <span>{bankInfo.accountNumber}</span></div>
                    <div><p className='mb-2'>Bank Name:</p> <span>{bankInfo.bank}</span></div>
                  </div>
                  <button className="mt-4 text-teal text-right font-bold" onClick={handleEditClick}>Edit</button>
                </>
              )}
            </div>
          )}
        </div>
        <div className='md:w-3/5 mx-auto'>
          <button
            className="w-full flex justify-between items-center p-4 bg-[#F9F9F9] rounded-md border-b text-ffgray/80"
            onClick={() => toggleSection('subscriptionHistory')}
          >
            <div className='flex items-center gap-3'>
              <img src="/icons/ph_film-script-bold.svg" alt='history' />
              <span className="font-bold">Subscription History</span>
            </div>
            <span className='text-teal'>{openSection === 'subscriptionHistory' ? '▲' : '▼'}</span>
          </button>
          {openSection === 'subscriptionHistory' && (
            <div className="p-4 bg-[#F9F9F9] max-md:shadow-custom md:text-lg">
              {currentEntries.map((entry, index) => (
                <div key={entry.id} className="flex justify-between my-4">
                  <div>
                    <span className='italic mr-8'>{index + 1}.</span>
                    <span className=''>{entry.plan}</span>
                  </div>
                  <span className='text-teal'>{entry.date}</span>
                </div>
              ))}
              <p className='text-teal text-center font-bold my-4'>clear</p>
              <div className="flex justify-between items-center mt-4">
                <button className='text-teal font-bold' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span>{currentPage}/{totalPages}</span>
                <button className='text-teal font-bold' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ErrorModal isVisible={!!error} message={error} onClose={closeErrorModal} />
    </div>
  );
};

export default Settings;
