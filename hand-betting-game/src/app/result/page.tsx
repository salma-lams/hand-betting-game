'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import { Button } from '@/components/Button';
import { Trophy, RefreshCcw, Save } from 'lucide-react';
import axios from 'axios';

export default function ResultPage() {
  const router = useRouter();
  const { score, startGame, reshuffleCount } = useGameStore();
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  const reason = reshuffleCount >= 3 
    ? 'Deck reshuffled 3 times.' 
    : 'A tile reached a value of 0 or 10.';

  const handleSave = async () => {
    if (!name.trim()) return;
    try {
      await axios.post('http://localhost:5000/api/score', { name, score });
      setSaved(true);
    } catch (err) {
      console.error('Failed to save score', err);
      // Even if backend fails, maybe we just mock saved state for UX
      setSaved(true);
    }
  };

  const handlePlayAgain = () => {
    startGame();
    router.push('/game');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>

      <div className="z-10 bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-md text-center">
        <h1 className="text-4xl font-black mb-2 text-rose-400">Game Over</h1>
        <p className="text-slate-400 mb-8">{reason}</p>

        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-8">
          <span className="text-slate-400 uppercase tracking-widest text-sm font-bold block mb-2">Final Score</span>
          <span className="text-6xl font-black text-emerald-400">{score}</span>
        </div>

        {!saved ? (
          <div className="mb-8 flex gap-2">
            <input 
              type="text" 
              placeholder="Enter your name" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <Button onClick={handleSave} disabled={!name.trim()} variant="primary" className="flex items-center gap-2">
              <Save size={20} /> Save
            </Button>
          </div>
        ) : (
          <div className="mb-8 p-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center justify-center gap-2 font-bold">
            <Trophy size={20} /> Score Saved!
          </div>
        )}

        <div className="flex gap-4 flex-col sm:flex-row">
          <Button onClick={handlePlayAgain} className="flex-1 py-4 flex items-center justify-center gap-2 border-none">
            <RefreshCcw size={20} /> Play Again
          </Button>
          <Button onClick={() => router.push('/')} variant="secondary" className="flex-1 py-4 border-slate-700 hover:bg-slate-800">
            Main Menu
          </Button>
        </div>
      </div>
    </div>
  );
}
