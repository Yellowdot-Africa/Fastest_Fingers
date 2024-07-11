import React from 'react';
import FFButton from '../common/FFButton';
import { ModalProps } from '../../types';
import { useNavigate } from 'react-router-dom';


const ErrorModal: React.FC<ModalProps> = ({ isVisible, message, onClose }) => {
  const navigate = useNavigate()
  if (!isVisible) return null;

  const handleGotItClick = () => {
    if (message && (message.includes("400") || message.toLowerCase().includes("no active subscription"))) {
        navigate("/subscribe");
    } else {
        onClose();
    }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 py-14 rounded shadow-lg relative w-full md:w-[444px] mx-6">
        <div className="mx-auto text-center text-ffgray relative">
          <span className="text-red-500 text-xl font-bold">Error!!!</span>
          <p>{message}</p>
          <FFButton onClick={handleGotItClick } text="Got it" variant='outlined' className="md:w-5/6 text-[#000]" />
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
