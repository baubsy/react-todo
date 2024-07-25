import TodoList from "./components/TodoList.js";

const testList = "http://127.0.0.1:3123/api/todoList/A";
function App() {
  return (
      <TodoList listURL={testList} />
  );
}

export default App;
