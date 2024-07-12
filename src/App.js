import TodoList from "./components/TodoList.js";

const testList = "http://127.0.0.1:3123/api/todoList/379158880420102217";
function App() {
  return (
      <TodoList listURL={testList} />
  );
}

export default App;
