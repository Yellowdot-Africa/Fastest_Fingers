import React from 'react';
import FFButton from '../common/FFButton';
import { ModalProps } from '../../types';


const GamePlayModal: React.FC<ModalProps> = ({ isVisible, onClose, onConfirm }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white px-4 md:p-10 py-14 rounded shadow-lg relative w-full md:w-[444px] mx-6">
        <div className="md:w-5/6 mx-auto text-center text-ffgray relative">
        <button onClick={onClose} className="absolute font-light -top-1 right-14 text-2xl">×</button>
          <span className="">Game Play</span>
          <p className="my-3 text-center text-xs text-ffgray/70" >Below are the game play conditions </p>
          <div className='mt-5 space-y-2'>
            <div className='flex items-center gap-3 text-left'>
                <img src="/icons/pointer.svg" alt="list pointer" />
                <p>Find the letters of the text <b>“WORD”</b> </p>
            </div>
            <div className='flex items-center gap-3 text-left'>
                <img src="/icons/pointer.svg" alt="list pointer" />
                <p>Type them out in the order <b>LEFT</b> to <b>Right</b></p>
            </div>
            <div className='flex items-center gap-3 text-left'>
                <img src="/icons/pointer.svg" alt="list pointer" />
                <p>Get it done as <b>Quickly</b> as <b>Possible</b> </p>
            </div>
          </div>

          <FFButton text="Got it" className="mt-8" onClick={onConfirm}/>
        </div>
      </div>
    </div>
  );
};

export default GamePlayModal;
