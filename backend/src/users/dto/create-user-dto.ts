import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "../enum/roles.enum.js";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username : string

    @IsString()
    @IsNotEmpty()
    email : string

    @IsOptional()
    @IsEnum(Role)
    role : Role

}