import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_KEY, USER_ID } from "../../constants";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../../util/localStorageUtil";

const initialState = {
  isLoggedIn: getFromLocalStorage(TOKEN_KEY) ? true : false, //TODO find better solution?
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      removeFromLocalStorage(TOKEN_KEY);
      removeFromLocalStorage(USER_ID);
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
