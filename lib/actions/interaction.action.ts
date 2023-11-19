"use server"

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";
import console from "console";

export async function viewQuestion(params: ViewQuestionParams) {
    try {
        connectToDatabase();

        const { questionId, userId } = params;

        // update view count for question

        await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 }})

        if(userId) {
            // create interaction for user
            const existingInteraction = await Interaction.findOne({ 
                user: userId,
                action: 'view', 
                questions: questionId });

            if(existingInteraction) return console.log('User has already viewed this question');

            // create interaction

            await Interaction.create({
                user: userId,
                action: 'view', 
                questions: questionId });
            
        }

        // return question

        
    } catch (error) {
        
    }
}