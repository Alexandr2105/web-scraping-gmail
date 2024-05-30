import { Injectable } from "@nestjs/common";
import axios from "axios";
import { GmailConstant } from "src/common/const/gmail.const";

@Injectable()
export class GoogleMessagesServiceForOAuth {
    constructor() { }

    async getTenLastInMessage(googlAuthToken: string) {
        return axios.get(GmailConstant.gmailUserMessageForOAuth, {
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
        return axios.get(GmailConstant.gmailUserMessageForOAuth + `/${messageId}`, {
            headers: {
                Authorization: `Bearer ${googlAuthToken}`,
            },
        })
    }
}