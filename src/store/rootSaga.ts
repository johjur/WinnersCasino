// src/store/rootSaga.ts
import { all } from "redux-saga/effects";
import { watchGamesSaga } from "@features/games/gamesSaga";

export default function* rootSaga() {
  yield all([watchGamesSaga()]);
}