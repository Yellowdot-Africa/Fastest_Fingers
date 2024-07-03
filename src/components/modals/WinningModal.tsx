import React from 'react';
import FFButton from '../common/FFButton';
import { ModalProps } from '../../types';
import { useNavigate } from 'react-router-dom';

interface WinningModalProps extends ModalProps {
    onPlayAgain: () => void;
    timeUsed: number;
    message: string;
    onGoHome: () => void;
}

const WinningModal: React.FC<WinningModalProps> = ({ isVisible, onClose, onPlayAgain, onGoHome, timeUsed, message }) => {
    const navigate = useNavigate();
    if (!isVisible) return null;

    const handlePlayAgain = () => {
        onPlayAgain();
    };


    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 py-14 rounded shadow-lg relative md:w-[444px] mx-6">
                <div className="mx-auto text-center text-ffgray relative">
                    <button onClick={onClose} className="absolute font-light -top-1 right-14 text-2xl">×</button>
                    <span>Congratulations</span>
                    <p className="my-3 text-center italic">{message}</p>
                    <p className='text-ffgray/70 font-bold'>Time: <span className='text-teal'>{formatTime(timeUsed)}</span></p>
                    <FFButton text="Play Again" className="md:w-5/6" onClick={handlePlayAgain} />
                    <FFButton text="Home" variant='outlined' className="md:w-5/6 border border-teal text-[#007880]"onClick={onGoHome}  />
                    <p onClick={() => navigate("/leaderboard")} className='block text-teal text-sm font-bold'>Check Leaderboard</p>
                </div>
            </div>
        </div>
    );
};

export default WinningModal;

