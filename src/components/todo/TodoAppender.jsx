import { memo, useRef, useState } from "react";
import { Alert } from "../ui/Modals";
import { useDispatch } from "react-redux";
import { fetchTodoList, fetchAddTodo } from "../../http/todo/fetchTodo";
import { todoAction } from "../../stores/toolkit/slices/todoSlice";

const TodoAppender = memo(() => {
  console.log("todo appender");
  const today = new Date().toISOString().split("T")[0];
  const taskRef = useRef();
  const dueDateRef = useRef();
  const priorityRef = useRef();

  const alertRef = useRef();

  const reactReduxDispatcher = useDispatch();

  const [isFetching, setIsFetching] = useState(false);

  const onSaveButtonClickHandler = async () => {
    if (!taskRef.current.value) {
      alertRef.current.showModal("내용을");
      return;
    }
    if (!dueDateRef.current.value) {
      alertRef.current.showModal("날짜를");
      return;
    }
    if (!priorityRef.current.value) {
      alertRef.current.showModal("우선 순위를");
      return;
    }

    setIsFetching(true);

    const addResult = await fetchAddTodo(
      taskRef.current.value,
      dueDateRef.current.value,
      priorityRef.current.value,
    );

    if (addResult.errors) {
      alert(addResult.errors);
    } else {
      const fetchResult = await fetchTodoList();
      reactReduxDispatcher(todoAction.refresh(fetchResult.body));
    }

    taskRef.current.value = "";
    dueDateRef.current.value = "";
    priorityRef.current.value = "";
  };

  return (
    <footer>
      <Alert dialogRef={alertRef} />
      <input type="text" ref={taskRef} placeholder="Input new task" />
      <input type="date" ref={dueDateRef} min={today} />
      <select ref={priorityRef}>
        <option value="">우선 순위</option>
        <option value="1">높음</option>
        <option value="2">보통</option>
        <option value="3">낮음</option>
      </select>
      <button
        type="button"
        disabled={isFetching}
        onClick={onSaveButtonClickHandler}>
        {isFetching ? "저장 중..." : "저장"}
      </button>
    </footer>
  );
});

export default TodoAppender;
