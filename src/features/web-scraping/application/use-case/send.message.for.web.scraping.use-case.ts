import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { MessageForWebScrapingDto } from "../../dto/message.for.web.scraping.dto";
import { GmailServiceForWebScraping } from "../services/gmail.service.for.web.scraping";

export class SendMessageForWebScrapingCommand {
    constructor(public body: MessageForWebScrapingDto) { }
}

@CommandHandler(SendMessageForWebScrapingCommand)
export class SendMessageForWebScrapingUseCase implements ICommandHandler<SendMessageForWebScrapingCommand> {
    constructor(private readonly gmailServiceForWebScraping: GmailServiceForWebScraping) { }

    async execute(command: SendMessageForWebScrapingCommand): Promise<void> {
        const page = await this.gmailServiceForWebScraping.loadCookies();

        await page.click('.T-I.T-I-KE.L3');
        await page.waitForSelector('input[id=":gu"]', { visible: true });
        await page.click('div[class="bBe"]');

        await page.type('input[id=":gu"]', command.body.toEmail);
        await page.type('input[name="subjectbox"]', command.body.subjectOfLetter);
        await page.type('div[aria-label="Текст письма"]', command.body.bodyOfLetter);
        await page.click('div.T-I.J-J5-Ji.aoO.v7.T-I-atl.L3');

        await new Promise((r) => setTimeout(r, 5000));

        await page.close();
    }
}