import { put, takeEvery, call, select } from "redux-saga/effects";
import { ApiCall } from "../utils/Api";
import { setFilter } from "../store/reducers/reduserFilter";
import { setPreload } from "../store/reducers/preloaderReducer";
import { FETCH_CALLS, setCalls } from "../store/reducers/reduserCalls";

function* apiCardsWorker() {
  yield put(setPreload(true));
  const searchData = yield select(
    ({ search }) => search.searchData
  );
  const data = yield call(
    ApiCall.getCallList,
    searchData.firstDate,
    searchData.secondDate
  );
  yield put(setCalls(data.results));
  yield put(setFilter([]));
  yield put(setPreload(false));
}

export function* callsWatcher() {
  yield takeEvery(FETCH_CALLS, apiCardsWorker);
}
