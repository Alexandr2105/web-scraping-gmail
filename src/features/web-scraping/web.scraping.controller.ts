import { Body, Controller, Get, Headers, Post, Query } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { MessageInfoViewModelType } from "src/common/viewModels/message.info.view.model.type";
import { GetMessageInfoCommand } from "src/features/web-scraping/application/use-cases/get.message.info.use-case";
import { SendMessageCommand } from "src/features/web-scraping/application/use-cases/send.message.use-case";
import { OAuth2ForGoogleCommand } from "./application/use-cases/oauth.for.google.use-case";
import { MessageDto } from "./dto/message.dto";

@Controller("scraping")
export class WebScrapingController {
  constructor(private readonly commandBus: CommandBus) { }

  @Get()
  async getGoogleInfoMessages(@Headers('authorization') code: string): Promise<MessageInfoViewModelType[]> {
    return this.commandBus.execute(new GetMessageInfoCommand(code));
  }

  @Post()
  async sendGoogleMessage(@Body() body: MessageDto, @Headers('authorization') code: string) {
    await this.commandBus.execute(new SendMessageCommand(body, code));
  }

  @Get("test")
  async redirectUrlOAuth(@Query('code') code: string): Promise<String> {    
    return this.commandBus.execute(
      new OAuth2ForGoogleCommand(code),
    );
  }
}