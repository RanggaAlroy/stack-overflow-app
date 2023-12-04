'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { HomePageFilters } from '@/constants/filters';
import { formUrlQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

const HomePageFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [active, setActive] = useState('');

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive('');

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: item.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="mt-10 flex justify-start gap-3 max-md:hidden">
      {HomePageFilters.map(item => (
        <Button
          key={item.value}
          onClick={() => handleTypeClick(item.value)}
          value={item.value}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === item.value
              ? 'bg-primary-100 text-primary-500'
              : 'bg-light-800 text-light-500 dark:bg-dark-300 dark:text-light-500'
          }`}
        >
          {item.value}
        </Button>
      ))}
    </div>
  );
};

export default HomePageFilter;
