import {configureStore} from "@reduxjs/toolkit";
import {postReducer} from "./postReducer";

export const store = configureStore({
  reducer: {
    mindmap: postReducer, // register the reducer
  },
});

export default store;
