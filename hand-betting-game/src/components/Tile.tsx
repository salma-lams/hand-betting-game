import React from 'react';
import { Tile as TileType } from '../utils/gameLogic';

interface TileProps {
  tile: TileType;
  value: number;
}

export const Tile: React.FC<TileProps> = ({ tile, value }) => {
  const getColor = () => {
    if (tile.suit === 'bamboo') return 'text-emerald-500';
    if (tile.suit === 'character') return 'text-rose-500';
    if (tile.suit === 'dot') return 'text-sky-500';
    if (tile.suit === 'dragon') {
      if (tile.rank === 'red') return 'text-red-600';
      if (tile.rank === 'green') return 'text-emerald-600';
      return 'text-slate-400';
    }
    return 'text-slate-800 dark:text-slate-200';
  };

  // Modern 3D premium tile look
  return (
    <div className="group relative w-16 h-24 sm:w-20 sm:h-28 bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.6)] border border-slate-300/50 dark:border-slate-600/50 flex flex-col items-center justify-center m-1 sm:m-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_20px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.8)] cursor-pointer overflow-hidden">
      {/* Glare effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-in-out pointer-events-none"></div>

      <div className={`text-center font-bold capitalize flex flex-col items-center gap-1 ${getColor()} drop-shadow-md group-hover:scale-105 transition-transform duration-300`}>
        <div className="text-3xl sm:text-4xl leading-none">{tile.rank}</div>
        <div className="text-[9px] sm:text-[10px] opacity-80 uppercase tracking-widest mt-1">{tile.suit}</div>
      </div>
      
      {/* Value Badge */}
      <div className="absolute -top-2 -right-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-black w-6 h-6 flex items-center justify-center rounded-full shadow-[0_4px_10px_rgba(79,70,229,0.5)] border-2 border-slate-100 dark:border-slate-800 z-10 group-hover:scale-110 transition-transform duration-300">
        {value}
      </div>
    </div>
  );
};
