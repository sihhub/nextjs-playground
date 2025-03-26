//Dispatcher : 모든 액션을 받아서 등록된 콜백(스토어)에 전달하는 중개자, 중앙 허브 역할

export interface Action {
  type: string;
  [key: string]: unknown;
}

type Callback = (action: Action) => void;

class Dispatcher {
  private callbacks: Callback[] = [];

  register(callback: Callback) {
    this.callbacks.push(callback);
  }

  dispatch(action: Action) {
    // 3. Dispatcher는 등록된 Store에 액션을 전달
    this.callbacks.forEach((callback) => callback(action));
  }
}

export const dispatcher = new Dispatcher();
