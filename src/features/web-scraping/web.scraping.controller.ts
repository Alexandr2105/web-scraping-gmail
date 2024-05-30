import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { LoginInGmailCommand } from "./application/use-case/login.in.gmail.use-case";
import { LoginToGmailDto } from "./dto/login.to.gmail.dto";
import { GmailServiceForWebScraping } from "./application/services/gmail.service.for.web.scraping";
import { MessageInfoViewModelType } from "src/common/viewModels/message.info.view.model.type";
import { MessageForWebScrapingDto } from "./dto/message.for.web.scraping.dto";
import { SendMessageForWebScrapingCommand } from "./application/use-case/send.message.for.web.scraping.use-case";

@Controller("scraping")
export class WebScrapingController {
  constructor(private readonly commandBus: CommandBus, private readonly gmailServiceForWebScraping: GmailServiceForWebScraping) { }

  @HttpCode(204)
  @Post('login')
  async inGooglGmail(@Body() body: LoginToGmailDto): Promise<void> {
    await this.commandBus.execute(new LoginInGmailCommand(body));
  }

  @Get()
  async getInMessage(): Promise<MessageInfoViewModelType[]> {
    return await this.gmailServiceForWebScraping.getEmails();
  }

  @HttpCode(204)
  @Post()
  async sendMessage(@Body() body: MessageForWebScrapingDto): Promise<void> {
    await this.commandBus.execute(new SendMessageForWebScrapingCommand(body));
  }
}