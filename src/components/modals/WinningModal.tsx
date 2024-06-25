import React from 'react';
import FFButton from '../common/FFButton';
import { ModalProps } from '../../types';
import { useNavigate } from 'react-router-dom';


const WinningModal: React.FC<ModalProps & { onPlayAgain: () => void }> = ({ isVisible, onClose, onPlayAgain }) => {
    const navigate = useNavigate()
  if (!isVisible) return null;


  const handlePlayAgain = () => {
    onPlayAgain(); // Call the reset function provided by the Play component
};

  const handleGoHome = () => {
    navigate("/")

  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 py-14 rounded shadow-lg relative md:w-[444px] mx-6">
        <div className="mx-auto text-center text-ffgray relative">
        <button onClick={onClose} className="absolute font-light -top-1 right-14 text-2xl">×</button>
          <span className="">Congratulations</span>
          <p className="my-3 text-center italic ">Well-done!, YOU GOT IT RIGHT <br /> PLAY MORE TO INCREASE YOUR CHANCES OF WINNING</p>

            <p className='text-ffgray/70 font-bold'>Time: <span className='text-teal'>00:00</span></p>
            <FFButton text="Play Again" className="md:w-5/6" onClick={handlePlayAgain} />
            <FFButton text="Home" variant='outlined' className="md:w-5/6 border border-teal text-[#007880]" onClick={handleGoHome} />
          <a href='#' className='block text-teal text-sm font-bold'>Check Leaderboard</a>
        </div>
      </div>
    </div>
  );
};

export default WinningModal;
