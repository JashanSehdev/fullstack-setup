import { User } from "@/type/user";
import { createSlice } from "@reduxjs/toolkit";

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
});


export default authSlice.reducer
