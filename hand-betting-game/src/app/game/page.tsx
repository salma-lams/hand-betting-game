'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import { Hand } from '@/components/Hand';
import { History } from '@/components/History';
import { Button } from '@/components/Button';
import { calculateHandValue } from '@/utils/gameLogic';
import { ArrowUpCircle, ArrowDownCircle, Layers } from 'lucide-react';

export default function GamePage() {
  const router = useRouter();
  const { 
    currentHand, tileValues, placeBet, isGameOver, 
    score, drawPile, discardPile, history, gameStarted 
  } = useGameStore();

  useEffect(() => {
    if (!gameStarted) {
      router.push('/');
    }
  }, [gameStarted, router]);

  useEffect(() => {
    if (isGameOver) {
      router.push('/result');
    }
  }, [isGameOver, router]);

  if (!gameStarted || isGameOver) return null;

  const currentTotal = calculateHandValue(currentHand, tileValues);

  return (
    <div className="relative min-h-screen text-white flex flex-col p-4 md:p-8 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[150px] animate-pulse-glow pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#030712]/90 to-[#030712] pointer-events-none z-0"></div>

      
      <div className="z-10 flex justify-between items-center w-full max-w-4xl mx-auto mb-8 glass-panel p-4 md:p-5 rounded-2xl animate-fade-in-up">
        <div className="flex flex-col">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Score</span>
          <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">{score}</span>
        </div>
        
        <div className="flex gap-6 text-slate-300 font-medium">
          <div className="flex items-center gap-2">
            <Layers className="text-indigo-400" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-slate-500">Draw Pile</span>
              <span>{drawPile.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="text-slate-500" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-slate-500">Discard</span>
              <span>{discardPile.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="z-10 flex flex-col items-center flex-1 max-w-4xl mx-auto w-full">
        <Hand tiles={currentHand} tileValues={tileValues} totalValue={currentTotal} />
        
        <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full max-w-md px-4">
          <Button 
            onClick={() => placeBet('higher')}
            className="group relative flex-1 py-5 text-base bg-gradient-to-br from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 border-none rounded-2xl shadow-[0_0_25px_rgba(79,70,229,0.25)] hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all duration-300 hover:-translate-y-1 flex flex-col items-center gap-2 text-white overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <ArrowUpCircle size={28} className="group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" />
            <span className="font-bold tracking-wide">Higher</span>
          </Button>
          <Button 
            onClick={() => placeBet('lower')}
            className="group relative flex-1 py-5 text-base bg-gradient-to-br from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 border-none rounded-2xl shadow-[0_0_25px_rgba(219,39,119,0.25)] hover:shadow-[0_0_40px_rgba(219,39,119,0.4)] transition-all duration-300 hover:-translate-y-1 flex flex-col items-center gap-2 text-white overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <ArrowDownCircle size={28} className="group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" />
            <span className="font-bold tracking-wide">Lower</span>
          </Button>
        </div>

        <History history={history} />
      </div>
    </div>
  );
}
