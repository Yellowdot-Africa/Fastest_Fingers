import React, { useEffect, useState } from 'react';
import FFButton from '../components/common/FFButton';
import SubscribeModal from '../components/modals/SubscribeModal';
import { fetchPrizesByCountry } from '../api/apiService';
import { Prize } from '../types';

const Subscribe: React.FC = () => {
  const [isSubscribeModalVisible, setSubscribeModalVisible] = useState(false);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const countryAlpha2Code = localStorage.getItem('countryAlpha2Code') || 'GH';

  useEffect(() => {
    async function loadPrizes() {
      setIsLoading(true);
      setError(null);
      try {
        const prizeData = await fetchPrizesByCountry(countryAlpha2Code);
        setPrizes(prizeData);
      } catch (error) {
        console.error('Error loading prizes:', error);
        setError((error as Error).message );
      }
      setIsLoading(false);
    }

    loadPrizes();
  }, [countryAlpha2Code]);

  const toggleSubscribeModal = () => {
    setSubscribeModalVisible(!isSubscribeModalVisible);
  };

  return (
    <section className="h-screen font-inria py-4 md:py-10 pb-2 px-6 md:px-16 lg:px-24 text-ffgray">
      <div className="flex gap-1 max-md:mb-8">
        <div>
          <img src="/images/hand-wave.svg" alt="hand wave" />
        </div>
        <p className="md:text-2xl font-bold">Hello,</p>
      </div>

      <div className="w-full md:w-max mx-auto">
        <img className="w-full md:w-max mx-auto" src="/images/prizes-won.svg" alt="prizes to be won" />
        
        {isLoading ? (
          <div className="my-20 flex flex-col items-center justify-center">
            <img className='w-10 h-10 mx-auto' src="/icons/spinner-neon.svg" alt="Loading" />
            <p>Loading Prizes ....</p>
          </div>
        ) : error ? (
          <div className="p-6 md:p-16 my-3 bg-[#F9F9F9]  md:w-[520px] shadow md:text-xl font-bold text-red-500">
            {error}
          </div>
        ) : (
          <div className="p-6 md:p-16 my-3 space-y-6 bg-[#F9F9F9] text-ffgray md:w-[520px] shadow md:text-xl font-bold">
            {prizes.map((prize, index) => (
              <div key={index} className="flex items-center justify-between md:space-x-6">
                <img src={`/images/${prize.type.toLowerCase()}.svg`} alt={`${prize.type} image`} />
                <p className="w-full">{prize.type}</p>
                <p className="text-black">{prize.currency}{prize.amount}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mx-auto text-center mt-10">
          <p>PLAY TO WIN AMAZING PRIZES, NOW!</p>
          <FFButton text="Subscribe To Plan" className="md:w-2/3" onClick={toggleSubscribeModal} />
        </div>
      </div>
      <SubscribeModal isVisible={isSubscribeModalVisible} onClose={toggleSubscribeModal} />
    </section>
  );
};

export default Subscribe;
