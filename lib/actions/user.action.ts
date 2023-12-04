"use server"

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose"
import { CreateUserParams, DeleteUserParams, GetAllUsersParams, GetSavedQuestionsParams, GetUserByIdParams, GetUserStatsParams, ToggleSaveQuestionParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import Answer from "@/database/answer.model";
import { skip } from "node:test";


export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if(!user) {
      throw new Error('User not found');
    }

    // Delete user from database
    // and questions, answers, comments, etc.

    // get user question ids
    // const userQuestionIds = await Question.find({ author: user._id}).distinct('_id');

    // delete user questions
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments, etc.

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    const {searchQuery, filter, page = 1, pageSize = 10} = params;

    const query: FilterQuery<typeof User> = {};

    const skipAmount = (page - 1) * pageSize;

    if(searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i")}},
        { username: { $regex: new RegExp(searchQuery, "i")}},
      ]
      } 

    let shortOptions = {};

    switch (filter) {
      case 'new_users':
        shortOptions = { joinedAt: -1 };
        break;
      case 'old_users':
        shortOptions = { joinedAt: 1 };
        break;
      case 'top_contributors':
        shortOptions = { reputation: -1 };
        break;
      default:
        break;
    }

    const users = await User.find(query)
     .skip(skipAmount)
     .limit(pageSize)  
     .sort(shortOptions);

     const totalUsers = await User.countDocuments(query);

     const isNext = totalUsers > skipAmount + users.length;

    return { users, isNext };
    
  } catch (error) {
    console.log(error);
    throw error;
    
  }
}


export async function saveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, userId, path } = params;
    
    const user = await User.findById(userId);

    if(!user) {
      throw new Error('User not found');
    }

    const isQuestionSaved = user.saved.includes(questionId);

    if(isQuestionSaved) {
      // remove question from saved
      await User.findByIdAndUpdate(userId, { $pull: { saved: questionId }}, { new: true })
    } else {
      // add question to saved
      await User.findByIdAndUpdate(userId, { $push: { saved: questionId }}, { new: true })

    }

    revalidatePath(path);

  } catch (error) {
    console.log(error);
    throw error;
    
  }
}

export async function getSavedQuestion(params: GetSavedQuestionsParams) {
  try {
    
    connectToDatabase();

    const { clerkId, searchQuery, filter, page = 1, pageSize = 2  } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = searchQuery 
    ? {title: { $regex: new RegExp(searchQuery, 'i') }} 
    : {}

    let shortOptions = {};

    switch (filter) {
      case 'most_recent':
        shortOptions = { createdAt: -1 };
        break;
      case 'oldest':
        shortOptions = { createdAt: 1 };
        break;
      case 'most_voted':
        shortOptions = { upvotes: -1 };
        break;
      case 'most_viewed':
        shortOptions = { views: -1 };
        break;
      case 'most_answered':
        shortOptions = { answers: -1 };
        break;
      default:
        break;

    }
    

    const user = await User.findOne({ clerkId }) 
    .populate({
        path: 'saved',
        match: query,
        options: {
        sort: shortOptions,
        skip: skipAmount,
        limit: pageSize + 1,
        },
        populate: [
        { path: 'tags', model: Tag, select: '_id name'},
        { path: 'author', model: User, select: '_id name clerkId picture'}
        ] 
       })
    
    
       const isNext = user.saved.length > pageSize;

    if(!user) {
      throw new Error('User not found');
    }

    const savedQuestions = user.saved;

    return  { questions: savedQuestions, isNext };

    
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function getUserInfo(params: GetUserByIdParams) {
  try {

    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if(!user) {
      throw new Error('User not found');
    }

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return { user, totalQuestions, totalAnswers };
    
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 10,} = params;

    const skipAmount = (page - 1) * pageSize;

    const totalQuestion = await Question.countDocuments({ author: userId });

    const userQuestions = await Question.find({ author: userId })
    .skip(skipAmount)
    .limit(pageSize)
    .sort({ views: -1, upvotes: -1})
    .populate('tags', '_id name')
    .populate('author', '_id name clerkId picture')

    const totalQuestions = await Question.countDocuments({ author: userId });

    const isNextQuestion = totalQuestions > skipAmount + userQuestions.length;

    return {totalQuestion, questions: userQuestions, isNext: isNextQuestion};
 

  } catch (error) {
    console.log(error);
    throw error;
    
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 10,} = params;

    const totalAnswers = await Answer.countDocuments({ author: userId });

    const userAnswers = await Answer.find({ author: userId })
    .sort({ upvotes: -1})
    .populate('question', '_id title')
    .populate('author', '_id name clerkId picture')


    return {totalAnswers, answers: userAnswers};
    
  } catch (error) {
    console.log(error);
    throw error;
    
  }
}