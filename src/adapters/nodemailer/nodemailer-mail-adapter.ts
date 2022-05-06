import { MailAdapter, MailAdapterRequest } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e0dbab7e33fda0",
      pass: "ed21d7676ebf76"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject , body}: MailAdapterRequest) {
        await transport.sendMail({
        from:"Equipe Feedget <hello@get.com>",
        to: "Pedro Augusto <pe.augustocoelho@gmail.com>",
        subject,
        html:body,
        })
    }
}