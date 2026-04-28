// function과 fat arrow function의 기능적 차이
// function -> 함수 호출한 대상을 this 객체로 알 수 있음
// fat arrow function -> this 사용 불가(대신 event 파라미터 사용)

import { StateTest } from "./StateTest";
import TodoAppender from "./TodoAppender";
import TodoHeader from "./TodoHeader";
import TodoList from "./TodoList";
import { useState } from "react";
import TodoItem from "./TodoItem";
import TodoGrid from "./TodoGrid";

// export default 이후 const 키워드를 쓸 수 없음
// export default const TodoMain = () => {};
const TodoMain = () => {
  // to-do JSON DATA
  const todoDatas = [
    {
      id: "todo_1",
      todo: "React Component 마스터",
      dueDate: "2025-04-30",
      priority: 1,
      isDone: true,
    },
    {
      id: "todo_2",
      todo: "React Component 마스터 2",
      dueDate: "2026-05-05",
      priority: 2,
      isDone: false,
    },
    {
      id: "todo_3",
      todo: "React Component 마스터 3",
      dueDate: "2026-05-08",
      priority: 3,
      isDone: false,
    },
  ];

  const [cachedData, setCachedData] = useState(todoDatas);
  const onAllDoneChangeHandler = (isDone) => {
    setCachedData((prevData) => {
      // cachedData를 반복하면서 모든 isDone의 값을 변경
      const newData = prevData.map((todo) => ({ ...todo, isDone }));
      // 변경된 결과는 반환
      return newData;
    });
  };

  // 특정 todo.isDone 값을 반전시키는 함수 필요
  // props로 To-doList에게 전달
  // To-doList는 TodoItem에게 전달
  // (props) -> TodoList -> TodoItem
  const onDoneChangeHandler = (todoId, isDone) => {
    setCachedData((prevData) => {
      const newStateMemory = [...prevData];

      for (const todo of newStateMemory) {
        if (todo.id === todoId) {
          todo.isDone = isDone;
          break;
        }
      }
      return newStateMemory;
    });
  };
  const onSaveButtonClickHandler = (todo, dueDate, priority) => {
    setCachedData((prevData) => [
      ...prevData,
      {
        id: prevData.length,
        todo,
        dueDate,
        priority: Number(priority),
        isDone: false,
      },
    ]);
    // alert("저장했습니다.");
  };
  // 컴포넌트가 만들어준 HTML Tag set 반환
  return (
    <div className="wrapper">
      {/* <StateTest /> */}
      <header>React Todo</header>
      <TodoGrid>
        <TodoHeader onAllDoneChange={onAllDoneChangeHandler} />
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
