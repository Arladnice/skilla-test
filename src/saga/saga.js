import { all } from "redux-saga/effects";
import { callsWatcher } from "./callSaga";

export function* rootWatcher() {
  yield all([callsWatcher()]);
}
