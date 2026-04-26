const TodoHeader = ({ onAllDoneChange }) => {
  const onAllDoneChangeHandler = (event) => {
    onAllDoneChange(event.target.checked);
  };
  return (
    <li className="tasks-header">
      <input type="checkbox" id="checkall" onChange={onAllDoneChangeHandler} />
      <label>Task</label>
      <span className="due-date">Due Date</span>
      <span className="priority">Priority</span>
    </li>
  );
};

export default TodoHeader;
