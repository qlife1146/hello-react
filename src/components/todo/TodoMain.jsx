// function과 fat arrow function의 기능적 차이
// function -> 함수 호출한 대상을 this 객체로 알 수 있음
// fat arrow function -> this 사용 불가(대신 event 파라미터 사용)

import { useCallback, useEffect, useMemo, useState } from "react";
import { StateTest } from "./StateTest";
import TodoAppender from "./TodoAppender";
import TodoGrid from "./TodoGrid";
import TodoHeader from "./TodoHeader";
import TodoItem from "./TodoItem";
import TodoList from "./TodoList";
import AddCalculator from "./AddCalculator";
import {
  fetchAddTodo,
  fetchAllDoneTodo,
  fetchDoneTodo,
  fetchTodoList,
} from "../../http/todo/fetchTodo";

// export default 이후 const 키워드를 쓸 수 없음
// export default const TodoMain = () => {};
const TodoMain = () => {
  console.log("todo main");
  // to-do JSON DATA

  const [cachedData, setCachedData] = useState([]);

  const refreshTodoList = async () => {
    const todoList = await fetchTodoList();
    setCachedData(todoList.body);

    if (todoList.errors) {
      alert(todoList.errors);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshTodoList();
  }, []);

  const todoCount = useMemo(() => {
    return {
      all: cachedData.length,
      // 완료 todo 개수 반환
      done: cachedData.filter((todo) => todo.done).length,
      // 미완료 todo 개수 반환
      process: cachedData.filter((todo) => !todo.done).length,
    };
  }, [cachedData]);

  const onAllDoneChangeHandler = useCallback(async () => {
    const allDoneResult = await fetchAllDoneTodo();
    if (!allDoneResult.errors) {
      refreshTodoList();
    } else {
      alert(allDoneResult.errors);
    }
    refreshTodoList();
  }, []);

  // 특정 todo.isDone 값을 반전시키는 함수 필요
  // props로 To-doList에게 전달
  // To-doList는 TodoItem에게 전달
  // (props) -> TodoList -> TodoItem
  const onDoneChangeHandler = async (todoId) => {
    const doneResult = await fetchDoneTodo(todoId);
    if (!doneResult.errors) {
      refreshTodoList();
    } else {
      alert(doneResult.errors);
    }
  };

  const onSaveButtonClickHandler = useCallback(
    async (todo, dueDate, priority) => {
      console.log("저장합니다.");
      const addResult = await fetchAddTodo(todo, dueDate, priority);
      if (!addResult.errors) {
        refreshTodoList();
      } else {
        alert(addResult.errors);
      }
    },
    [],
  );

  // 컴포넌트가 만들어준 HTML Tag set 반환
  return (
    <div className="wrapper">
      {/* <StateTest /> */}
      <header>React Todo</header>
      <TodoGrid>
        <TodoHeader
          count={todoCount}
          onAllDoneChange={onAllDoneChangeHandler}
        />
        <TodoList>
          {cachedData.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDoneChange={onDoneChangeHandler}
            />
          ))}
        </TodoList>
      </TodoGrid>
      <TodoAppender onSaveButtonClick={onSaveButtonClickHandler} />
    </div>
  );
};

export default TodoMain;
