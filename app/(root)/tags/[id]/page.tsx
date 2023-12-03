import NoResultFound from '@/components/shared/NoResultFound';
import QuestionCard from '@/components/shared/cards/QuestionCard';
import LokalSearch from '@/components/shared/search/LokalSearch';
import { TagFilters } from '@/constants/filters';
import { getQuestionByTagId } from '@/lib/actions/tag.action';
import React from 'react';
import Filter from '@/components/shared/Filter';
import { URLProps } from '@/types';

const Page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h2 className="h2-bold text-dark100_light900">{result.tagTitle}</h2>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col">
        <LokalSearch
          route={`/tags/${params.id}`}
          iconPosition={'left'}
          imgSrc={'/assets/icons/search.svg'}
          placeholder={'Search questions'}
          otherClasses={'flex-1'}
        />
        <Filter
          filters={TagFilters}
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
            title={`There is saved no question to show for ${result.tagTitle} tag`}
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion."
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Page;
