import { useContext, useRef } from "react";
import { Confirm } from "../ui/Modals";
import TodoContext from "./contexts/TodoContext";
import { fetchTodoList, fetchDoneTodo } from "../../http/todo/fetchTodo";
import { useDispatch } from "react-redux";
import { todoAction } from "../../stores/toolkit/slices/todoSlice";

const TodoItem = ({ todo }) => {
  console.log("todo item");
  const priorities = ["없음", "높음", "보통", "낮음"];
  const checkboxRef = useRef();
  const confirmRef = useRef();

  const reactReduxDispatcher = useDispatch();

  const { componentName } = useContext(TodoContext);

  if (!componentName || componentName !== "TodoGrid") {
    return <></>;
  }

  // props todo의 이름과 todo.todo의 이름이 같이 구조 분해 불가
  // to-do.todo의 이름을 todoTask로 변경해 할당
  const { id, task, dueDate, priority, done } = todo;
  const doneClass = done ? "done" : "";
  const onDoneChangeHandler = () => {
    const checked = checkboxRef.current.checked;
    let message = "";
    if (checked) {
      // message = todoTask + " 항목을 완료 처리할까요?";
      message = "해당 항목을 완료 처리할까요?";
    } else {
      message = "해당 항목을 미완료 처리할까요?";
    }
    confirmRef.current.showConfirm(message);
  };

  const onConfirmOkClickHandler = async () => {
    reactReduxDispatcher(todoAction.doneItem(id));
    const doneResult = await fetchDoneTodo(id);
    if (doneResult.errors) {
      alert(doneResult.errors);
    }
    const fetchResult = await fetchTodoList();
    reactReduxDispatcher(todoAction.refresh(fetchResult.body));
  };
  const onConfirmCloseClickHandler = () => {};

  return (
    <li className="tasks-item">
      <Confirm
        confirmRef={confirmRef}
        onOkClick={onConfirmOkClickHandler}
        onCloseClick={onConfirmCloseClickHandler}
      />
      <input
        type="checkbox"
        // id={id}
        checked={done}
        onChange={onDoneChangeHandler}
        ref={checkboxRef}
      />
      <label className={done ? "done" : ""} htmlFor={id}>
        {task}
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
