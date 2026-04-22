export type Suit = 'bamboo' | 'character' | 'dot' | 'wind' | 'dragon';
export type TileName = string;

export interface Tile {
  id: string; // unique for the deck
  name: TileName;
  suit: Suit;
  rank?: number | string;
}

export const WINDS = ['east', 'south', 'west', 'north'];
export const DRAGONS = ['red', 'green', 'white'];

export const initializeTileValues = (): Record<TileName, number> => {
  const values: Record<TileName, number> = {};
  
  ['bamboo', 'character', 'dot'].forEach(suit => {
    for (let i = 1; i <= 9; i++) {
      values[`${suit}_${i}`] = i;
    }
  });

  WINDS.forEach(w => {
    values[`wind_${w}`] = 5;
  });

  DRAGONS.forEach(d => {
    values[`dragon_${d}`] = 5;
  });

  return values;
};

export const createDeck = (): Tile[] => {
  const deck: Tile[] = [];
  
  (['bamboo', 'character', 'dot'] as Suit[]).forEach((suit) => {
    for (let i = 1; i <= 9; i++) {
      for (let copy = 0; copy < 4; copy++) {
        deck.push({ id: `${suit}_${i}_${copy}`, name: `${suit}_${i}`, suit, rank: i });
      }
    }
  });

  WINDS.forEach(w => {
    for (let copy = 0; copy < 4; copy++) {
      deck.push({ id: `wind_${w}_${copy}`, name: `wind_${w}`, suit: 'wind', rank: w });
    }
  });

  DRAGONS.forEach(d => {
    for (let copy = 0; copy < 4; copy++) {
      deck.push({ id: `dragon_${d}_${copy}`, name: `dragon_${d}`, suit: 'dragon', rank: d });
    }
  });

  return deck;
};

export const shuffleDeck = (deck: Tile[]): Tile[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const drawHand = (drawPile: Tile[], discardPile: Tile[], count: number = 5): { hand: Tile[], newDrawPile: Tile[], newDiscardPile: Tile[], reshuffled: boolean } => {
  const hand: Tile[] = [];
  let currentDraw = [...drawPile];
  let currentDiscard = [...discardPile];
  let reshuffled = false;

  for (let i = 0; i < count; i++) {
    if (currentDraw.length === 0) {
      if (currentDiscard.length === 0) break; // Should rarely happen, but just in case
      currentDraw = shuffleDeck(currentDiscard);
      currentDiscard = [];
      reshuffled = true;
    }
    const tile = currentDraw.pop();
    if (tile) {
      hand.push(tile);
    }
  }

  return { hand, newDrawPile: currentDraw, newDiscardPile: currentDiscard, reshuffled };
};

export const calculateHandValue = (hand: Tile[], tileValues: Record<TileName, number>): number => {
  return hand.reduce((sum, tile) => sum + tileValues[tile.name], 0);
};

export const updateTileValues = (hand: Tile[], tileValues: Record<TileName, number>, isWin: boolean): Record<TileName, number> => {
  const newValues = { ...tileValues };
  hand.forEach(tile => {
    // Prevent updating a tile more than once if drawn multiple copies in the same hand?
    // Let's assume each tile instance updates the value, so 2 copies -> +/- 2
    newValues[tile.name] += isWin ? 1 : -1;
  });
  return newValues;
};

export const checkGameOver = (tileValues: Record<TileName, number>, reshuffleCount: number): boolean => {
  if (reshuffleCount >= 3) return true;
  for (const val of Object.values(tileValues)) {
    if (val <= 0 || val >= 10) return true;
  }
  return false;
};
