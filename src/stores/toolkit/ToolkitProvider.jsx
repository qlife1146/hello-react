import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./slices/todoSlice";
import { Provider } from "react-redux";

const toolkitStore = configureStore({
  // toolkit store에 slice store 등록
  reducer: {
    todo: todoSlice.reducer, // to_do state를 만듦
    // article: articleSlice.reducer, // article state를 만듦
    // user: userSlice.reducer,
  },
});

export const ToolkitProvider = ({ children }) => {
  return <Provider store={toolkitStore}>{children}</Provider>;
};
