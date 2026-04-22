import React from 'react';
import { Tile as TileType, TileName } from '../utils/gameLogic';
import { Tile } from './Tile';

interface HandProps {
  tiles: TileType[];
  tileValues: Record<TileName, number>;
  totalValue: number;
}

export const Hand: React.FC<HandProps> = ({ tiles, tileValues, totalValue }) => {
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 p-4">
        {tiles.map((tile, i) => (
          <div 
            key={tile.id} 
            className="animate-fade-in-up" 
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
          >
            <Tile tile={tile} value={tileValues[tile.name]} />
          </div>
        ))}
      </div>
      <div className="bg-slate-900/80 backdrop-blur-md text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-6 border border-slate-700">
        <span className="text-slate-400 font-bold uppercase tracking-[0.2em] text-sm">Hand Value</span>
        <span className="text-5xl font-black bg-gradient-to-br from-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
          {totalValue}
        </span>
      </div>
    </div>
  );
};
