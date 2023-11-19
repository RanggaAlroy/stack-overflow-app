import { getQuestionById } from '@/lib/actions/question.action';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Metric from '@/components/shared/Metric';
import { formatNumber, getTimeStamp } from '@/lib/utils';
import ParseHTML from '@/components/shared/ParseHTML';
import RenderTag from '@/components/shared/RenderTag';
import Answer from '@/components/forms/Answer';
import { auth } from '@clerk/nextjs';
import { getUserById } from '@/lib/actions/user.action';
import AllAnswers from '@/components/shared/AllAnswers';
import Voting from '@/components/shared/Voting';
import { URLProps } from '@/types';

const page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionById({ questionId: params.id });
  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              width={22}
              height={22}
              alt="profile"
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Voting
              type="Question"
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={result.upvotes.length}
              hasupVoted={result.upvotes.includes(mongoUser._id)}
              downvotes={result.downvotes.length}
              hasdownVoted={result.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(result._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>
      <div className="flex-start mb-8 mt-5 flex w-full items-center gap-4">
        <Metric
          imgURL="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimeStamp(result.createdAt)}`}
          title=" Asked"
          textStyles="small-regular text-dark400_light800"
        />
        <Metric
          imgURL="/assets/icons/message.svg"
          alt="Views"
          value={formatNumber(result.answers.length)}
          title="Answers"
          textStyles="small-regular text-dark400_light800"
        />
        <Metric
          imgURL="/assets/icons/eye.svg"
          alt="Answers"
          value={formatNumber(result.views)}
          title="Views"
          textStyles="small-regular text-dark400_light800"
        />
      </div>

      <ParseHTML data={result.content} />

      <div className="mb-8 mt-10 flex gap-2">
        {result.tags.map((tag: any) => (
          <RenderTag
            _id={tag._id}
            name={tag.name}
            key={tag._id}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={result._id}
        userId={mongoUser._id}
        totalAnswers={result.answers.length}
      />

      <Answer
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  );
};

export default page;
