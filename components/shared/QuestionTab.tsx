import { getUserQuestions } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import React from 'react';
import QuestionCard from './cards/QuestionCard';
import page from '@/app/(root)/(home)/page';
import Pagination from './Pagination';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}

const QuestionTab = async ({ searchProps, userId, clerkId }: Props) => {
  const result = await getUserQuestions({
    userId,
    page: 1,
  });

  return (
    <>
      {result.questions.map(item => (
        <QuestionCard
          key={item._id}
          _id={item._id}
          title={item.title}
          tags={item.tags}
          author={item.author}
          upvotes={item.upvotes}
          views={item.views}
          answers={item.answers}
          createdAt={item.createdAt}
          clerkId={clerkId}
        />
      ))}
    </>
  );
};

export default QuestionTab;
