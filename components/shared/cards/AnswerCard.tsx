import { formatNumber, getTimeStamp } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import Metric from '../Metric';

interface Props {
  clerkId?: string | null;
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  _id,
  question,
  author,
  upvotes,
  createdAt,
}: Props) => {
  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className="card-wrapper flex flex-col rounded-[10px] px-11 py-9"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex">
            {question.title}
          </h3>
        </div>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgURL={author.picture}
          alt="User avatar"
          value={author.name}
          href={`/profile/${author.clerkId}`}
          title={` - asked ${getTimeStamp(createdAt)}`}
          textStyles="body-medium text-dark400_light800"
          isAuthor
        />
        <div className="flex-center gap-3">
          <Metric
            imgURL="/assets/icons/like.svg"
            alt="like icon"
            value={formatNumber(upvotes.length)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
