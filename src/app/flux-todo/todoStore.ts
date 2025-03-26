// Store : 상태(State)를 보유하고, 액션에 따라 상태를 변경하는 로직이 있음

import { dispatcher, Action } from "./dispatcher";

type Listener = () => void;

class TodoStore {
  private todos: string[] = [];
  private listeners: Listener[] = [];

  constructor() {
    dispatcher.register(this.handleAction.bind(this));
    //.bind(this) 를 사용하지 않으면 handleAction 함수 내부에서 this를 사용하려하면 undefined에러가 발생한다.
  }

  handleAction(action: Action) {
    switch (action.type) {
      case "ADD_TODO": {
        // 4. Store는 내부 상태를 업데이트(새로운 할일을 목록에 추가)
        // 5. Store에서 변경이벤트를 발생시키고, View는 다시 렌더링됨
        this.todos.push(action.text as string);
        this.emitChange();
        break;
      }
    }
  }

  getTodos() {
    return this.todos;
  }

  emitChange() {
    this.listeners.forEach((l) => l());
  }

  subscribe(l: Listener) {
    this.listeners.push(l);
  }
}

export const todoStore = new TodoStore();
