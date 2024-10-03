import { configureStore } from "@reduxjs/toolkit";
import { mindmapReducer } from "./mindmapReducer";

export const store = configureStore({
  reducer: {
    mindmap: mindmapReducer, // register the reducer
  },
});

export default store;
