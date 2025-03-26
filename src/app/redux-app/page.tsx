"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { addTodo } from "./actions";
import { State } from "./reducer";
import { useState } from "react";

const Inner = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: State) => state.todos);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addTodo(input)); // dispatcher 대신 store.dispatch()
      setInput("");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📌 Redux Todo App</h2>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="할 일 입력" />
      <button onClick={handleAdd} style={{ marginLeft: 8 }}>
        추가
      </button>
      <ul>
        {todos.map((todo: string, idx: number) => (
          <li key={idx}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default function Page() {
  return (
    <Provider store={store}>
      <Inner />
    </Provider>
  );
}
