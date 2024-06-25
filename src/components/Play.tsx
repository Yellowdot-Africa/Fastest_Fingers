import React, { useState, useEffect } from 'react';
import WinningModal from './modals/WinningModal';


const Play: React.FC = () => {
    const getRandomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const [selectedLetters, setSelectedLetters] = useState<string[]>(Array(8).fill(''));
    const [availableLetters, setAvailableLetters] = useState<string[]>(
        Array(26).fill(null).map(() => getRandomLetter())
    );
    const [timer, setTimer] = useState(600);
    const [showWinningModal, setShowWinningModal] = useState(false);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                clearInterval(countdown);
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [timer]);

    const handleLetterSelect = (letter: string, index: number) => {
        const firstEmptyIndex = selectedLetters.indexOf('');
        if (firstEmptyIndex !== -1) {
            const newSelectedLetters = [...selectedLetters];
            newSelectedLetters[firstEmptyIndex] = letter;
            setSelectedLetters(newSelectedLetters);

            const newAvailableLetters = [...availableLetters];
            newAvailableLetters.splice(index, 1);
            setAvailableLetters(newAvailableLetters);
        }
    };

    const handleLetterDeselect = (index: number) => {
        const letter = selectedLetters[index];
        if (letter) {
            const newAvailableLetters = [...availableLetters, letter];
            setAvailableLetters(newAvailableLetters);

            const newSelectedLetters = [...selectedLetters];
            newSelectedLetters[index] = '';
            setSelectedLetters(newSelectedLetters);
        }
    };

    const isAllSelected = !selectedLetters.includes('');

    const handleClearOrSubmit = () => {
        if (!isAllSelected) {
            setSelectedLetters(Array(8).fill(''));
            setAvailableLetters(Array(24).fill(null).map(() => getRandomLetter()));
        } else {
            setShowWinningModal(true);
        }
    };
    const resetGame = () => {
        setSelectedLetters(Array(8).fill(''));
        setAvailableLetters(Array(24).fill(null).map(getRandomLetter));
        setTimer(600); // Reset timer to 10 minutes
        setShowWinningModal(false); // Ensure modal is closed
    };


    return (
        <div className=" h-screen flex items-center justify-center mx-4">
            <div className="max-w-sm text-center w-full">
                <div>
                    <img className='w-max mx-auto' src="/icons/timer.svg" alt="timer icon" />
                    <span className="font-bold">{Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</span>
                </div>
                <div className='my-14'>
                    <h2 className=" font-bold my-2">Arrange from LEFT to RIGHT</h2>
                    <div className='flex flex-wrap justify-center item-center gap-3'>
                        {Array(8).fill("A").map((letter, index) =>  (
                            <p key={index} className='p-2.5 shadow-dark bg-teal rounded text-center text-white font-bold'>{letter}</p>
                        ))}
                    </div>

                </div>

                <div className='bg-[#002B2DB2] p-6 rounded-[20px]'>

                    <p className='text-white'>Selections</p>
                    <div className="grid grid-cols-8 items-center gap-1 my-4">
                        {selectedLetters.map((letter, index) => (
                            <div key={index} className={`p-2 py-2.5 lg:text-lg text-black font-bold bg-white shadow-dark h-12 rounded text-center ${letter ? 'border-[#00F0FF] border-2' : ''}`} onClick={() => handleLetterDeselect(index)}>{letter}</div>
                        ))}
                    </div>
                    <div className="flex flex-wrap justify-around gap-2 mt-6 ">
                        {availableLetters.map((letter, index) => (
                            <button key={index} className="p-2.5 shadow-dark bg-teal rounded text-center text-white font-bold focus:text-black focus:bg-[#00F0FF] t" onClick={() => handleLetterSelect(letter, index)}>
                                {letter}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    onClick={handleClearOrSubmit}
                    className={`my-8 w-full text-white px-4 py-3.5 rounded-3xl ${selectedLetters.every(letter => letter === '') ? 'bg-[#CCCCCC] cursor-not-allowed' :
                            isAllSelected ? 'bg-teal' : 'bg-black'
                        }`}
                    disabled={selectedLetters.every(letter => letter === '')}
                >
                    {isAllSelected ? 'Submit' : 'Clear'}
                </button>

            </div>
            <WinningModal isVisible={showWinningModal} onClose={() => setShowWinningModal(false)} onPlayAgain={resetGame}/>
        </div>
    );
};

export default Play;
