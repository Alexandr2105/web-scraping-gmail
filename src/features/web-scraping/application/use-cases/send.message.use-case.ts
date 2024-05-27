import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import axios from "axios";
import { GmailConstant } from "src/common/const/gmail.const";
import { MessageDto } from "src/features/web-scraping/dto/message.dto";


export class SendMessageCommand {
    constructor(public messageDto: MessageDto, public authToken: string) { }
}

@CommandHandler(SendMessageCommand)
export class SendMessageUseCase implements ICommandHandler<SendMessageCommand> {
    constructor() { }

    async execute(command: SendMessageCommand): Promise<any> {
        const googlAuthToken = command.authToken.split(' ')[1];

        const message = {
            from: `From: ${command.messageDto.fromEmail}\r\n`,
            to: `To: ${command.messageDto.toEmail}\r\n`,
            subject: `Subject: ${command.messageDto.subjectOfLetter}\r\n`,
            text: command.messageDto.bodyOfLetter,
            contentType: "Content-Type: text/plain; charset=utf-8\r\n"
        };

        const mimeMessage = `${message.from}${message.to}${message.subject}${message.contentType}\r\n${message.text}`;

        const base64EncodedEmail = Buffer.from(mimeMessage)
            .toString('base64')

        await axios.post(GmailConstant.sendMessage, {
            raw: base64EncodedEmail,
        }, {
            headers: {
                Authorization: `Bearer ${googlAuthToken}`,
                'Content-Type': 'application/json',
            },
        })
    }
}