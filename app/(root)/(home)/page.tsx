'use clients';

import React from 'react';
import { Button } from '@/components/ui/button';
import LokalSearch from '@/components/shared/search/LokalSearch';
import HomePageFilter from '@/components/home/HomePageFilter';
import { HomePageFilters } from '@/constants/filters';
import Filter from '@/components/shared/Filter';
import NoResultFound from '@/components/shared/NoResultFound';
import QuestionCard from '@/components/shared/cards/QuestionCard';

const Questions = [
  {
    _id: '1',
    title: 'What is the best way to learn Python?',
    tags: [
      {
        _id: '1',
        name: 'python',
      },
      {
        _id: '2',
        name: 'Next js',
      },
    ],
    author: {
      _id: '1',
      name: 'John Doe',
      picture: 'https://example.com/john-doe.png',
    },
    upvotes: 10,
    views: 1000000,
    answers: [],
    createdAt: new Date('2023-10-30T13:00:00.000Z'),
  },
  {
    _id: '2',
    title: 'What is the difference between a list and a tuple in Python?',
    tags: [
      {
        _id: '1',
        name: 'python',
      },
      {
        _id: '3',
        name: 'CSS',
      },
    ],
    author: {
      _id: '2',
      name: 'Jane Doe',
      picture: 'https://example.com/jane-doe.png',
    },
    upvotes: 20,
    views: 2200000,
    answers: [],
    createdAt: new Date('2023-10-30T13:00:00.000Z'),
  },
];

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full flex-row items-center justify-between">
          <h2 className="h2-bold text-dark100_light900">All Question</h2>
          <Button className="btn primary-gradient min-h-[46px] px-4 py-3 font-medium text-light-900 transition-colors">
            Ask a Question
          </Button>
        </div>
        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col">
          <LokalSearch
            route={'/'}
            iconPosition={'left'}
            imgSrc={'/assets/icons/search.svg'}
            placeholder={'Search Anything Lokaly'}
            otherClasses={'flex-1'}
          />
          <Filter
            filters={HomePageFilters}
            otherClasses="min-h-[56px] min-w-[170px]"
            containerClasses="md:hidden"
          />
        </div>
        <HomePageFilter />

        <div className="mt-10 flex w-full flex-col gap-3">
          {Questions.length > 0 ? (
            Questions.map(item => (
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
              />
            ))
          ) : (
            <NoResultFound
              title="There is no question to show"
              description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion."
              link="/ask-question"
              linkTitle="Ask a Question"
            />
          )}
        </div>
      </div>
    </>
  );
}
