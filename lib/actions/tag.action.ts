'use server'

import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from "./shared.types";
import { connectToDatabase } from "../mongoose"
import User from "@/database/user.model";
import Tag, { ITag } from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId, limit = 3 } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    // find interactions for thes user and group by tags
    // iteractions...


    return [{_id: "1", name: "tag1"}, {_id: "2", name: "tag2"}, {_id: "3", name: "tag3"}]

  } catch (error) {
    console.log(error);
    throw error;
    
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {

    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 4 } = params;

    const query: FilterQuery<typeof Tag> = {};

    const skipAmount = (page - 1) * pageSize;

    if(searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i")}},

      ]
    }

    let shortOptions = {};

    switch (filter) {
      case "popular":
        shortOptions = { questions: -1 };
        break;
      case "recent":
        shortOptions = { createdOn: -1 };
        break;
      case "name":
        shortOptions = { name: 1 };
        break;
      case "old":
        shortOptions = { createdOn: 1 };
        break;
    
      default:
        break;
    }


    const tags = await Tag
    .find(query)
    .skip(skipAmount)
    .limit(pageSize)
    .sort(shortOptions);

    const totalTags = await Tag.countDocuments(query);

    const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext };
    
  } catch (error) {
    console.log(error);
    throw error;
    
  }
}

export async function getQuestionByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 1, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId }; 

    const skipAmount = (page - 1) * pageSize;

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery
      ? {title: { $regex: searchQuery, $options: 'i'}}
      : {},
      options: {
      sort: { createdAt: -1 },
      skip: skipAmount,
      limit: pageSize + 1 ,
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name'},
        { path: 'author', model: User, select: '_id name clerkId picture'}
      ] 
    })

    if(!tag) {
      throw new Error('Tag not found');
    }

    const isNext = tag.questions.length > pageSize;

    const questions = tag.questions;

    return  { tagTitle: tag.name, questions, isNext };

    
    
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function getPopularTags() {
  try {
    connectToDatabase();

    const popularTags = await Tag.aggregate([
      {$project: { name: 1, numberOfQuestions: { $size: "$questions" } }},
      {$sort: { numberOfQuestions: -1 }},
      {$limit: 5}
    ])

    return popularTags
    
  } catch (error) {
    console.log(error);
    throw error;
    
  }
}