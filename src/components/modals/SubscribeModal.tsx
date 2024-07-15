import React from 'react';
import FFButton from '../common/FFButton';
import { ModalProps } from '../../types';


const SubscribeModal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white px-4 md:p-10 py-14 rounded shadow-lg w-full md:w-[524px] mx-6 ">
        <div className="md:w-3/5 mx-auto text-center relative">
        <button onClick={onClose} className="absolute font-light -top-1 right-0 text-2xl">×</button>
          <span className="">Subscribe to a plan to proceed</span>
          <label htmlFor="select" className="block mt-4 text-left text-xs text-ffgray/70">Select Subscription Plan</label>
          <select id="select" className="mb-4 mt-1 w-full py-3 px-4 border border-[#00F0FF] rounded-3xl">
            <option value="20">N20/Day</option>
            <option value="50">N50/Day</option>
            <option value="100">N100/Day</option>
            <option value="200">N200/Day</option>
          </select>
          <p className='bg-[#9A000033] py-2 hidden italic'>Subscription request failed, Try later</p>
          <FFButton text="Subscribe Now" className="mt-6" />
        </div>
      </div>
    </div>
  );
};

export default SubscribeModal;
