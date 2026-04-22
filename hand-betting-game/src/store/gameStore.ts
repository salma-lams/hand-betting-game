import { create } from 'zustand';
import { 
  Tile, TileName, createDeck, shuffleDeck, drawHand, 
  initializeTileValues, calculateHandValue, updateTileValues, checkGameOver 
} from '../utils/gameLogic';

export interface GameHistoryEntry {
  hand: Tile[];
  value: number;
  bet: 'higher' | 'lower';
  won: boolean;
}

interface GameState {
  currentHand: Tile[];
  history: GameHistoryEntry[];
  score: number;
  drawPile: Tile[];
  discardPile: Tile[];
  tileValues: Record<TileName, number>;
  reshuffleCount: number;
  isGameOver: boolean;
  gameStarted: boolean;
  
  startGame: () => void;
  placeBet: (bet: 'higher' | 'lower') => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentHand: [],
  history: [],
  score: 0,
  drawPile: [],
  discardPile: [],
  tileValues: {},
  reshuffleCount: 0,
  isGameOver: false,
  gameStarted: false,

  startGame: () => {
    const initialValues = initializeTileValues();
    const initialDeck = shuffleDeck(createDeck());
    const { hand, newDrawPile, newDiscardPile, reshuffled } = drawHand(initialDeck, [], 5);
    
    set({
      currentHand: hand,
      history: [],
      score: 0,
      drawPile: newDrawPile,
      discardPile: newDiscardPile,
      tileValues: initialValues,
      reshuffleCount: reshuffled ? 1 : 0,
      isGameOver: false,
      gameStarted: true,
    });
  },

  placeBet: (bet: 'higher' | 'lower') => {
    const { 
      currentHand, drawPile, discardPile, tileValues, 
      reshuffleCount, history, score 
    } = get();

    const currentValue = calculateHandValue(currentHand, tileValues);
    
    // Discard current hand
    const newDiscard = [...discardPile, ...currentHand];
    
    // Draw next hand
    const { hand: nextHand, newDrawPile, newDiscardPile, reshuffled: wasReshuffled } = drawHand(drawPile, newDiscard, 5);
    const newReshuffleCount = reshuffleCount + (wasReshuffled ? 1 : 0);
    
    const nextValue = calculateHandValue(nextHand, tileValues);
    
    // Check win/loss based on old tile values
    const isWin = bet === 'higher' ? nextValue > currentValue : nextValue < currentValue;
    
    // Update tile values based on the NEW hand and whether the user won the bet
    const newTileValues = updateTileValues(nextHand, tileValues, isWin);
    
    // Record history
    const newHistoryEntry: GameHistoryEntry = {
      hand: currentHand,
      value: currentValue,
      bet,
      won: isWin,
    };

    const newScore = isWin ? score + 10 : score;

    const gameOver = checkGameOver(newTileValues, newReshuffleCount);

    set({
      currentHand: nextHand,
      drawPile: newDrawPile,
      discardPile: newDiscardPile,
      history: [newHistoryEntry, ...history],
      score: newScore,
      tileValues: newTileValues,
      reshuffleCount: newReshuffleCount,
      isGameOver: gameOver,
    });
  }
}));
