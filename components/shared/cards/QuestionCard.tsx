'use clients';
import React from 'react';
import RenderTag from '../RenderTag';
import Link from 'next/link';
import Metric from '../Metric';
import { formatNumber } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const getTimeStamp = (date: Date): string => {
  const distance = formatDistanceToNow(date, {
    addSuffix: true,
    includeSeconds: false,
  });
  return distance;
};

interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionProps) => {
  return (
    <div className="card-wrapper flex flex-col rounded-[10px] p-9 sm:px-11 ">
      <div className="flex flex-col-reverse justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {`Asked ${getTimeStamp(createdAt)}`}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        {/* TODD: if Sign in add edit or delete action */}
      </div>
      <div className="mt-4 flex items-center justify-start gap-2">
        {tags.map(tag => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-10 w-full flex-wrap gap-3">
        <Metric
          imgURL="/assets/icons/avatar.svg"
          alt="User"
          value={author.name}
          title={` - asked ${getTimeStamp(createdAt)}`}
          isAuthor
          href={`/profile/${author._id}`}
          textStyles="body-medium text-dark400_light800"
        />
        <div className="flex flex-wrap justify-between gap-6">
          <Metric
            imgURL="/assets/icons/upvote.svg"
            alt="Upvotes"
            value={formatNumber(upvotes)}
            title="Upvotes"
            textStyles="small-regular text-dark400_light800"
          />
          <Metric
            imgURL="/assets/icons/message.svg"
            alt="Views"
            value={answers.length}
            title="Answers"
            textStyles="small-regular text-dark400_light800"
          />
          <Metric
            imgURL="/assets/icons/eye.svg"
            alt="Answers"
            value={formatNumber(views)}
            title="Views"
            textStyles="small-regular text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
