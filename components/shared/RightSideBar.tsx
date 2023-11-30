import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RenderTag from './RenderTag';
import { getHotQuestions } from '@/lib/actions/question.action';
import { getPopularTags } from '@/lib/actions/tag.action';

const RightSideBar = async () => {
  const TopQuestions = await getHotQuestions();
  const TopTags = await getPopularTags();

  return (
    <section className="background-light900_dark200 sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 border-l p-6 pt-36 shadow-light-300 dark:border-none dark:shadow-none max-xl:hidden">
      <div className="flex flex-col items-start justify-between">
        <h3 className="h3-bold text-dark100_light900">Top Question</h3>
        <div className="mt-7 flex flex-col items-start justify-between gap-4">
          {TopQuestions.map(item => (
            <Link
              key={item._id}
              href={`/question/${item._id}`}
              className="flex w-full flex-row items-center justify-between gap-6"
            >
              <p className="body-medium text-dark500_light700">{item.title}</p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="arrow-right"
                width={15}
                height={15}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16 flex flex-col justify-between gap-3">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col justify-between gap-4">
          {TopTags.map(item => (
            <RenderTag
              key={item._id}
              _id={item._id}
              name={item.name}
              numberQuestions={item.numberOfQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
