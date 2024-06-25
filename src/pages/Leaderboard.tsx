import React, { useState } from 'react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  time: string;
}

interface LeaderboardData {
  [key: string]: LeaderboardEntry[];
}

// Sample data for the leaderboard
const leaderboardData: LeaderboardData = {
  January: [
    { rank: 1, name: "Alice", time: "00:30" },
    { rank: 2, name: "Bob", time: "00:45" },
    { rank: 3, name: "Charlie", time: "00:50" },
    { rank: 4, name: "David", time: "01:00" },
    { rank: 5, name: "Eve", time: "01:05" },
    { rank: 6, name: "Frank", time: "01:15" },
    { rank: 7, name: "Grace", time: "01:25" },
    { rank: 8, name: "Hannah", time: "01:35" }
  ],
  February: [
    { rank: 1, name: "Alice", time: "00:20" },
    { rank: 2, name: "Charlie", time: "00:35" },
    { rank: 3, name: "Bob", time: "00:55" },
    { rank: 4, name: "David", time: "01:10" },
    { rank: 5, name: "Eve", time: "01:15" },
    { rank: 6, name: "Frank", time: "01:20" },
    { rank: 7, name: "Grace", time: "01:30" },
    { rank: 8, name: "Hannah", time: "01:40" }
  ],
  // Additional months can be added similarly...
};

const Leaderboard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("January");

  return (
    <section className=" max-w-4xl mx-auto p-5 max-md:mb-16">
      <div className="flex justify-between items-center mb-4">
        <div  className="flex flex-col items-center">
            <img src="icons/leaderboard-icon.svg" alt="leaderboard" className="h-8" />
            <h1 className="">Leaderboard</h1>
        </div>

        <select
          className="p-2 cursor-pointer text-teal font-bold md:text-lg"
          value={selectedMonth}
          name='selectedMonth'
          title='selectedMonth'
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {Object.keys(leaderboardData).map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      <div className='max-w-[450px] mx-auto relative'>
        <img className='w-full' src="images/leaderboard.png" alt="leaderboard" />
        <div className="grid grid-cols-3 gap-4 mb-6 absolute top-24">
          {leaderboardData[selectedMonth].slice(0, 3).map((entry, index) => (
            <div key={index} className={`text-center py-2 ${entry.rank === 2 ? "order-first" : ""} ${entry.rank === 1 ? "-mt-10" : ""}`}>
              <div className={`mb-2`}>
                <img src={`/images/medal${entry.rank}.svg`} alt={`Medal ${entry.rank}`} className="mx-auto"/>
              </div>
              <div className="md:text-xl italic">{entry.name}</div>
              <div className="text-teal font-bold">{entry.time}</div>
            </div>
          ))}
        </div>

        <div className='mt-32'>
          <div className="text-center bg-teal/20 p-2 w-max mx-auto text-lg mb-4">{selectedMonth}</div>
          {leaderboardData[selectedMonth].slice(3).map((entry, index) => (
            <div key={index} className="flex justify-between items-center my-6">
              <div className='md:text-xl italic'>{entry.rank}. {entry.name}</div>
              <div className='text-teal font-bold'>{entry.time}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
