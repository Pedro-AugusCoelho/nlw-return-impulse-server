import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbacksUseCaseRequest {
    type:string;
    comment:string;
    screenshot?:string;
}

export class SubmitFeedbacksUseCase {


    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ) {}

    async execute(data: SubmitFeedbacksUseCaseRequest) {
        const { type , comment , screenshot} = data;
        
        if(!type){
            throw new Error("type was not selected");
        }
        
        if(!comment){
            throw new Error("comment was not filled");
        }
        
        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error("invalid screenshot format");
        }
        
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        });

        await this.mailAdapter.sendMail({
            subject: "Novo Feedback",
            body:[
                    `<div style="font-family:sans-serif; font-size:16px color:#222;">`,
                    `<p>Tipo do feedback : ${type}</p>`,
                    `<p>Comentario do feedback : ${comment}</p>`,
                        screenshot ? `<img src=${screenshot} alt='feedback' />`: '',
                    `</div>`
                 ].join('\n')
        })
    }
}