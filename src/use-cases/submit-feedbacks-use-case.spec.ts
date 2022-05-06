import { SubmitFeedbacksUseCase } from "./submit-feedbacks-use-cases";


const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbacksUseCase(
    {create:createFeedbackSpy},
    {sendMail:sendEmailSpy},
);

describe('Submit Feedback' , () => {
    it('should be able to submit a feedback' , async () => {
        
        await expect(submitFeedback.execute({
            type:"BUG",
            comment:"ana",
            screenshot:'data:image/png;base64,daioudnqawioudnaiwdn'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendEmailSpy).toHaveBeenCalled();
    })   

    it('should not be able to submit feedback without type' , async () => {
        
        await expect(submitFeedback.execute({
            type:'',
            comment:"ana",
            screenshot:'data:image/png;base64,daioudnqawioudnaiwdn'
        })).rejects.toThrow();
    })

    it('should not be able to submit feedback without comment' , async () => {
        
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'',
            screenshot:'data:image/png;base64,daioudnqawioudnaiwdn'
        })).rejects.toThrow();
    })

    it('should not be able to submit feedback with as invalid screenshot' , async () => {
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'hello world',
            screenshot:'image.jpg'
        })).rejects.toThrow();
    })
})