import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import FFButton from '../components/common/FFButton';
import GamePlayModal from '../components/modals/GamePlayModal';
import Play from '../components/Play';

const Home: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isPlaying, setIsPlaying } = useOutletContext<{ isPlaying: boolean; setIsPlaying: React.Dispatch<React.SetStateAction<boolean>> }>();

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    const startGame = () => {
        setIsPlaying(true);
        setIsModalVisible(false);
    };

    const endGame = () => {
      setIsPlaying(false);
    };

  return (
    <>
      {!isPlaying ? (
        <section className=" font-inria py-4 md:py-10 pb-2 px-6 md:px-16 lg:px-24 text-ffgray overflow-y-auto">
          <div className="flex gap-1 max-md:mb-8">
            <div className="">
              <img src="/images/hand-wave.svg" alt="hand wave" />
            </div>
            <p className="md:text-2xl font-bold">Hello,</p>
          </div>

          <div className="w-full md:w-max mx-auto">
            <img className="w-full md:w-max mx-auto" src="/images/prizes-won.svg" alt="prizes to be won" />
            <div className="p-6 md:p-16 my-3 space-y-6 bg-[#F9F9F9] text-ffgray md:w-[520px] shadow md:text-xl font-bold">
              <div className="flex items-center justify-between md:space-x-6">
                <img src="/images/coins.svg" alt="coins image" />
                <p className="w-full">First Prize(Cash)</p>
                <p className="text-black">N100,000</p>
              </div>
              <div className="flex items-center justify-between md:space-x-6">
                <img src="/images/coins.svg" alt="coins image" />
                <p className="w-full">Second Prize(Cash)</p>
                <p className="text-black">N50,000</p>
              </div>
              <div className="flex items-center justify-between md:space-x-6">
                <img className="mx-4" src="/images/airtime.svg" alt="coins image" />
                <p className="w-full">Airtime</p>
                <p className="text-black">N10,000</p>
              </div>
            </div>

            <div className="mx-auto text-center mt-10 max-md:mb-16">
              <p>PLAY TO WIN AMAZING PRIZES, NOW!</p>
              <FFButton text="Play Now" className="md:w-2/3" onClick={toggleModal} />
            </div>
          </div>
        </section>
      ) : <Play onClose={endGame} />

    }
      <GamePlayModal isVisible={isModalVisible} onClose={toggleModal} onConfirm={startGame} />
    </>
  );
};

export default Home;
