import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./components/User/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;