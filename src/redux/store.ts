import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./slices";
import rootSaga from "./sagas";


const SagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: false }).prepend(SagaMiddleware);
  },
});

SagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>

export default store;
