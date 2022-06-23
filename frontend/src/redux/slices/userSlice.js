import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_KEY } from "../../constants";
import { removeFromLocalStorage } from "../../util/localStorageUtil";

const initialState = {
  isLoggedIn: false,
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
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
