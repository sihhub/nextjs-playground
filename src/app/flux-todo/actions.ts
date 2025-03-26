//Action :  어떤 동작이 발생했는지를 설명하는 객체, 해당 객체를 dispatcher에 전달

import { dispatcher } from "./dispatcher";

export const Actions = {
  addTodo(text: string) {
    // 2. 액션 ‘객체’ {type: “ADD_TODO”, text: “공부하기” } 가 Dispatcher로 전달됨
    dispatcher.dispatch({
      type: "ADD_TODO",
      text,
    });
  },
};
