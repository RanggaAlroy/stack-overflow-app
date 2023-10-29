import React from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

const GlobalSearch = () => {
  return (
    <div className="background-light800_darkgradient flex min-h-[56px] w-full max-w-[600px] grow items-center justify-start gap-1 rounded-xl px-4 py-1 max-xl:hidden">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
      />
      <Input
        type="text"
        placeholder="Search Anything Globaly"
        className="text-dark400_light700 no-focus border-none bg-transparent outline-none focus-visible:outline-none"
      />
    </div>
  );
};

export default GlobalSearch;
