import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import todoReducer, { TodoState } from "./todoSlice";
import { todoWatcherSaga } from "./todoSaga";

export interface RootState {
  todo: TodoState;
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore<RootState>({
  reducer: {
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(todoWatcherSaga);

export default store;
