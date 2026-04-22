import React from 'react';
import { GameHistoryEntry } from '../store/gameStore';
import { ArrowUpCircle, ArrowDownCircle, CheckCircle2, XCircle } from 'lucide-react';

interface HistoryProps {
  history: GameHistoryEntry[];
}

export const History: React.FC<HistoryProps> = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-lg mx-auto mt-8 bg-slate-900/60 backdrop-blur-sm rounded-3xl p-6 border border-slate-800">
      <h3 className="text-xl font-bold text-white mb-4 px-2">Recent Plays</h3>
      <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
        {history.map((entry, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between bg-slate-800/80 p-4 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Value</span>
                <span className="text-white font-black text-2xl leading-none">{entry.value}</span>
              </div>
              <div className="h-8 w-px bg-slate-700"></div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm font-medium">Betted</span>
                {entry.bet === 'higher' ? (
                  <div className="flex items-center gap-1 text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-md">
                    <ArrowUpCircle className="w-4 h-4" />
                    <span className="font-bold text-sm">Higher</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-pink-400 bg-pink-400/10 px-2 py-1 rounded-md">
                    <ArrowDownCircle className="w-4 h-4" />
                    <span className="font-bold text-sm">Lower</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {entry.won ? (
                <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4" /> Win
                </div>
              ) : (
                <div className="bg-rose-500/20 text-rose-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-rose-500/20">
                  <XCircle className="w-4 h-4" /> Loss
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
