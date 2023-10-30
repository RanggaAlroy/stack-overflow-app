'use clients';

import React from 'react';
import { Button } from '@/components/ui/button';
import LokalSearch from '@/components/shared/search/LokalSearch';
import HomePageFilter from '@/components/home/HomePageFilter';
import { HomePageFilters } from '@/constants/filters';
import Filter from '@/components/shared/Filter';

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
      </div>
    </>
  );
}
