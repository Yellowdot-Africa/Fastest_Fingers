import React, { useState } from 'react';
import TextInput from '../components/common/TextInput';

interface BankInfo {
  accountName: string;
  accountNumber: string;
  bankName: string;
}

interface SubscriptionEntry {
  id: number;
  plan: string;
  date: string;
}

const Settings: React.FC = () => {
  const [openSection, setOpenSection] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [bankInfo, setBankInfo] = useState<BankInfo>({
    accountName: 'Dorcas Blessing',
    accountNumber: '100010001',
    bankName: 'First Bank'
  });

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

  const saveBankInfo = () => {
    setIsEditing(false);
    console.log("Saved:", bankInfo);
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
              <img  src="/icons/ph_bank-bold.svg"  alt='bank info'/>
              <span className="font-bold">Bank Information</span>
            </div>

            <span className='text-teal'>{openSection === 'bankInfo' ? '▲' : '▼'}</span>
          </button>
          {openSection === 'bankInfo' && (
            <div className="p-4 bg-[#F9F9F9] max-md:shadow-custom  flex flex-col">
              {isEditing ? (
                <>

                  <TextInput
                    // className='bg-white'
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
                  name="bankName"
                    id="bankName"
                    type="text"
                    label="Bank Name"
                    placeholder="Select bank"
                    value={bankInfo.bankName}
                    onChange={handleInputChange}
                  />
                  <p className='text-ffgray/70 text-xs'>confirming</p>
                  <button className=" text-teal font-bold text-right" onClick={saveBankInfo}>Save</button>
                </>
              ) : (
                <>
                  <div className='ml-6 space-y-6 text-ffgray/60'>
                    <div><p className='mb-2'>Account Name:</p> <span>{bankInfo.accountName}</span></div>
                    <div><p className='mb-2'>Account Number:</p> <span>{bankInfo.accountNumber}</span></div>
                    <div><p className='mb-2'>Bank Name:</p> <span>{bankInfo.bankName}</span></div>
                  </div>
                  <button className="mt-4  text-teal text-right font-bold" onClick={handleEditClick}>Edit</button>
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
            <img src="/icons/ph_film-script-bold.svg" alt='history'/>
              <span className="font-bold">Subscription History</span>
            </div>

            <span className='text-teal'>{openSection === 'subscriptionHistory' ? '▲' : '▼'}</span>
          </button>
          {openSection === 'subscriptionHistory' && (
            <div className="p-4 bg-[#F9F9F9] max-md:shadow-custom  md:text-lg">
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
    </div>
  );
};

export default Settings;
