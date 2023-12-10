"use server"

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose"
import { AnswerVoteParams, CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Interaction from "@/database/interaction.model";
import User from "@/database/user.model";

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


        // Add the answer to the question

        const questionObject = await Question.findByIdAndUpdate(question, {
            $push: { answers: newAnswer._id }
        });

        await Interaction.create({
            user: author,
            action: 'answer',
            question,
            answer: newAnswer._id,
            tags: questionObject.tags
        });

        await User.findByIdAndUpdate(author, {
            $inc: {reputation: 10 }
        })


        revalidatePath(path);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getAnswers(params: GetAnswersParams) {
try {
    connectToDatabase();

    const { questionId, sortBy, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    let sortOptions = {};

    switch (sortBy) {
        case 'higestUpvotes':
            sortOptions = { upvotes: -1 };
            break;
        case 'lowestUpvotes':
            sortOptions = { upvotes: 1 };
            break;
        case 'recent':
            sortOptions = { createdAt: -1 };
            break;
        case 'old':
            sortOptions = { createdAt: 1 };
            break;
        default:
        break;
    }

    const answers = await Answer.find({ question: questionId})
    .populate('author', '_id clerkId name picture' )
    .skip(skipAmount)
    .limit(pageSize)
    .sort(sortOptions);

    const totalAnswers = await Answer.countDocuments({ question: questionId });

    const isNextAnswer = totalAnswers > skipAmount + answers.length;

    return { answers, isNextAnswer };
} catch (error) {
    console.log(error);
    throw error;  
}
}

export async function upvoteAnswer(params: AnswerVoteParams) {
    try {
        connectToDatabase();

        const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

        let updateQuery = {};

        if(hasupVoted) {
            updateQuery = { $pull: { upvotes: userId}}   
        } else if(hasdownVoted) {
            updateQuery = {
                $pull: { downvotes: userId },
                $push: { upvotes: userId }
            }
        } else {
            updateQuery = { $addToSet: { upvotes: userId }}
        }

        const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true })

        if(!answer) {
            throw new Error('Answer not found');
        }

        // increment author's reputation by +1/-1 for upvoting/revoking an upvote to the answer
        await User.findByIdAndUpdate(userId, {
            $inc: { reputation: hasupVoted ? -2 : 2 }
        })
        
        await User.findByIdAndUpdate(answer.author, {
            $inc: { reputation: hasupVoted ? -10 : 10 }
        })

        revalidatePath(path);
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
    try {
        connectToDatabase();

        const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

        let updateQuery = {};

        if(hasdownVoted) {
            updateQuery = { $pull: { downvotes: userId}}   
        } else if(hasupVoted) {
            updateQuery = {
                $pull: { upvotes: userId },
                $push: { downvotes: userId }
            }
        } else {
            updateQuery = { $addToSet: { downvotes: userId }}
        }

        const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true })

        if(!answer) {
            throw new Error('Answer not found');
        }

           // increment author's reputation by +1/-1 for downvoted an upvote to the answer
           await User.findByIdAndUpdate(userId, {
            $inc: { reputation: hasdownVoted ? -2 : 2 }
        })
        
        await User.findByIdAndUpdate(answer.author, {
            $inc: { reputation: hasdownVoted ? -10 : 10 }
        })

        revalidatePath(path);
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
    try {
        connectToDatabase();

        const { answerId, path } = params;

        await Answer.findById(answerId);
        
        if(!Answer) {
            throw new Error('Answer not found');
        }

        await Answer.deleteOne({ _id: answerId });
        await Question.updateMany({ answers: answerId }, { $pull: { answers: answerId }});
        await Interaction.deleteMany({ answer: answerId });

        revalidatePath(path);

    } catch (error) {
        console.log(error);
        throw error;
        
    }
}