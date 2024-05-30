import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OAuthModule } from './features/oauth/oauth.module';
import { WebScrapingModule } from './features/web-scraping/web.scraping.moduel';

@Module({
  imports: [OAuthModule, WebScrapingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
