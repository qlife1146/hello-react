import { createSlice } from "@reduxjs/toolkit";

export const articleSlice = createSlice({
  name: "article-slice",
  initialState: {
    list: {
      count: 0,
      result: [],
      pagination: {},
    },
  },
  reducers: {
    refresh(store, action) {
      const { result = {}, pagination = {} } = action.payload ?? {};

      store.list = {
        count: result.count ?? 0,
        result: result.result ?? [],
        pagination,
      };
    },
  },
});

export const articleAction = articleSlice.actions;
