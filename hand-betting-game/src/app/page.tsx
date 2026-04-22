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
    axios.get('/api/leaderboard')
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
    <div className="relative min-h-screen text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#030712]/80 to-[#030712] pointer-events-none"></div>
      
      <div className="z-10 text-center mb-10 animate-fade-in-up px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-br from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.3)] tracking-tight leading-tight">
          Mahjong <br className="md:hidden" /> Hand Betting
        </h1>
        <p className="text-slate-300 text-sm md:text-base max-w-md mx-auto font-medium tracking-wide">
          Bet on the value of the next hand. <br className="hidden md:block" /> Higher or lower? Will the tiles reach 10 or 0? 
        </p>
      </div>

      <div className="z-10 glass-panel p-6 md:p-8 rounded-3xl w-full max-w-md animate-fade-in-up mx-4" style={{ animationDelay: '0.1s' }}>
        <Button 
          onClick={handleNewGame} 
          className="group relative w-full text-base py-4 flex items-center justify-center gap-2 mb-8 bg-white text-slate-900 hover:bg-slate-100 border-none rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-[1.02] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Play size={18} className="fill-slate-900 group-hover:scale-110 transition-transform duration-300" /> 
          <span className="font-bold tracking-wide">Start New Game</span>
        </Button>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2 text-white tracking-wide">
              <Trophy className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" size={20} /> 
              Leaderboard
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent ml-4"></div>
          </div>
          
          <div className="space-y-3">
            {leaderboard.length === 0 ? (
              <div className="text-slate-400 text-center py-6 glass-panel rounded-2xl">No scores yet!</div>
            ) : (
              leaderboard.map((entry, idx) => (
                <div key={entry._id} className="group flex items-center justify-between bg-slate-800/40 hover:bg-slate-800/80 p-4 rounded-2xl border border-slate-700/50 transition-all duration-300 hover:border-slate-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold ${idx === 0 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-[0_0_15px_rgba(250,204,21,0.3)]' : idx === 1 ? 'bg-slate-300/20 text-slate-300 border border-slate-300/50' : idx === 2 ? 'bg-amber-700/20 text-amber-500 border border-amber-700/50' : 'bg-slate-800 text-slate-500'}`}>
                      {idx + 1}
                    </span>
                    <span className="font-medium text-slate-200 text-base group-hover:text-white transition-colors">{entry.name}</span>
                  </div>
                  <span className="font-bold text-indigo-400 text-base tracking-wide">{entry.score} pts</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
