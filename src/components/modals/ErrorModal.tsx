import React from 'react';
import FFButton from '../common/FFButton';
import { ModalProps } from '../../types';


const WinningModal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 py-14 rounded shadow-lg relative w-full md:w-[444px] mx-6">
        <div className="mx-auto text-center text-ffgray relative">
        <button onClick={onClose} className="absolute font-light -top-1 right-12 text-2xl">×</button>
          <span className="">Notice</span>
          <p className="my-3 text-center italic">Oops, Seems something went wrong.</p>

            <img className='w-max mx-auto mb-10' src="/icons/alert.svg" alt="alert icon" />
          <FFButton text="Play Again" className="md:w-5/6" />
          {/* <FFButton variant='outlined' text="Home" className="md:w-5/6 text-teal mb-0" /> */}
          <a href='#' className='block text-teal text-sm font-bold'>Home</a>
        </div>
      </div>
    </div>
  );
};

export default WinningModal;
