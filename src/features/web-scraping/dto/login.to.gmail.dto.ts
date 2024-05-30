import { Transform } from "class-transformer";
import { IsEmail } from "class-validator";

export class LoginToGmailDto {
    @IsEmail()
    email: string;
    @Transform(({ value }) => String(value).trim())
    password: string;
}