import TodoItem, { TodoItemForChildren } from "./TodoItem";
import TodoContext from "./contexts/TodoContext";
import { useContext } from "react";

const TodoList = ({ children }) => {
  const { componentName } = useContext(TodoContext);
  console.log("TodoList: " + componentName);

  if (!componentName || componentName !== "TodoGrid") {
    return <></>;
  }

  return (
    <TodoContext.Provider value={{ componentName }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoList;
