const TodoItem = ({ todo, priorities, onDoneChange }) => {
  // props todo의 이름과 todo.todo의 이름이 같이 구조 분해 불가
  // to-do.todo의 이름을 todoTask로 변경해 할당
  const { id, todo: todoTask, dueDate, priority, isDone } = todo;
  const doneClass = isDone ? "done" : "";
  const onDoneChangeHandler = () => {
    onDoneChange(id, !isDone);
  };

  return (
    <li className="tasks-item">
      <input
        type="checkbox"
        // id={id}
        checked={isDone}
        onChange={onDoneChangeHandler}
      />
      <label className={isDone ? "done" : ""} htmlFor={id}>
        {todoTask}
      </label>
      <span className={`due-date ${doneClass}`}>{dueDate}</span>
      <span className={`priority ${doneClass}`}>{priorities[priority]}</span>
    </li>
  );
};

export default TodoItem;

export const TodoItemForChildren = ({ children }) => {
  return <li className="tasks-item">{children}</li>;
};
