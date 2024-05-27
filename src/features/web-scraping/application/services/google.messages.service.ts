import { Injectable } from "@nestjs/common";
import axios from "axios";
import { GmailConstant } from "src/common/const/gmail.const";

@Injectable()
export class GoogleMessagesService {
    constructor() { }

    async getTenLastInMessage(googlAuthToken: string) {
        return axios.get(GmailConstant.gmailUserMessage, {
            headers: {
                Authorization: `Bearer ${googlAuthToken}`,
            },
            params: {
                maxResults: 10,
                q: 'in:inbox',
            },
        });
    }

    async getMessageById(messageId: string, googlAuthToken: string) {
        return axios.get(GmailConstant.gmailUserMessage + `/${messageId}`, {
            headers: {
                Authorization: `Bearer ${googlAuthToken}`,
            },
        })
    }
}