import { Module } from "@nestjs/common";
import { WebScrapingController } from "./web.scraping.controller";
import { LoginInGmailUseCase } from "./application/use-case/login.in.gmail.use-case";
import { SharedModule } from "src/common/shared.module";
import { GmailServiceForWebScraping } from "./application/services/gmail.service.for.web.scraping";
import { SendMessageForWebScrapingUseCase } from "./application/use-case/send.message.for.web.scraping.use-case";

@Module({
    imports: [SharedModule],
    controllers: [WebScrapingController],
    providers: [LoginInGmailUseCase, GmailServiceForWebScraping, SendMessageForWebScrapingUseCase],
})

export class WebScrapingModule { }