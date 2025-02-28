import React, {  useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import FFButton from '../components/common/FFButton';
import GamePlayModal from '../components/modals/GamePlayModal';
import Play from '../components/Play';
import { useAuth } from '../context/AuthContext';
// import { fetchPrizesByCountry } from '../api/apiService';
// import { Prize } from '../types';

const Home: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isPlaying, setIsPlaying } = useOutletContext<{ isPlaying: boolean; setIsPlaying: React.Dispatch<React.SetStateAction<boolean>> }>();
  const { profile } = useAuth();
  const nickname = profile?.nickname || '';
  // const [prizes, setPrizes] = useState<Prize[]>([]);
  // const countryAlpha2Code = localStorage.getItem('countryAlpha2Code') || 'GH';
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   async function loadPrizes() {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       const prizeData = await fetchPrizesByCountry(countryAlpha2Code);
  //       setPrizes(prizeData);
  //     } catch (error) {
  //       console.error('Error loading prizes:', error);
  //       setError("Failed to load prizes: Please try refreshing the page or check back later.");
  //     }
  //     setIsLoading(false);
  //   }

  //   loadPrizes();
  // }, [countryAlpha2Code]);

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
            <p className="md:text-2xl font-bold">Hello {nickname && `${nickname}`}</p>
          </div>

          <div className="w-full md:w-max mx-auto">
          <img className="w-full md:w-max mx-auto mt-28" src="/images/FFlogo.svg" alt="prizes to be won" />

            <h1 className='text-ffgray text-[20px] text-center font-semibold my-2 italic'>Play for fun,Play for cash</h1>

            {/* <img className="w-full md:w-max mx-auto" src="/images/prizes-won.svg" alt="prizes to be won" /> */}
            {/* {isLoading ? ( */}
              {/* <div className="my-20 flex flex-col items-center justify-center">
                <img className='w-10 h-10 mx-auto' src="/icons/spinner-neon.svg" alt="Loading" />
                <p>Loading Prizes ....</p>
              </div> */}
            {/* ) : error ? ( */}
              {/* <div className="p-6 md:p-16 my-3 bg-[#F9F9F9] text-center  md:w-[520px] shadow md:text-xl font-bold text-red-500">
                {error}
              </div>
            ) : ( */}
              {/* <div className="p-6 md:p-16 my-3 space-y-6 bg-[#F9F9F9] text-ffgray md:w-[520px] shadow md:text-xl font-bold">
                {prizes.map((prize, index) => (
                  <div key={index} className="flex items-center justify-between md:space-x-6">
                    <img src={`/images/${prize.type.toLowerCase()}.svg`} alt={`${prize.type} image`} />
                    <p className="w-full">{prize.type}</p>
                    <p className="text-black">{prize.currency}{prize.amount}</p>
                  </div>
                ))}
              </div>
            )
            } */}

            <div className="mx-auto text-center mt-20 max-md:mb-16">
              {/* <p>PLAY TO WIN AMAZING PRIZES, NOW!</p> */}
              <p>PLAY FASTEST FINGER!</p>

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
