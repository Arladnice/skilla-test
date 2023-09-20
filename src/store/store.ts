import { configureStore } from "@reduxjs/toolkit";
import { callsReduser } from "./reducers/reduserCalls";
import { filterReduser } from "./reducers/reduserFilter";
import { searchReduser } from "./reducers/reduserSearch";
import createSagaMiddleware from "redux-saga";
import { rootWatcher } from "../saga/saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    calls: callsReduser,
    filter: filterReduser,
    search: searchReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
sagaMiddleware.run(rootWatcher);
