import { useContext, useRef } from "react";
import { Confirm } from "../ui/Modals";
import TodoContext from "./contexts/TodoContext";
const TodoHeader = ({ onAllDoneChange }) => {
  const checkboxRef = useRef();
  const confirmRef = useRef();

  const { componentName } = useContext(TodoContext);

  console.log("TodoHeader:" + componentName);

  if (!componentName || componentName !== "TodoGrid") {
    return <></>;
  }

  const onAllDoneChangeHandler = () => {
    const checked = checkboxRef.current.checked;
    console.log(checked);
    let message = "";
    if (checked) {
      message = "모든 항목을 완료 처리할까요?";
    } else {
      message = "모든 항목을 미완료 처리할까요?";
    }
    confirmRef.current.showConfirm(message);
  };

  const onConfirmOkClickHandler = () => {
    onAllDoneChange(checkboxRef.current.checked);
  };
  const onConfirmCloseClickHandler = () => {
    checkboxRef.current.checked = !checkboxRef.current.checked;
  };

  return (
    <>
      <li className="tasks-header">
        <Confirm
          confirmRef={confirmRef}
          onOkClick={onConfirmOkClickHandler}
          onCloseClick={onConfirmCloseClickHandler}
        />
        <input
          type="checkbox"
          id="checkall"
          onChange={onAllDoneChangeHandler}
          ref={checkboxRef}
        />
        <label>Task</label>
        <span className="due-date">Due Date</span>
        <span className="priority">Priority</span>
      </li>
    </>
  );
};

export default TodoHeader;
