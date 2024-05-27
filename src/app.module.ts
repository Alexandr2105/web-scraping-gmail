import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebScrapingModule } from './features/web-scraping/web.scraping.module';

@Module({
  imports: [WebScrapingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
