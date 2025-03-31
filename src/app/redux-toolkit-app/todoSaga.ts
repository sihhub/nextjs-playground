import { call, put, takeLatest } from "redux-saga/effects";
import { fetchTodos, setTodos, setError } from "./todoSlice";

interface Todo {
  title: string;
}

function* fetchTodosSaga(): Generator {
  try {
    const res = yield call(fetch, "https://jsonplaceholder.typicode.com/todos?_limit=5");
    const data = yield call([res, "json"]);
    const titles = data.map((item: Todo) => item.title);
    yield put(setTodos(titles));
  } catch (err: unknown) {
    if (err instanceof Error) {
      yield put(setError(err.message));
    }
  }
}

export function* todoWatcherSaga(): Generator {
  yield takeLatest(fetchTodos.type, fetchTodosSaga);
}
