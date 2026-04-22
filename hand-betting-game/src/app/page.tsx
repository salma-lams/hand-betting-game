'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { useGameStore } from '@/store/gameStore';
import { Trophy, Play } from 'lucide-react';
import axios from 'axios';

interface Score {
  _id: string;
  name: string;
  score: number;
}

export default function LandingPage() {
  const router = useRouter();
  const startGame = useGameStore(state => state.startGame);
  const [leaderboard, setLeaderboard] = useState<Score[]>([]);

  useEffect(() => {
    // Fetch leaderboard
    axios.get('http://localhost:5000/api/leaderboard')
      .then(res => setLeaderboard(res.data))
      .catch(err => {
        console.error('Failed to fetch leaderboard:', err);
        // Mock data fallback
        setLeaderboard([
          { _id: '1', name: 'Alice', score: 150 },
          { _id: '2', name: 'Bob', score: 120 },
          { _id: '3', name: 'Charlie', score: 90 },
        ]);
      });
  }, []);

  const handleNewGame = () => {
    startGame();
    router.push('/game');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
      
      <div className="z-10 text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
          Mahjong <br/> Hand Betting
        </h1>
        <p className="text-slate-400 text-lg max-w-md mx-auto">
          Bet on the value of the next hand. Higher or lower? Will the tiles reach 10 or 0? 
        </p>
      </div>

      <div className="z-10 bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-md">
        <Button 
          onClick={handleNewGame} 
          className="w-full text-xl py-4 flex items-center justify-center gap-2 mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-none text-white shadow-xl shadow-indigo-900/20"
        >
          <Play fill="currentColor" /> Start New Game
        </Button>

        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-slate-300">
            <Trophy className="text-yellow-500" /> Leaderboard
          </h2>
          <div className="space-y-3">
            {leaderboard.length === 0 ? (
              <div className="text-slate-500 text-center py-4">No scores yet!</div>
            ) : (
              leaderboard.map((entry, idx) => (
                <div key={entry._id} className="flex items-center justify-between bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 text-center font-bold ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-slate-300' : idx === 2 ? 'text-amber-700' : 'text-slate-500'}`}>
                      #{idx + 1}
                    </span>
                    <span className="font-medium">{entry.name}</span>
                  </div>
                  <span className="font-bold text-indigo-400">{entry.score} pts</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
