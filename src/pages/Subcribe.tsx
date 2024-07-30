import React, { useState } from 'react';
import FFButton from '../components/common/FFButton';
import SubscribeModal from '../components/modals/SubscribeModal';



const Subscribe: React.FC = () => {
    const [isSubscribeModalVisible, setSubscribeModalVisible] = useState(false);

    const toggleSubscribeModal = () => {
      setSubscribeModalVisible(!isSubscribeModalVisible);
    };
  
    return (
      <section className=" h-screen font-inria py-4 md:py-10 pb-2 px-6 md:px-16 lg:px-24 text-ffgray">
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
              <p className="text-black">GH¢1.000</p>
            </div>
            <div className="flex items-center justify-between md:space-x-6">
              <img src="/images/coins.svg" alt="coins image" />
              <p className="w-full">Second Prize(Cash)</p>
              <p className="text-black">GH¢3.00</p>
            </div>
            <div className="flex items-center justify-between md:space-x-6">
              <img className="mx-4" src="/images/airtime.svg" alt="coins image" />
              <p className="w-full">Airtime</p>
              <p className="text-black">GH¢0.00</p>
            </div>
          </div>
  
          <div className="mx-auto text-center mt-10">
            <p>PLAY TO WIN AMAZING PRIZES, NOW!</p>
            <FFButton text="Subscribe To Plan" className="md:w-2/3" onClick={toggleSubscribeModal} />
          </div>
        </div>
  
        <SubscribeModal isVisible={isSubscribeModalVisible} onClose={toggleSubscribeModal} />
  
      </section>
      )
};

export default Subscribe;
