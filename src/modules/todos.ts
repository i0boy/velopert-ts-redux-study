// 폴더로 분리해 두었으나 참고를 위해 남겨둠

import { createAction, ActionType, createReducer } from "typesafe-actions";

let nextId = 1; // 새로운 항목을 추가 할 때 사용 할 고유 ID 값

export const addTodo = createAction("todos/ADD_TODO", (text: string) => ({
  id: nextId++,
  text: text,
  done: false,
}))<Todo>();

export const toggleTodo = createAction("todos/TOGGLE_TODO")<number>();
export const removeTodo = createAction("todos/REMOVE_TODO")<number>();

const actions = {
  addTodo,
  toggleTodo,
  removeTodo,
};
type TodosAction = ActionType<typeof actions>;

// 상태에서 사용 할 할 일 항목 데이터 타입 정의
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

// 이 모듈에서 관리할 상태는 Todo 객체로 이루어진 배열
export type TodosState = Todo[];

// 초기 상태 선언
const initialState: TodosState = [];

// 리듀서 작성
const todos = createReducer<TodosState, TodosAction>(initialState)
  .handleAction(removeTodo, (state, action) =>
    state.filter((todo) => todo.id !== action.payload)
  )
  .handleAction(toggleTodo, (state, action) =>
    state.map((todo) =>
      todo.id === action.payload ? { ...todo, done: !todo.done } : todo
    )
  )
  .handleAction(addTodo, (state, action) =>
    state.concat({ ...action.payload })
  );

export default todos;
