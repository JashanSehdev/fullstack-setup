import { Role } from "../enum/roles.enum.js"

export interface CreateUser {
    username : string,
    email : string,
    password:string,
    role ?: Role
}

export interface IUser {
    id: number,
    username : string,
    email : string,
    password:string,
    role : Role,
}


export type DispatchUser = Omit<IUser, 'password'>
