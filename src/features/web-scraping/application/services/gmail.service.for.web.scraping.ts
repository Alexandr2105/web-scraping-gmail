import puppeteer, { Page } from "puppeteer";
import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from "@nestjs/common";
import { MessageInfoViewModelType } from "src/common/viewModels/message.info.view.model.type";

@Injectable()
export class GmailServiceForWebScraping {
    async loadCookies(): Promise<Page> {
        const browser = await puppeteer.launch({
            headless: false,
        });
        const page = await browser.newPage();
        const pages = await browser.pages();
        await pages[0].close();

        const cookies = JSON.parse(fs.readFileSync(path.join(__dirname, '../use-case/cookies.json'), 'utf8'));
        await page.setCookie(...cookies);
        await page.goto('https://mail.google.com/');
        await page.waitForSelector('tr.zA', { visible: true });
        
        return page;
    }

    async getEmails(): Promise<MessageInfoViewModelType[]> {
        const page = await this.loadCookies();

        const emails = await page.evaluate(() => {
            const emailElements = Array.from(document.querySelectorAll('tr.zA'));
            return emailElements.slice(0, 10).map(email => {
                const sender = email.querySelector('.yX.xY span')?.textContent ?? '';
                const subject = email.querySelector('.y6 span')?.textContent ?? '';
                const date = email.querySelector('.xW.xY span')?.getAttribute('title') ?? '';
                return { sender, subject, date };
            });
        });

        await page.close();
        return emails;
    }
}