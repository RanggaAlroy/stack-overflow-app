import * as z from 'zod';

export const QuestionsSchema = z.object({
    title: z.string().min(5,{ message: "Title must be at least 5 characters." }).max(30),
    explanation: z.string().min(100,{ message: "Minimum of 100 characters." }),
    tags: z.array(z.string().min(1).max(15)).min(1,{ message: "Add at least one tag." }).max(3),
})

