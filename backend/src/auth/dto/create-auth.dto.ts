import { IsOptional, IsString } from "class-validator";

export class AuthDto {
    @IsOptional()
    @IsString()
    username: string

    @IsOptional()
    @IsString()
    email : string

    @IsOptional()
    @IsString()
    password : string
}
