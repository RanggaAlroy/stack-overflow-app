"use server"

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose"
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
    try {
        connectToDatabase();

        const { content, author, question, path } = params;

        // Create the answer

        const newAnswer = await Answer.create({
            content,
            author,
            question
        });

        console.log({ newAnswer });


        // Add the answer to the question

        await Question.findByIdAndUpdate(question, {
            $push: { answers: newAnswer._id }
        });

        // TODO: add the answer to the answers array

        revalidatePath(path);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getAnswers(params: GetAnswersParams) {
try {
    connectToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId})
    .populate('author', '_id clerkId name picture' )
    .sort({ createdAt: -1 });

    return { answers };
} catch (error) {
    console.log(error);
    throw error;  
}
}