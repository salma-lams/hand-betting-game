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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col p-4 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
      
      {/* Header info */}
      <div className="z-10 flex justify-between items-center w-full max-w-4xl mx-auto mb-8 bg-slate-900/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-800">
        <div className="flex flex-col">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Score</span>
          <span className="text-2xl font-black text-emerald-400">{score}</span>
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
        
        <div className="mt-12 flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <Button 
            onClick={() => placeBet('higher')}
            className="flex-1 py-6 text-xl bg-gradient-to-br from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 border-none shadow-xl shadow-indigo-900/50 flex flex-col items-center gap-2 text-white"
          >
            <ArrowUpCircle size={32} />
            <span>Higher</span>
          </Button>
          <Button 
            onClick={() => placeBet('lower')}
            className="flex-1 py-6 text-xl bg-gradient-to-br from-pink-600 to-pink-800 hover:from-pink-500 hover:to-pink-700 border-none shadow-xl shadow-pink-900/50 flex flex-col items-center gap-2 text-white"
          >
            <ArrowDownCircle size={32} />
            <span>Lower</span>
          </Button>
        </div>

        <History history={history} />
      </div>
    </div>
  );
}
