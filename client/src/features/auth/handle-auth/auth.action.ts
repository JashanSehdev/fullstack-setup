import { createAsyncThunk } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";
import { api } from "@/api/api";
import { LoginInput } from "@/app/login/login.type";
import { RegisterInput } from "@/app/register/register.type";
import { User } from "@/type/user";

type Register = Omit<RegisterInput, 'confirmPassword'>
export const registerUserAsync = createAsyncThunk(
    'auth/login',
    async (user : Register , thunkApi) => {
        try {
            const response = await api.post("/auth/register", user)
            return response.data

        } catch(error : any) {
            thunkApi.rejectWithValue(
                error?.response?.data || 'something went wrong'
            )
        }
    }
)


export const loginUserAsync =  createAsyncThunk(
    'auth/signup',
    async (user : LoginInput, thunkApi) => {
          try {
            const response = await api.post("/auth/login", user)
            return response.data as User;

        } catch(error : any) {
            thunkApi.rejectWithValue(
                error?.response?.data || 'something went wrong'
            )
        }
    }
)

export const getMeAsync =  createAsyncThunk(
    'auth/me',
    async (_, thunkApi) => {
          try {
            const response = await api.get("/auth/me")
            return response.data;

        } catch(error : any) {
            thunkApi.rejectWithValue(
                error?.response?.data || 'something went wrong'
            )
        }
    }
)

export const logoutMeAsync =  createAsyncThunk(
    'auth/signup',
    async (_, thunkApi) => {
          try {
            const response = await api.get("/auth/logout")
            redirect("/")

        } catch(error : any) {
            thunkApi.rejectWithValue(
                error?.response?.data || 'something went wrong'
            )
        }
    }
)
