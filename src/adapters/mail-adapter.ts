export interface MailAdapterRequest {
    subject: string;
    body:string;
}

export interface MailAdapter {
    sendMail: (data: MailAdapterRequest) => Promise<void>;
}