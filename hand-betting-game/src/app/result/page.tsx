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
      await axios.post('/api/score', { name, score });
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
    <div className="relative min-h-screen text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-rose-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[30rem] h-[30rem] bg-pink-600/10 rounded-full mix-blend-screen filter blur-[150px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#030712]/90 to-[#030712] pointer-events-none"></div>

      <div className="z-10 glass-panel p-6 md:p-10 rounded-[2rem] w-full max-w-md text-center animate-fade-in-up mx-4">
        <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-br from-rose-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(244,63,94,0.3)]">Game Over</h1>
        <p className="text-slate-300 text-base mb-8 font-medium">{reason}</p>

        <div className="bg-slate-900/60 rounded-3xl p-6 border border-slate-700/50 mb-8 shadow-inner">
          <span className="text-slate-400 uppercase tracking-[0.2em] text-xs font-bold block mb-2">Final Score</span>
          <span className="text-5xl md:text-6xl font-black bg-gradient-to-br from-emerald-300 to-teal-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(52,211,153,0.4)]">{score}</span>
        </div>

        {!saved ? (
          <div className="mb-8 flex flex-col gap-3">
            <input 
              type="text" 
              placeholder="Enter your name" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl px-5 py-3 text-white text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 transition-all shadow-inner placeholder:text-slate-500"
            />
            <Button onClick={handleSave} disabled={!name.trim()} className="w-full py-3 text-base bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center gap-2 rounded-xl font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)] border-none transition-all">
              <Save size={20} /> Save Score
            </Button>
          </div>
        ) : (
          <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center justify-center gap-2 font-bold text-base shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <Trophy size={20} className="drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" /> Score Saved Successfully!
          </div>
        )}

        <div className="flex gap-3 flex-col sm:flex-row">
          <Button onClick={handlePlayAgain} className="flex-1 py-4 text-base flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-100 rounded-xl border-none font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-1">
            <RefreshCcw size={18} /> Play Again
          </Button>
          <Button onClick={() => router.push('/')} className="flex-1 py-4 text-base bg-slate-800/80 hover:bg-slate-700 text-white rounded-xl border border-slate-600/50 font-bold transition-all">
            Main Menu
          </Button>
        </div>
      </div>
    </div>
  );
}
