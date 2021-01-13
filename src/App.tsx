import React from "react";
import CounterContainer from "./containers/CounterContainer";
import GithubProfileLoader from "./containers/GithubProfileLoader";
import TodoApp from "./containers/TodoApp";

const App: React.FC = () => {
  return (
    <>
      <GithubProfileLoader />
      <CounterContainer />
      <TodoApp />
    </>
  );
};

export default App;
