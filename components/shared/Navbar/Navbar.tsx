import React from 'react';
import { SignedIn, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import Theme from './Theme';

const Navbar = () => {
  return (
    <nav className="background-light900_dark200 fixed z-50 flex w-full items-center justify-between p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center justify-start gap-2">
        <Image
          src="/assets/images/site-logo.svg"
          alt="Stack Overflow Logo"
          width={32}
          height={32}
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev <span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      GlobalSearch
      <div className="flex items-center justify-end gap-2">
        <Theme />
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
