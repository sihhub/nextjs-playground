"use client";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { RootState } from "./store";
import { fetchTodos } from "./todoSlice";

const TodoApp = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state: RootState) => state.todo);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🧰 Redux Toolkit + Saga</h2>
      <button onClick={() => dispatch(fetchTodos())}>할 일 불러오기</button>
      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: "red" }}>에러: {error}</p>}
      <ul>
        {todos.map((todo: string, i: number) => (
          <li key={i}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default function Page() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}
