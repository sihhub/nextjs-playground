//React 스럽지 않게 개발해서 사용해보기
//redux hook 사용 x

"use client";

import { store } from "./store";
import { addTodo } from "./actions";
import { useEffect, useState } from "react";

export default function Page() {
  const [todos, setTodos] = useState(store.getState().todos);
  const [input, setInput] = useState("");

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // 상태가 바뀔 때마다 새 상태를 읽어옴
      setTodos(store.getState().todos);
    });

    return () => unsubscribe(); // 언마운트 시 구독 해제 (store.subscribe()() 호출 시 구독 해제)
  }, []);

  const handleAdd = () => {
    if (input.trim()) {
      store.dispatch(addTodo(input)); // useDispatch 대신 직접 dispatch
      setInput("");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Redux (no hooks)</h2>
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
}
