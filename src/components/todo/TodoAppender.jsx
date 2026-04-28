import { useRef } from "react";
import { Alert } from "../ui/Modals";

const TodoAppender = ({ onSaveButtonClick }) => {
  const today = new Date().toISOString().split("T")[0];
  const todoRef = useRef();
  const dueDateRef = useRef();
  const priorityRef = useRef();

  const alertRef = useRef();

  const onSaveButtonClickHandler = () => {
    // if (
    //   to-doRef.current.value === "" ||
    //   dueDateRef.current.value === "" ||
    //   priorityRef.current.value === "0"
    // ) {
    //   alert("내용이 없어요!");
    //   return;
    // }
    if (!todoRef.current.value) {
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

    onSaveButtonClick(
      todoRef.current.value,
      dueDateRef.current.value,
      priorityRef.current.value,
    );

    todoRef.current.value = "";
    dueDateRef.current.value = "";
    priorityRef.current.value = "";
  };

  return (
    <footer>
      <Alert dialogRef={alertRef} />
      <input type="text" ref={todoRef} placeholder="Input new task" />
      <input type="date" ref={dueDateRef} min={today} />
      <select ref={priorityRef}>
        <option value="">우선 순위</option>
        <option value="1">높음</option>
        <option value="2">보통</option>
        <option value="3">낮음</option>
      </select>
      <button type="button" onClick={onSaveButtonClickHandler}>
        Save
      </button>
    </footer>
  );
};

export default TodoAppender;
