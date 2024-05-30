import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import axios from "axios";
import { GmailConstant } from "src/common/const/gmail.const";
import { MessageForOAuthDto } from "../../dto/message.for.oauth.dto";


export class SendMessageCommand {
    constructor(public messageForOAuthDto: MessageForOAuthDto, public authToken: string) { }
}

@CommandHandler(SendMessageCommand)
export class SendMessageUseCase implements ICommandHandler<SendMessageCommand> {
    constructor() { }

    async execute(command: SendMessageCommand): Promise<void> {
        const googlAuthToken = command.authToken.split(' ')[1];

        const message = {
            from: `From: ${command.messageForOAuthDto.fromEmail}\r\n`,
            to: `To: ${command.messageForOAuthDto.toEmail}\r\n`,
            subject: `Subject: ${command.messageForOAuthDto.subjectOfLetter}\r\n`,
            text: command.messageForOAuthDto.bodyOfLetter,
            contentType: "Content-Type: text/plain; charset=utf-8\r\n"
        };

        const mimeMessage = `${message.from}${message.to}${message.subject}${message.contentType}${message.text}`;

        const base64EncodedEmail = Buffer.from(mimeMessage)
            .toString('base64')

        await axios.post(GmailConstant.sendMessageForOAuth, {
            raw: base64EncodedEmail,
        }, {
            headers: {
                Authorization: `Bearer ${googlAuthToken}`,
                'Content-Type': 'application/json',
            },
        })
    }
}