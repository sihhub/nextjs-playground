// Reducer : 상태를 변경하는 순수 함수.
// 이전 상태와 액션을 받아 새로운 상태를 반환함.

export interface State {
  todos: string[];
}

interface Action {
  type: string;
  [key: string]: unknown;
}

const initialState: State = {
  todos: [],
};

export const todoReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "ADD_TODO": {
      const text = action.text as string;
      return {
        ...state,
        todos: [...state.todos, text],
      };
    }
    default:
      return state;
  }
};
