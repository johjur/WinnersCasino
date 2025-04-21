import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import gamesReducer from "@features/games/gamesSlice";
import { watchGamesSaga } from "@features/games/gamesSaga"; // named import ✅

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(watchGamesSaga); // run the saga ✅

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;