/* eslint-disable no-empty */
'use server'

import { connectToDatabase } from "../mongoose";

export async function CreateQuestion(params: any) {

    try {

        // connect to DB
        connectToDatabase();
        
    } catch (error) {
        
    }
}