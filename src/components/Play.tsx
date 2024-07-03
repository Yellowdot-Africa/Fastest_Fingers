import React, { useState, useEffect } from 'react';
import WinningModal from './modals/WinningModal';
import { fetchGameQuestions, submitGamePlay } from '../api/apiService';
import { useAuth } from '../context/AuthContext';

interface GameQuestion {
    id: number;
    text: string;
    correctAnswer: string;
    hint: string;
    instruction: string;
}

const Play: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const getRandomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));

    const generateAvailableLetters = (text: string) => {
        const requiredLetters = text.split('');
        const randomLettersCount = 26 - requiredLetters.length;
        const randomLetters = Array(randomLettersCount).fill(null).map(getRandomLetter);
        return [...requiredLetters, ...randomLetters].sort(() => Math.random() - 0.5);
    };

    const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
    const [availableLetters, setAvailableLetters] = useState<string[]>([]);
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [timer, setTimer] = useState(600);
    const [showWinningModal, setShowWinningModal] = useState(false);
    const [question, setQuestion] = useState<GameQuestion | null>(null);
    const [timeUsed, setTimeUsed] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const { token, msisdn } = useAuth();

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

    useEffect(() => {
        const getQuestions = async () => {
            if (token) {
                const data = await fetchGameQuestions(1, token);
                if (data && data.statusCode === "999") {
                    setQuestion(data.data[0]);
                    setAvailableLetters(generateAvailableLetters(data.data[0].text));
                    setSelectedLetters(Array(data.data[0].text.length).fill(''));
                }
            }
        };

        getQuestions();
    }, [token]);

    const handleLetterSelect = (index: number) => {
        const letter = availableLetters[index];
        const firstEmptyIndex = selectedLetters.indexOf('');
        if (firstEmptyIndex !== -1 && !selectedIndices.includes(index)) {
            const newSelectedLetters = [...selectedLetters];
            newSelectedLetters[firstEmptyIndex] = letter;
            setSelectedLetters(newSelectedLetters);

            setSelectedIndices([...selectedIndices, index]);
        }
    };

    const handleLetterDeselect = (index: number) => {
        const letterIndex = selectedLetters[index];
        if (letterIndex !== '') {
            const letterPos = availableLetters.indexOf(letterIndex);

            const newSelectedLetters = [...selectedLetters];
            newSelectedLetters[index] = '';
            setSelectedLetters(newSelectedLetters);

            const newSelectedIndices = [...selectedIndices];
            newSelectedIndices.splice(newSelectedIndices.indexOf(letterPos), 1);
            setSelectedIndices(newSelectedIndices);
        }
    };

    const isAllSelected = !selectedLetters.includes('');

    const handleClearOrSubmit = async () => {
        if (!isAllSelected) {
            setSelectedLetters(Array(question?.text.length || 0).fill(''));
            setSelectedIndices([]);
        } else {
            setIsLoading(true);
            setTimeUsed(600 - timer); // Calculate time used
            if (question && msisdn) {
                const submittedAnswer = selectedLetters.join('').toLowerCase();
                const response = await submitGamePlay(msisdn, question.id, submittedAnswer, false, timeUsed, token);
                if (response && response.statusCode === "999") {
                    setModalMessage(response.message);
                    setShowWinningModal(true);
                } else {
                    setModalMessage("Oops, Seems something went wrong.");
                    setShowWinningModal(true);
                }
            }
            setIsLoading(false);
        }
    };

    const resetGame = async () => {
        if (token) {
            const data = await fetchGameQuestions(1, token);
            if (data && data.statusCode === "999") {
                setQuestion(data.data[0]);
                setAvailableLetters(generateAvailableLetters(data.data[0].text));
                setSelectedLetters(Array(data.data[0].text.length).fill(''));
                setSelectedIndices([]);
                setTimer(600);
                setShowWinningModal(false);
            }
        }
    };
    const handleGoHome = () => {
        onClose();  // This will trigger the Home component to hide the Play component
    };

    return (
        <div className="h-screen flex items-center justify-center mx-4">
            <div className="max-w-sm text-center w-full">
                <div>
                    <img className='w-max mx-auto' src="/icons/timer.svg" alt="timer icon" />
                    <span className="font-bold">{Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</span>
                </div>
                <div className='my-14'>
                    <h2 className="font-bold my-2">{question?.instruction}</h2>
                    <div className='flex flex-wrap justify-center item-center gap-3'>
                        {question?.text.split('').map((letter, index) => (
                            <p key={index} className='p-2.5 shadow-dark bg-teal rounded text-center capitalize text-white font-bold'>{letter}</p>
                        ))}
                    </div>
                </div>

                <div className='bg-[#002B2DB2] p-6 rounded-[20px]'>
                    <p className='text-white'>Selections</p>
                    <div className="flex justify-center capitalize items-center gap-1 my-4">
                        {selectedLetters.map((letter, index) => (
                            <div key={index} className={`p-2 py-2.5 lg:text-lg text-black font-bold bg-white cursor-pointer shadow-dark h-12 w-10 rounded text-center ${letter ? 'border-[#00F0FF] border-2' : ''}`} onClick={() => handleLetterDeselect(index)}>{letter}</div>
                        ))}
                    </div>
                    <div className="flex flex-wrap justify-around gap-2 mt-6 ">
                        {availableLetters.map((letter, index) => (
                            <button key={index} className={`p-2.5 shadow-dark  capitalize rounded text-center text-white font-bold ${selectedIndices.includes(index) ? 'bg-[#00F0FF]' : 'bg-teal'}`} onClick={() => handleLetterSelect(index)}>
                                {letter}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleClearOrSubmit}
                    className={`my-8 w-full text-white px-4 py-3.5 rounded-3xl ${selectedLetters.every(letter => letter === '') || isLoading ? 'bg-[#CCCCCC] cursor-not-allowed' :
                            isAllSelected ? 'bg-teal' : 'bg-black'
                        }`}
                    disabled={selectedLetters.every(letter => letter === '') || isLoading}
                >
                    {isLoading ? <img className='w-6 h-6 mx-auto' src="/icons/spinner-white.svg" alt="Loading" /> : (isAllSelected ? 'Submit' : 'Clear')}
                </button>
            </div>
            <WinningModal isVisible={showWinningModal} onClose={() => setShowWinningModal(false)} onPlayAgain={resetGame} timeUsed={timeUsed} message={modalMessage} onGoHome={handleGoHome}/>
        </div>
    );
};

export default Play;
