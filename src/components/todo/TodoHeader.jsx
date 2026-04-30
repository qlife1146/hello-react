import { memo, useContext, useRef } from "react";
import { Confirm } from "../ui/Modals";
import TodoContext from "./contexts/TodoContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDoneTodo, fetchTodoList } from "../../http/todo/fetchTodo";
import { todoAction } from "../../stores/toolkit/slices/todoSlice";
const TodoHeader = memo(() => {
  console.log("todo header");
  const checkboxRef = useRef();
  const confirmRef = useRef();
  const reactReduxDispatcher = useDispatch();

  // react-redux store -> todo 가져오기
  const { list: todoList } = useSelector((store) => store.todo);
  const count = {
    all: todoList.length,
    // 완료 todo 개수 반환
    done: todoList.filter((todo) => todo.done).length,
    // 미완료 todo 개수 반환
    process: todoList.filter((todo) => !todo.done).length,
  };

  const { componentName } = useContext(TodoContext);

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

  const onConfirmOkClickHandler = async () => {
    // all done에 대한 낙관적 업데이트 진행
    // 사용자가 all done을 요청했을 때, 요청 결과와 상관없이 우선 all done이 된 것처럼 표시됨
    // fetch 이후 실패했을 경우에는 원래 상태도 되돌림
    // 성공했을 때는 유지
    // all done을 수행하는 중에 다른 사용자로 인해 데이터가 추가됐으면 불러올 필요 있음
    const allDoneResult = await fetchAllDoneTodo();
    reactReduxDispatcher(todoAction.allDone());
    if (allDoneResult.errors) {
      alert(allDoneResult.errors);
    }
    const fetchResult = await fetchTodoList();
    reactReduxDispatcher(todoAction.refresh(fetchResult.body));
  };
  const onConfirmCloseClickHandler = () => {
    checkboxRef.current.checked = !checkboxRef.current.checked;
  };

  return (
    <>
      <li className="tasks-counter">
        <div>전체: {count.all}</div>
        <div>진행중: {count.process}</div>
        <div>완료: {count.done}</div>
      </li>
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
});

export default TodoHeader;
