import { Transform } from "class-transformer";
import { IsEmail, Length } from "class-validator";

export class MessageForWebScrapingDto {
    @Transform(({ value }) => String(value).trim())
    @Length(2, 50)
    subjectOfLetter: string;

    @Transform(({ value }) => String(value).trim())
    @Length(5, 200)
    bodyOfLetter: string;

    @IsEmail()
    toEmail: string;
}