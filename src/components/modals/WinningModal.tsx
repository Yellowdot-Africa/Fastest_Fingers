import React, { useState } from "react";
import FFButton from "../common/FFButton";
import { ModalProps } from "../../types";
import { useNavigate } from "react-router-dom";

interface WinningModalProps extends ModalProps {
  onPlayAgain: () => void;
  timeUsed: number;
  message: string;
  onGoHome: () => void;
}

const WinningModal: React.FC<WinningModalProps> = ({
  isVisible,
  onPlayAgain,
  onGoHome,
  timeUsed,
  message,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!isVisible) return null;

//   const handlePlayAgain = () => {
//     setLoading(true);
//     onPlayAgain();
//   };

//   const handlePlayAgain = async () => {
//     setLoading(true);
//     await onPlayAgain(); // Ensure it finishes
//     setLoading(false); // Reset loading after completion
// };

const handlePlayAgain = async () => {
    setLoading(true);
    await Promise.resolve(onPlayAgain());
    setLoading(false);
};

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 py-10 rounded shadow-lg relative md:w-[444px] mx-6">
        <div className="mx-auto text-center text-ffgray relative">
          {/* <button onClick={onClose} className="absolute font-light -top-1 right-14 text-2xl">×</button> */}

          <p className="mb-3 text-center italic text-lg">{message}</p>
          <p className="text-ffgray/70 font-bold">
            Time: <span className="text-teal">{formatTime(timeUsed)}</span>
          </p>

          <FFButton
            text="Play Again"
            loading={loading}
            // disabled={loading}
            className="md:w-5/6"
            onClick={handlePlayAgain}
          />

          <FFButton
            text="Home"
            variant="outlined"
            className="md:w-5/6 border border-teal text-[#007880]"
            onClick={onGoHome}
          />
          <button
            type="button"
            onClick={() => navigate("/leaderboard")}
            className="block w-max mx-auto text-teal text-sm font-bold"
          >
            Check Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinningModal;
