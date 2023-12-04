import Filter from '@/components/shared/Filter';
import LokalSearch from '@/components/shared/search/LokalSearch';
import { TagFilters } from '@/constants/filters';
import React from 'react';
import NoResultFound from '@/components/shared/NoResultFound';
import { getAllTags } from '@/lib/actions/tag.action';
import Link from 'next/link';
import { SearchParamsProps } from '@/types';

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      <div className="mt-11 flex gap-6 max-sm:flex-col">
        <LokalSearch
          route="/tags"
          iconPosition="left"
          imgSrc={'/assets/icons/search.svg'}
          placeholder="Search by tag name"
          otherClasses="flex-1 max-w-[600px]"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] min-w-[170px]"
        />
      </div>
      <div className="mt-11 flex flex-wrap gap-7"></div>
      <section className="mt-12 flex flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map(tag => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="shadow-light100_darknone"
            >
              <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                  <p className="paragraph-semibold text-dark300_light900 uppercase">
                    {tag.name}
                  </p>
                </div>
                <div>
                  <p className="small-medium text-dark400_light500 mt-3.5">
                    <span className="body-semibold primary-text-gradient mr-2.5">
                      {tag.questions.length}+
                    </span>{' '}
                    Questions
                  </p>
                </div>
              </article>
            </Link>
          ))
        ) : (
          <NoResultFound
            title="No Tags Found"
            description="It looks like there is no tags found."
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>
    </>
  );
};

export default Page;
