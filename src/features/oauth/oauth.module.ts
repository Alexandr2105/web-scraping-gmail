import { Module } from "@nestjs/common";
import { SharedModule } from "src/common/shared.module";
import { OAuth2ForGoogleUseCase } from "./application/use-cases/oauth.for.google.use-case";
import { GoogleMessagesServiceForOAuth } from "./application/services/google.messages.service.for.oauth";
import { GetMessageInfoUseCase } from "./application/use-cases/get.message.info.use-case";
import { SendMessageUseCase } from "./application/use-cases/send.message.use-case";
import { OAuthController } from "./oauth.controller";

@Module({
    imports: [SharedModule],
    controllers: [OAuthController],
    providers: [OAuth2ForGoogleUseCase, GoogleMessagesServiceForOAuth, GetMessageInfoUseCase, SendMessageUseCase],
})
export class OAuthModule { }