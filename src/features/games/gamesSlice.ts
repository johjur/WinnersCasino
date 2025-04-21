import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Game = {
  name: string;
  category: string;
  rating: number;
  activeUsers: number;
  image: string;
};

type GamesState = {
  allGames: Game[];
  favourites: string[];
  customOrder: { [category: string]: { [gameName: string]: number } }; // Store custom order for each category
};

const loadCustomOrder = () => {
  try {
    const savedOrder = localStorage.getItem('gamesCustomOrder');
    return savedOrder ? JSON.parse(savedOrder) : {};
  } catch (error) {
    console.error('Error loading custom order:', error);
    return {};
  }
};

const initialState: GamesState = {
  allGames: [],
  favourites: [],
  customOrder: loadCustomOrder(),
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGames(state, action: PayloadAction<Game[]>) {
      state.allGames = action.payload;
    },
    toggleFavourite(state, action: PayloadAction<string>) {
      const gameName = action.payload;
      if (state.favourites.includes(gameName)) {
        state.favourites = state.favourites.filter((g) => g !== gameName);
      } else {
        state.favourites.push(gameName);
      }
    },
    updateCustomOrder(state, action: PayloadAction<{ category: string; order: { [gameName: string]: number } }>) {
      const { category, order } = action.payload;
      state.customOrder = {
        ...state.customOrder,
        [category]: order,
      };
      try {
        localStorage.setItem('gamesCustomOrder', JSON.stringify(state.customOrder));
      } catch (error) {
        console.error('Error saving custom order:', error);
      }
    },
    fetchGames() {}, 
  },
});

export const { setGames, toggleFavourite, updateCustomOrder, fetchGames } = gamesSlice.actions;

export const selectAllGames = (state: { games: GamesState }) => state.games.allGames;
export const selectFavourites = (state: { games: GamesState }) =>
  state.games.allGames.filter((g) => state.games.favourites.includes(g.name));
export const isGameFavourited = (state: { games: GamesState }, gameName: string) =>
  state.games.favourites.includes(gameName);
export const selectCustomOrder = (state: { games: GamesState }) => state.games.customOrder;

export default gamesSlice.reducer;