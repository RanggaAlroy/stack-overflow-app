import Filter from '@/components/shared/Filter';
import LokalSearch from '@/components/shared/search/LokalSearch';
import { UserFilters } from '@/constants/filters';
import UserCard from '@/components/shared/cards/UserCard';
import React from 'react';
import { getAllUsers } from '@/lib/actions/user.action';
import Link from 'next/link';
import { SearchParamsProps } from '@/types';
import Pagination from '@/components/shared/Pagination';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community | Dev Overflow',
  description: 'Stack overflow clone made with Next.js and MongoDB',
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex gap-6 max-sm:flex-col">
        <LokalSearch
          route="/community"
          iconPosition="left"
          imgSrc={'/assets/icons/search.svg'}
          placeholder="Search for amazing minds"
          otherClasses="flex-1 max-w-[600px]"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map(user => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users found</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Page;
