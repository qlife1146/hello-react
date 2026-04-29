import TodoContext from "./contexts/TodoContext";

const TodoGrid = ({ children }) => {
  console.log("todo grid");
  const providerProps = { componentName: "TodoGrid" };
  return (
    <ul className="tasks">
      <TodoContext.Provider value={providerProps}>
        {children}
      </TodoContext.Provider>
    </ul>
  );
};

export default TodoGrid;
