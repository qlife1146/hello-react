import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo-slice",
  initialState: {
    list: [],
  },
  reducers: {
    refresh(store, action) {
      store.list = action.payload;
    },
    doneItem(store, action) {
      // action -> done 처리할 todo의 id가 전달됨
      // store.list에서 id가 action과 같은 todo의 인덱스를 찾아옴
      const index = store.list.findIndex((todo) => {
        todo.id === action.payload;
      });
      store.list[index].done = true;
    },
    allDone(store) {
      store.list = store.list.map((todo) => ({ ...todo, done: true }));
    },
  },
});

export const todoAction = todoSlice.actions;
console.log("todo Action: ", todoAction);
