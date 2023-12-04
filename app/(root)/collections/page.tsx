'use clients';

import React from 'react';
import LokalSearch from '@/components/shared/search/LokalSearch';
import { QuestionFilters } from '@/constants/filters';
import Filter from '@/components/shared/Filter';
import NoResultFound from '@/components/shared/NoResultFound';
import QuestionCard from '@/components/shared/cards/QuestionCard';
import { getSavedQuestion } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';
import { SearchParamsProps } from '@/types';
import Pagination from '@/components/shared/Pagination';

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();

  if (!userId) return null;

  const result = await getSavedQuestion({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h2 className="h2-bold text-dark100_light900">Saved Question</h2>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col">
        <LokalSearch
          route={'/'}
          iconPosition={'left'}
          imgSrc={'/assets/icons/search.svg'}
          placeholder={'Search questions'}
          otherClasses={'flex-1'}
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-3">
        {result.questions.length > 0 ? (
          result.questions.map((item: any) => (
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
            title="There is saved no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion."
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
}
