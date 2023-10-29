'use client';
import { SideBarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

const LeftSideBar = () => {
  const pathName = usePathname();
  return (
    <section className="background-light900_dark200 sticky left-0 top-0 flex h-screen w-fit max-w-[360px] flex-col items-stretch justify-between border-r p-6 pt-36 shadow-light-300 dark:border-none dark:shadow-none max-sm:hidden">
      <div className="flex flex-col gap-6">
        {SideBarLinks.map(item => {
          const isActive =
            (pathName.includes(item.route) && item.route.length > 1) ||
            pathName === item.route;

          return (
            <Link
              key={item.label}
              href={item.route}
              className={`${
                isActive
                  ? 'primary-gradient rounded-lg text-light-900'
                  : 'text-dark300_light900'
              } flex flex-row items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? '' : 'invert-colors'}`}
              />
              <p
                className={`${
                  isActive ? 'base-bold' : 'base-medium'
                } max-md:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col gap-3">
        <Link href="/sign-in">
          <Button className="btn-secondary small-medium text-dark400_light900 min-h-[42px] w-full px-4 py-3">
            <Image
              src={'/assets/icons/account.svg'}
              alt="Sign In"
              width={20}
              height={20}
              className="invert-colors md:hidden"
            />
            <span className="primary-text-gradient max-md:hidden">Sign In</span>
          </Button>
        </Link>
        <Link href="/sign-in">
          <Button className="btn-tertiary small-medium text-dark400_light900 min-h-[42px] w-full px-4 py-3">
            <Image
              src={'/assets/icons/sign-up.svg'}
              alt="Sign up"
              width={20}
              height={20}
              className="invert-colors md:hidden"
            />
            <span className="max-md:hidden">Sign In</span>
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default LeftSideBar;
