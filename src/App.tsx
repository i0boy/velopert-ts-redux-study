import React from "react";
import CounterContainer from "./containers/CounterContainer";
import TodoApp from "./containers/TodoApp";

const App: React.FC = () => {
  return (
    <>
      <CounterContainer />
      <TodoApp />
    </>
  );
};

export default App;
