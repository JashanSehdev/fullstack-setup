import { createAsyncThunk } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";
import { api } from "@/api/api";
import { LoginInput } from "@/app/login/login.type";
import { RegisterInput } from "@/app/register/register.type";
import { User } from "@/type/user.type";
import { GoogleDispatch } from "./auth.type";

type Register = Omit<RegisterInput, 'confirmPassword'>

export const registerUserAsync = createAsyncThunk<User, Register>(
    'auth/register',
    async (user, thunkApi) => {
        try {
            await api.post("/auth/register", user)
            const result = await thunkApi.dispatch(getMeAsync()).unwrap()
            return result
        } catch (error: any) {
            return thunkApi.rejectWithValue(
                error?.response?.data || 'something went wrong'
            )
        }
    }
)   


export const loginUserAsync =  createAsyncThunk<User, LoginInput>(
    'auth/login',
    async (user : LoginInput, thunkApi) => {
          try {
            await api.post("/auth/login", user);
            const result = await thunkApi.dispatch(getMeAsync()).unwrap()
            return result 

        } catch(error : any) {
            return thunkApi.rejectWithValue(
                error?.response?.data || 'something went wrong'
            )
        }
    }
)

export const getMeAsync =  createAsyncThunk(
    'auth/me',
    async (_, thunkApi) => {
          try {
            const response = await api.get("/auth/me");
            return response.data;

        } catch(error : any) {
            return thunkApi.rejectWithValue(
                error?.response?.data || 'something went wrong'
            )
        }
    }
)

export const googleAuthAsync =  createAsyncThunk(
    'auth/google',
    async(data : GoogleDispatch, thunkApi) => {
        try {
            const response = await api.post("/auth/google", data);
            return response.data
        } catch (error : any) {
            return thunkApi.rejectWithValue(
                error.response?.data || 'something went wrong'
            )
        }
    }
)

export const logoutMeAsync =  createAsyncThunk(
    'auth/logout',
    async (_, thunkApi) => {
          try {
            await api.get("/auth/logout")
            redirect("/")
        } catch(error : any) {
            thunkApi.rejectWithValue(
                error?.response?.data || 'something went wrong'
            )
        }
    }
)
