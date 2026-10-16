import { IsNotEmpty, IsString } from "class-validator";

export class GoogleDto {
    
    @IsString()
    @IsNotEmpty()
    email : string

    @IsString()
    @IsNotEmpty()
    password : string
    
}