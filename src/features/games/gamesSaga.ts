import { call, put, takeLatest } from "redux-saga/effects";
import { setGames } from "./gamesSlice";
import gamesData from "@assets/games_list.json";

function* fetchGamesSaga() {
  try {
    // in real case: const response = yield call(fetch, '.../games.json')
    yield put(setGames(gamesData));
  } catch (error) {
    console.error("Failed to load games:", error);
  }
}

export function* watchGamesSaga() {
  yield takeLatest("games/fetchGames", fetchGamesSaga);
}