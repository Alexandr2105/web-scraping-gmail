import { Module } from "@nestjs/common";
import { SharedModule } from "src/common/shared.module";
import { OAuth2ForGoogleUseCase } from "./application/use-cases/oauth.for.google.use-case";
import { GoogleMessagesService } from "./application/services/google.messages.service";
import { GetMessageInfoUseCase } from "./application/use-cases/get.message.info.use-case";
import { SendMessageUseCase } from "./application/use-cases/send.message.use-case";
import { WebScrapingController } from "./web.scraping.controller";

@Module({
    imports: [SharedModule],
    controllers: [WebScrapingController],
    providers: [OAuth2ForGoogleUseCase, GoogleMessagesService, GetMessageInfoUseCase, SendMessageUseCase],
})
export class WebScrapingModule { }