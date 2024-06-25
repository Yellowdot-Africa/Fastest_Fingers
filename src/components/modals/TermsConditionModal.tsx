import React from 'react';
import FFButton from '../common/FFButton';
import { ModalProps } from '../../types';


const TermsCondtionModal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white px-4 md:p-10 py-14 rounded shadow-lg w-full relative md:w-[524px] mx-6 ">
        <button onClick={onClose} className="absolute top-8 font-extralight right-24 text-2xl">×</button>
        <div className="md:w-3/5 mx-auto text-center">
          <span className="">Terms and conditions</span>
          <p className="my-3 text-center text-ffgray/70" >To enjoy fastest fingers without interruptions please ensure to  agree to our terns and conditions </p>
          <a className='underline italic text-teal text-sm' href="#">Read terms and conditions</a>
          <FFButton text="I Agree" className="mt-16" />
        </div>
      </div>
    </div>
  );
};

export default TermsCondtionModal;
