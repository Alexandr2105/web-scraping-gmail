import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { MessageInfoViewModelType } from "src/common/viewModels/message.info.view.model.type";
import { GoogleMessagesServiceForOAuth } from "../services/google.messages.service.for.oauth";

export class GetMessageInfoCommand {
    constructor(public readonly code: string) { }
}

@CommandHandler(GetMessageInfoCommand)
export class GetMessageInfoUseCase implements ICommandHandler<GetMessageInfoCommand> {
    constructor(private readonly googleMessageService: GoogleMessagesServiceForOAuth) { }

    async execute(command: GetMessageInfoCommand): Promise<MessageInfoViewModelType[]> {
        const googlAuthToken = command.code.split(' ')[1];
        const emailData: MessageInfoViewModelType[] = [];
        const tenMessagesInfo = await this.googleMessageService.getTenLastInMessage(googlAuthToken);

        const messagesInforArray = tenMessagesInfo.data.messages;
        for (const messageInfo of messagesInforArray) {
            const infoMessage = await this.googleMessageService.getMessageById(messageInfo.id, googlAuthToken);
            const metadataMessageInfo = infoMessage.data.payload.headers;

            let messageInfoViewModelType: MessageInfoViewModelType = {
                sender: '',
                subject: '',
                date: ''
            };

            for (const metadata of metadataMessageInfo) {
                switch (metadata.name) {
                    case 'From': messageInfoViewModelType.sender = metadata.value;
                        break;
                    case 'Subject': messageInfoViewModelType.subject = metadata.value;
                        break;
                    case 'Date': messageInfoViewModelType.date = metadata.value;
                        break;
                    default:
                        break;
                }
            }
            emailData.push(messageInfoViewModelType);
        }
        return emailData;
    }
}