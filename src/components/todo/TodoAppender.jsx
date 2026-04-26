const TodoAppender = ({
  inputData: { todo, dueDate, priority },
  onTaskKeyUp,
  onDateChange,
  onPriorityChange,
  onSaveButtonClick,
}) => {
  const today = new Date().toISOString().split("T")[0];
  return (
    <footer>
      <input
        type="text"
        placeholder="Input new task"
        onChange={onTaskKeyUp}
        value={todo}
      />
      <input type="date" min={today} onChange={onDateChange} value={dueDate} />
      <select onChange={onPriorityChange} value={priority}>
        <option value="0">우선 순위</option>
        <option value="1">높음</option>
        <option value="2">보통</option>
        <option value="3">낮음</option>
      </select>
      <button type="button" onClick={onSaveButtonClick}>
        Save
      </button>
    </footer>
  );
};

export default TodoAppender;
