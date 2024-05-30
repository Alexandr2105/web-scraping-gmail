import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import puppeteer from 'puppeteer-extra';
import { GmailConstant } from "src/common/const/gmail.const";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { LoginToGmailDto } from "../../dto/login.to.gmail.dto";
import * as fs from 'fs';
import * as path from 'path';

export class LoginInGmailCommand {
    constructor(public body: LoginToGmailDto) { }
}

@CommandHandler(LoginInGmailCommand)
export class LoginInGmailUseCase implements ICommandHandler<LoginInGmailCommand> {
    constructor() { }

    async execute(command: LoginInGmailCommand): Promise<void> {
        puppeteer.use(StealthPlugin());
        const browser = await puppeteer.launch({
            headless: false,
        });
        const page = await browser.newPage();

        await page.goto(GmailConstant.gmailUrl);
        await page.type('input[type="email"]', command.body.email);
        await page.click('div[id="identifierNext"]');
        await new Promise((r) => setTimeout(r, 5000));
        await page.type('input[type="password"]', command.body.password);
        await page.click('div[id="passwordNext"]');
        await new Promise((r) => setTimeout(r, 5000));
        const cookies = await page.cookies();
        fs.writeFileSync(path.join(__dirname, 'cookies.json'), JSON.stringify(cookies, null, 2));
        await browser.close();
    }
}