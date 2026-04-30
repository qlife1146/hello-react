// function과 fat arrow function의 기능적 차이
// function -> 함수 호출한 대상을 this 객체로 알 수 있음
// fat arrow function -> this 사용 불가(대신 event 파라미터 사용)

import { useEffect } from "react";
import { StateTest } from "./StateTest";
import TodoAppender from "./TodoAppender";
import TodoGrid from "./TodoGrid";
import TodoHeader from "./TodoHeader";
import TodoItem from "./TodoItem";
import TodoList from "./TodoList";
import AddCalculator from "./AddCalculator";
import { fetchTodoList } from "../../http/todo/fetchTodo";
import { useDispatch, useSelector } from "react-redux";
import { todoAction } from "../../stores/toolkit/slices/todoSlice";

// export default 이후 const 키워드를 쓸 수 없음
// export default const TodoMain = () => {};
const TodoMain = () => {
  console.log("todo main");
  // to-do JSON DATA

  // const [cachedData, setCachedData] = useState([]);
  // ReactRedux Store에서 todo state 가져오기
  const { list: todoList } = useSelector((store) => store.todo);
  const storeDispatcher = useDispatch();
  const refreshTodoList = async () => {
    const fetchResult = await fetchTodoList();
    // setCachedData(fetchResult.body);
    storeDispatcher(todoAction.refresh(fetchResult.body));

    if (fetchResult.errors) {
      alert(fetchResult.errors);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshTodoList();
  }, []);

  // 컴포넌트가 만들어준 HTML Tag set 반환
  return (
    <div className="wrapper">
      <header>React Todo</header>
      <TodoGrid>
        <TodoHeader />
        <TodoList>
          {todoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </TodoList>
      </TodoGrid>
      <TodoAppender />
    </div>
  );
};

export default TodoMain;
