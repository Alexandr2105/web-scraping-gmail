import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AuthorizationTokenDecorator } from "src/common/customDecorators/authorization.token.decorator";
import { MessageInfoViewModelType } from "src/common/viewModels/message.info.view.model.type";
import { GetMessageInfoCommand } from "src/features/oauth/application/use-cases/get.message.info.use-case";
import { SendMessageCommand } from "src/features/oauth/application/use-cases/send.message.use-case";
import { OAuth2ForGoogleCommand } from "./application/use-cases/oauth.for.google.use-case";
import { MessageForOAuthDto } from "./dto/message.for.oauth.dto";

@Controller("oauth")
export class OAuthController {
  constructor(private readonly commandBus: CommandBus) { }


  @Get()
  async getGoogleInfoMessages(@AuthorizationTokenDecorator("authorization") token: string): Promise<MessageInfoViewModelType[]> {
    return this.commandBus.execute(new GetMessageInfoCommand(token));
  }

  @HttpCode(204)
  @Post()
  async sendGoogleMessage(@Body() body: MessageForOAuthDto, @AuthorizationTokenDecorator() token: string): Promise<void> {
    await this.commandBus.execute(new SendMessageCommand(body, token));
  }

  @Get("test")
  async redirectUrlOAuth(@Query('code') code: string): Promise<String> {
    return this.commandBus.execute(
      new OAuth2ForGoogleCommand(code),
    );
  }
}