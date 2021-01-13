import { createReducer } from "typesafe-actions";
import { TodosState, removeTodo, toggleTodo, addTodo } from "../todos";
import { TodosAction } from "./types";

const initialState: TodosState = [];
const reducer = createReducer<TodosState, TodosAction>(initialState)
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

export default reducer;
