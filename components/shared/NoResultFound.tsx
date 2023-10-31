import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

interface Props {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}

const NoResultFound = ({ title, description, link, linkTitle }: Props) => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No result found"
        width={350}
        height={350}
        className="hidden dark:block"
      />
      <Image
        src="/assets/images/light-illustration.png"
        alt="No result found"
        width={350}
        height={350}
        className="dark:hidden"
      />
      <h2 className="h2-bold text-dark200_light900 mt-8 text-center">
        {title}
      </h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
        {description}
      </p>
      <Link href={link}>
        <Button className="primary-gradient mt-5 min-h-[46px] px-4 py-3 text-light-900">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoResultFound;
