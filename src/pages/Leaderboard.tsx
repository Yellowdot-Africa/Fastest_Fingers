import React, { useState, useEffect } from 'react';
import { fetchLeaderboard } from '../api/apiService';
import { useAuth } from '../context/AuthContext';
import ErrorModal from '../components/modals/ErrorModal';

interface LeaderboardEntry {
    msisdn: string;
    position: number;
    points: number;
}

const Leaderboard: React.FC = () => {
    const { token, msisdn } = useAuth();
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
    const [error, setError] = useState<string>('');

    // const monthNames = [
    //     'January', 'February', 'March', 'April', 'May', 'June',
    //     'July', 'August', 'September', 'October', 'November', 'December'
    // ];

    // const getCurrentMonth = () => {
    //     const currentDate = new Date();
    //     return monthNames[currentDate.getMonth()];
    // };

    // const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonth());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchLeaderboard(msisdn, token);
                // console.log('Fetched leaderboard:', response);
                if (response && response.isSuccessful) {
                    setLeaderboardData(response.data);
                    // console.log(response.data);

                } else {
                    setError('Failed to fetch leaderboard data.');
                }
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
                setError('Failed to fetch leaderboard data.');
            }
        };

        fetchData();
    }, [msisdn, token]);

    const closeErrorModal = () => {
        setError('');
    };

    return (
        <section className="max-w-4xl mx-auto p-5 max-md:mb-16">
            <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col items-center">
                    <img src="icons/leaderboard-icon.svg" alt="leaderboard" className="h-8" />
                    <h1 className="">Leaderboard</h1>
                </div>

                {/* <select
                    className="py-2 px-0 cursor-pointer text-teal font-bold md:text-lg"
                    name='selectedMonth'
                    title='selectedMonth'
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    {monthNames.map((month, index) => (
                        <option key={index} value={month}>{month}</option>
                    ))}
                </select> */}
            </div>
            {leaderboardData.length === 0 ? (
                <div className='text-center mt-10'>
                    {/* <p>Nothing to display</p> */}
                    <p>Updating rankings, please wait...</p>
                </div>
            ) : (
                <div className='max-w-[450px] mx-auto relative'>
                    <img className='w-full' src="images/leaderboard.png" alt="leaderboard" />
                    <div className="grid grid-cols-3 gap-4 mb-6 absolute top-24">
                        {leaderboardData.slice(0, 3).map((entry, index) => (
                            <div key={index} className={`text-center py-2 ${entry.position === 2 ? "order-first" : ""} ${entry.position === 1 ? "-mt-10" : ""}`}>
                                <div className={`mb-2`}>
                                    <img src={`/images/medal${entry.position}.svg`} alt={`Medal ${entry.position}`} className="mx-auto" />
                                </div>
                                <div className="md:text-xl italic">{entry.msisdn}</div>
                                <div className="text-teal font-bold">{entry.points}</div>
                            </div>
                        ))}
                    </div>
                    <div className='mt-32'>
                        <div className="text-center bg-teal/20 p-2 w-max mx-auto text-lg mb-8">Top 3 Performers </div>
                        {leaderboardData.slice(3).map((entry, index) => (
                            <div key={index} className="flex justify-between items-center my-6 mt-10">
                                <div className='md:text-xl italic'>{entry.position}. {entry.msisdn}</div>
                                <div className='text-teal font-bold'>{entry.points}</div>
                            </div>
                        ))}
                    </div>

                </div>
            )}
            <ErrorModal isVisible={!!error} message={error} onClose={closeErrorModal} />
        </section>
    );
};

export default Leaderboard;
