import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import axios from "axios";
import { GmailConstant } from "src/common/const/gmail.const";
import { settings } from "src/settings";

export class OAuth2ForGoogleCommand {
    constructor(public code: string) { }
}

@CommandHandler(OAuth2ForGoogleCommand)
export class OAuth2ForGoogleUseCase implements ICommandHandler<OAuth2ForGoogleCommand> {
    constructor() { }

    async execute(
        command: OAuth2ForGoogleCommand,
    ) {
        const data = {
            code: command.code,
            client_id: settings.CLIENT_ID,
            client_secret: settings.CLIENT_SECRET,
            redirect_uri: settings.REDIRECT_URL,
            grant_type: 'authorization_code',
        };
        const tokenUrl = GmailConstant.tokenUrlForOAuth;

        const oauthClient = await axios.post(tokenUrl, data).catch(() => {
            throw new BadRequestException([
                { message: 'Bad auth code', field: 'code' },
            ]);
        });

        return oauthClient.data.access_token;
    }
}