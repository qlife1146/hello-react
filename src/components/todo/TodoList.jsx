import TodoItem, { TodoItemForChildren } from "./TodoItem";
import TodoContext from "./contexts/TodoContext";
import { useContext } from "react";

const TodoList = ({ children }) => {
  console.log("todo list");
  const { componentName } = useContext(TodoContext);

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
