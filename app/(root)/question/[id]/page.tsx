import { getQuestionById } from '@/lib/actions/question.action';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Metric from '@/components/shared/Metric';
import { formatNumber, getTimeStamp } from '@/lib/utils';

const page = async ({ params, searchParams }) => {
  const result = await getQuestionById({ questionId: params.id });

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
          <div className="flex justify-end">VOTING</div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>
      <div className="flex-start mt-5 flex w-full items-center gap-4">
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
    </>
  );
};

export default page;
