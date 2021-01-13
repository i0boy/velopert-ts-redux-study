// Ducks 패턴  즉, 액션타입, 액션생성함수, 리듀서를 모두 한 파일에 작성하겠다는 의미이죠.
// 액션 타입을 선언합니다
// 뒤에 as const 를 붙여줌으로써 나중에 액션 객체를 만들게 action.type 의 값을 추론하는 과정에서
// action.type 이 string 으로 추론되지 않고 'counter/INCREASE' 와 같이 실제 문자열 값으로 추론 되도록 해줍니다.
const ADD_TODO = "todos/ADD_TODO" as const;
const TOGGLE_TODO = "todos/TOGGLE_TODO" as const;
const REMOVE_TODO = "todos/REMOVE_TODO" as const;

let nextId: number = 1; // 새로운 항목을 추가 할 때 사용 할 고유 ID 값
// 액션 생성 함수
export const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: {
    id: nextId++,
    text,
  },
});

// 액션에 부가적으로 필요한 값을 payload 라는 이름으로 통일합니다
// 이는 FSA (https://github.com/redux-utilities/flux-standard-action) 라는 규칙인데
// 이 규칙을 적용하면 액션들이 모두 비슷한 구조로 이루어져있게 되어 추후 다룰 때도 편하고
// 읽기 쉽고, 액션 구조를 일반화함으로써 액션에 관련돤 라이브러리를 사용 할 수 있게 해줍니다.
// 다만, 무조건 꼭 따를 필요는 없습니다.
export const toggleTodo = (id: number) => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const removeTodo = (id: number) => ({
  type: REMOVE_TODO,
  payload: id,
});

// 모든 액션 겍체들에 대한 타입을 준비해줍니다.
// ReturnType<typeof _____> 는 특정 함수의 반환값을 추론해줍니다
// 상단부에서 액션타입을 선언 할 떄 as const 를 하지 않으면 이 부분이 제대로 작동하지 않습니다.
type TodosAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof toggleTodo>
  | ReturnType<typeof removeTodo>;

// 상태에서 사용 할 할 일 항목 데이터 타입 정의
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

// 이 모듈에서 관리할 상태는 Todo 객체로 이루어진 배열
export type TodosState = Todo[];

// 초기 상태 선언 (투두배열임)
const initialState: TodosState = [];

// 리듀서 작성
export default function todos(
  state: TodosState = initialState,
  action: TodosAction
): TodosState {
  switch (action.type) {
    case ADD_TODO:
      return state.concat({
        // action.payload 객체 안의 값이 모두 유추됩니다.
        id: action.payload.id,
        text: action.payload.text,
        done: false,
      });
    case TOGGLE_TODO:
      return state.map((todo) =>
        // payload 가 number 인 것이 유추됩니다.
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );
    case REMOVE_TODO:
      // payload 가 number 인 것이 유추됩니다.
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}
