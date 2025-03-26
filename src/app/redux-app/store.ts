// Store : 상태를 보관하는 객체.

// createStore(reducer)로 생성되고, dispatch(), getState(), subscribe() 등의 메서드를 제공함.
// Flux의 Dispatcher를 제거하고 대신 store.dispatch(action) 한 줄로 액션을 직접 전달. 구조가 단순해지고 추적이 쉬워짐.
// Flux의 Store는 상태를 보관할 뿐만 아니라 액션 처리 로직도 포함했었지만 Redux에서는 Reducer를 사용,
// Reducer가 순수 함수이기 때문에 예측 가능하고 테스트 용이한 로직을 작성할 수 있음.
// Flux에서는 Store를 여러개 만들 수 있어, 각 Store간 의존성이 생기거나 상태 관리가 분산됨
// Redux는 단 하나의 Store만 존재. 모든 상태가 하나의 큰 객체에 들어가 있음, 상태를 한눈에 파악 가능, 디버깅 쉬움

import { createStore } from "redux";
import { todoReducer } from "./reducer";

export const store = createStore(todoReducer); // 앱 전역에서 동일한 store를 사용 (싱글톤).
