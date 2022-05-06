import express from 'express';
import { Request , Response } from "express";
import { SubmitFeedbacksUseCase } from './use-cases/submit-feedbacks-use-cases';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router(); 

routes.post('/feedbacks' , async (req:Request , res:Response) => {
    const { type , comment , screenshot} = req.body;

    const prismaFeedbackRepository = new PrismaFeedbacksRepository(); 
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    
    const submitFeedbackUseCase = new SubmitFeedbacksUseCase(prismaFeedbackRepository , nodemailerMailAdapter);
    
    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    });
    
    return res.status(201).send();
});