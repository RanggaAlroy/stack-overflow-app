'use client';

import React from 'react';
import { Button } from '../ui/button';
import { HomePageFilters } from '@/constants/filters';

const HomePageFilter = () => {
  const active = '';
  return (
    <div className="mt-10 flex justify-start gap-3 max-md:hidden">
      {HomePageFilters.map(item => (
        <Button
          key={item.value}
          onClick={() => {}}
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
