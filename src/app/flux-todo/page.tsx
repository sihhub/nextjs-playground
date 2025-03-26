//View: React 컴포넌트, Store에서 상태를 받고 렌더링함. 사용자가 뭔가 하면 Action을 발생시킴

"use client";

import { useEffect, useState } from "react";
import { Actions } from "./actions";
import { todoStore } from "./todoStore";

export default function Page() {
  const [todos, setTodos] = useState<string[]>(todoStore.getTodos());
  const [input, setInput] = useState("");

  useEffect(() => {
    // // 5. Store에서 변경이벤트를 발생시키고, View는 다시 렌더링됨
    const listener = () => setTodos([...todoStore.getTodos()]);
    todoStore.subscribe(listener);
  }, []);

  const handleAdd = () => {
    //1. 사용자가 입력하고 추가 버튼을 클릭 시 addTodo 액션 발생
    if (input.trim()) {
      Actions.addTodo(input);
      setInput("");
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>📌 할 일 목록</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="할 일을 입력하세요" style={{ marginRight: "0.5rem" }} />
      <button onClick={handleAdd}>추가</button>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo}</li>
        ))}
      </ul>
    </main>
  );
}
