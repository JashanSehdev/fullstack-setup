import { User } from "@/type/user.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUserAsync, logoutMeAsync, registerUserAsync } from "./handle-auth/auth.action";

type InitialState = {
  user: User | null;
};

const initialState: InitialState = {
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserAsync.fulfilled, (state, action:PayloadAction<User>) => {
      console.log("login called")
      state.user = action.payload
    })
    .addCase(registerUserAsync.fulfilled, (state, action : PayloadAction<User>) => {
      state.user = action.payload
    })
    .addCase(logoutMeAsync.fulfilled, (state) => {
      state.user = null
    }) 
  }
});


export default authSlice.reducer
