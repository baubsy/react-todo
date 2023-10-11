
import TodoList from './components/TodoList.js'

const testList = "http://127.0.0.1:3123/api/todoList/375080984463278161";
function App() {
  return (
    <TodoList listURL={testList}/>
  );
}

export default App;
