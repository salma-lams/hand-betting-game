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

  // Modern 3D tile look
  return (
    <div className="relative w-20 h-28 sm:w-24 sm:h-32 bg-slate-50 dark:bg-slate-800 rounded-xl shadow-[0_6px_0_0_#cbd5e1] dark:shadow-[0_6px_0_0_#0f172a] border-2 border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center m-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_0_0_#cbd5e1] dark:hover:shadow-[0_12px_0_0_#0f172a]">
      <div className={`text-center font-bold capitalize flex flex-col items-center gap-1 ${getColor()}`}>
        <div className="text-3xl sm:text-4xl leading-none">{tile.rank}</div>
        <div className="text-[10px] sm:text-xs opacity-70 uppercase tracking-wider">{tile.suit}</div>
      </div>
      
      {/* Value Badge */}
      <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-black w-6 h-6 flex items-center justify-center rounded-full shadow-lg border-2 border-slate-50 dark:border-slate-800">
        {value}
      </div>
    </div>
  );
};
